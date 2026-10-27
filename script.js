/**
 * ==============================================================================
 * PRITY RANI DAS - ACADEMIC PORTFOLIO INTERACTIVE LOGIC
 * Features: Dark/Light Mode, Filterable Papers, Abstract Toggling,
 * BibTeX Citation Modal, Smooth Scroll, and Contact Dispatch.
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Dark / Light Theme with localStorage persistence)
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const htmlRoot = document.documentElement;

  const savedTheme = localStorage.getItem('prity-portfolio-theme') || 'dark';
  setTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
    });
  }

  function setTheme(theme) {
    htmlRoot.setAttribute('data-theme', theme);
    localStorage.setItem('prity-portfolio-theme', theme);
    if (themeIcon) {
      if (theme === 'dark') {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      } else {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      }
    }
  }

  // 2. Navbar Scroll Glass Effect & Active Link Tracking
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // ScrollSpy for Active Links
    let currentSection = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSection = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // 3. Mobile Navigation Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const menuIcon = document.getElementById('menu-icon');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      if (navMenu.classList.contains('open')) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-xmark');
      } else {
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-bars');
      }
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        if (menuIcon) {
          menuIcon.classList.remove('fa-xmark');
          menuIcon.classList.add('fa-bars');
        }
      });
    });
  }

  // 4. Research Publications Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const pubCards = document.querySelectorAll('.pub-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      pubCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'grid';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 5. Toggle Abstract Expansion
  const toggleAbstractBtns = document.querySelectorAll('.toggle-abstract-btn');
  toggleAbstractBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const abstractEl = document.getElementById(targetId);
      if (abstractEl) {
        abstractEl.classList.toggle('show');
        const isShown = abstractEl.classList.contains('show');
        btn.innerHTML = isShown 
          ? `<i class="fa-solid fa-chevron-up"></i> <span>Hide Abstract</span>`
          : `<i class="fa-solid fa-align-left"></i> <span>Toggle Abstract</span>`;
      }
    });
  });

  // 6. BibTeX Citation Modal & Copy to Clipboard
  const bibtexModal = document.getElementById('bibtex-modal');
  const bibtexText = document.getElementById('bibtex-text');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalCancelBtn = document.getElementById('modal-cancel-btn');
  const modalCopyBtn = document.getElementById('modal-copy-btn');
  const citeButtons = document.querySelectorAll('.copy-bibtex-btn');

  citeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-title');
      const author = btn.getAttribute('data-author');
      const year = btn.getAttribute('data-year');
      const id = btn.getAttribute('data-id');

      const bibtex = `@article{${id},
  title={${title}},
  author={${author} and others},
  journal={Official Implementation & Research Manuscript},
  year={${year}},
  url={https://github.com/prityd825}
}`;

      if (bibtexText) {
        bibtexText.textContent = bibtex;
      }
      if (bibtexModal) {
        bibtexModal.classList.add('open');
      }
    });
  });

  function closeModal() {
    if (bibtexModal) {
      bibtexModal.classList.remove('open');
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalCancelBtn) modalCancelBtn.addEventListener('click', closeModal);
  if (bibtexModal) {
    bibtexModal.addEventListener('click', (e) => {
      if (e.target === bibtexModal) closeModal();
    });
  }

  if (modalCopyBtn) {
    modalCopyBtn.addEventListener('click', () => {
      if (bibtexText) {
        navigator.clipboard.writeText(bibtexText.textContent)
          .then(() => {
            showToast('BibTeX copied to clipboard!');
            closeModal();
          })
          .catch(() => {
            showToast('Failed to copy. Please manually copy the text.');
          });
      }
    });
  }

  // 7. Interactive Contact Form Dispatch
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('sender-name')?.value || '';
      const email = document.getElementById('sender-email')?.value || '';
      const subject = document.getElementById('sender-subject')?.value || '';
      const message = document.getElementById('sender-message')?.value || '';

      // Prepare mailto link as direct client fallback
      const mailtoUrl = `mailto:prity.rani.das@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
      
      showToast('Opening your email client to dispatch message...');
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 700);
    });
  }

  // 8. Toast Feedback Utility
  function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
});
