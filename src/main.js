// Import der Fonts über Fontsource (https://fontsource.org/)
// Rubik 300-900:
import '@fontsource-variable/rubik';

// Import der eigenen Styles
import './styles/main.css';

/*
┌──────────────────────────────────┐
  NUR ZUR DEMO
└──────────────────────────────────┘

Alle folgenden Zeilen dienen nur zur Demonstration und können gelöscht werden.

Es soll dir zeigen, wie du ein SVG-Logo direkt einbinden kannst, ohne dies im HTML zu tun. Des weiteren wird die Versionsnummer des Projekts im Footer und in der Konsole der Developer Tools deines Browsers ausgegeben. Auch das darfst du gern entfernen, wenn du es nicht benötigst.
*/

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
