const teams = [
  { name: 'AS Nogent', played: 18, wins: 13, draws: 3, losses: 2, diff: '+24', points: 42 },
  { name: 'FC Val-de-Marne', played: 18, wins: 11, draws: 4, losses: 3, diff: '+16', points: 37 },
  { name: 'Inter Nogent', played: 18, wins: 10, draws: 5, losses: 3, diff: '+13', points: 35, isClub: true },
  { name: 'US des Bords de Marne', played: 18, wins: 9, draws: 3, losses: 6, diff: '+7', points: 30 },
  { name: 'Olympique de l’Est', played: 18, wins: 7, draws: 4, losses: 7, diff: '+1', points: 25 },
  { name: 'FC du Plateau', played: 18, wins: 5, draws: 3, losses: 10, diff: '−12', points: 18 },
];

const fixtures = [
  { day: 'SAM. 14 MARS', time: '14:30', opponent: 'FC Val-de-Marne', venue: 'DOMICILE' },
  { day: 'DIM. 22 MARS', time: '15:00', opponent: 'US des Bords de Marne', venue: 'EXTÉRIEUR' },
  { day: 'SAM. 04 AVRIL', time: '14:30', opponent: 'Olympique de l’Est', venue: 'DOMICILE' },
  { day: 'DIM. 12 AVRIL', time: '15:00', opponent: 'FC du Plateau', venue: 'EXTÉRIEUR' },
];

const standingsBody = document.querySelector('#standings-body');
if (standingsBody) {
  standingsBody.innerHTML = teams.map((team, index) => `
    <tr class="${team.isClub ? 'is-club' : ''}">
      <td>${String(index + 1).padStart(2, '0')}</td>
      <td>${team.name}${team.isClub ? '<span class="club-pill">NOUS</span>' : ''}</td>
      <td>${team.played}</td><td>${team.wins}</td><td>${team.draws}</td><td>${team.losses}</td><td>${team.diff}</td><td>${team.points}</td>
    </tr>`).join('');
}

const fixturesList = document.querySelector('#fixtures-list');
if (fixturesList) {
  fixturesList.innerHTML = fixtures.map((fixture) => `
    <article class="fixture">
      <div class="fixture-date"><strong>${fixture.day.slice(0, 3)}</strong>${fixture.day.slice(5)}</div>
      <div class="fixture-team home"><span class="mini-crest">IN</span> INTER NOGENT</div>
      <div class="fixture-team fixture-opponent">${fixture.opponent}</div>
      <div class="fixture-meta"><strong>${fixture.time}</strong>${fixture.venue}</div>
    </article>`).join('');
}

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('#main-nav');
if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Ouvrir le menu' : 'Fermer le menu');
    mainNav.classList.toggle('is-open', !isOpen);
  });
  mainNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Ouvrir le menu');
    mainNav.classList.remove('is-open');
  }));
}

const form = document.querySelector('#contact-form');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const subject = encodeURIComponent(`Message pour l'Inter Nogent — ${formData.get('name')}`);
    const body = encodeURIComponent(`${formData.get('message')}\n\nRéponse à : ${formData.get('email')}`);
    // Remplacez cette adresse par l'adresse officielle du club.
    window.location.href = `mailto:contact@inter-nogent.fr?subject=${subject}&body=${body}`;
  });
}

const year = document.querySelector('#current-year');
if (year) year.textContent = new Date().getFullYear();
