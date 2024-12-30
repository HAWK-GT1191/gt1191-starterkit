// Import der Fonts über Fontsource (https://fontsource.org/)
// Schriftart Rubik, Schriftschnitte 300-900.
// Tutorial zur Anwendung findest du hier:
// https://hawk-gt1191.de/tutorials/webfonts-schriften-einbinden
import '@fontsource-variable/rubik';

// Import der eigenen Styles
import './styles/app.css';

/*
┌──────────────────────────────────┐
  NUR ZUR DEMO – BITTE ENTFERNEN!
└──────────────────────────────────┘
*/

// Einbindung des HAWK-Logos im Header über JavaScript statt über HTML.
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

/*
┌──────────────────────────────────┐
  PLATZ FÜR DEINEN CODE…
└──────────────────────────────────┘
*/
