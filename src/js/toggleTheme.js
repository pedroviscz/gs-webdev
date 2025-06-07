let currentTheme = 'light';
let themeChangeListeners = [];

const cards = document.querySelectorAll('.technologyCard');
const wokwi = document.getElementById('wokwi');
const github = document.getElementById('github');
const isMobile = window.innerWidth < 768;
const linkNavs = document.querySelectorAll('.navLink');
const nav = document.querySelector('header');
const navMenu = document.querySelector('.nav-menu');
const logoImg = document.getElementById('logo');
const sun = document.getElementById('light');
const moon = document.getElementById('dark');
const cloud = document.getElementById('cloud');

function updateIcon(element, name, isnight) {
  if (element) {
    element.src = `src/assets/img/${name}-${isnight ? 'dark' : 'light'}.png`;
  }
}

export function toggleTheme() {
  if (isMobile) {
    linkNavs.forEach((link) => link.classList.add('darkText'));
    navMenu.classList.add(`${currentTheme}Bg`);
    updateIcon(logoImg, 'logo', false);
    updateIcon(sun, 'sun', true);
    updateIcon(moon, 'moon', true);
    updateIcon(cloud, 'cloud', true);
  }
  const updateTheme = (bgColor, color, theme) => {
    document.body.style.backgroundColor = bgColor;
    document.body.style.color = color;
    currentTheme = theme;
    const isLightOrCloud = theme === 'light' || theme === 'cloud';

    if (isMobile) {
      nav.classList.remove('lightBg', 'darkBg');
      nav.classList.add(`${currentTheme}Bg`);
      navMenu.style.backgroundColor = bgColor;
      updateIcon(sun, 'sun', isLightOrCloud);
      updateIcon(moon, 'moon', isLightOrCloud);
      updateIcon(cloud, 'cloud', isLightOrCloud);
      linkNavs.forEach((link) =>
        link.classList.toggle('darkText', isLightOrCloud)
      );
    }

    github.src = `src/assets/svgs/${
      isLightOrCloud ? 'dark' : 'light'
    }-github.svg`;
    wokwi.src = `src/assets/img/wokwi-${isLightOrCloud ? 'dark' : 'light'}.png`;

    const hoverClass = `cardHover${isLightOrCloud ? 'Dark' : 'Light'}`;

    cards.forEach((c) => {
      c.classList.remove(
        'lightCardBorder',
        'darkCardBorder',
        'cloudCardBorder'
      );
      c.classList.add(`${theme}CardBorder`);

      if (c.id === 'wokwiCard' || c.id === 'githubCard') {
        c.classList.remove('cardHoverLight', 'cardHoverDark');
        c.classList.add(hoverClass);
      }
    });

    themeChangeListeners.forEach((cb) => cb(theme));
  };

  document.getElementById('lightTheme').addEventListener('click', function () {
    updateTheme('#ffffff', '#000000', 'light');
  });

  document.getElementById('darkTheme').addEventListener('click', function () {
    updateTheme('#121212', '#f0f0f0', 'dark');
  });

  document.getElementById('cloudTheme').addEventListener('click', function () {
    updateTheme('#a3b1c6', '#1a1a1a', 'cloud');
  });
}

export function getCurrentTheme() {
  return currentTheme;
}

export function onThemeChange(callback) {
  themeChangeListeners.push(callback);
}
