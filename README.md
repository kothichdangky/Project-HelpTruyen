# Project-HelpTruyen

## 1. Giới thiệu dự án 
HelpTruyện là dự án thiết kế dành cho các đội ngũ dịch truyện ở Việt Nam có thể dịch và đưa những trang truyện đến với người đọc, người đọc có thể không cần đăng nhập để đọc truyện hoặc đăng nhập quản lý tài khoản của mình có thể đăng truyện hoặc bình luận trong các câu truyện

## 2. Hình ảnh giao diện

## 3. Chức năng
 .Thanh search giúp tìm truyện dễ hơn <br>
 .Có thể tự do điều chỉnh các chap, thứ tự hình ảnh, nội dung<br>
 .Đọc các trang truyện đã đăng tải<br>
 .Bình luận các nội dung mình muốn vào từng chương truyện<br>
 .Có thể tự do đăng nhập bằng google hoặc tạo tài khoản mới tại wed<br>
 .Tự do quản lý tài khoản và các truyện bản thân đã đăng<br>
 .Phân trang, sắp xếp các chương truyện

## 4. Công nghệ sử dụng
 . Next.js
 . React
 . JavaScript
 . Tailwind CSS
 . Auth.js
 . Supabase (PostgreSQL)
 . Date-fns

## 5. Cách cài đặt
 ### B1:
 git clone https://github.com/kothichdangky/Project-HelpTruyen.git

 ### B2:    
 npm install
 
 ### B3:
 npm run dev

## 6. Biến môi trường

Tạo file `.env.local` ở ngoài cùng.

Yêu cầu các key:<br>
 . AUTH_SECRET:
 . AUTH_GOOGLE_ID:
 . AUTH_GOOGLE_SECRET:
 . NEXT_PUBLIC_SUPABASE_URL:
 . NEXT_PUBLIC_SUPABASE_ANON_KEY:

## 7. Cấu trúc database

| Bảng | Mô tả 
|:---|:---|
| chapter_images | lưu trữ các hình ảnh của từng chapter trong manga, thứ tự | 
| chapters | lưu trữ thông tin của chapter như tên chap, thứ tự |
| comments | lưu trữ các comment của những người xem trong từng chapter của truyện |
| manga_genres | Dùng để liên kết với bảng types và bảng chapters để xuất ra type riêng cho từng manga |
| mangas | lưu trữ tên truyện, tên tác giả, tóm tắt câu truyện, ảnh nền lớn và ảnh chính của truyện |
| settings | lưu trữ các thông số có thể điều chỉnh trang wed, như số lượng chapter của mỗi trang, số lưỡng chữ để rút gọn, ảnh background và ảnh chính đầu tiên  |
| types | lưu trữ các type để người dùng có thể tự dùng và bỏ vào truyện của mình |
| users | lưu trữ thông tin user và password  |

## 8. Cấu trúc thư mục
app/
├── account/
    ├── deltail
    ├── setting
├── login/
    ├── register
├── chapter/
├──components/
├──_lib/
public/

## 9. Tác giả

Developed by [Dương Thắng]
GitHub: kothichdangky

đôi lời muốn gửi: đây là sản phẩm đc mình làm ra sau khi hoàn thành việc học  react và nextJs tuy mất tương đối thời gian nhưng mình tự tin vào kĩ năng vì đã hạn chế dùng AI, 80% sản phẩm này đc tự mình phát triển, bản thân mình không kì thị AI hay xem thường nó, bản thân mình chỉ muốn dùng dự án này để ôn tập và phát triển kĩ năng của bản thân, phát triển khả năng xử lý tình huống và tư duy lập trình, cảm ơn vì đã đọc.