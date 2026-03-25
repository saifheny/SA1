import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getDatabase, ref, push, set, get, update, remove, onValue, child }
    from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAjE-2q6PONBkCin9ZN22gDp9Q8pAH9ZW8",
    authDomain: "story-97cf7.firebaseapp.com",
    databaseURL: "https://story-97cf7-default-rtdb.firebaseio.com",
    projectId: "story-97cf7",
    storageBucket: "story-97cf7.firebasestorage.app",
    messagingSenderId: "742801388214",
    appId: "1:742801388214:web:32a305a8057b0582c5ec17",
    measurementId: "G-9DPPWX7CF0"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const booksRef = ref(db, 'books');

const CATEGORIES = {
    programming: {
        name: 'برمجة',
        icon: 'fas fa-code',
        subcategories: {
            python: 'بايثون',
            html: 'HTML',
            css: 'CSS',
            javascript: 'جافاسكريبت',
            concepts: 'مفاهيم البرمجة',
            ai_fundamentals: 'أساسيات الذكاء الاصطناعي'
        }
    },
    ai: {
        name: 'ذكاء اصطناعي',
        icon: 'fas fa-robot',
        subcategories: {
            ai: 'ذكاء اصطناعي',
            ml: 'تعلم الآلة',
            data_analysis: 'تحليل البيانات',
            deep_learning: 'التعلم العميق',
            nlp: 'معالجة اللغات الطبيعية',
            computer_vision: 'الرؤية الحاسوبية'
        }
    },
    stories: {
        name: 'قصص',
        icon: 'fas fa-feather-alt',
        subcategories: {
            novels: 'روايات',
            short_stories: 'قصص قصيرة',
            sci_fi: 'خيال علمي',
            adventure: 'مغامرات',
            fantasy: 'فانتازيا',
            horror: 'رعب'
        }
    },
    general: {
        name: 'عام',
        icon: 'fas fa-globe',
        subcategories: {
            self_dev: 'تطوير ذاتي',
            science: 'علوم',
            tech: 'تكنولوجيا',
            history: 'تاريخ',
            philosophy: 'فلسفة'
        }
    }
};

