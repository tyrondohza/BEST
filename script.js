const card = document.getElementById('examCard');
const confettiLayer = document.querySelector('.confetti-layer');
const floatingHeartsLayer = document.querySelector('.floating-hearts');
const themeButtons = document.querySelectorAll('.theme-btn');
const celebrateButton = document.getElementById('celebrateButton');
const downloadButton = document.getElementById('downloadButton');
const openFriendshipMessages = document.getElementById('openFriendshipMessages');
const friendshipDialog = document.getElementById('friendshipDialog');
const closeFriendshipMessages = document.getElementById('closeFriendshipMessages');
const actionStatus = document.getElementById('actionStatus');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const encouragementMessages = [
  "You have worked so hard to get here. Trust everything you've learned and be proud of how far you've come.",
  'Take a deep breath, take each question one at a time, and remember that you are capable of more than you know.',
  'I believe in you completely—not just because I know how smart you are, but because I have seen your determination.',
  "You don't have to be perfect. Just do your best, and take it one step at a time.",
  "If a question feels tricky, pause, breathe, and come back to it. You've got this.",
  "Your hard work matters, and all the effort you've put in has prepared you for this moment.",
  'Remember to get some rest, drink some water, and be kind to yourself. You deserve that care, too.',
  'One exam doesn’t define you. Your courage, kindness, and determination are part of what makes you amazing.',
  "Whatever happens, you can always count on me. I'm in your corner and cheering you on!",
  "No matter what, I'm already proud of you. You've got this, and I'll be cheering you on every step of the way!",
];
const outingMessage = 'You owe me an outing somewhere nice—you’re paying, and you must show up.';
const downloadThemes = {
  pink: { background: '#fff1f6', accent: '#dc74a4', text: '#542849' },
  gold: { background: '#fff7df', accent: '#bd8722', text: '#513711' },
  dark: { background: '#21182e', accent: '#d5a4ff', text: '#fff0ff' },
  ocean: { background: '#e8f7ff', accent: '#388bc1', text: '#163b59' },
  lavender: { background: '#f4edff', accent: '#9466c4', text: '#42295f' },
  mint: { background: '#ebfff4', accent: '#349b77', text: '#1b4c3c' },
};
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
  const pieceCount = 100;

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
    piece.addEventListener('animationend', () => piece.remove(), { once: true });
  }

  launchSparkles();
  launchHeartParticles();
}

function toggleCard() {
  if (!card) return;

  const isFlipped = card.classList.toggle('is-flipped');
  const cover = card.querySelector('.card-front');
  if (cover) cover.setAttribute('aria-pressed', String(isFlipped));
  if (isFlipped) {
      launchConfetti();
      playOpenSound();
  }
}

if (card) {
  const cover = card.querySelector('.card-front');
  cover?.addEventListener('click', toggleCard);
  cover?.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    toggleCard();
  });
}

if (friendshipDialog instanceof HTMLDialogElement) {
  openFriendshipMessages?.addEventListener('click', () => friendshipDialog.showModal());
  closeFriendshipMessages?.addEventListener('click', () => friendshipDialog.close());
}

if (celebrateButton && confettiLayer) {
  celebrateButton.addEventListener('click', () => {
    const bounds = celebrateButton.getBoundingClientRect();
    const originX = bounds.left + bounds.width / 2;
    const originY = bounds.top + bounds.height / 2;
    const decorations = ['⭐', '✨', '🌟', '💫', '💖', '🎉', '🪄', '💕'];

    if (!reducedMotion.matches) {
      for (let i = 0; i < 100; i++) {
        const particle = document.createElement('span');
        const angle = Math.random() * Math.PI * 2;
        const distance = 140 + Math.random() * Math.max(window.innerWidth, window.innerHeight) * 0.48;
        particle.className = 'celebration-particle';
        particle.textContent = decorations[Math.floor(Math.random() * decorations.length)];
        particle.style.left = `${originX}px`;
        particle.style.top = `${originY}px`;
        particle.style.setProperty('--sx', `${Math.cos(angle) * distance}px`);
        particle.style.setProperty('--sy', `${Math.sin(angle) * distance}px`);
        particle.style.setProperty('--spin', `${(Math.random() - 0.5) * 900}deg`);
        particle.style.setProperty('--delay', `${Math.random() * 160}ms`);
        particle.style.setProperty('--particle-size', `${18 + Math.random() * 20}px`);
        confettiLayer.appendChild(particle);
        particle.addEventListener('animationend', () => particle.remove(), { once: true });
      }
    }

    if (actionStatus) {
      actionStatus.textContent = reducedMotion.matches
        ? 'A little sparkle, just for you ✨'
        : 'A whole lot of sparkle, just for you! ✨';
    }
  });
}

