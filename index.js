// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navCloseBtn = document.querySelector('.nav-close-btn');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const scrollProgressBar = document.querySelector('.scroll-progress-bar');

// Sections for active navigation
const sections = document.querySelectorAll('section[id]');

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Close mobile menu when clicking on close button (pseudo-element)
navMenu.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active')) {
        const rect = navMenu.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        
        // Área do X: top: 20px, right: 1.5rem, width: 50px, height: 50px
        const closeButtonArea = {
            x: rect.width - 74, // 1.5rem (24px) + 50px width
            y: 20,
            width: 50,
            height: 50
        };
        
        if (clickX >= closeButtonArea.x && clickX <= closeButtonArea.x + closeButtonArea.width &&
            clickY >= closeButtonArea.y && clickY <= closeButtonArea.y + closeButtonArea.height) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
            e.stopPropagation();
        }
    }
});

// Close mobile menu when clicking on close button
if (navCloseBtn) {
    navCloseBtn.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

// Scroll Progress Bar and Active Section Detection
function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    // Update progress bar
    scrollProgressBar.style.width = scrollPercent + '%';
}

function updateActiveSection() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        // Check if section is in viewport
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            // Remove active class from all nav links
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Add active class to current section's nav link
            const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// Navbar scroll effect with progress updates
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Navbar background effect
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update scroll progress and active section
    updateScrollProgress();
    updateActiveSection();
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateScrollProgress();
    updateActiveSection();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.hero-content, .hero-visual');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
    
    // Trigger animations after a short delay
    setTimeout(() => {
        animateElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }, 200);
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const isClickInsideNav = navMenu.contains(e.target) || hamburger.contains(e.target);
    
    if (!isClickInsideNav && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Add hover effects for buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Performance optimization: throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScroll = throttle(() => {
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 100);

window.addEventListener('scroll', throttledScroll);

// Inicialização do AOS (Animate On Scroll) - Otimizado para performance
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 400, // Duração mais rápida
        easing: 'ease-out-cubic', // Easing mais responsivo
        once: false, // Permite animações repetidas
        mirror: true, // Anima ao rolar para cima também
        offset: 80, // Menor offset para ativar mais cedo
        delay: 0,
        anchorPlacement: 'top-bottom',
        disable: false, // Nunca desabilitar
        startEvent: 'DOMContentLoaded', // Iniciar assim que o DOM estiver pronto
        disableMutationObserver: false, // Observar mudanças no DOM
        debounceDelay: 50, // Menor delay para melhor responsividade
        throttleDelay: 99, // Menor throttle para animações mais fluidas
    });
});

// Efeito de parallax customizado para mockups
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3;
    const rate2 = scrolled * -0.5;
    
    // Mockup container
    const mockupContainer = document.querySelector('.mockup-container');
    if (mockupContainer) {
        mockupContainer.style.transform = `translateY(${rate}px)`;
    }
    
    // Laptop mockup
    const laptopMockup = document.querySelector('.laptop-mockup');
    if (laptopMockup) {
        laptopMockup.style.transform = `translateY(${rate2}px) rotateX(5deg)`;
    }
    
    // Phone mockup
    const phoneMockup = document.querySelector('.phone-mockup');
    if (phoneMockup) {
        phoneMockup.style.transform = `translateY(${rate * 0.8}px) rotateY(5deg)`;
    }
});

// Refresh AOS quando necessário
window.addEventListener('resize', () => {
    AOS.refresh();
});

// Efeito de movimento suave nos mockups baseado no scroll
let ticking = false;

function updateMockupPosition() {
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    // Calcular offset baseado no scroll
    const offset = scrollY * 0.2;
    
    // Aplicar transformações suaves
    const mockupContainer = document.querySelector('.mockup-container');
    if (mockupContainer) {
        mockupContainer.style.transform = `translateY(${-offset}px)`;
        
        // Adicionar rotação sutil baseada no scroll
        const rotation = (scrollY * 0.01) % 360;
        mockupContainer.style.filter = `hue-rotate(${rotation}deg)`;
    }
    
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateMockupPosition);
        ticking = true;
    }
}

