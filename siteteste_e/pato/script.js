document.addEventListener('DOMContentLoaded', () => {
    // === LÓGICA DO MENU HAMBÚRGUER ===
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Fecha o menu ao clicar em um link (para mobile)
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });

    // === LÓGICA DO PATO (SEGUIR MOUSE) ===
    const duck = document.getElementById('duck');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let duckX = window.innerWidth / 2;
    let duckY = window.innerHeight / 2;

    const speed = 0.02; // Velocidade lenta e suave

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateDuck() {
        // Interpolação para movimento suave
        duckX += (mouseX - duckX) * speed;
        duckY += (mouseY - duckY) * speed;

        // Ajusta a posição para centralizar o pato no cursor
        duck.style.left = `${duckX - duck.offsetWidth / 2}px`;
        duck.style.top = `${duckY - duck.offsetHeight / 2}px`;

        // Vira o pato conforme a direção do mouse
        if (mouseX > duckX + 5) { // Se o mouse está significativamente à direita
            duck.style.transform = 'scaleX(1)';
        } else if (mouseX < duckX - 5) { // Se o mouse está significativamente à esquerda
            duck.style.transform = 'scaleX(-1)';
        }

        requestAnimationFrame(animateDuck);
    }
    animateDuck(); // Inicia a animação do pato

    // === LÓGICA DO GERADOR DE BOLHAS ===
    const bubbleContainer = document.getElementById('bubble-container');
    function createBubble() {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        
        // Tamanho aleatório
        const size = Math.random() * 25 + 10; // Bolhas entre 10px e 35px
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        
        // Posição horizontal aleatória
        bubble.style.left = `${Math.random() * 100}vw`;
        
        // Velocidade e duração aleatórias para a animação CSS
        bubble.style.setProperty('--speed', `${Math.random() * 6 + 6}s`); // De 6 a 12 segundos
        
        bubbleContainer.appendChild(bubble);
        
        // Remove a bolha após sua animação para evitar acúmulo no DOM
        setTimeout(() => bubble.remove(), parseFloat(bubble.style.getPropertyValue('--speed')) * 1000);
    }
    // Cria uma nova bolha a cada intervalo
    setInterval(createBubble, 500); // Nova bolha a cada 0.5 segundo
});