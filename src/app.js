import './styles/app.scss';

// Import des Logos als String
import hawkLogo from 'bundle-text:./assets/images/hawk-gt1191.svg';
let logo = document.createElement('div');
logo.innerHTML = hawkLogo;
document.querySelector('.logo').appendChild(logo);

// Meldung in der Konsole der Developer Tools vom Browser
console.log('Dein GT 1191 Starterkit funktioniert!');
