/* =============================================
   Navigation: scroll shadow + mobile toggle
   ============================================= */
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav__links');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* =============================================
   Scroll Reveal
   ============================================= */
const revealTargets = document.querySelectorAll(
  '.about__grid, .skill-card, .project-card, .contact__inner, .section__title'
);

revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        // Stagger siblings inside a grid
        const siblings = entry.target.parentElement.querySelectorAll('.reveal');
        siblings.forEach((sibling, i) => {
          sibling.style.transitionDelay = `${i * 80}ms`;
        });
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
);

revealTargets.forEach(el => revealObserver.observe(el));

/* =============================================
   Active nav link on scroll
   ============================================= */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__links a');

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => {
          a.style.color = '';
          if (a.getAttribute('href') === `#${entry.target.id}`) {
            a.style.color = 'var(--color-accent)';
          }
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => sectionObserver.observe(s));

/* =============================================
   Typing cursor effect on hero tagline
   ============================================= */
const tagline = document.querySelector('.hero__tagline');
if (tagline) {
  const text = tagline.textContent;
  tagline.textContent = '';
  tagline.style.borderRight = '3px solid var(--color-accent)';
  tagline.style.paddingRight = '4px';

  let i = 0;
  const type = () => {
    if (i <= text.length) {
      tagline.textContent = text.slice(0, i);
      i++;
      setTimeout(type, 50);
    } else {
      // Blink then remove cursor
      let blinks = 0;
      const blink = setInterval(() => {
        tagline.style.borderRight = blinks % 2 === 0
          ? '3px solid transparent'
          : '3px solid var(--color-accent)';
        blinks++;
        if (blinks >= 6) {
          clearInterval(blink);
          tagline.style.borderRight = 'none';
          tagline.style.paddingRight = '0';
        }
      }, 400);
    }
  };

  // Start typing after a short delay
  setTimeout(type, 600);
}
