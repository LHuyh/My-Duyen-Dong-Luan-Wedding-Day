// ============ CẤU HÌNH NGÀY CƯỚI ============
// Đổi ngày giờ tại đây (định dạng: Năm, Tháng-1, Ngày, Giờ, Phút)
const WEDDING_DATE = new Date(2026, 10, 15, 9, 0, 0);

// ============ HỌA TIẾT HOA NHÀI (dùng cho mọi divider) ============
const JASMINE_SVG = `
<svg viewBox="0 0 220 60" xmlns="http://www.w3.org/2000/svg">
  <path d="M5 30 C 60 10, 90 50, 110 30 C 130 10, 160 50, 215 30" />
  <circle cx="60" cy="19" r="3"></circle>
  <circle cx="110" cy="30" r="4"></circle>
  <circle cx="160" cy="19" r="3"></circle>
</svg>`;

document.querySelectorAll('[data-divider]').forEach(el => {
  el.innerHTML = JASMINE_SVG;
});

// ============ HIỆU ỨNG "VẼ" DIVIDER KHI CUỘN TỚI ============
const dividerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.divider').forEach(d => dividerObserver.observe(d));

// ============ ĐẾM NGƯỢC ============
function updateCountdown() {
  const now = new Date();
  let diff = WEDDING_DATE - now;

  if (diff <= 0) {
    ['cd-days', 'cd-hours', 'cd-mins', 'cd-secs'].forEach(id => {
      document.getElementById(id).textContent = '00';
    });
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * (1000 * 60 * 60 * 24);
  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * (1000 * 60 * 60);
  const mins = Math.floor(diff / (1000 * 60));
  diff -= mins * (1000 * 60);
  const secs = Math.floor(diff / 1000);

  document.getElementById('cd-days').textContent = String(days).padStart(2, '0');
  document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('cd-mins').textContent = String(mins).padStart(2, '0');
  document.getElementById('cd-secs').textContent = String(secs).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ============ DOT NAV: ĐÁNH DẤU MỤC ĐANG XEM ============
const sections = ['hero', 'countdown', 'story', 'event', 'gallery', 'rsvp']
  .map(id => document.getElementById(id))
  .filter(Boolean);
const dots = document.querySelectorAll('.dot');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const idx = sections.indexOf(entry.target);
      dots.forEach(d => d.classList.remove('active'));
      if (dots[idx]) dots[idx].classList.add('active');
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => navObserver.observe(s));

// ============ RSVP FORM ============
const rsvpForm = document.getElementById('rsvpForm');
const rsvpStatus = document.getElementById('rsvpStatus');

if (rsvpForm) {
  rsvpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const action = rsvpForm.getAttribute('action');

    // Nếu chưa cấu hình Formspree, chỉ hiển thị thông báo demo
    if (!action || action.includes('YOUR_FORM_ID')) {
      rsvpStatus.textContent = 'Đã ghi nhận (demo) — hãy thay ID Formspree của bạn trong index.html để form hoạt động thật.';
      rsvpForm.reset();
      return;
    }

    rsvpStatus.textContent = 'Đang gửi...';
    try {
      const res = await fetch(action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(rsvpForm)
      });
      if (res.ok) {
        rsvpStatus.textContent = 'Cảm ơn bạn! Chúng tôi đã nhận được xác nhận.';
        rsvpForm.reset();
      } else {
        rsvpStatus.textContent = 'Có lỗi xảy ra, vui lòng thử lại sau.';
      }
    } catch (err) {
      rsvpStatus.textContent = 'Không thể kết nối. Vui lòng kiểm tra mạng và thử lại.';
    }
  });
}
