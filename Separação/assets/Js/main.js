document.addEventListener('DOMContentLoaded', () => {
    
    // --- Menu Mobile Toggle ---
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    const toggleMenu = () => {
        menuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('menu-open');
        document.body.style.overflow = mobileMenu.classList.contains('menu-open') ? 'hidden' : 'auto';
    };

    menuBtn.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => link.addEventListener('click', () => { 
        if(mobileMenu.classList.contains('menu-open')) toggleMenu(); 
    }));

    // --- Animações de revelação ao rolar ---
    const revealSections = () => {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(el => {
            const top = el.getBoundingClientRect().top;
            if (top < window.innerHeight * 0.85) {
                el.classList.add('visible');
            }
        });
    };
    window.addEventListener('scroll', revealSections);
    window.addEventListener('load', revealSections);

    // --- Lógica do Formulário com envio via Fetch (Formspree) ---
    const form = document.getElementById('axi-form');
    const notify = document.getElementById('axi-notify');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validação do Captcha
        const captchaResponse = form.querySelector('[name="h-captcha-response"]').value;
        if (!captchaResponse) {
            alert("Por favor, marque a caixa 'Não sou um robô'.");
            return;
        }

        const btn = form.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = "ENVIANDO...";
        btn.disabled = true;

        const formData = new FormData(form);
        
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                notify.classList.add('opacity-100', 'bottom-12');
                form.reset();
                if (typeof hcaptcha !== "undefined") hcaptcha.reset(); 
                
                setTimeout(() => {
                    notify.classList.remove('opacity-100', 'bottom-12');
                }, 5000);
            } else {
                alert("Houve um erro no envio. Verifique o ID do formulário.");
            }
        } catch (error) {
            alert("Erro de conexão. Verifique sua internet.");
        } finally {
            btn.innerText = originalText;
            btn.disabled = false;
        }
    });

    // --- Scroll suave ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.classList.contains('whatsapp-float')) return;

            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});