const ICON_DATABASE = {
    programming: [
        'fas fa-code', 'fas fa-laptop-code', 'fas fa-terminal', 'fas fa-database',
        'fas fa-server', 'fas fa-microchip', 'fas fa-network-wired', 'fas fa-code-branch',
        'fas fa-bug', 'fas fa-gear', 'fas fa-gears', 'fas fa-file-code',
        'fab fa-python', 'fab fa-js-square', 'fab fa-html5', 'fab fa-css3-alt',
        'fab fa-react', 'fab fa-node-js', 'fab fa-java', 'fab fa-php',
        'fab fa-git-alt', 'fab fa-github', 'fab fa-docker', 'fab fa-linux',
        'fab fa-android', 'fab fa-apple', 'fab fa-windows', 'fab fa-aws',
        'fas fa-cloud', 'fas fa-shield-halved', 'fas fa-lock', 'fas fa-key',
        'fas fa-plug', 'fas fa-cube', 'fas fa-cubes', 'fas fa-sitemap',
        'fab fa-swift', 'fab fa-rust', 'fab fa-golang', 'fab fa-vuejs'
    ],
    ai: [
        'fas fa-robot', 'fas fa-brain', 'fas fa-microchip', 'fas fa-chart-line',
        'fas fa-chart-bar', 'fas fa-chart-pie', 'fas fa-diagram-project',
        'fas fa-network-wired', 'fas fa-eye', 'fas fa-language',
        'fas fa-wand-magic-sparkles', 'fas fa-atom', 'fas fa-dna',
        'fas fa-microscope', 'fas fa-flask', 'fas fa-calculator',
        'fas fa-square-root-variable', 'fas fa-infinity', 'fas fa-magnifying-glass-chart',
        'fas fa-table-cells', 'fas fa-filter', 'fas fa-bolt', 'fas fa-lightbulb',
        'fas fa-puzzle-piece', 'fas fa-gears', 'fas fa-satellite',
        'fas fa-satellite-dish', 'fas fa-wave-square', 'fas fa-project-diagram',
        'fas fa-share-nodes'
    ],
    books: [
        'fas fa-book', 'fas fa-book-open', 'fas fa-book-reader',
        'fas fa-bookmark', 'fas fa-book-atlas', 'fas fa-book-bible',
        'fas fa-book-journal-whills', 'fas fa-book-medical',
        'fas fa-book-open-reader', 'fas fa-book-quran',
        'fas fa-book-skull', 'fas fa-book-tanakh',
        'fas fa-swatchbook', 'fas fa-scroll', 'fas fa-newspaper',
        'fas fa-file-lines', 'fas fa-file-pdf', 'fas fa-graduation-cap',
        'fas fa-chalkboard-user', 'fas fa-school', 'fas fa-pen-fancy',
        'fas fa-pen-nib', 'fas fa-marker', 'fas fa-highlighter',
        'fas fa-spell-check', 'fas fa-glasses'
    ],
    science: [
        'fas fa-atom', 'fas fa-flask', 'fas fa-vial', 'fas fa-microscope',
        'fas fa-dna', 'fas fa-biohazard', 'fas fa-radiation',
        'fas fa-temperature-half', 'fas fa-magnet', 'fas fa-virus',
        'fas fa-bacteria', 'fas fa-disease', 'fas fa-seedling',
        'fas fa-leaf', 'fas fa-tree', 'fas fa-earth-americas',
        'fas fa-earth-africa', 'fas fa-meteor', 'fas fa-moon',
        'fas fa-sun', 'fas fa-star', 'fas fa-rocket',
        'fas fa-satellite', 'fas fa-shuttle-space', 'fas fa-user-astronaut'
    ],
    design: [
        'fas fa-palette', 'fas fa-paintbrush', 'fas fa-pen-ruler',
        'fas fa-bezier-curve', 'fas fa-vector-square', 'fas fa-crop-simple',
        'fas fa-object-group', 'fas fa-object-ungroup', 'fas fa-layer-group',
        'fas fa-eye-dropper', 'fas fa-fill-drip', 'fas fa-wand-magic',
        'fas fa-image', 'fas fa-camera', 'fas fa-film',
        'fas fa-video', 'fas fa-photo-film', 'fas fa-icons',
        'fas fa-shapes', 'fas fa-draw-polygon', 'fas fa-ruler-combined',
        'fas fa-compass-drafting', 'fas fa-swatchbook', 'fab fa-figma',
        'fab fa-sketch'
    ],
    misc: [
        'fas fa-heart', 'fas fa-star', 'fas fa-fire', 'fas fa-bolt',
        'fas fa-crown', 'fas fa-gem', 'fas fa-trophy', 'fas fa-medal',
        'fas fa-award', 'fas fa-certificate', 'fas fa-shield',
        'fas fa-flag', 'fas fa-bell', 'fas fa-envelope',
        'fas fa-comment', 'fas fa-comments', 'fas fa-message',
        'fas fa-hand-sparkles', 'fas fa-hands-clapping',
        'fas fa-thumbs-up', 'fas fa-face-smile', 'fas fa-music',
        'fas fa-headphones', 'fas fa-gamepad', 'fas fa-chess',
        'fas fa-dice', 'fas fa-puzzle-piece', 'fas fa-compass',
        'fas fa-map', 'fas fa-location-dot', 'fas fa-house',
        'fas fa-building', 'fas fa-city', 'fas fa-mountain-sun',
        'fas fa-water', 'fas fa-umbrella', 'fas fa-snowflake',
        'fas fa-cloud-sun', 'fas fa-rainbow', 'fas fa-plane',
        'fas fa-car', 'fas fa-bicycle', 'fas fa-train',
        'fas fa-ship', 'fas fa-helicopter', 'fas fa-utensils',
        'fas fa-mug-hot', 'fas fa-cookie', 'fas fa-pizza-slice',
        'fas fa-burger'
    ]
};

let allBooks = {};
let currentView = 'home';
let currentFilter = 'all';
let selectedBooks = new Set();
let adminTapCount = 0;
let adminTapTimer = null;

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initRouter();
    initEventListeners();
    loadBooks();
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hide');
    }, 1500);
});

