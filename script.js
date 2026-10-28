// ===== 1. Hamburger цэс =====
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    menuToggle.classList.toggle('active', open);
    menuToggle.setAttribute('aria-expanded', open);
});

// ===== 2. Dark mode (theme товч) =====
const themeToggle = document.getElementById('themeToggle');
const themeLabel = document.getElementById('themeLabel');

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const dark = theme === 'dark';
    themeToggle.setAttribute('aria-pressed', dark);
    themeLabel.textContent = dark ? 'Өдөр' : 'Шөнө';
}

let savedTheme = null;
try { savedTheme = localStorage.getItem('theme'); } catch (e) {}

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

themeToggle.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem('theme', next); } catch (e) {}
});

// ===== 3. Flip товч (3D flip card) =====
document.querySelectorAll('.flip-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const card = document.getElementById(btn.getAttribute('aria-controls'));
        const flipped = card.classList.toggle('is-flipped');
        btn.setAttribute('aria-pressed', flipped);
        btn.textContent = flipped ? 'Буцаах' : 'Эргүүлэх';
    });
});

// ===== 4. Харагдац сонгогч (iframe урьдчилан харах) =====
if (window.self !== window.top) {
    document.body.classList.add('in-frame');
}

const vsButtons = document.querySelectorAll('#viewSwitcher button');
const overlay = document.getElementById('previewOverlay');
const frame = document.getElementById('previewFrame');

vsButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        vsButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const view = btn.dataset.view;

        if (view === 'auto') {
            overlay.hidden = true;
            frame.removeAttribute('src');
            return;
        }
        frame.style.width = view + 'px';
        if (!frame.getAttribute('src')) {
            frame.src = location.href.split('#')[0];
        }
        overlay.hidden = false;
    });
});
