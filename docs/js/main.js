/**
 * Wisdom Theme — Lightweight Documentation & Showcase Script
 * High performance, zero external dependencies.
 */

// Setup Copy Buttons Functionality
function setupCopyButtons() {
  document.querySelectorAll('[data-copy-target]').forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-copy-target');
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      const textToCopy = (targetEl.innerText || targetEl.textContent).trim();
      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalHtml = button.innerHTML;
        button.innerHTML = `<span>✓</span> <span>Copied!</span>`;
        button.classList.add('copied');
        setTimeout(() => {
          button.innerHTML = originalHtml;
          button.classList.remove('copied');
        }, 2200);
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    });
  });
}

// Config Reference Table Search / Filter
function setupTableFilter() {
  const filterInput = document.getElementById('config-search');
  if (!filterInput) return;

  filterInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const rows = document.querySelectorAll('#config-table tbody tr');
    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(query) ? '' : 'none';
    });
  });
}

// Mobile Menu Navigation Toggle
function setupMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('primary-nav');
  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
    });
  });
}

// Initialize on DOM Ready
window.addEventListener('DOMContentLoaded', () => {
  setupCopyButtons();
  setupTableFilter();
  setupMobileMenu();
});