function initParticles() {
    const canvas = document.getElementById('particlesCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const count = 40;

    function resize() {
        canvas.width = Math.min(window.innerWidth, 480);
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 0.5,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: (Math.random() - 0.5) * 0.3,
            opacity: Math.random() * 0.4 + 0.1
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(162, 155, 254, ${p.opacity})`;
            ctx.fill();
        });

        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(108, 92, 231, ${0.08 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animate);
    }
    animate();
}

function initRouter() {
    window.addEventListener('hashchange', handleRoute);
    handleRoute();
}

function handleRoute() {
    const hash = window.location.hash || '#home';
    const parts = hash.split('/');
    const route = parts[0];

    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));

    if (route === '#book' && parts[1]) {
        showBookDetail(parts[1]);
    } else if (route === '#admin') {
        showView('adminView');
    } else {
        showView('homeView');
    }
}

function showView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const view = document.getElementById(viewId);
    if (view) {
        view.classList.add('active');
        view.style.animation = 'none';
        void view.offsetHeight;
        view.style.animation = '';
    }
    if (viewId === 'homeView') currentView = 'home';
    if (viewId === 'adminView') currentView = 'admin';
    if (viewId === 'bookDetailView') currentView = 'detail';

    const header = document.getElementById('mainHeader');
    if (viewId === 'homeView') {
        header.style.display = '';
    } else {
        header.style.display = 'none';
    }
}

function initEventListeners() {
    
    document.getElementById('logoArea').addEventListener('click', () => {
        adminTapCount++;
        clearTimeout(adminTapTimer);
        adminTapTimer = setTimeout(() => { adminTapCount = 0; }, 800);
        if (adminTapCount >= 3) {
            adminTapCount = 0;
            window.location.hash = '#admin';
        }
    });

    document.getElementById('searchToggle').addEventListener('click', () => {
        const bar = document.getElementById('searchBar');
        bar.classList.toggle('hidden');
        if (!bar.classList.contains('hidden')) {
            document.getElementById('searchInput').focus();
        }
    });
    document.getElementById('searchClose').addEventListener('click', () => {
        document.getElementById('searchBar').classList.add('hidden');
        document.getElementById('searchInput').value = '';
        renderBooks(allBooks);
    });
    document.getElementById('searchInput').addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        if (!query) { renderBooks(allBooks); return; }
        const filtered = {};
        Object.entries(allBooks).forEach(([id, book]) => {
            if (book.title?.toLowerCase().includes(query) ||
                book.author?.toLowerCase().includes(query) ||
                book.description?.toLowerCase().includes(query)) {
                filtered[id] = book;
            }
        });
        renderBooks(filtered);
    });

    document.getElementById('categoryFilters').addEventListener('click', (e) => {
        const pill = e.target.closest('.filter-pill');
        if (!pill) return;
        document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        currentFilter = pill.dataset.category;
        renderBooks(allBooks);
    });

    document.getElementById('backBtn').addEventListener('click', () => {
        window.location.hash = '#home';
    });
    document.getElementById('adminBackBtn').addEventListener('click', () => {
        window.location.hash = '#home';
    });

    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab + 'Tab').classList.add('active');
            if (tab.dataset.tab === 'myBooks') loadMyBooks();
        });
    });

    document.getElementById('bookCategory').addEventListener('change', (e) => {
        updateSubcategories(e.target.value);
    });

    document.querySelectorAll('.color-swatch').forEach(swatch => {
        swatch.addEventListener('click', () => {
            document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');
        });
    });

    document.getElementById('iconPickerTrigger').addEventListener('click', openIconPicker);
    document.getElementById('iconPickerClose').addEventListener('click', closeIconPicker);

    document.getElementById('iconCategoryTabs').addEventListener('click', (e) => {
        const tab = e.target.closest('.icon-cat-tab');
        if (!tab) return;
        document.querySelectorAll('.icon-cat-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderIcons(tab.dataset.cat);
    });

    document.getElementById('iconSearchInput').addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase();
        const activeTab = document.querySelector('.icon-cat-tab.active').dataset.cat;
        renderIcons(activeTab, q);
    });

    document.getElementById('bookForm').addEventListener('submit', handleBookSubmit);

    document.getElementById('selectAllBtn').addEventListener('click', toggleSelectAll);
    document.getElementById('deleteSelectedBtn').addEventListener('click', deleteSelected);

    document.getElementById('downloadModalClose').addEventListener('click', closeDownloadModal);
    document.getElementById('step1Next').addEventListener('click', () => goToDownloadStep(2));
    document.getElementById('step2Next').addEventListener('click', () => goToDownloadStep(3));

    document.getElementById('confirmDeleteNo').addEventListener('click', closeConfirmDelete);

    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
            document.body.classList.remove('modal-open');
        });
    });
}

function loadBooks() {
    onValue(booksRef, (snapshot) => {
        allBooks = snapshot.val() || {};
        renderBooks(allBooks);
    });
}

function renderBooks(books) {
    const grid = document.getElementById('booksGrid');
    const empty = document.getElementById('emptyState');
    grid.innerHTML = '';

    let filtered = Object.entries(books);

    if (currentFilter !== 'all') {
        filtered = filtered.filter(([_, b]) => b.category === currentFilter);
    }

    if (filtered.length === 0) {
        empty.classList.remove('hidden');
        return;
    }
    empty.classList.add('hidden');

    filtered.forEach(([id, book], index) => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.style.animationDelay = `${index * 0.05}s`;
        card.addEventListener('click', () => {
            window.location.hash = `#book/${id}`;
        });

        const catName = CATEGORIES[book.category]?.name || book.category;
        const coverColor = book.coverColor || '#6C5CE7';

        card.innerHTML = `
            <div class="book-cover" style="background: linear-gradient(135deg, ${coverColor}, ${adjustColor(coverColor, -30)})">
                <span class="book-cover-category">${catName}</span>
                <i class="${book.icon || 'fas fa-book'} book-cover-icon"></i>
                <span class="book-cover-title">${book.title}</span>
                ${book.author ? `<span class="book-card-author">${book.author}</span>` : ''}
            </div>
        `;
        grid.appendChild(card);
    });
}

