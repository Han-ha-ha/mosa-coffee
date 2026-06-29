/* ============================================
   墨上咖啡 Mosa Coffee — 共享脚本
   导航、动画、表单 — 全站通用
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ===== 导航滚动效果 =====
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // ===== 移动端菜单 =====
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // ===== 滚动入场动画 =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // ===== Toast 提示 =====
  window.showToast = function(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  };

  // ===== 预约表单 =====
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      window.showToast('✓ 预约提交成功！我们会尽快与您联系。');
      contactForm.reset();
    });
  }

  // ===== 菜单分类筛选 =====
  document.querySelectorAll('.menu-cat').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.menu-cat').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      document.querySelectorAll('.menu-item[data-cat]').forEach(item => {
        item.style.display = (cat === 'all' || item.dataset.cat === cat) ? '' : 'none';
      });
    });
  });

  // ===== 图片懒加载 (CSS background-image) =====
  const bgObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const src = el.dataset.src;
        if (src) {
          el.style.backgroundImage = `url(${src})`;
          el.classList.add('has-img');
          delete el.dataset.src;
        }
        obs.unobserve(el);
      }
    });
  }, { rootMargin: '200px 0px' }); // 提前200px加载

  document.querySelectorAll('[data-src]').forEach(el => bgObserver.observe(el));

  // ===== 滚动进度条 =====
  const progressBar = document.getElementById('progressBar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const h = document.documentElement;
      const pct = (window.scrollY / (h.scrollHeight - h.clientHeight)) * 100;
      progressBar.style.width = Math.min(pct, 100) + '%';
    }, { passive: true });
  }

  // ===== 按钮涟漪效果 (触摸反馈) =====
  document.querySelectorAll('.btn').forEach(btn => {
    btn.classList.add('ripple');
  });

  // ===== 预加载 Hero 区域图片 (首屏优先) =====
  const heroImg = document.querySelector('.hero-bg');
  if (heroImg) {
    const bg = getComputedStyle(heroImg).backgroundImage;
    if (bg && bg !== 'none') {
      const img = new Image();
      img.src = bg.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
    }
  }
  window.addEventListener('scroll', () => {
    const parallaxEls = document.querySelectorAll('.parallax');
    parallaxEls.forEach(el => {
      const speed = parseFloat(el.dataset.speed || 0.15);
      el.style.transform = `translateY(${window.scrollY * speed}px)`;
    });
  });

});
