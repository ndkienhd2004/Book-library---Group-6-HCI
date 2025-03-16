# Cach su dung backend

## API cho frondend

### GET /list-books

### POST /auth/login và /auth/register

```javascript
// Nhận vào:
{
  "email": value,
  "password": value,
  "fullname": value //dành cho register
}
//Trả về:
{
  user: {
    "_id": value,
    "email": value,
    "passowrd": value,
    "fullname": value
  },
  "token": token
}
```

### GET /auth/logout

### POST /book/upload

```javascript
// Nhận vào
{
  "book": file,
  "title": value,
  "author": value,
  "nums_page": value
  // 3 thuộc tính trên sẽ được thêm mặc định khi tải file sách lên
}
```

### GET /book/uploaded-books

### lấy dữ liệu từ sách, ảnh từ backend

file sách:
http://localhost:8000/public/book/filename.pdf

file ảnh:
http://localhost:8000/public/img/filename.png