function showBookDetail(bookId) {
    showView('bookDetailView');
    const content = document.getElementById('bookDetailContent');

    const book = allBooks[bookId];
    if (!book) {
        content.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-circle empty-icon"></i>
                <p>الكتاب ده مش موجود</p>
            </div>
        `;
        return;
    }

    const catName = CATEGORIES[book.category]?.name || book.category;
    const subCatName = CATEGORIES[book.category]?.subcategories?.[book.subcategory] || book.subcategory || '';
    const coverColor = book.coverColor || '#6C5CE7';
    const siteUrl = window.location.origin + window.location.pathname;
    const bookLink = `${siteUrl}#book/${bookId}`;

    content.innerHTML = `
        <div class="book-detail-3d">
            <div class="book-3d-wrapper">
                <div class="book-3d-front" style="background: linear-gradient(135deg, ${coverColor}, ${adjustColor(coverColor, -40)})">
                    <i class="${book.icon || 'fas fa-book'} book-3d-icon"></i>
                    <span class="book-3d-title">${book.title}</span>
                </div>
                <div class="book-3d-side" style="background: ${adjustColor(coverColor, -50)}"></div>
            </div>
        </div>
        <div class="book-detail-info">
            <h2 class="book-detail-title">${book.title}</h2>
            ${book.author ? `
                <div class="book-detail-author">
                    <i class="fas fa-user-pen"></i> ${book.author}
                </div>
            ` : ''}
            <div class="book-detail-meta">
                <span class="meta-tag"><i class="fas fa-folder"></i> ${catName}</span>
                ${subCatName ? `<span class="meta-tag"><i class="fas fa-tag"></i> ${subCatName}</span>` : ''}
            </div>
            ${book.description ? `
                <div class="book-detail-desc">${book.description}</div>
            ` : ''}
            <div class="book-detail-actions">
                <button class="action-btn download-action-btn" id="downloadBookBtn">
                    <i class="fas fa-download"></i> تحميل
                </button>
                <button class="action-btn share-action-btn" id="shareBookBtn">
                    <i class="fas fa-share-nodes"></i> مشاركة
                </button>
            </div>
            <div class="book-detail-unique-link">
                <input type="text" readonly value="${bookLink}" id="bookUniqueLink">
                <button id="copyLinkBtn"><i class="fas fa-copy"></i> نسخ</button>
            </div>
        </div>
    `;

    document.getElementById('downloadBookBtn').addEventListener('click', () => {
        openDownloadModal(book);
    });

    document.getElementById('shareBookBtn').addEventListener('click', () => {
        shareBook(book, bookLink);
    });

    document.getElementById('copyLinkBtn').addEventListener('click', () => {
        const input = document.getElementById('bookUniqueLink');
        input.select();
        navigator.clipboard.writeText(input.value).then(() => {
            showToast('تم نسخ اللينك!', 'success');
        }).catch(() => {
            document.execCommand('copy');
            showToast('تم نسخ اللينك!', 'success');
        });
    });
}

function shareBook(book, link) {
    const shareData = {
        title: book.title,
        text: `📚 ${book.title}${book.author ? ' - ' + book.author : ''}\nحمّل الكتاب من هنا:`,
        url: link
    };

    if (navigator.share) {
        navigator.share(shareData).catch(() => {});
    } else {
        navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`).then(() => {
            showToast('تم نسخ رابط المشاركة!', 'success');
        }).catch(() => {
            showToast('مقدرش أنسخ اللينك', 'error');
        });
    }
}

let currentDownloadBook = null;
let adTimerInterval = null;

function openDownloadModal(book) {
    currentDownloadBook = book;
    const modal = document.getElementById('downloadModal');
    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');

    const fbLink = document.getElementById('facebookPageLink');
    fbLink.href = book.facebookPageLink || 'https://facebook.com';

    goToDownloadStep(1);
}

function closeDownloadModal() {
    document.getElementById('downloadModal').classList.add('hidden');
    document.body.classList.remove('modal-open');
    clearInterval(adTimerInterval);
    currentDownloadBook = null;
}

function goToDownloadStep(step) {
    document.querySelectorAll('.download-step').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.step-dot').forEach(d => d.classList.remove('active'));

    document.getElementById(`downloadStep${step}`).classList.add('active');
    document.querySelector(`.step-dot[data-step="${step}"]`).classList.add('active');

    if (step === 3) {
        startAdCountdown();
    }
}

function startAdCountdown() {
    const timerEl = document.getElementById('adTimer');
    const progressBar = document.getElementById('adProgressBar');
    const adContainer = document.getElementById('adContainer');
    const downloadReady = document.getElementById('downloadReady');
    let seconds = 10;

    adContainer.style.display = '';
    downloadReady.classList.add('hidden');
    progressBar.style.width = '0%';
    timerEl.textContent = seconds;

    clearInterval(adTimerInterval);
    adTimerInterval = setInterval(() => {
        seconds--;
        timerEl.textContent = seconds;
        progressBar.style.width = `${((10 - seconds) / 10) * 100}%`;

        if (seconds <= 0) {
            clearInterval(adTimerInterval);
            adContainer.style.display = 'none';
            downloadReady.classList.remove('hidden');

            if (currentDownloadBook) {
                document.getElementById('finalDownloadLink').href = currentDownloadBook.downloadLink || '#';
            }
        }
    }, 1000);
}

function updateSubcategories(category) {
    const subSelect = document.getElementById('bookSubcategory');
    subSelect.innerHTML = '<option value="">اختار التصنيف الفرعي</option>';

    if (CATEGORIES[category]) {
        Object.entries(CATEGORIES[category].subcategories).forEach(([key, name]) => {
            const opt = document.createElement('option');
            opt.value = key;
            opt.textContent = name;
            subSelect.appendChild(opt);
        });
    }
}

function openIconPicker() {
    document.getElementById('iconPickerModal').classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.getElementById('iconSearchInput').value = '';
    document.querySelectorAll('.icon-cat-tab').forEach(t => t.classList.remove('active'));
    document.querySelector('.icon-cat-tab[data-cat="all"]').classList.add('active');
    renderIcons('all');
}

function closeIconPicker() {
    document.getElementById('iconPickerModal').classList.add('hidden');
    document.body.classList.remove('modal-open');
}

function renderIcons(category, searchQuery = '') {
    const grid = document.getElementById('iconGrid');
    grid.innerHTML = '';
    const currentIcon = document.getElementById('bookIcon').value;

    let icons = [];
    if (category === 'all') {
        Object.values(ICON_DATABASE).forEach(arr => icons.push(...arr));
        icons = [...new Set(icons)];
    } else {
        icons = ICON_DATABASE[category] || [];
    }

    if (searchQuery) {
        icons = icons.filter(icon => icon.toLowerCase().includes(searchQuery));
    }

    icons.forEach(icon => {
        const item = document.createElement('div');
        item.className = `icon-grid-item${icon === currentIcon ? ' selected' : ''}`;
        item.innerHTML = `<i class="${icon}"></i>`;
        item.addEventListener('click', () => {
            document.getElementById('bookIcon').value = icon;
            document.getElementById('selectedIconPreview').className = icon;
            document.querySelectorAll('.icon-grid-item').forEach(i => i.classList.remove('selected'));
            item.classList.add('selected');
            closeIconPicker();
        });
        grid.appendChild(item);
    });
}

async function handleBookSubmit(e) {
    e.preventDefault();

    const editId = document.getElementById('editBookId').value;
    const title = document.getElementById('bookTitle').value.trim();
    const author = document.getElementById('bookAuthor').value.trim();
    const description = document.getElementById('bookDescription').value.trim();
    const downloadLink = document.getElementById('bookLink').value.trim();
    const facebookPageLink = document.getElementById('facebookLink').value.trim();
    const category = document.getElementById('bookCategory').value;
    const subcategory = document.getElementById('bookSubcategory').value;
    const icon = document.getElementById('bookIcon').value;
    const coverColor = document.querySelector('.color-swatch.active')?.dataset.color || '#6C5CE7';

    if (!title || !downloadLink || !category) {
        showToast('كمّل البيانات المطلوبة', 'error');
        return;
    }

    const bookData = {
        title,
        author,
        description,
        downloadLink,
        facebookPageLink,
        category,
        subcategory,
        icon,
        coverColor,
        updatedAt: Date.now()
    };

    try {
        if (editId) {
            await update(ref(db, `books/${editId}`), bookData);
            showToast('تم تعديل الكتاب بنجاح!', 'success');
            document.getElementById('editBookId').value = '';
            document.getElementById('submitBtn').innerHTML = '<i class="fas fa-plus-circle"></i> إضافة الكتاب';
        } else {
            bookData.createdAt = Date.now();
            await push(booksRef, bookData);
            showToast('تم إضافة الكتاب بنجاح!', 'success');
        }
        document.getElementById('bookForm').reset();
        document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
        document.querySelector('.color-swatch[data-color="#6C5CE7"]').classList.add('active');
        document.getElementById('bookIcon').value = 'fas fa-book';
        document.getElementById('selectedIconPreview').className = 'fas fa-book';
        document.getElementById('bookSubcategory').innerHTML = '<option value="">اختار التصنيف الفرعي</option>';
    } catch (err) {
        showToast('حصل مشكلة: ' + err.message, 'error');
    }
}

function loadMyBooks() {
    const list = document.getElementById('myBooksList');
    const empty = document.getElementById('myBooksEmpty');
    list.innerHTML = '';
    selectedBooks.clear();
    updateDeleteBtn();

    const entries = Object.entries(allBooks);
    if (entries.length === 0) {
        empty.classList.remove('hidden');
        return;
    }
    empty.classList.add('hidden');

    entries.forEach(([id, book], index) => {
        const item = document.createElement('div');
        item.className = 'my-book-item';
        item.style.animationDelay = `${index * 0.05}s`;
        item.dataset.id = id;

        const catName = CATEGORIES[book.category]?.name || book.category;

        item.innerHTML = `
            <div class="my-book-checkbox" data-id="${id}"></div>
            <div class="my-book-icon" style="background: ${book.coverColor || '#6C5CE7'}">
                <i class="${book.icon || 'fas fa-book'}"></i>
            </div>
            <div class="my-book-info">
                <div class="my-book-title">${book.title}</div>
                <div class="my-book-category">${catName}</div>
            </div>
            <div class="my-book-actions">
                <button class="my-book-action-btn edit" data-id="${id}" title="تعديل">
                    <i class="fas fa-pen"></i>
                </button>
                <button class="my-book-action-btn delete" data-id="${id}" title="حذف">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;

        item.querySelector('.my-book-checkbox').addEventListener('click', (e) => {
            e.stopPropagation();
            toggleBookSelect(id, item);
        });

        item.querySelector('.edit').addEventListener('click', (e) => {
            e.stopPropagation();
            editBook(id, book);
        });

        item.querySelector('.delete').addEventListener('click', (e) => {
            e.stopPropagation();
            confirmDelete([id]);
        });

        list.appendChild(item);
    });
}

