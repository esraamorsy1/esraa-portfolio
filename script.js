/* ═══════════════════════════════════════════════════
   PORTFOLIO SCRIPT — Esraa Mohamed
   Premium Dark Theme — Full Interactive Build
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initTypedText();
    initScrollReveal();
    initNavbar();
    initSmoothScroll();
    initCounterAnimation();
    initSkillBars();
    initUploadModal();
    initCVUpload();
    initCertUpload();
    initEditMode();
    initContactForm();
    initBackToTop();
    loadSavedEdits();
});

/* ═══════════════════════════════════════════════════
   1. PARTICLE CANVAS BACKGROUND
   ═══════════════════════════════════════════════════ */
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    const PARTICLE_COUNT = 60;
    const CONNECTION_DIST = 120;
    let animationId;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(124, 58, 237, ${this.opacity})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONNECTION_DIST) {
                    const opacity = (1 - dist / CONNECTION_DIST) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(124, 58, 237, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        animationId = requestAnimationFrame(animate);
    }
    animate();
}

/* ═══════════════════════════════════════════════════
   2. TYPED TEXT EFFECT
   ═══════════════════════════════════════════════════ */
function initTypedText() {
    const el = document.getElementById('typed-text');
    if (!el) return;

    const titles = [
        'AI Engineer',
        'Data Scientist',
        'ML Engineer',
        'Problem Solver'
    ];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 80;
    const deleteSpeed = 50;
    const pauseEnd = 2000;
    const pauseStart = 500;

    function type() {
        const current = titles[titleIndex];

        if (!isDeleting) {
            el.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === current.length) {
                isDeleting = true;
                setTimeout(type, pauseEnd);
                return;
            }
            setTimeout(type, typeSpeed);
        } else {
            el.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
                setTimeout(type, pauseStart);
                return;
            }
            setTimeout(type, deleteSpeed);
        }
    }
    setTimeout(type, 600);
}

/* ═══════════════════════════════════════════════════
   3. SCROLL REVEAL ANIMATIONS
   ═══════════════════════════════════════════════════ */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger delay based on element position within its parent
                const delay = Array.from(entry.target.parentElement.children)
                    .filter(el => el.classList.contains('reveal-up') ||
                        el.classList.contains('reveal-left') ||
                        el.classList.contains('reveal-right'))
                    .indexOf(entry.target) * 100;

                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, Math.min(delay, 400));

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

/* ═══════════════════════════════════════════════════
   4. NAVBAR — Scroll spy & hamburger
   ═══════════════════════════════════════════════════ */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    // Scroll — add "scrolled" class
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active section highlighting
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Hamburger toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when link clicked (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

/* ═══════════════════════════════════════════════════
   5. SMOOTH SCROLL
   ═══════════════════════════════════════════════════ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

/* ═══════════════════════════════════════════════════
   6. COUNTER ANIMATION (About stats)
   ═══════════════════════════════════════════════════ */
function initCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                statNumbers.forEach(el => {
                    const target = parseInt(el.dataset.target);
                    const duration = 2000;
                    const start = performance.now();

                    function update(now) {
                        const elapsed = now - start;
                        const progress = Math.min(elapsed / duration, 1);
                        // Ease-out cubic
                        const eased = 1 - Math.pow(1 - progress, 3);
                        el.textContent = Math.round(target * eased);

                        if (progress < 1) {
                            requestAnimationFrame(update);
                        } else {
                            el.textContent = target;
                        }
                    }
                    requestAnimationFrame(update);
                });
            }
        });
    }, { threshold: 0.5 });

    const aboutSection = document.querySelector('.about-stats');
    if (aboutSection) observer.observe(aboutSection);
}

/* ═══════════════════════════════════════════════════
   7. SKILL BARS ANIMATION
   ═══════════════════════════════════════════════════ */
function initSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll('.skill-item');
                items.forEach((item, i) => {
                    const level = item.dataset.level;
                    const fill = item.querySelector('.skill-fill');
                    if (fill) {
                        setTimeout(() => {
                            fill.style.width = `${level}%`;
                        }, i * 150);
                    }
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.skill-category').forEach(cat => observer.observe(cat));
}

/* ═══════════════════════════════════════════════════
   8. UPLOAD MODAL
   ═══════════════════════════════════════════════════ */
function initUploadModal() {
    const fabUpload = document.getElementById('fab-upload');
    const modal = document.getElementById('upload-modal');
    const modalClose = document.getElementById('modal-close');

    if (!fabUpload || !modal) return;

    fabUpload.addEventListener('click', () => {
        modal.classList.add('active');
    });

    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modal.classList.remove('active');
        }
    });
}

/* ═══════════════════════════════════════════════════
   9. CV UPLOAD & PARSING
   ═══════════════════════════════════════════════════ */
