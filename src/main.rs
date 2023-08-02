use axum::body::{Body, Bytes};
use axum::headers::authorization::Bearer;
use axum::headers::Authorization;
use axum::http::{HeaderValue, Request};
use axum::middleware::{self, Next};
use axum::response::{IntoResponse, Response};
use axum::Json;

use axum::routing::get;
use axum::{extract::Multipart, extract::TypedHeader, routing::post, Router};
use image::io::Reader as ImageReader;
use log::debug;
use reqwest::StatusCode;
use reqwest::{
    header,
    multipart::{Form, Part},
    Client,
};
use smms_webp_upload::res_helper;

use std::io::Cursor;
use std::net::SocketAddr;
use std::vec::Vec;
use tower_http::services::ServeDir;
use uuid::Uuid;

// Use Jemalloc only for musl-64 bits platforms
#[cfg(all(target_env = "musl", target_pointer_width = "64"))]
#[global_allocator]
static ALLOC: jemallocator::Jemalloc = jemallocator::Jemalloc;

#[tokio::main]
async fn main() {
    dotenv::dotenv().ok();
    env_logger::init();
    debug!("Starting up");

    let app = Router::new()
        .route("/api/upload", post(handle_upload))
        .route("/api/profile", get(handle_profile))
        .nest_service("/", ServeDir::new("dist"))
        .layer(middleware::from_fn(check_sign));

    let addr = SocketAddr::from(([0, 0, 0, 0], 3200));
    println!("listening on {}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

async fn check_sign<B>(req: Request<B>, next: Next<B>) -> Response {
    // Skip authentication for paths starting with "/assets"
    if req.uri().path().starts_with("/static") {
        return next.run(req).await;
    }
    if req.uri().to_string().ends_with(".html") || req.uri() == "/" {
        return next.run(req).await;
    }
    debug!("header: {:?}", req.headers());
    let authorization = req.headers().get("authorization");
    let authorization = match authorization {
        Some(authorization) => authorization,
        None => {
            return (StatusCode::BAD_REQUEST, Json("no authorization")).into_response();
        }
    };
    let authorization_bytes = authorization.as_bytes();
    if !authorization_bytes.starts_with(b"Bearer ") {
        return (StatusCode::BAD_REQUEST, Json("no bearer")).into_response();
    }
    let res = next.run(req).await;
    res
}

async fn handle_profile(
    TypedHeader(authorization): TypedHeader<Authorization<Bearer>>,
) -> Response<Body> {
    let mut headers = header::HeaderMap::new();
    let token_header_value = match HeaderValue::from_str(authorization.token()) {
        Ok(token_header_value) => token_header_value,
        Err(err) => {
            return res_helper::error(format!("Failed to parse token: {}", err));
        }
    };
    headers.insert("Authorization", token_header_value);
    headers.insert(header::ACCEPT, HeaderValue::from_static("application/json"));
    let client = Client::new();
    let response = client
        .post("https://sm.ms/api/v2/profile")
        .headers(headers)
        .send()
        .await;
    let response = match response {
        Ok(response) => response,
        Err(err) => {
            return res_helper::error(format!("Failed to send request: {}", err));
        }
    };
    let text = match response.text().await {
        Ok(result) => result,
        Err(err) => {
            return res_helper::error(format!("Failed to parse json: {}", err));
        }
    };
    match Response::builder()
        .status(StatusCode::OK)
        .header("Content-Type", "application/json")
        .body(Body::from(text))
    {
        Ok(response) => response,
        Err(err) => {
            return res_helper::error(format!("Failed to build response: {}", err));
        }
    }
}

async fn handle_upload(
    TypedHeader(authorization): TypedHeader<Authorization<Bearer>>,
    mut multipart: Multipart,
) -> Response<Body> {
    let mut image_file: Option<Bytes> = None;
    while let Some(field) = match multipart.next_field().await {
        Ok(field) => field,
        Err(err) => {
            return res_helper::error(format!("Failed to get next field: {}", err));
        }
    } {
        let field_name = match field.name() {
            Some(name) => name,
            None => "",
        };
        if field_name == "smfile" {
            let file = field.bytes().await;
            // 如果成功
            if let Ok(file) = file {
                image_file = Some(file);
            } else {
                return res_helper::error(format!("Failed to get file from smfile"));
            }
        }
    }
    let image_file = match image_file {
        Some(file) => file,
        None => {
            return res_helper::error(format!("Failed to get file"));
        }
    };
    let buffer = match process_image(image_file).await {
        Ok(buffer) => buffer,
        Err(err) => {
            return res_helper::error(format!("Failed to process image: {}", err));
        }
    };
    let result = match upload_image(buffer, authorization.token()).await {
        Ok(result) => result,
        Err(err) => {
            return res_helper::error(format!("Failed to upload image: {}", err));
        }
    };
    debug!("result: {:?}", result);
    let result = match result.text().await {
        Ok(result) => result,
        Err(err) => {
            return res_helper::error(format!("Failed to parse json: {}", err));
        }
    };
    match Response::builder()
        .status(StatusCode::OK)
        .header("Content-Type", "application/json")
        .body(Body::from(result))
    {
        Ok(response) => response,
        Err(err) => {
            return res_helper::error(format!("Failed to build response: {}", err));
        }
    }
}

async fn process_image(file: Bytes) -> Result<Vec<u8>, Box<dyn std::error::Error>> {
    let mut cursor = Cursor::new(file);
    let mut reader = std::io::BufReader::new(&mut cursor);
    debug!("start process image");
    let image = ImageReader::new(&mut reader)
        .with_guessed_format()?
        .decode()?;
    let mut buffer = Vec::new();
    image
        .resize(
            image.width(),
            image.height(),
            image::imageops::FilterType::Lanczos3,
        )
        .write_to(
            &mut Cursor::new(&mut buffer),
            image::ImageOutputFormat::WebP,
        )?;
    debug!("file size: {}", buffer.len());
    Ok(buffer)
}

async fn upload_image(buffer: Vec<u8>, token: &str) -> Result<reqwest::Response, reqwest::Error> {
    debug!("start upload image");
    let mut headers = header::HeaderMap::new();
    headers.insert("Authorization", HeaderValue::from_str(token).unwrap());
    headers.insert(header::ACCEPT, HeaderValue::from_static("application/json"));
    let client = Client::new();
    // 创建一个多部分表单
    let file_name = Uuid::new_v4().to_string() + ".webp";
    let form = Form::new()
        // 添加文件部分
        .part("smfile", Part::bytes(buffer).file_name(file_name))
        // 添加其他字段部分
        .text("format", "json");
    // 发送请求
    let response = client
        .post("https://sm.ms/api/v2/upload")
        .headers(headers)
        .multipart(form)
        .send()
        .await?;
    Ok(response)
}