function toggleBookSelect(id, item) {
    const checkbox = item.querySelector('.my-book-checkbox');
    if (selectedBooks.has(id)) {
        selectedBooks.delete(id);
        checkbox.classList.remove('checked');
        item.classList.remove('selected');
    } else {
        selectedBooks.add(id);
        checkbox.classList.add('checked');
        item.classList.add('selected');
    }
    updateDeleteBtn();
}

function toggleSelectAll() {
    const items = document.querySelectorAll('.my-book-item');
    const allSelected = selectedBooks.size === items.length;

    items.forEach(item => {
        const id = item.dataset.id;
        const checkbox = item.querySelector('.my-book-checkbox');
        if (allSelected) {
            selectedBooks.delete(id);
            checkbox.classList.remove('checked');
            item.classList.remove('selected');
        } else {
            selectedBooks.add(id);
            checkbox.classList.add('checked');
            item.classList.add('selected');
        }
    });
    updateDeleteBtn();
}

function updateDeleteBtn() {
    const btn = document.getElementById('deleteSelectedBtn');
    if (selectedBooks.size > 0) {
        btn.classList.remove('hidden');
        btn.innerHTML = `<i class="fas fa-trash-alt"></i> حذف (${selectedBooks.size})`;
    } else {
        btn.classList.add('hidden');
    }
}

