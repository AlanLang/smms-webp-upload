# smms-webp-upload
将图片转换成 webp 格式并上传到 SM.MS

## 使用方法
### docker
```bash
docker run -d -p 3200:3200 --rm --name smms-webp-upload alanlang/smms-webp-upload
```

### docker-compose
```yaml
version: '3'
services:
  smms-webp-upload:
    image: alanlang/smms-webp-upload
    container_name: smms-webp-upload
    ports:
      - 3200:3200
    restart: always
```
