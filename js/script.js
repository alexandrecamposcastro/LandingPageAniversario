function updateCountdown() {
    const birthday = new Date('January 19, 2026 19:00:00').getTime();
    const now = new Date().getTime();
    const distance = birthday - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

    if (distance < 0) {
        clearInterval(countdownTimer);
        document.querySelector('.countdown').innerHTML = '<div>O aniversário chegou!</div>';
    }
}

function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

function openMap() {
    const address = "Rua das Flores, 123";
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(mapsUrl, '_blank');
}

document.getElementById('rsvpForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const name = formData.get('name');
    alert(`Obrigado, ${name}! Sua presença foi confirmada!`);
    this.reset();
});

const countdownTimer = setInterval(updateCountdown, 1000);
updateCountdown();

const matrix = document.getElementById('matrix');
const ctx = matrix.getContext('2d');
matrix.width = window.innerWidth;
matrix.height = window.innerHeight;

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*";
const charArray = chars.split("");
const font_size = 14;
const columns = matrix.width / font_size;
const drops = [];

for(let x = 0; x < columns; x++)
    drops[x] = 1;

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
    ctx.fillRect(0, 0, matrix.width, matrix.height);
    
    ctx.fillStyle = "#00ff41";
    ctx.font = font_size + "px Share Tech Mono";
    
    for(let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * font_size, drops[i] * font_size);
        
        if(drops[i] * font_size > matrix.height && Math.random() > 0.975)
            drops[i] = 0;
        
        drops[i]++;
    }
}

setInterval(drawMatrix, 35);