// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
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
    const btnContato = document.querySelector('.btn-secondary');
    
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
    
    // Botão "Fale Conosco" - pode ser customizado para abrir modal de contato ou scroll para footer
    if (btnContato) {
        btnContato.addEventListener('click', function() {
            // Por enquanto, apenas um alerta - pode ser customizado
            alert('Entre em contato conosco:\n\nE-mail: contato@zolkatech.com\nTelefone: (48) 99999-9999');
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

// Footer CTA Button
function initFooterCTA() {
    const footerCTAButton = document.querySelector('.footer-cta-button');
    
    if (footerCTAButton) {
        footerCTAButton.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Obrigado pelo interesse! Em breve entraremos em contato para discutir seu projeto. 📧');
        });
    }
}

// Inicializar spotlight cards quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar spotlight cards
    initSpotlightCards();
    
    // Inicializar footer smooth scroll
    initFooterSmoothScroll();
    
    // Inicializar footer CTA
    initFooterCTA();
    
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
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Validar campos obrigatórios
    const requiredFields = ['name', 'email', 'phone', 'service'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Por favor, insira um e-mail válido.');
        return;
    }
    
    // Simular envio
    const submitBtn = e.target.querySelector('.form-submit-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<span class="btn-text">Enviando...</span>';
    submitBtn.disabled = true;
    
    // Criar mensagem para WhatsApp
    const whatsappMessage = `
🌟 *Nova Solicitação de Orçamento - Zolka*

👤 *Nome:* ${data.name}
📧 *E-mail:* ${data.email}
📱 *WhatsApp:* ${data.phone}
🏢 *Empresa:* ${data.company || 'Não informado'}
🎯 *Serviço:* ${getServiceName(data.service)}

💬 *Mensagem:*
${data.message || 'Nenhuma mensagem adicional'}

---
Enviado através do site da Zolka
    `.trim();
    
    setTimeout(() => {
        // Redirecionar para WhatsApp
        const whatsappUrl = `https://wa.me/5524920041669?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');
        
        // Resetar formulário
        e.target.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Mostrar confirmação
        showContactSuccess();
    }, 1500);
}

function getServiceName(serviceValue) {
    const services = {
        'agente-ia': 'Agente de IA',
        'automacoes': 'Automações Inteligentes',
        'sites': 'Sites e Landing Pages',
        'trafego': 'Tráfego Pago',
        'design': 'Design e Branding',
        'social': 'Gestão de Redes Sociais',
        'outros': 'Outros serviços'
    };
    
    return services[serviceValue] || serviceValue;
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

console.log('ZolkaTECH - Site carregado com sucesso! 🚀');