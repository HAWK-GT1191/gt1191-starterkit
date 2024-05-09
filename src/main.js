// Import der Fonts über Fontsource (https://fontsource.org/)
// Rubik 300-900:
import '@fontsource-variable/rubik';

// Import der eigenen Styles
import './styles/main.scss';

// Alles weitere dienst nur zur Demonstration und kann gelöscht werden

// Import und Einbindung des HAWK-Logos im Header
import hawkLogo from 'bundle-text:./images/hawk-gt1191.svg';
let logo = document.createElement('div');
logo.innerHTML = hawkLogo;
document.querySelector('.logo').appendChild(logo);

// Einbindung der Versionsnummer für Footer und Konsole
import packageJson from '../package.json';
document.querySelector('.version').innerHTML = `(v${packageJson.version})`;

// Meldung in der Konsole der Developer Tools:
console.log(
  `%c┌─────────────────────────────────────────┐\n  GT 1191 STARTERKIT (v${packageJson.version})              \n  https://github.com/HAWK-GT1191/gt1191-starterkit\n└─────────────────────────────────────────┘`,
  'background: black; color: limegreen'
);
