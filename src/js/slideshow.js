export function slideShow() {
  const img = document.getElementById('slideshow');

  const imagesSrc = [
    'david-huck-6_a4IzF9fYA-unsplash.jpg',
    'sigmund-0dM5sa4zfZ8-unsplash.jpg',
    'kelly-sikkema-_whs7FPfkwQ-unsplash.jpg',
  ];

  let i = 0;
  img.src = `src/assets/img/${imagesSrc[i]}`;

  setInterval(() => {
    img.style.opacity = 0;

    setTimeout(() => {
      i = (i + 1) % imagesSrc.length;
      img.src = `src/assets/img/${imagesSrc[i]}`;

      img.style.opacity = 1;
    }, 500);
  }, 2500);
}
