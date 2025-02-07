import hawkLogo from 'bundle-text:../assets/hawk-gt1191.svg';
import { version, homepage } from '../../package.json';

export function demoMode() {
  // The HAWK GT 1191 Logo will be embeded in the DOM
  const logoEl = document.createElement('div');
  logoEl.classList.add('logo');
  logoEl.innerHTML = hawkLogo + '<span>Singlepager</span>';
  document.querySelector('.header').prepend(logoEl);

  // Message in the console
  console.log(
    '%c%s\n%c%s\n%cv%s\n%s\n%c%s',
    'font-size: 0.75rem; color: limegreen',
    '─────────────────────────────────────────────────┐',
    'font-size: 1.125rem; color: limegreen',
    'Website-Starterkit',
    'font-size: 0.75rem',
    version,
    homepage,
    'font-size: 0.75rem; color: limegreen',
    '─────────────────────────────────────────────────┘'
  );
}
