# Thiệp cưới online — Minh & Thư

Trang thiệp cưới một trang (single-page), thuần HTML/CSS/JS, không cần build tool, deploy miễn phí bằng GitHub Pages.

## Cấu trúc thư mục

```
wedding-invitation/
├── index.html        ← toàn bộ nội dung & cấu trúc trang
├── css/
│   └── style.css      ← màu sắc, font, layout
├── js/
│   └── script.js       ← đếm ngược, hiệu ứng cuộn, xử lý form RSVP
├── images/            ← ảnh cưới (đang là ảnh placeholder, thay bằng ảnh thật)
└── README.md
```

## 1. Tuỳ chỉnh nội dung

| Muốn đổi gì | Sửa ở đâu |
|---|---|
| Tên cô dâu chú rể, ngày cưới hiển thị | `index.html` — phần `.hero__names`, `.hero__date` |
| Ngày giờ dùng để đếm ngược | `js/script.js` — dòng `const WEDDING_DATE = new Date(...)` |
| Địa điểm, giờ lễ | `index.html` — phần `#event` |
| Bản đồ Google Maps | `index.html` — sửa link trong thẻ `<iframe>` (lấy link nhúng thật từ Google Maps > Chia sẻ > Nhúng bản đồ) |
| Ảnh cưới | thay các file trong `images/` (giữ nguyên tên hoặc sửa lại đường dẫn trong `index.html`) |
| Số tài khoản mừng cưới | `index.html` — phần `.gift__cards` |
| Màu sắc / font chữ | `css/style.css` — phần `:root { ... }` đầu file |

## 2. Kết nối form RSVP (để nhận xác nhận qua email)

Trang đang dùng [Formspree](https://formspree.io) (miễn phí, không cần server):

1. Tạo tài khoản tại formspree.io, tạo 1 form mới, copy **Form ID**.
2. Trong `index.html`, tìm dòng:
   ```html
   <form id="rsvpForm" class="rsvp__form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
   Thay `YOUR_FORM_ID` bằng ID thật của bạn.
3. Xong — mỗi lượt khách xác nhận sẽ gửi thẳng vào email bạn đăng ký.

(Nếu chưa cấu hình, form vẫn chạy ở chế độ demo — hiển thị thông báo nhưng không gửi đi đâu.)

## 3. Đưa lên GitHub Pages (miễn phí)

1. Tạo repo mới trên GitHub, ví dụ tên `wedding-invitation`.
2. Đẩy toàn bộ thư mục này lên repo:
   ```bash
   cd wedding-invitation
   git init
   git add .
   git commit -m "Thiệp cưới online"
   git branch -M main
   git remote add origin https://github.com/<username>/wedding-invitation.git
   git push -u origin main
   ```
3. Vào repo trên GitHub → **Settings** → **Pages**.
4. Ở mục **Branch**, chọn `main` và thư mục `/ (root)` → **Save**.
5. Sau 1–2 phút, trang sẽ có tại:
   `https://<username>.github.io/wedding-invitation/`

## 4. Gợi ý nâng cấp thêm (tuỳ chọn)

- Gắn domain riêng (ví dụ `minhthu.love`) qua mục **Custom domain** trong Pages settings.
- Thêm nhạc nền tự động phát bằng thẻ `<audio>` + nút bật/tắt.
- Thêm tường lời chúc thật (lưu trữ) bằng cách nối Formspree/Google Sheet qua Apps Script, vì GitHub Pages không có backend riêng.
