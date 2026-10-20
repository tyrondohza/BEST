const card = document.getElementById('examCard');
const confettiLayer = document.querySelector('.confetti-layer');
const floatingHeartsLayer = document.querySelector('.floating-hearts');
const themeButtons = document.querySelectorAll('.theme-btn');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let audioCtx;

function launchFloatingHeart() {
  if (!floatingHeartsLayer || reducedMotion.matches) return;

  const heart = document.createElement('span');
  heart.className = 'floating-heart';
  heart.textContent = '♥';
  heart.style.top = `${8 + Math.random() * 84}%`;
  heart.style.setProperty('--heart-size', `${16 + Math.random() * 22}px`);
  heart.style.setProperty('--heart-duration', `${9 + Math.random() * 6}s`);

  floatingHeartsLayer.appendChild(heart);
  heart.addEventListener('animationend', () => heart.remove(), { once: true });
}

if (floatingHeartsLayer && !reducedMotion.matches) {
  launchFloatingHeart();
  window.setInterval(launchFloatingHeart, 850);
}

function setTheme(themeName) {
  document.body.setAttribute('data-theme', themeName);
  themeButtons.forEach((button) => {
    const active = button.dataset.theme === themeName;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}

function playOpenSound() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.type = 'triangle';
    oscillator.frequency.value = 880;
    gainNode.gain.value = 0.02;

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.12);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
  } catch (error) {
    console.log('Audio not available');
  }
}

function launchSparkles() {
  if (!confettiLayer) return;

  for (let i = 0; i < 18; i++) {
    const sparkle = document.createElement('span');
    sparkle.className = 'sparkle';

    const x = (Math.random() - 0.5) * 260;
    const y = (Math.random() - 0.5) * 260;
    sparkle.style.left = `${50 + (Math.random() - 0.5) * 15}%`;
    sparkle.style.top = `${50 + (Math.random() - 0.5) * 15}%`;
    sparkle.style.setProperty('--sx', `${x}px`);
    sparkle.style.setProperty('--sy', `${y}px`);
    sparkle.style.background = `radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 35%, rgba(255,255,255,0) 100%)`;

    confettiLayer.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1100);
  }
}

function launchHeartParticles() {
  if (!confettiLayer) return;

  for (let i = 0; i < 24; i++) {
    const heart = document.createElement('span');
    heart.className = 'heart';
    heart.textContent = '♥';
    heart.style.left = `${50 + (Math.random() - 0.5) * 30}%`;
    heart.style.top = `${50 + (Math.random() - 0.5) * 12}%`;
    heart.style.setProperty('--hx', `${(Math.random() - 0.5) * 260}px`);
    heart.style.animationDelay = `${i * 0.04}s`;
    heart.style.fontSize = `${14 + Math.random() * 18}px`;
    heart.style.color = ['#ff8bb7', '#ffd166', '#f9a8d4', '#fca5a5'][i % 4];

    confettiLayer.appendChild(heart);
    setTimeout(() => heart.remove(), 4100);
  }
}

function launchConfetti() {
  if (!confettiLayer) return;

  const colors = ['#ff7eb6', '#ffd166', '#7dd3fc', '#a78bfa', '#f9a8d4', '#f59e0b', '#86efac', '#fda4af'];
  const pieceCount = 120;

  confettiLayer.innerHTML = '';

  for (let i = 0; i < pieceCount; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';

    const x = (Math.random() - 0.5) * 1200;
    const y = (Math.random() * 520) + 50;
    const r = (Math.random() - 0.5) * 840;

    piece.style.background = colors[i % colors.length];
    piece.style.setProperty('--x', `${x}px`);
    piece.style.setProperty('--y', `${y}px`);
    piece.style.setProperty('--r', `${r}deg`);
    piece.style.transform = `translate(${(Math.random() - 0.5) * 200}px, ${(Math.random() - 0.5) * 120}px)`;

    confettiLayer.appendChild(piece);
  }

  launchSparkles();
  launchHeartParticles();

  setTimeout(() => {
    confettiLayer.innerHTML = '';
  }, 2200);
}

if (card) {
  card.addEventListener('click', () => {
    const isFlipped = card.classList.toggle('is-flipped');
    if (isFlipped) {
      launchConfetti();
      playOpenSound();
    }
  });
}

themeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setTheme(button.dataset.theme);
  });
});
