// Menu Mobile com melhorias de acessibilidade
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const isActive = navLinks.classList.contains('active');
    mobileMenuBtn.innerHTML = isActive ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    mobileMenuBtn.setAttribute('aria-expanded', isActive);
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
    });
});

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
});

// Scroll suave com fallback
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            
            // Verificar suporte para scroll suave
            if ('scrollBehavior' in document.documentElement.style) {
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            } else {
                // Fallback para navegadores antigos
                window.scrollTo(0, offsetTop);
            }
        }
    });
});

// Animação de aparecimento ao rolar com Intersection Observer
const fadeElements = document.querySelectorAll('.fade-in');

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
} else {
    // Fallback para navegadores antigos
    const checkVisibility = () => {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    };
    
    window.addEventListener('load', checkVisibility);
    window.addEventListener('scroll', checkVisibility);
    checkVisibility();
}

// Lightbox para galeria de fotos
const galleryItems = document.querySelectorAll('.gallery-item img');

galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        const src = this.getAttribute('src');
        const alt = this.getAttribute('alt') || 'Imagem do Projeto Escola Verde';
        
        // Criar lightbox
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            cursor: pointer;
        `;
        
        const img = document.createElement('img');
        img.src = src;
        img.alt = alt;
        img.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 8px;
        `;
        
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            background: none;
            border: none;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            z-index: 10000;
        `;
        
        lightbox.appendChild(img);
        lightbox.appendChild(closeBtn);
        document.body.appendChild(lightbox);
        
        // Fechar lightbox
        const closeLightbox = () => {
            document.body.removeChild(lightbox);
        };
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target === closeBtn || e.target.closest('button')) {
                closeLightbox();
            }
        });
        
        // Fechar com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        });
    });
});

// Prevenir scroll quando menu mobile está aberto
const preventScroll = (e) => {
    if (navLinks.classList.contains('active')) {
        e.preventDefault();
    }
};

document.addEventListener('touchmove', preventScroll, { passive: false });

// Performance: debounce para eventos de scroll
let ticking = false;
const updateScroll = () => {
    // Ações de scroll podem ser adicionadas aqui
    ticking = false;
};

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
    }
});

// Adicionar carregamento lazy para imagens
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
}

// Adicionar atributos de acessibilidade
document.querySelectorAll('img').forEach(img => {
    if (!img.alt) {
        img.alt = 'Imagem do Projeto Escola Verde';
    }
});