function deleteSelected() {
    if (selectedBooks.size === 0) return;
    confirmDelete([...selectedBooks]);
}

function editBook(id, book) {
    document.getElementById('editBookId').value = id;
    document.getElementById('bookTitle').value = book.title || '';
    document.getElementById('bookAuthor').value = book.author || '';
    document.getElementById('bookDescription').value = book.description || '';
    document.getElementById('bookLink').value = book.downloadLink || '';
    document.getElementById('facebookLink').value = book.facebookPageLink || '';
    document.getElementById('bookCategory').value = book.category || '';
    updateSubcategories(book.category);
    document.getElementById('bookSubcategory').value = book.subcategory || '';
    document.getElementById('bookIcon').value = book.icon || 'fas fa-book';
    document.getElementById('selectedIconPreview').className = book.icon || 'fas fa-book';

    document.querySelectorAll('.color-swatch').forEach(s => {
        s.classList.toggle('active', s.dataset.color === (book.coverColor || '#6C5CE7'));
    });

    document.getElementById('submitBtn').innerHTML = '<i class="fas fa-pen"></i> تعديل الكتاب';

    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('active'));
    document.querySelector('.admin-tab[data-tab="addBook"]').classList.add('active');
    document.getElementById('addBookTab').classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('عدّل البيانات واضغط تعديل', 'success');
}

