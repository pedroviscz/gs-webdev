import { getCurrentTheme, onThemeChange } from './toggleTheme.js';

export function headerChange() {
  const isMobile = window.innerWidth < 768;
  const sections = {
    technologies: document.getElementById('technologies'),
    objectives: document.getElementById('objectives'),
    impacted: document.getElementById('impacted'),
    benefits: document.getElementById('benefits'),
    practice: document.getElementById('practice'),
    quiz: document.getElementById('quiz'),
  };

  const headerElements = {
    nav: document.querySelector('header'),
    navLinks: document.querySelectorAll('.navLink'),
    navMenu: document.querySelector('.nav-menu'),
    menuLines: document.querySelectorAll('.line'),
    logoImg: document.getElementById('logo'),
    sun: document.getElementById('light'),
    moon: document.getElementById('dark'),
    cloud: document.getElementById('cloud'),
  };

  function updateIcon(element, name, isDark) {
    if (element) {
      element.src = `src/assets/img/${name}-${isDark ? 'dark' : 'light'}.png`;
    }
  }

  function setHeaderStyle({ bgClass = '', textDark = false }) {
    const { nav, navLinks, logoImg, sun, moon, cloud, menuLines, navMenu } =
      headerElements;

    nav.classList.remove('glassBg', 'lightBg', 'darkBg');
    if (bgClass) {
      nav.classList.add(bgClass);
      if (isMobile) {
        navMenu.classList.remove('lightBg', 'darkBg');
        navMenu.classList.add(
          bgClass === 'glassBg' || bgClass === 'lightBg' ? 'lightBg' : 'darkBg'
        );
        updateIcon(logoImg, 'logo', textDark);
      }
    } else {
      if (isMobile) updateIcon(logoImg, 'logo', false);
    }

    if (!isMobile) {
      navLinks.forEach((link) => link.classList.toggle('darkText', textDark));
      updateIcon(logoImg, 'logo', textDark);
      updateIcon(sun, 'sun', textDark);
      updateIcon(moon, 'moon', textDark);
      updateIcon(cloud, 'cloud', textDark);
    }

    menuLines.forEach((line) => {
      line.classList.remove('lightBg', 'darkBg');
      line.classList.add(textDark ? 'darkBg' : 'lightBg');
    });
  }

  function handleScroll() {
    const techTop = sections.technologies.getBoundingClientRect().top;
    const impactedTop = sections.impacted.getBoundingClientRect().top;
    const benefitsTop = sections.benefits.getBoundingClientRect().top;
    const practiceTop = sections.practice.getBoundingClientRect().top;
    const quizTop = sections.quiz.getBoundingClientRect().top;

    const theme = getCurrentTheme();
    const themedBgClass =
      theme === 'dark' || theme === 'cloud' ? 'darkBg' : 'lightBg';
    const textColorDark = theme === 'dark' || theme === 'cloud'; // texto claro em temas escuros

    if (window.scrollY === 0) {
      setHeaderStyle({});
    } else if (techTop > 0) {
      setHeaderStyle({ bgClass: 'glassBg' });
    } else if (impactedTop > 0) {
      setHeaderStyle({ bgClass: themedBgClass, textDark: !textColorDark });
    } else if (benefitsTop > 0) {
      setHeaderStyle({ bgClass: 'glassBg' });
    } else if (practiceTop > 0) {
      setHeaderStyle({ bgClass: themedBgClass, textDark: !textColorDark });
    } else if (quizTop > 0) {
      setHeaderStyle({ bgClass: 'glassBg' });
    } else {
      setHeaderStyle({ bgClass: themedBgClass, textDark: !textColorDark });
    }
  }

  window.addEventListener('scroll', handleScroll);
  onThemeChange(handleScroll); // reage à mudança de tema
  handleScroll(); // chamada inicial
}
""