function wrapCanvasText(context, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let line = '';

  words.forEach((word) => {
    const candidate = line ? `${line} ${word}` : word;
    if (line && context.measureText(candidate).width > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  });

  if (line) lines.push(line);
  return lines;
}

function downloadCard() {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) {
    if (actionStatus) actionStatus.textContent = 'Sorry, your card could not be prepared for download.';
    return;
  }

  canvas.width = 1200;
  canvas.height = 2000;
  const theme = downloadThemes[document.body.dataset.theme] || downloadThemes.pink;
  const background = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  background.addColorStop(0, theme.background);
  background.addColorStop(1, '#ffffff');
  context.fillStyle = background;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = theme.accent;
  context.globalAlpha = 0.12;
  context.beginPath();
  context.arc(120, 150, 230, 0, Math.PI * 2);
  context.arc(1110, 1240, 300, 0, Math.PI * 2);
  context.fill();
  context.globalAlpha = 1;

  context.strokeStyle = theme.accent;
  context.lineWidth = 5;
  context.beginPath();
  context.roundRect(48, 48, 1104, canvas.height - 96, 40);
  context.stroke();
  context.lineWidth = 2;
  context.beginPath();
  context.roundRect(68, 68, 1064, canvas.height - 136, 28);
  context.stroke();

  context.textAlign = 'center';
  context.fillStyle = theme.accent;
  context.font = 'bold 26px Arial, sans-serif';
  context.fillText('A LITTLE NOTE BEFORE YOUR EXAMS', 600, 210);

  context.fillStyle = theme.text;
  context.font = 'bold 64px Arial, sans-serif';
  const titleLines = wrapCanvasText(context, 'I Believe in You', 900);
  titleLines.forEach((line, index) => context.fillText(line, 600, 330 + index * 78));

  context.font = '32px Arial, sans-serif';
  context.fillText('YOU HAVE GOT THIS', 600, 460 + (titleLines.length - 1) * 78);

  context.fillStyle = theme.accent;
  context.font = 'bold 28px Arial, sans-serif';
  context.textAlign = 'center';
  let messageY = 535 + (titleLines.length - 1) * 78;
  encouragementMessages.forEach((message, index) => {
    const lines = wrapCanvasText(context, `${index + 1}. ${message}`, 900);
    lines.forEach((line, lineIndex) => {
      context.fillText(line, 600, messageY + lineIndex * 36);
    });
    messageY += lines.length * 36 + 20;
  });

  context.fillStyle = theme.accent;
  context.font = '42px Arial, sans-serif';
  context.fillText('♥   ♥   ♥', 600, messageY + 40);

  const noteY = messageY + 125;
  context.fillStyle = theme.accent;
  context.font = 'bold 26px Arial, sans-serif';
  context.fillText('ONE TINY FAVOR...', 600, noteY);
  context.fillStyle = theme.text;
  context.font = 'bold 30px Arial, sans-serif';
  context.textAlign = 'left';
  const noteLines = wrapCanvasText(context, outingMessage, 880);
  noteLines.forEach((line, index) => context.fillText(line, 160, noteY + 62 + index * 44));

  context.textAlign = 'center';
  context.fillStyle = theme.accent;
  context.font = 'bold 26px Arial, sans-serif';
  context.fillText('BEST FRIENDS, ALWAYS 💖', 600, canvas.height - 100);

  canvas.toBlob((blob) => {
    if (!blob) {
      if (actionStatus) actionStatus.textContent = 'Sorry, your card could not be prepared for download.';
      return;
    }

    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'a-little-note-for-my-best-friend.png';
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
    if (actionStatus) actionStatus.textContent = 'Your card has been downloaded. 💖';
  }, 'image/png');
}

if (downloadButton) {
  downloadButton.addEventListener('click', downloadCard);
}

themeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setTheme(button.dataset.theme);
  });
});
