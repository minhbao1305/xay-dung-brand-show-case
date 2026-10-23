// ==========================================================================
// 1. Brand Theme Presets & Content Engine (Eco, Luxury, Cyberpunk)
// ==========================================================================

/**
 * 3 Bộ nội dung và thông số thiết kế UI/UX theo từng Theme
 */
const BRAND_PRESETS = {
  eco: {
    name: 'Eco',
    primaryColor: '#10b981', // Xanh ngọc lục bảo (Emerald Green)
    fontMain: "'Quicksand', system-ui, sans-serif", // Font tròn trịa, thân thiện
    tagline: '🌿 Sống Xanh Bền Vững',
    title: 'Hòa Cùng Nhịp Đập Tự Nhiên, Kiến Tạo Tương Lai Xanh',
    desc: 'Định hình lối sống bền vững với các giải pháp thân thiện môi trường, giảm thiểu rác thải carbon và nuôi dưỡng hành tinh xanh cho thế hệ mai sau.',
    ctaPrimary: 'Tham Gia Sống Xanh →',
    ctaSecondary: 'Khám Phá Dự Án Xanh',
    badgeText: '✦'
  },
  luxury: {
    name: 'Luxury',
    primaryColor: '#d4af37', // Vàng đồng vương giả (Metallic Gold)
    fontMain: "'Playfair Display', Georgia, 'Times New Roman', serif", // Font có chân quý phái
    tagline: '👑 Đẳng Cấp Thượng Lưu',
    title: 'Kiệt Tác Giới Hạn, Biểu Tượng Của Sự Tinh Tế',
    desc: 'Chạm tới chuẩn mực xa hoa độc bản với trải nghiệm được chế tác riêng biệt, tôn vinh vị thế đỉnh cao và gu thẩm mỹ vượt thời gian của bạn.',
    ctaPrimary: 'Đặt Lịch Trải Nghiệm →',
    ctaSecondary: 'Bộ Sưu Tập Giới Hạn',
    badgeText: '♔'
  },
  cyberpunk: {
    name: 'Cyberpunk',
    primaryColor: '#06b6d4', // Neon Cyan / Electric Blue rực lửa công nghệ
    fontMain: "'Orbitron', 'Plus Jakarta Sans', system-ui, sans-serif", // Font vị lai, sắc nét (Futuristic Display)
    tagline: '⚡ Kỷ Nguyên Số 2077',
    title: 'Vượt Giới Hạn Thực Tại Với Đột Phá Công Nghệ Lượng Tử',
    desc: 'Hòa mình vào mạng lưới thần kinh thế hệ mới, mở khóa sức mạnh trí tuệ nhân tạo và tái định hình thế giới với tốc độ vượt thời không.',
    ctaPrimary: 'Kích Hoạt Hệ Thống →',
    ctaSecondary: 'Xem Lộ Trình Vị Lai',
    badgeText: '⚡'
  }
};

const BRAND_THEME_STORAGE_KEY = 'aurabrand_brand_preset';

/**
 * Hàm thay đổi Theme và cập nhật đồng bộ Cả Giao Diện (CSS) Lẫn Nội Dung (Content)
 * @param {'eco' | 'luxury' | 'cyberpunk'} themeKey
 */
function applyBrandTheme(themeKey) {
  const preset = BRAND_PRESETS[themeKey] || BRAND_PRESETS.eco;
  const root = document.documentElement;

  // 1. Dùng setProperty cập nhật CSS Variables
  root.style.setProperty('--primary-color', preset.primaryColor);
  root.style.setProperty('--font-main', preset.fontMain);

  // 2. Cập nhật nội dung văn bản tương ứng (Tiêu đề, mô tả, tagline, nút CTA)
  const heroTagline = document.getElementById('hero-tagline');
  const heroTitle = document.getElementById('hero-title');
  const heroDesc = document.getElementById('hero-desc');
  const heroCtaPrimary = document.getElementById('hero-cta-primary');
  const heroCtaSecondary = document.getElementById('hero-cta-secondary');
  const logoBadge = document.getElementById('logo-badge');

  if (heroTagline) heroTagline.textContent = preset.tagline;
  if (heroTitle) heroTitle.innerHTML = preset.title;
  if (heroDesc) heroDesc.textContent = preset.desc;
  if (heroCtaPrimary) heroCtaPrimary.textContent = preset.ctaPrimary;
  if (heroCtaSecondary) heroCtaSecondary.textContent = preset.ctaSecondary;
  if (logoBadge) logoBadge.textContent = preset.badgeText;

  // 3. Lưu vào LocalStorage
  localStorage.setItem(BRAND_THEME_STORAGE_KEY, themeKey);

  // 4. Cập nhật trạng thái active trên danh sách nút
  const brandButtons = document.querySelectorAll('.brand-btn');
  brandButtons.forEach((btn) => {
    const isActive = btn.dataset.theme === themeKey;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });
}

/**
 * Gán sự kiện click cho các nút chuyển Theme
 */
function setupBrandThemeButtons() {
  const brandButtons = document.querySelectorAll('.brand-btn');
  brandButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const themeKey = btn.dataset.theme;
      applyBrandTheme(themeKey);
    });
  });

  // Tải lại theme đã lưu (mặc định là eco)
  const savedBrandTheme = localStorage.getItem(BRAND_THEME_STORAGE_KEY) || 'eco';
  applyBrandTheme(savedBrandTheme);
}


// ==========================================================================
// 2. Dark / Light Mode Switcher Engine
// ==========================================================================

const THEME_STORAGE_KEY = 'aurabrand_theme_preference';
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const themeLabel = document.getElementById('theme-label');

function updateToggleButtonUI(isDark) {
  if (!themeToggleBtn) return;
  if (isDark) {
    if (themeIcon) themeIcon.textContent = '🌙';
    if (themeLabel) themeLabel.textContent = 'Dark';
    themeToggleBtn.setAttribute('aria-label', 'Chuyển sang chế độ Light Mode');
  } else {
    if (themeIcon) themeIcon.textContent = '☀️';
    if (themeLabel) themeLabel.textContent = 'Light';
    themeToggleBtn.setAttribute('aria-label', 'Chuyển sang chế độ Dark Mode');
  }
}

function initTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    updateToggleButtonUI(true);
  } else if (savedTheme === 'light') {
    document.body.classList.remove('dark-theme');
    updateToggleButtonUI(false);
  } else {
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDarkMode) {
      document.body.classList.add('dark-theme');
      updateToggleButtonUI(true);
    } else {
      document.body.classList.remove('dark-theme');
      updateToggleButtonUI(false);
    }
  }
}

function toggleTheme() {
  const isDarkNow = document.body.classList.toggle('dark-theme');
  localStorage.setItem(THEME_STORAGE_KEY, isDarkNow ? 'dark' : 'light');
  updateToggleButtonUI(isDarkNow);
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', toggleTheme);
}

// Khởi chạy khi DOM sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setupBrandThemeButtons();
});
