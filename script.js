// Crandon Law — small UX layer

(() => {
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 12) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Year
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Reveal on scroll
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && items.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('is-in'), i * 60);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
    items.forEach(el => io.observe(el));
  } else {
    items.forEach(el => el.classList.add('is-in'));
  }

  // Mobile menu toggle (links open in same page)
  const btn = document.querySelector('.nav__menu');
  const links = document.querySelector('.nav__links');
  if (btn && links) {
    btn.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
      if (open) {
        Object.assign(links.style, {
          display: 'flex',
          position: 'fixed',
          top: '60px',
          right: '14px',
          left: '14px',
          background: 'var(--bg)',
          border: '1px solid var(--rule)',
          padding: '20px',
          borderRadius: '10px',
          flexDirection: 'column',
          gap: '14px',
          zIndex: '40'
        });
      } else {
        links.removeAttribute('style');
      }
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('is-open');
      links.removeAttribute('style');
      btn.setAttribute('aria-expanded', 'false');
    }));
  }

  // Booking form — graceful mailto fallback
  const form = document.getElementById('bookForm');
  const status = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      if (!data.name || !data.email) {
        status.textContent = 'Please add your name and email.';
        status.classList.remove('ok');
        return;
      }
      const subject = encodeURIComponent(`Introduction request — ${data.name}`);
      const body = encodeURIComponent(
`Name: ${data.name}
Email: ${data.email}
Firm / Fund: ${data.firm || '—'}
Engagement type: ${data.type || '—'}

${data.note || ''}`);
      window.location.href = `mailto:linkedin@johncrandon.com?subject=${subject}&body=${body}`;
      status.textContent = 'Opening your email client…';
      status.classList.add('ok');
      form.reset();
    });
  }
})();
