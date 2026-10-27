/**
 * ==============================================================================
 * PRITY RANI DAS - MINIMALIST IVY LEAGUE ACADEMIC INTERACTION LOGIC
 * Features: Light/Dark Theme, Thesis Abstract Toggle,
 * BibTeX Citation Modal, and Form Handling.
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Default: Clean Minimal Light)
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const htmlRoot = document.documentElement;

  const savedTheme = localStorage.getItem('prity-portfolio-theme') || 'light';
  setTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
    });
  }

  function setTheme(theme) {
    htmlRoot.setAttribute('data-theme', theme);
    localStorage.setItem('prity-portfolio-theme', theme);
    if (themeIcon) {
      if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      }
    }
  }

  // 2. Thesis Abstract Toggle
  const toggleThesisAbsBtn = document.getElementById('toggle-thesis-abs-btn');
  const thesisAbstract = document.getElementById('thesis-abstract');
  if (toggleThesisAbsBtn && thesisAbstract) {
    toggleThesisAbsBtn.addEventListener('click', () => {
      thesisAbstract.classList.toggle('open');
      const isOpen = thesisAbstract.classList.contains('open');
      toggleThesisAbsBtn.innerHTML = isOpen
        ? `<i class="fa-solid fa-chevron-up"></i> <span>Hide Abstract</span>`
        : `<i class="fa-solid fa-align-left"></i> <span>Read Abstract</span>`;
    });
  }

  // 3. BibTeX Citation Generator & Modal
  const bibtexModal = document.getElementById('bibtex-modal');
  const bibtexText = document.getElementById('bibtex-text');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalCancelBtn = document.getElementById('modal-cancel-btn');
  const modalCopyBtn = document.getElementById('modal-copy-btn');
  const citeBtns = document.querySelectorAll('.cite-btn');

  citeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-title');
      const author = btn.getAttribute('data-author');
      const year = btn.getAttribute('data-year');
      const id = btn.getAttribute('data-id');

      const bibtex = `@thesis{${id},
  title={${title}},
  author={${author} and others},
  institution={Institute of Information Technology, Noakhali Science and Technology University},
  year={${year}},
  url={https://github.com/prityd825/Polyp-Segmentation}
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
    if (bibtexModal) bibtexModal.classList.remove('open');
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
            showToast('BibTeX citation copied to clipboard');
            closeModal();
          })
          .catch(() => {
            showToast('Please manually copy the citation snippet');
          });
      }
    });
  }

  // 4. Contact Form Dispatcher (Mailto Fallback)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('sender-name')?.value || '';
      const email = document.getElementById('sender-email')?.value || '';
      const subject = document.getElementById('sender-subject')?.value || '';
      const message = document.getElementById('sender-message')?.value || '';

      const mailtoUrl = `mailto:prity.rani.das@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;

      showToast('Opening default email application...');
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 700);
    });
  }

  // 5. Toast Notification
  function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }
});
