# Project-HelpTruyen

## 1. Giới thiệu dự án 
HelpTruyện là dự án thiết kế dành cho các đội ngũ dịch truyện ở Việt Nam, người đọc có thể không cần đăng nhập để đọc truyện hoặc đăng nhập quản lý tài khoản của mình có thể đăng truyện hoặc bình luận trong các câu truyện của nhau

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
 . Next.js<br>
 . React<br>
 . Heroicons/react
 . JavaScript<br>
 . Tailwind CSS<br>
 . Auth.js<br>
 . Date-fns<br>
 . Supabase (PostgreSQL)<br>

## 5. Cách cài đặt
 ### B1:
 git clone https://github.com/kothichdangky/Project-HelpTruyen.git
 cd helptruyen
 ### B2:    
 npm install
 ### B3: Biến môi trường

Tạo file `.env.local` ở ngoài cùng.

Yêu cầu các key:<br>
 . AUTH_SECRET:<br>
 . AUTH_GOOGLE_ID:<br>
 . AUTH_GOOGLE_SECRET:<br>
 . NEXT_PUBLIC_SUPABASE_URL:<br>
 . NEXT_PUBLIC_SUPABASE_ANON_KEY:<br>

 ### B4: 
npm run dev
Truy cập http://localhost:3000 để sử dụng ứng dụng.

## 6. Cấu trúc database

| Bảng | Mô tả 
|:---|:---|
| chapter_images | lưu trữ các hình ảnh của từng chapter trong manga, thứ tự | 
| chapters | lưu trữ thông tin của chapter như tên chap, thứ tự |
| comments | lưu trữ các comment của những người xem trong từng chapter của truyện |
| manga_genres | Dùng để liên kết với bảng types và bảng mangas để xuất ra type riêng cho từng manga |
| mangas | lưu trữ tên truyện, tên tác giả, tóm tắt câu truyện, ảnh nền lớn và ảnh chính của truyện |
| settings | lưu trữ các thông số có thể điều chỉnh trang wed, như số lượng chapter của mỗi trang, số lưỡng chữ để rút gọn, ảnh background và ảnh chính đầu tiên  |
| types | lưu trữ các type để người dùng có thể tự dùng và bỏ vào truyện của mình |
| users | lưu trữ thông tin user và password  |

## 7. Cấu trúc thư mục
app/<br>
├── account/<br>
│   ├── detail/<br>
│   └── setting/<br>
├── login/<br>
│   └── register/<br>
├── chapter/<br>
├── api/<br>
├── _Components/<br>
├── _constants/<br>
└── _lib/<br>
public/<br>

## 8. Tác giả

Developed by: Dương Thắng<br>
GitHub: kothichdangky<br>

### Đôi lời muốn gửi: 
Đây là sản phẩm đc mình làm ra sau khi hoàn thành việc học react và nextJs, khi phát triển dự án bản thân đã mình ưu tiên tự nghiên cứu, triển khai và giải quyết các lỗi phát sinh, để giúp bản thân củng cố kiến thức và cải thiện tự duy lập trình.<br>
AI là một công cụ hữu ích và mình không phủ nhận giá trị của nó. Nhưng mình tin để sử dụng AI tốt nhất thì bản thân mình cũng phải hiểu được cách xây dựng 1 dự án, bởi vì mục tiêu của một dự án không chỉ là tạo ra một sản phẩm hoàn chỉnh mà còn là hiểu rõ cấu trúc của nó, qua đó rèn luyện được khả năng tư duy và giải quyết vấn đề 1 cách độc lập<br>
Nếu sản phẩm có thiếu sót nào, mình hi vọng có thể nhận đc cảm thông và góp ý từ mọi người. <br>
Cảm ơn bạn đã dành thời gian tìm hiểu về dự án.