function initCVUpload() {
    const dropZone = document.getElementById('cv-drop-zone');
    const fileInput = document.getElementById('cv-file-input');
    const status = document.getElementById('cv-status');

    if (!dropZone || !fileInput) return;

    // Drag & drop
    ['dragenter', 'dragover'].forEach(evt => {
        dropZone.addEventListener(evt, (e) => {
            e.preventDefault();
            dropZone.classList.add('drag-over');
        });
    });

    ['dragleave', 'drop'].forEach(evt => {
        dropZone.addEventListener(evt, (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
        });
    });

    dropZone.addEventListener('drop', (e) => {
        const file = e.dataTransfer.files[0];
        if (file) handleCVFile(file);
    });

    dropZone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', () => {
        if (fileInput.files[0]) handleCVFile(fileInput.files[0]);
    });

    async function handleCVFile(file) {
        status.textContent = '⏳ Parsing CV...';
        status.style.color = '#06b6d4';

        try {
            let text = '';
            if (file.type === 'application/pdf') {
                text = await parsePDF(file);
            } else if (file.name.endsWith('.docx')) {
                text = await parseDOCX(file);
            } else {
                status.textContent = '❌ Unsupported file type. Use PDF or DOCX.';
                status.style.color = '#ef4444';
                return;
            }

            if (text.trim().length < 20) {
                status.textContent = '⚠️ Could not extract enough text from CV.';
                status.style.color = '#f59e0b';
                return;
            }

            populateFromCV(text);
            status.textContent = '✅ CV parsed successfully! Sections updated.';
            status.style.color = '#10b981';
        } catch (err) {
            console.error('CV parse error:', err);
            status.textContent = '❌ Error parsing CV. Try another file.';
            status.style.color = '#ef4444';
        }
    }

    async function parsePDF(file) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const pageText = content.items.map(item => item.str).join(' ');
            fullText += pageText + '\n';
        }
        return fullText;
    }

    async function parseDOCX(file) {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        return result.value;
    }

    function populateFromCV(text) {
        // Try to extract sections using common headings
        const sections = {
            about: extractSection(text, ['about', 'summary', 'profile', 'objective']),
            skills: extractSection(text, ['skills', 'technical skills', 'competencies']),
            experience: extractSection(text, ['experience', 'work experience', 'employment']),
            projects: extractSection(text, ['projects', 'portfolio', 'key projects']),
            education: extractSection(text, ['education', 'academic', 'qualifications'])
        };

        // Update About section
        if (sections.about) {
            const aboutEl = document.querySelector('[data-editable="about-usp"]');
            if (aboutEl) {
                aboutEl.innerHTML = `<p class="about-lead">${sections.about}</p>`;
            }
        }

        // Update Skills (try to find skill keywords)
        if (sections.skills) {
            updateSkillsFromText(sections.skills);
        }

        // Store parsed data for editing
        localStorage.setItem('cv-parsed-data', JSON.stringify(sections));
    }

    function extractSection(text, keywords) {
        const lines = text.split('\n');
        let capturing = false;
        let content = [];
        const allKeywords = ['about', 'summary', 'profile', 'objective', 'skills', 'technical skills',
            'competencies', 'experience', 'work experience', 'employment', 'projects',
            'portfolio', 'education', 'academic', 'qualifications', 'certificates',
            'certifications', 'contact', 'references'];

        for (const line of lines) {
            const lower = line.toLowerCase().trim();
            if (keywords.some(k => lower.includes(k)) && lower.length < 60) {
                capturing = true;
                continue;
            }
            if (capturing) {
                // Stop if we hit another section heading
                if (allKeywords.some(k => lower.includes(k)) && lower.length < 60 &&
                    !keywords.some(k => lower.includes(k))) {
                    break;
                }
                if (line.trim()) content.push(line.trim());
            }
        }
        return content.join(' ').trim();
    }

    function updateSkillsFromText(skillText) {
        // This is a best-effort extraction — looks for known skill names
        const knownSkills = {
            'Python': 'Python', 'SQL': 'SQL', 'R': 'R',
            'pandas': 'Pandas', 'numpy': 'NumPy', 'scikit': 'Scikit-learn',
            'matplotlib': 'Matplotlib', 'seaborn': 'Seaborn', 'tensorflow': 'TensorFlow',
            'pytorch': 'PyTorch', 'keras': 'Keras', 'git': 'Git', 'docker': 'Docker',
            'jupyter': 'Jupyter', 'mlflow': 'MLflow', 'azure': 'Azure ML',
            'xgboost': 'XGBoost', 'nlp': 'NLP', 'computer vision': 'Computer Vision'
        };

        const foundSkills = [];
        const lowerText = skillText.toLowerCase();
        for (const [key, display] of Object.entries(knownSkills)) {
            if (lowerText.includes(key.toLowerCase())) {
                foundSkills.push(display);
            }
        }

        if (foundSkills.length > 0) {
            console.log('Skills found in CV:', foundSkills);
        }
    }
}

/* ═══════════════════════════════════════════════════
   10. CERTIFICATE UPLOAD
   ═══════════════════════════════════════════════════ */
