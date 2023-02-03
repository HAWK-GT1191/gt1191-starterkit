// Import von Resourcen, die wir nutzen möchten:
import './styles/app.scss';
import hawkLogo from 'bundle-text:./assets/images/hawk-gt1191.svg';
import packageJson from '../package.json';

// Meldung in der Konsole den Developer Tools vom Browser:
console.log(
  `%c┌─────────────────────────────────────────┐\n  GT 1191 STARTERKIT (v${packageJson.version})              \n  https://github.com/HAWK-GT1191/gt1191-starterkit\n└─────────────────────────────────────────┘`,
  'background: black; color: limegreen'
);

// So wird das importierte Logo eingebunden:
let logo = document.createElement('div');
logo.innerHTML = hawkLogo;
document.querySelector('.logo').appendChild(logo);

// Dies setzt die Versionsnummer in den Footer:
document.querySelector('.version').innerHTML = `(v${packageJson.version})`;
