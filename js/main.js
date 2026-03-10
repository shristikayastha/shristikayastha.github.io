/* ════════════════════════════════════════
   NAVBAR — add glass blur on scroll
════════════════════════════════════════ */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('s', scrollY > 20);
}, { passive: true });


/* ════════════════════════════════════════
   ACTIVE NAV LINK — highlight current section
════════════════════════════════════════ */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nl');

function updateActive() {
  let current = '';
  sections.forEach(sec => {
    if (scrollY >= sec.offsetTop - 130) current = sec.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}
window.addEventListener('scroll', updateActive, { passive: true });
updateActive();


/* ════════════════════════════════════════
   SCROLL REVEAL — fade in sections
════════════════════════════════════════ */
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('on');
  });
}, { threshold: 0.1 });
reveals.forEach(r => observer.observe(r));


/* ════════════════════════════════════════
   HAMBURGER MENU
════════════════════════════════════════ */
const hbg = document.getElementById('hbg');
const mob = document.getElementById('mob');

hbg.addEventListener('click', () => {
  const open = mob.classList.toggle('open');
  const bars = hbg.querySelectorAll('span');
  bars[0].style.transform = open ? 'translateY(6.5px) rotate(45deg)'  : '';
  bars[1].style.opacity   = open ? '0'                                  : '';
  bars[2].style.transform = open ? 'translateY(-6.5px) rotate(-45deg)' : '';
});

function cm() {
  mob.classList.remove('open');
  hbg.querySelectorAll('span').forEach(b => {
    b.style.transform = '';
    b.style.opacity   = '';
  });
}


/* ════════════════════════════════════════
   CONTACT FORM — Formspree integration
   Replace YOUR_FORM_ID with your actual ID
   from formspree.io
════════════════════════════════════════ */
async function handleSubmit(btn) {
  const name    = document.getElementById('fn').value.trim();
  const email   = document.getElementById('fe').value.trim();
  const message = document.getElementById('fm').value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all fields.');
    return;
  }

  btn.textContent = 'Sending…';
  btn.disabled    = true;

  try {
    const res = await fetch('https://formspree.io/f/xjgayelj', {
      method:  'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept':       'application/json'
      },
      body: JSON.stringify({ name, email, message })
    });

    if (res.ok) {
      document.getElementById('fWrap').style.display    = 'none';
      document.getElementById('fSuccess').style.display = 'block';
    } else {
      throw new Error('Server error');
    }
  } catch {
    btn.textContent = 'Send Message →';
    btn.disabled    = false;
    alert('Something went wrong. Please email me directly.');
  }
}


/* ════════════════════════════════════════
   SMOOTH SCROLL for anchor links
════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
