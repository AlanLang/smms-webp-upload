use axum::{
    body::Body,
    http::StatusCode,
    response::{IntoResponse, Response},
    Json,
};
use serde::Serialize;

pub fn success<T>(data: T) -> Response
where
    T: Serialize,
{
    (StatusCode::OK, Json(data)).into_response()
}

pub fn error(err: String) -> Response<Body> {
    // (StatusCode::INTERNAL_SERVER_ERROR, Json(data)).into_response()
    Response::builder()
        .status(StatusCode::INTERNAL_SERVER_ERROR)
        .header("Content-Type", "application/json")
        .body(Body::from(ErrorResponse { error: err }))
        .unwrap()
}

#[derive(Serialize)]
struct ErrorResponse {
    error: String,
}

impl From<ErrorResponse> for Body {
    fn from(error_response: ErrorResponse) -> Self {
        let body = serde_json::to_string(&error_response).unwrap();
        Body::from(body)
    }
}