let deleteTargetIds = [];

function confirmDelete(ids) {
    deleteTargetIds = ids;
    const modal = document.getElementById('confirmDeleteModal');
    const msg = document.getElementById('confirmDeleteMsg');

    if (ids.length === 1) {
        const book = allBooks[ids[0]];
        msg.textContent = `هتحذف "${book?.title || 'الكتاب'}" - الحذف مش هيترجع`;
    } else {
        msg.textContent = `هتحذف ${ids.length} كتب - الحذف مش هيترجع`;
    }

    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');

    document.getElementById('confirmDeleteYes').onclick = async () => {
        try {
            const updates = {};
            ids.forEach(id => { updates[`books/${id}`] = null; });
            await update(ref(db), updates);
            showToast(`تم حذف ${ids.length > 1 ? ids.length + ' كتب' : 'الكتاب'} بنجاح`, 'success');
            selectedBooks.clear();
            updateDeleteBtn();
            loadMyBooks();
        } catch (err) {
            showToast('حصل مشكلة في الحذف', 'error');
        }
        closeConfirmDelete();
    };
}

function closeConfirmDelete() {
    document.getElementById('confirmDeleteModal').classList.add('hidden');
    document.body.classList.remove('modal-open');
    deleteTargetIds = [];
}

function showToast(message, type = '') {
    const toast = document.getElementById('toast');
    let icon = '';
    if (type === 'success') icon = '<i class="fas fa-check-circle"></i>';
    if (type === 'error') icon = '<i class="fas fa-exclamation-circle"></i>';

    toast.className = `toast ${type}`;
    toast.innerHTML = `${icon} ${message}`;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function adjustColor(hex, amount) {
    hex = hex.replace('#', '');
    let r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
    let g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
    let b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}
