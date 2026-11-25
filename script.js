/* ============================================================
   StarWhite Portfolio — script.js
   Vanilla JS, zero dependencies.
   Minimal Monochrome & Crimson Red Accent Particles
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     1. THEME TOGGLE (Dark / Light)
     ---------------------------------------------------------- */
  const html = document.documentElement;
  const themeBtn = document.getElementById('theme-toggle');

  // Restore saved preference (default: dark)
  const saved = localStorage.getItem('theme');
  if (saved) {
    html.dataset.theme = saved;
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    html.dataset.theme = 'light';
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
      html.dataset.theme = next;
      localStorage.setItem('theme', next);
    });
  }

  /* ----------------------------------------------------------
     2. MOBILE NAV TOGGLE (手机端抽屉菜单优化)
     ---------------------------------------------------------- */
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    const toggleMenu = (force) => {
      const isOpen = typeof force === 'boolean' ? force : !hamburger.classList.contains('open');
      hamburger.classList.toggle('open', isOpen);
      navLinks.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    };

    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close on any nav link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggleMenu(false);
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target) && hamburger.classList.contains('open')) {
        toggleMenu(false);
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && hamburger.classList.contains('open')) {
        toggleMenu(false);
      }
    });
  }

  /* ----------------------------------------------------------
     3. NAVBAR SHADOW ON SCROLL
     ---------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (navbar) {
          navbar.style.boxShadow =
            window.scrollY > 30
              ? '0 4px 20px rgba(0,0,0,.35)'
              : 'none';
        }
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ----------------------------------------------------------
     4. ACTIVE NAV LINK HIGHLIGHT
     ---------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');

  if ('IntersectionObserver' in window && sections.length > 0) {
    const sectionIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            links.forEach(l => l.classList.remove('active'));
            const active = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
            if (active) active.classList.add('active');
          }
        });
      },
      { rootMargin: '-30% 0px -55% 0px' }
    );
    sections.forEach(s => sectionIO.observe(s));
  }

  /* ----------------------------------------------------------
     5. SCROLL-DRIVEN REVEAL (全向入场监听 · 侧滑与阶梯延迟)
     ---------------------------------------------------------- */
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  let delay = 0;

  if ('IntersectionObserver' in window && reveals.length > 0) {
    const revealIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const hasExplicitDelay = e.target.classList.contains('stagger-1') ||
                                    e.target.classList.contains('stagger-2') ||
                                    e.target.classList.contains('stagger-3') ||
                                    e.target.classList.contains('stagger-4');
            if (!hasExplicitDelay) {
              e.target.style.transitionDelay = `${delay}ms`;
              delay += 55;
            }
            e.target.classList.add('visible');
            revealIO.unobserve(e.target);

            clearTimeout(window._revealTimer);
            window._revealTimer = setTimeout(() => { delay = 0; }, 240);
          }
        });
      },
      { threshold: 0.08 }
    );
    reveals.forEach(el => revealIO.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  /* ----------------------------------------------------------
     6. CANVAS PARTICLES (主纯白星光 · 约12%绯红微星点缀)
     ---------------------------------------------------------- */
  const canvas = document.getElementById('particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let cw, ch;

    function resize() {
      cw = canvas.width = window.innerWidth;
      ch = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    function createParticles() {
      particles = [];
      const isMobile = window.innerWidth < 768;
      // 移动端轻量化 (35~40颗)，桌面端 90~105颗
      const count = isMobile
        ? Math.min(Math.floor((cw * ch) / 22000), 38)
        : Math.min(Math.floor((cw * ch) / 11000), 100);

      for (let i = 0; i < count; i++) {
        // ~12% 绯红微光粒子点缀，88% 纯白星辉
        const isRed = Math.random() > 0.88;
        particles.push({
          x: Math.random() * cw,
          y: Math.random() * ch,
          r: isRed ? (Math.random() * 1.5 + 0.6) : (Math.random() * 1.2 + 0.3),
          dx: (Math.random() - 0.5) * 0.15,
          dy: (Math.random() - 0.5) * 0.15,
          alpha: Math.random() * 0.55 + 0.2,
          isRed: isRed,
        });
      }
    }
    createParticles();
    window.addEventListener('resize', createParticles, { passive: true });

    function drawParticles() {
      ctx.clearRect(0, 0, cw, ch);
      const isDark = html.dataset.theme !== 'light';

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0) p.x = cw;
        if (p.x > cw) p.x = 0;
        if (p.y < 0) p.y = ch;
        if (p.y > ch) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);

        let colorStr;
        if (isDark) {
          colorStr = p.isRed
            ? `rgba(255, 42, 68, ${p.alpha * 0.95})`   // 精致绯红点缀
            : `rgba(255, 255, 255, ${p.alpha * 0.75})`; // 主纯白星光
        } else {
          colorStr = p.isRed
            ? `rgba(220, 38, 38, ${p.alpha * 0.9})`    // 红色点缀
            : `rgba(40, 40, 50, ${p.alpha * 0.45})`;   // 柔灰黑星辉
        }

        ctx.fillStyle = colorStr;
        ctx.fill();
      }
      requestAnimationFrame(drawParticles);
    }
    requestAnimationFrame(drawParticles);
  }

  /* ----------------------------------------------------------
     7. SMOOTH SCROLL OFFSET (导航锚点滚动预留高度)
     ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = window.innerWidth < 640 ? 58 : 64;
      const y = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  /* ----------------------------------------------------------
     8. CLICK-TO-COPY FOR CONTACT CARDS (一键复制交互反馈)
     ---------------------------------------------------------- */
  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    ta.style.top = '-9999px';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
      document.execCommand('copy');
    } catch (err) {}
    document.body.removeChild(ta);
  }

  document.querySelectorAll('.contact-card[data-copy]').forEach((card) => {
    card.addEventListener('click', (e) => {
      const text = card.getAttribute('data-copy');
      if (!text) return;

      const doFeedback = () => {
        const actionEl = card.querySelector('.contact-action');
        if (actionEl && !card.classList.contains('copied')) {
          const originalText = actionEl.textContent;
          actionEl.textContent = '已复制 ✓';
          card.classList.add('copied');
          setTimeout(() => {
            actionEl.textContent = originalText;
            card.classList.remove('copied');
          }, 1800);
        }
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(doFeedback).catch(() => {
          fallbackCopy(text);
          doFeedback();
        });
      } else {
        fallbackCopy(text);
        doFeedback();
      }
    });

    // 键盘辅助无障碍访问
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });
})();
