document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    const searchInput = document.getElementById('docSearch');
    const categoryFilter = document.getElementById('docFilter');
    const docsList = document.getElementById('docsList');
    const noResults = document.getElementById('noResults');

    if (docsList && searchInput && categoryFilter) {
        function filterDocs() {
            const query = searchInput.value.toLowerCase().trim();
            const category = categoryFilter.value;
            const rows = docsList.querySelectorAll('tr');
            let visibleCount = 0;
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                const rowCat = row.getAttribute('data-category') || '';
                const matchesSearch = text.includes(query);
                const matchesCategory = category === 'all' || rowCat === category;
                if (matchesSearch && matchesCategory) { row.style.display = ''; visibleCount++; }
                else { row.style.display = 'none'; }
            });
            noResults.style.display = visibleCount === 0 ? 'block' : 'none';
        }
        searchInput.addEventListener('input', filterDocs);
        categoryFilter.addEventListener('change', filterDocs);
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const statusEl = document.getElementById('formStatus');
            const name = document.getElementById('name').value.trim();
            const rank = document.getElementById('rank').value.trim();
            const msg = document.getElementById('message').value.trim();

            if (!name || !rank || !msg) {
                statusEl.textContent = '⚠️ Заполните все поля!';
                statusEl.className = 'form-status error';
                return;
            }

            const btn = this.querySelector('button[type="submit"]');
            btn.textContent = 'Отправка...';
            btn.disabled = true;

            setTimeout(() => {
                statusEl.textContent = '✅ Обращение успешно отправлено!';
                statusEl.className = 'form-status success';
                contactForm.reset();
                btn.textContent = 'Отправить обращение';
                btn.disabled = false;
            }, 1500);
        });
    }

    const accordions = document.querySelectorAll('.accordion-item');
    accordions.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

    console.log('✅ FSBRMRP Site Loaded');
});

function copyDiscord(element, handle) {
    navigator.clipboard.writeText(handle).then(() => {
        const hint = element.querySelector('.discord-hint');
        const originalText = hint ? hint.textContent : '';

        if (hint) {
            hint.textContent = '✓ Скопировано!';
            hint.style.color = '#4caf50';
        }
        element.style.borderColor = '#4caf50';
        element.style.boxShadow = '0 0 15px rgba(76, 175, 80, 0.4)';

        setTimeout(() => {
            if (hint) {
                hint.textContent = originalText || 'Нажми, чтобы скопировать';
                hint.style.color = '#c0c0c0';
            }
            element.style.borderColor = '#d4af37';
            element.style.boxShadow = '';
        }, 2000);
    }).catch(() => {

        const tempInput = document.createElement('textarea');
        tempInput.value = handle;
        tempInput.style.position = 'absolute';
        tempInput.style.left = '-9999px';
        document.body.appendChild(tempInput);
        tempInput.select();
        try {
            document.execCommand('copy');
        } catch (err) { console.error(err); }
        document.body.removeChild(tempInput);
    });
}