// Event listener otimizado para scroll
window.addEventListener('scroll', requestTick);

// Modal Functions
function openModal(imageSrc, title, description) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    
    // Reset imagem
    modalImage.classList.remove('loaded');
    modalImage.src = '';
    
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    
    modal.classList.add('show');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Carregar imagem com animação
    modalImage.onload = function() {
        modalImage.classList.add('loaded');
    };
    modalImage.src = imageSrc;
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    
    modalImage.classList.remove('loaded');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    
    // Delay para permitir animação de saída
    setTimeout(() => {
        modal.style.display = 'none';
        modalImage.src = '';
    }, 300);
}

// Event Listeners para o Modal
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    const closeBtn = document.querySelector('.modal-close');
    
    // Fechar modal clicando no X
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Fechar modal clicando fora da imagem
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Fechar modal com tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});

// Funcionalidade dos botões do hero
document.addEventListener('DOMContentLoaded', function() {
    const btnProjetos = document.querySelector('.btn-primary');
    
    // Botão "Nossos Projetos" - scroll para a segunda section
    if (btnProjetos) {
        btnProjetos.addEventListener('click', function() {
            const projetosSection = document.querySelector('.segunda-section');
            if (projetosSection) {
                const offsetTop = projetosSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
});

// Animação de digitação na URL do mockup
function typewriterURL() {
    const urlBar = document.querySelector('.url-bar');
    if (!urlBar) {
        console.log('Elemento .url-bar não encontrado');
        return;
    }
    
    const urls = [
        'seusite.com.br',
        'sualandingpage.com.br'
    ];
    
    let currentUrlIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;
    let cursorVisible = true;
    
    function type() {
        const currentUrl = urls[currentUrlIndex];
        
        if (isDeleting) {
            // Removendo caracteres
            urlBar.textContent = currentUrl.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = 80;
            
            if (currentCharIndex === 0) {
                isDeleting = false;
                currentUrlIndex = (currentUrlIndex + 1) % urls.length;
                typingSpeed = 500; // Pausa antes de começar a digitar
            }
        } else {
            // Adicionando caracteres
            urlBar.textContent = currentUrl.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingSpeed = 120;
            
            if (currentCharIndex === currentUrl.length) {
                typingSpeed = 2500; // Pausa no final antes de começar a deletar
                setTimeout(() => {
                    isDeleting = true;
                }, 2000);
                return;
            }
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Cursor piscando
    function blinkCursor() {
        setInterval(() => {
            if (urlBar) {
                const content = urlBar.textContent.replace('|', '');
                if (cursorVisible) {
                    urlBar.textContent = content + '|';
                } else {
                    urlBar.textContent = content;
                }
                cursorVisible = !cursorVisible;
            }
        }, 500);
    }
    
    // Iniciar a animação
    urlBar.textContent = '';
    currentCharIndex = 0;
    type();
    blinkCursor();
}

// Inicializar animação quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typewriterURL, 2000);
});

// Backup - garantir que a animação inicie
window.addEventListener('load', () => {
    setTimeout(() => {
        const urlBar = document.querySelector('.url-bar');
        if (urlBar && (urlBar.textContent === 'seusite.com.br' || urlBar.textContent.trim() === '')) {
            typewriterURL();
        }
    }, 3000);
});

// Spotlight Cards Effect
function initSpotlightCards() {
    const spotlightCards = document.querySelectorAll('.card-spotlight');
    
    spotlightCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
        
        // Reset position when mouse leaves
        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--mouse-x', '50%');
            card.style.setProperty('--mouse-y', '50%');
        });
    });
}

// Footer Links Smooth Scroll
function initFooterSmoothScroll() {
    const footerLinks = document.querySelectorAll('.footer-link[href^="#"]');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for navbar height
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
}