function initCertUpload() {
    const dropZone = document.getElementById('cert-drop-zone');
    const fileInput = document.getElementById('cert-file-input');
    const status = document.getElementById('cert-status');
    const certGrid = document.getElementById('cert-grid');

    if (!dropZone || !fileInput || !certGrid) return;

    ['dragenter', 'dragover'].forEach(evt => {
        dropZone.addEventListener(evt, (e) => {
            e.preventDefault();
            dropZone.classList.add('drag-over');
        });
    });

    ['dragleave', 'drop'].forEach(evt => {
        dropZone.addEventListener(evt, (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
        });
    });

    dropZone.addEventListener('drop', (e) => {
        const files = Array.from(e.dataTransfer.files);
        files.forEach(addCertificate);
    });

    dropZone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', () => {
        Array.from(fileInput.files).forEach(addCertificate);
    });

    function addCertificate(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const dataUrl = e.target.result;
            const name = file.name.replace(/\.[^.]+$/, '').replace(/[_-]/g, ' ');

            const card = document.createElement('div');
            card.className = 'cert-card glass-card reveal-up revealed';
            card.innerHTML = `
                <div class="cert-image-wrapper">
                    <img src="${dataUrl}" alt="${name}" class="cert-image">
                </div>
                <div class="cert-info">
                    <h4 class="cert-title" contenteditable="false">${name}</h4>
                    <p class="cert-org"><i class="fas fa-building"></i> <span contenteditable="false">Organization</span></p>
                    <p class="cert-date"><i class="fas fa-calendar-alt"></i> <span contenteditable="false">Date</span></p>
                    <a href="${dataUrl}" download="${file.name}" class="cert-download btn btn-sm">
                        <i class="fas fa-download"></i> Download
                    </a>
                </div>
            `;
            certGrid.appendChild(card);

            status.textContent = `✅ Certificate "${name}" added!`;
            status.style.color = '#10b981';

            setTimeout(() => { status.textContent = ''; }, 3000);
        };
        reader.readAsDataURL(file);
    }
}

/* ═══════════════════════════════════════════════════
   11. INLINE EDIT MODE
   ═══════════════════════════════════════════════════ */
function initEditMode() {
    const fabEdit = document.getElementById('fab-edit');
    const editBar = document.getElementById('edit-bar');
    const saveBtn = document.getElementById('save-edits-btn');
    let isEditing = false;

    if (!fabEdit || !editBar) return;

    fabEdit.addEventListener('click', () => {
        isEditing = !isEditing;
        document.body.classList.toggle('edit-mode', isEditing);
        editBar.classList.toggle('visible', isEditing);

        // Toggle contenteditable on all editable elements
        document.querySelectorAll('[data-editable]').forEach(el => {
            el.contentEditable = isEditing ? 'true' : 'false';
        });

        // Update FAB icon
        fabEdit.innerHTML = isEditing
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-pen"></i>';
    });

    // Save edits
    saveBtn.addEventListener('click', () => {
        const edits = {};
        document.querySelectorAll('[data-editable]').forEach(el => {
            const key = el.dataset.editable;
            edits[key] = el.innerHTML;
        });
        localStorage.setItem('portfolio-edits', JSON.stringify(edits));

        // Flash feedback
        saveBtn.textContent = '✓ Saved!';
        saveBtn.style.background = '#10b981';
        setTimeout(() => {
            saveBtn.innerHTML = '<i class="fas fa-save"></i> Save All';
            saveBtn.style.background = '';
        }, 2000);
    });
}

/* ═══════════════════════════════════════════════════
   12. LOAD SAVED EDITS FROM LOCALSTORAGE
   ═══════════════════════════════════════════════════ */
function loadSavedEdits() {
    const saved = localStorage.getItem('portfolio-edits');
    if (!saved) return;

    try {
        const edits = JSON.parse(saved);
        for (const [key, html] of Object.entries(edits)) {
            const el = document.querySelector(`[data-editable="${key}"]`);
            if (el) el.innerHTML = html;
        }
    } catch (e) {
        console.warn('Could not load saved edits:', e);
    }
}

/* ═══════════════════════════════════════════════════
   13. CONTACT FORM (Frontend only)
   ═══════════════════════════════════════════════════ */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    const submitBtn = form ? form.querySelector('.btn-submit') : null;

    if (!form || !submitBtn) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = form.querySelector('#form-name').value.trim();
        const email = form.querySelector('#form-email').value.trim();
        const message = form.querySelector('#form-message').value.trim();

        // Validation
        if (!name || !email || !message) {
            status.textContent = 'Please fill in all fields.';
            status.className = 'form-status error';
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            status.textContent = 'Please enter a valid email address.';
            status.className = 'form-status error';
            return;
        }

        // Simulate sending
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;

            status.textContent = '✅ Message sent successfully! I\'ll get back to you soon.';
            status.className = 'form-status success';

            form.reset();

            setTimeout(() => {
                status.textContent = '';
                status.className = 'form-status';
            }, 5000);
        }, 1500);
    });
}

/* ═══════════════════════════════════════════════════
   14. BACK TO TOP BUTTON
   ═══════════════════════════════════════════════════ */
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}