// Inicializar spotlight cards quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar spotlight cards
    initSpotlightCards();
    
    // Inicializar footer smooth scroll
    initFooterSmoothScroll();
    
    // Inicializar formulário de contato
    initContactForm();
});

// Contact Form Handler
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
        
        // Phone number formatting
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', formatPhoneNumber);
        }
    }
}

function formatPhoneNumber(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length >= 11) {
        value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (value.length >= 7) {
        value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else if (value.length >= 3) {
        value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    }
    
    e.target.value = value;
}

function handleContactSubmit(e) {
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Debug: verificar dados do formulário
    console.log('Dados do formulário:', data);
    
    // Validar campos obrigatórios
    const requiredFields = ['name', 'email', 'whatsapp', 'privacy_consent'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    console.log('Campos faltando:', missingFields);
    
    if (missingFields.length > 0) {
        e.preventDefault();
        alert('Por favor, preencha todos os campos obrigatórios: ' + missingFields.join(', '));
        return;
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        e.preventDefault();
        alert('Por favor, insira um e-mail válido.');
        return;
    }
    
    // Se chegou até aqui, todos os campos estão válidos
    // Permitir que o FormSubmit.co processe o formulário
    // Não prevenir o default para que o form seja enviado normalmente
    
    // Feedback visual opcional
    const submitBtn = e.target.querySelector('.form-submit-btn');
    if (submitBtn) {
        submitBtn.innerHTML = '<span class="btn-text">Enviando...</span>';
        submitBtn.disabled = true;
    }
}

function showContactSuccess() {
    // Criar elemento de sucesso
    const successMessage = document.createElement('div');
    successMessage.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #4CAF50, #45a049);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 9999;
            animation: slideInRight 0.5s ease-out;
        ">
            <strong>✅ Solicitação enviada!</strong><br>
            Redirecionando para o WhatsApp...
        </div>
    `;
    
    // Adicionar CSS de animação
    if (!document.getElementById('contact-success-styles')) {
        const styles = document.createElement('style');
        styles.id = 'contact-success-styles';
        styles.textContent = `
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(100%);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(successMessage);
    
    // Remover mensagem após 3 segundos
    setTimeout(() => {
        if (successMessage.parentNode) {
            successMessage.parentNode.removeChild(successMessage);
        }
    }, 3000);
}

// BlurText Animation Effect
class BlurText {
    constructor(element, options = {}) {
        this.element = element;
        this.text = element.textContent;
        this.delay = options.delay || 150;
        this.animateBy = options.animateBy || 'words';
        this.direction = options.direction || 'top';
        this.threshold = options.threshold || 0.1;
        this.stepDuration = options.stepDuration || 350;
        this.onAnimationComplete = options.onAnimationComplete;
        
        this.init();
    }
    
    init() {
        // Split text into elements
        const elements = this.animateBy === 'words' ? this.text.split(' ') : this.text.split('');
        
        // Clear original text and create spans
        this.element.innerHTML = '';
        this.spans = [];
        
        elements.forEach((segment, index) => {
            const span = document.createElement('span');
            span.style.display = 'inline-block';
            span.style.willChange = 'transform, filter, opacity';
            span.textContent = segment;
            
            // Initial state
            span.style.filter = 'blur(10px)';
            span.style.opacity = '0';
            span.style.transform = this.direction === 'top' ? 'translateY(-50px)' : 'translateY(50px)';
            span.style.transition = `all ${this.stepDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
            span.style.transitionDelay = `${index * this.delay}ms`;
            
            this.element.appendChild(span);
            this.spans.push(span);
            
            // Add space after words (except last one)
            if (this.animateBy === 'words' && index < elements.length - 1) {
                const space = document.createElement('span');
                space.innerHTML = '&nbsp;';
                space.style.display = 'inline-block';
                this.element.appendChild(space);
            }
        });
        
        // Setup intersection observer
        this.setupObserver();
    }
    
    setupObserver() {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    this.animate();
                    observer.unobserve(this.element);
                }
            },
            { threshold: this.threshold }
        );
        
        observer.observe(this.element);
    }
    
    animate() {
        this.spans.forEach((span, index) => {
            // First step: partially visible
            setTimeout(() => {
                span.style.filter = 'blur(5px)';
                span.style.opacity = '0.5';
                span.style.transform = this.direction === 'top' ? 'translateY(5px)' : 'translateY(-5px)';
            }, index * this.delay);
            
            // Final step: fully visible
            setTimeout(() => {
                span.style.filter = 'blur(0px)';
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
                
                // Call completion callback for last element
                if (index === this.spans.length - 1 && this.onAnimationComplete) {
                    setTimeout(() => {
                        this.onAnimationComplete();
                    }, this.stepDuration);
                }
            }, index * this.delay + this.stepDuration);
        });
    }
}

// Initialize BlurText effect
document.addEventListener('DOMContentLoaded', function() {
    // Apply BlurText to CTA title
    const ctaTitle = document.querySelector('.cta-title');
    if (ctaTitle) {
        new BlurText(ctaTitle, {
            delay: 300,          // Aumentado de 150 para 300ms
            animateBy: 'words',
            direction: 'top',
            stepDuration: 600,   // Aumentado de 350 para 600ms
            onAnimationComplete: () => {
                console.log('BlurText animation completed!');
            }
        });
    }

    // Initialize DarkVeil Background
    initializeDarkVeil();
});

// DarkVeil Background Implementation
function initializeDarkVeil() {
    const canvas = document.getElementById('darkveil-canvas');
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
        console.warn('WebGL not supported');
        return;
    }

    // Vertex shader source
    const vertexShaderSource = `
        attribute vec2 position;
        void main(){
            gl_Position = vec4(position, 0.0, 1.0);
        }
    `;

    // Fragment shader source
    const fragmentShaderSource = `
        #ifdef GL_ES
        precision lowp float;
        #endif
        uniform vec2 uResolution;
        uniform float uTime;
        uniform float uHueShift;
        uniform float uNoise;
        uniform float uScan;
        uniform float uScanFreq;
        uniform float uWarp;
        #define iTime uTime
        #define iResolution uResolution

        vec4 buf[8];
        float rand(vec2 c){return fract(sin(dot(c,vec2(12.9898,78.233)))*43758.5453);}

        mat3 rgb2yiq=mat3(0.299,0.587,0.114,0.596,-0.274,-0.322,0.211,-0.523,0.312);
        mat3 yiq2rgb=mat3(1.0,0.956,0.621,1.0,-0.272,-0.647,1.0,-1.106,1.703);

        vec3 hueShiftRGB(vec3 col,float deg){
            vec3 yiq=rgb2yiq*col;
            float rad=radians(deg);
            float cosh=cos(rad),sinh=sin(rad);
            vec3 yiqShift=vec3(yiq.x,yiq.y*cosh-yiq.z*sinh,yiq.y*sinh+yiq.z*cosh);
            return clamp(yiq2rgb*yiqShift,0.0,1.0);
        }

        vec4 sigmoid(vec4 x){return 1./(1.+exp(-x));}

        vec4 cppn_fn(vec2 coordinate,float in0,float in1,float in2){
            buf[6]=vec4(coordinate.x,coordinate.y,0.3948333106474662+in0,0.36+in1);
            buf[7]=vec4(0.14+in2,sqrt(coordinate.x*coordinate.x+coordinate.y*coordinate.y),0.,0.);
            buf[0]=mat4(vec4(6.5404263,-3.6126034,0.7590882,-1.13613),vec4(2.4582713,3.1660357,1.2219609,0.06276096),vec4(-5.478085,-6.159632,1.8701609,-4.7742867),vec4(6.039214,-5.542865,-0.90925294,3.251348))*buf[6]+mat4(vec4(0.8473259,-5.722911,3.975766,1.6522468),vec4(-0.24321538,0.5839259,-1.7661959,-5.350116),vec4(0.,0.,0.,0.),vec4(0.,0.,0.,0.))*buf[7]+vec4(0.21808943,1.1243913,-1.7969975,5.0294676);
            buf[1]=mat4(vec4(-3.3522482,-6.0612736,0.55641043,-4.4719114),vec4(0.8631464,1.7432913,5.643898,1.6106541),vec4(2.4941394,-3.5012043,1.7184316,6.357333),vec4(3.310376,8.209261,1.1355612,-1.165539))*buf[6]+mat4(vec4(5.24046,-13.034365,0.009859298,15.870829),vec4(2.987511,3.129433,-0.89023495,-1.6822904),vec4(0.,0.,0.,0.),vec4(0.,0.,0.,0.))*buf[7]+vec4(-5.9457836,-6.573602,-0.8812491,1.5436668);
            buf[0]=sigmoid(buf[0]);buf[1]=sigmoid(buf[1]);
            buf[2]=mat4(vec4(-15.219568,8.095543,-2.429353,-1.9381982),vec4(-5.951362,4.3115187,2.6393783,1.274315),vec4(-7.3145227,6.7297835,5.2473326,5.9411426),vec4(5.0796127,8.979051,-1.7278991,-1.158976))*buf[6]+mat4(vec4(-11.967154,-11.608155,6.1486754,11.237008),vec4(2.124141,-6.263192,-1.7050359,-0.7021966),vec4(0.,0.,0.,0.),vec4(0.,0.,0.,0.))*buf[7]+vec4(-4.17164,-3.2281182,-4.576417,-3.6401186);
            buf[3]=mat4(vec4(3.1832156,-13.738922,1.879223,3.233465),vec4(0.64300746,12.768129,1.9141049,0.50990224),vec4(-0.049295485,4.4807224,1.4733979,1.801449),vec4(5.0039253,13.000481,3.3991797,-4.5561905))*buf[6]+mat4(vec4(-0.1285731,7.720628,-3.1425676,4.742367),vec4(0.6393625,3.714393,-0.8108378,-0.39174938),vec4(0.,0.,0.,0.),vec4(0.,0.,0.,0.))*buf[7]+vec4(-1.1811101,-21.621881,0.7851888,1.2329718);
            buf[2]=sigmoid(buf[2]);buf[3]=sigmoid(buf[3]);
            buf[4]=mat4(vec4(5.214916,-7.183024,2.7228765,2.6592617),vec4(-5.601878,-25.3591,4.067988,0.4602802),vec4(-10.57759,24.286327,21.102104,37.546658),vec4(4.3024497,-1.9625226,2.3458803,-1.372816))*buf[0]+mat4(vec4(-17.6526,-10.507558,2.2587414,12.462782),vec4(6.265566,-502.75443,-12.642513,0.9112289),vec4(-10.983244,20.741234,-9.701768,-0.7635988),vec4(5.383626,1.4819539,-4.1911616,-4.8444734))*buf[1]+mat4(vec4(12.785233,-16.345072,-0.39901125,1.7955981),vec4(-30.48365,-1.8345358,1.4542528,-1.1118771),vec4(19.872723,-7.337935,-42.941723,-98.52709),vec4(8.337645,-2.7312303,-2.2927687,-36.142323))*buf[2]+mat4(vec4(-16.298317,3.5471997,-0.44300047,-9.444417),vec4(57.5077,-35.609753,16.163465,-4.1534753),vec4(-0.07470326,-3.8656476,-7.0901804,3.1523974),vec4(-12.559385,-7.077619,1.490437,-0.8211543))*buf[3]+vec4(-7.67914,15.927437,1.3207729,-1.6686112);
            buf[5]=mat4(vec4(-1.4109162,-0.372762,-3.770383,-21.367174),vec4(-6.2103205,-9.35908,0.92529047,8.82561),vec4(11.460242,-22.348068,13.625772,-18.693201),vec4(-0.3429052,-3.9905605,-2.4626114,-0.45033523))*buf[0]+mat4(vec4(7.3481627,-4.3661838,-6.3037653,-3.868115),vec4(1.5462853,6.5488915,1.9701879,-0.58291394),vec4(6.5858274,-2.2180402,3.7127688,-1.3730392),vec4(-5.7973905,10.134961,-2.3395722,-5.965605))*buf[1]+mat4(vec4(-2.5132585,-6.6685553,-1.4029363,-0.16285264),vec4(-0.37908727,0.53738135,4.389061,-1.3024765),vec4(-0.70647055,2.0111287,-5.1659346,-3.728635),vec4(-13.562562,10.487719,-0.9173751,-2.6487076))*buf[2]+mat4(vec4(-8.645013,6.5546675,-6.3944063,-5.5933375),vec4(-0.57783127,-1.077275,36.91025,5.736769),vec4(14.283112,3.7146652,7.1452246,-4.5958776),vec4(2.7192075,3.6021907,-4.366337,-2.3653464))*buf[3]+vec4(-5.9000807,-4.329569,1.2427121,8.59503);
            buf[4]=sigmoid(buf[4]);buf[5]=sigmoid(buf[5]);
            buf[6]=mat4(vec4(-1.61102,0.7970257,1.4675229,0.20917463),vec4(-28.793737,-7.1390953,1.5025433,4.656581),vec4(-10.94861,39.66238,0.74318546,-10.095605),vec4(-0.7229728,-1.5483948,0.7301322,2.1687684))*buf[0]+mat4(vec4(3.2547753,21.489103,-1.0194173,-3.3100595),vec4(-3.7316632,-3.3792162,-7.223193,-0.23685838),vec4(13.1804495,0.7916005,5.338587,5.687114),vec4(-4.167605,-17.798311,-6.815736,-1.6451967))*buf[1]+mat4(vec4(0.604885,-7.800309,-7.213122,-2.741014),vec4(-3.522382,-0.12359311,-0.5258442,0.43852118),vec4(9.6752825,-22.853785,2.062431,0.099892326),vec4(-4.3196306,-17.730087,2.5184598,5.30267))*buf[2]+mat4(vec4(-6.545563,-15.790176,-6.0438633,-5.415399),vec4(-43.591583,28.551912,-16.00161,18.84728),vec4(4.212382,8.394307,3.0958717,8.657522),vec4(-5.0237565,-4.450633,-4.4768,-5.5010443))*buf[3]+mat4(vec4(1.6985557,-67.05806,6.897715,1.9004834),vec4(1.8680354,2.3915145,2.5231109,4.081538),vec4(11.158006,1.7294737,2.0738268,7.386411),vec4(-4.256034,-306.24686,8.258898,-17.132736))*buf[4]+mat4(vec4(1.6889864,-4.5852966,3.8534803,-6.3482175),vec4(1.3543309,-1.2640043,9.932754,2.9079645),vec4(-5.2770967,0.07150358,-0.13962056,3.3269649),vec4(28.34703,-4.918278,6.1044083,4.085355))*buf[5]+vec4(6.6818056,12.522166,-3.7075126,-4.104386);
            buf[7]=mat4(vec4(-8.265602,-4.7027016,5.098234,0.7509808),vec4(8.6507845,-17.15949,16.51939,-8.884479),vec4(-4.036479,-2.3946867,-2.6055532,-1.9866527),vec4(-2.2167742,-1.8135649,-5.9759874,4.8846445))*buf[0]+mat4(vec4(6.7790847,3.5076547,-2.8191125,-2.7028968),vec4(-5.743024,-0.27844876,1.4958696,-5.0517144),vec4(13.122226,15.735168,-2.9397483,-4.101023),vec4(-14.375265,-5.030483,-6.2599335,2.9848232))*buf[1]+mat4(vec4(4.0950394,-0.94011575,-5.674733,4.755022),vec4(4.3809423,4.8310084,1.7425908,-3.437416),vec4(2.117492,0.16342592,-104.56341,16.949184),vec4(-5.22543,-2.994248,3.8350096,-1.9364246))*buf[2]+mat4(vec4(-5.900337,1.7946124,-13.604192,-3.8060522),vec4(6.6583457,31.911177,25.164474,91.81147),vec4(11.840538,4.1503043,-0.7314397,6.768467),vec4(-6.3967767,4.034772,6.1714606,-0.32874924))*buf[3]+mat4(vec4(3.4992442,-196.91893,-8.923708,2.8142626),vec4(3.4806502,-3.1846354,5.1725626,5.1804223),vec4(-2.4009497,15.585794,1.2863957,2.0252278),vec4(-71.25271,-62.441242,-8.138444,0.50670296))*buf[4]+mat4(vec4(-12.291733,-11.176166,-7.3474145,4.390294),vec4(10.805477,5.6337385,-0.9385842,-4.7348723),vec4(-12.869276,-7.039391,5.3029537,7.5436664),vec4(1.4593618,8.91898,3.5101583,5.840625))*buf[5]+vec4(2.2415268,-6.705987,-0.98861027,-2.117676);
            buf[6]=sigmoid(buf[6]);buf[7]=sigmoid(buf[7]);
            buf[0]=mat4(vec4(1.6794263,1.3817469,2.9625452,0.),vec4(-1.8834411,-1.4806935,-3.5924516,0.),vec4(-1.3279216,-1.0918057,-2.3124623,0.),vec4(0.2662234,0.23235129,0.44178495,0.))*buf[0]+mat4(vec4(-0.6299101,-0.5945583,-0.9125601,0.),vec4(0.17828953,0.18300213,0.18182953,0.),vec4(-2.96544,-2.5819945,-4.9001055,0.),vec4(1.4195864,1.1868085,2.5176322,0.))*buf[1]+mat4(vec4(-1.2584374,-1.0552157,-2.1688404,0.),vec4(-0.7200217,-0.52666044,-1.438251,0.),vec4(0.15345335,0.15196142,0.272854,0.),vec4(0.945728,0.8861938,1.2766753,0.))*buf[2]+mat4(vec4(-2.4218085,-1.968602,-4.35166,0.),vec4(-22.683098,-18.0544,-41.954372,0.),vec4(0.63792,0.5470648,1.1078634,0.),vec4(-1.5489894,-1.3075932,-2.6444845,0.))*buf[3]+mat4(vec4(-0.49252132,-0.39877754,-0.91366625,0.),vec4(0.95609266,0.7923952,1.640221,0.),vec4(0.30616966,0.15693925,0.8639857,0.),vec4(1.1825981,0.94504964,2.176963,0.))*buf[4]+mat4(vec4(0.35446745,0.3293795,0.59547555,0.),vec4(-0.58784515,-0.48177817,-1.0614829,0.),vec4(2.5271258,1.9991658,4.6846647,0.),vec4(0.13042648,0.08864098,0.30187556,0.))*buf[5]+mat4(vec4(-1.7718065,-1.4033192,-3.3355875,0.),vec4(3.1664357,2.638297,5.378702,0.),vec4(-3.1724713,-2.6107926,-5.549295,0.),vec4(-2.851368,-2.249092,-5.3013067,0.))*buf[6]+mat4(vec4(1.5203838,1.2212278,2.8404984,0.),vec4(1.5210563,1.2651345,2.683903,0.),vec4(2.9789467,2.4364579,5.2347264,0.),vec4(2.2270417,1.8825914,3.8028636,0.))*buf[7]+vec4(-1.5468478,-3.6171484,0.24762098,0.);
            buf[0]=sigmoid(buf[0]);
            return vec4(buf[0].x,buf[0].y,buf[0].z,1.);
        }

        void mainImage(out vec4 fragColor,in vec2 fragCoord){
            vec2 uv=fragCoord/uResolution.xy*2.-1.;
            uv.y*=-1.;
            uv+=uWarp*vec2(sin(uv.y*6.283+uTime*0.5),cos(uv.x*6.283+uTime*0.5))*0.05;
            fragColor=cppn_fn(uv,0.1*sin(0.3*uTime),0.1*sin(0.69*uTime),0.1*sin(0.44*uTime));
        }

        void main(){
            vec4 col;mainImage(col,gl_FragCoord.xy);
            col.rgb=hueShiftRGB(col.rgb,uHueShift);
            float scanline_val=sin(gl_FragCoord.y*uScanFreq)*0.5+0.5;
            col.rgb*=1.-(scanline_val*scanline_val)*uScan;
            col.rgb+=(rand(gl_FragCoord.xy+uTime)-0.5)*uNoise;
            gl_FragColor=vec4(clamp(col.rgb,0.0,1.0),1.0);
        }
    `;

    // Create shader function
    function createShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('Error compiling shader:', gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        
        return shader;
    }

    // Create program function
    function createProgram(gl, vertexShader, fragmentShader) {
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('Error linking program:', gl.getProgramInfoLog(program));
            gl.deleteProgram(program);
            return null;
        }
        
        return program;
    }

    // Create shaders
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    
    if (!vertexShader || !fragmentShader) return;

    // Create program
    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) return;

    // Create geometry (fullscreen triangle)
    const positions = new Float32Array([
        -1, -1,
         3, -1,
        -1,  3
    ]);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    // Get attribute and uniform locations
    const positionAttributeLocation = gl.getAttribLocation(program, 'position');
    const uniforms = {
        uTime: gl.getUniformLocation(program, 'uTime'),
        uResolution: gl.getUniformLocation(program, 'uResolution'),
        uHueShift: gl.getUniformLocation(program, 'uHueShift'),
        uNoise: gl.getUniformLocation(program, 'uNoise'),
        uScan: gl.getUniformLocation(program, 'uScan'),
        uScanFreq: gl.getUniformLocation(program, 'uScanFreq'),
        uWarp: gl.getUniformLocation(program, 'uWarp')
    };

    // Animation parameters
    const params = {
        hueShift: 20,
        noiseIntensity: 0.03,
        scanlineIntensity: 0.1,
        speed: 0.3,
        scanlineFrequency: 0.02,
        warpAmount: 0.2
    };

    // Resize canvas function
    function resizeCanvas() {
        const heroSection = document.querySelector('.hero');
        const rect = heroSection.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio, 2);
        
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = rect.width + 'px';
        canvas.style.height = rect.height + 'px';
        
        gl.viewport(0, 0, canvas.width, canvas.height);
    }

    // Animation loop
    const startTime = performance.now();
    let animationFrame;

    function render() {
        const currentTime = (performance.now() - startTime) / 1000;
        
        // Use program
        gl.useProgram(program);
        
        // Set uniforms
        gl.uniform1f(uniforms.uTime, currentTime * params.speed);
        gl.uniform2f(uniforms.uResolution, canvas.width, canvas.height);
        gl.uniform1f(uniforms.uHueShift, params.hueShift);
        gl.uniform1f(uniforms.uNoise, params.noiseIntensity);
        gl.uniform1f(uniforms.uScan, params.scanlineIntensity);
        gl.uniform1f(uniforms.uScanFreq, params.scanlineFrequency);
        gl.uniform1f(uniforms.uWarp, params.warpAmount);
        
        // Set up attributes
        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
        
        // Draw
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        
        animationFrame = requestAnimationFrame(render);
    }

    // Initialize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    render();

    // Cleanup function
    return () => {
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }
        window.removeEventListener('resize', resizeCanvas);
    };
}

console.log('ZolkaTECH - Site carregado com sucesso! 🚀');