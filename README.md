# GT 1191 Starterkit

Mit diesem Starterkit des Seminars [GT 1191](https://hawk-gt1191.de/) der Hochschule für angewandte Wissenschaft und Kunst (HAWK) kannst du im Handumdrehen neue Websites entwickeln.

Wir nutzen das Build-Tool [Parcel](https://parceljs.org/) mit [Sass](https://parceljs.org/languages/sass/) und [PostHTML](https://parceljs.org/languages/html/#posthtml), um Multi-Page-Websites mit Includes zu unterstützen.

## Voraussetzungen

Damit du mit diesem Starterkit/Repository arbeiten kannst, ist die Installation von Node und yarn nötig. Aber keine Angst: Diesen Schritt musst du nur ein Mal auf deinem Rechner durchführen.

1. Lade dir den [Node.js-Installer](https://nodejs.org/en/download/) für dein System runter und führe die Installation durch.
2. Öffne das Terminal (Mac) bzw. die PowerShell (Windows).
3. Installiere yarn und kontrolliere die erfolgreiche Installation durch folgende Befehle (Ohne `$`):

```shell

$ sudo npm install -g yarn
$ npm -v && yarn -v
```

> Unter Windows musst du die Ausführungsrichtlinien ändern, damit Skripte wie yarn ausgeführt werden dürfen. Gehe dazu in die Einstellungen unter „Datenschutz und Sicherheit / Entwickler / PowerShell” und bestätige dies mit einem Klick auf den Button „Anwenden”.

Installiere dir optional Git, wenn du zukünftig noch schneller Websites mit diesem Starterkit aufsetzen möchtest. Nutze bei Windows bitte den [Installer](https://git-scm.com/download/win) und beim Mac den „Umweg“ über [Homebrew](https://git-scm.com/download/mac). Alternativ kannst du im Mac-Terminal auch `git` eingeben und die vorgeschlagene Installation der Xcode-Essentials durchführen.

## Einrichtung/Installation

Sind die Voraussetzungen erfüllt, kannst du mit der Einrichtung des Starterkits fortfahren. Wechsle dazu in das Terminal bzw. in die PowerShell, lege dir einen Projektordner an und erstelle dir mittels `git clone` eine Kopie dieses Repositories. Installiere anschließend mit Yarn die Abhängigkeiten.

_Wir verwenden hier beispielhaft `Projects` für deinen Projektordner und `neue-website` für deine neue Website._

```sh
$ mkdir ~/Projects && cd ~/Projects
$ git clone https://github.com/HAWK-GT1191/gt1191-starterkit.git neue-website
$ cd neue-website
$ yarn install
```

### Manuelle Installation

Solltest du Git nicht verwenden (wollen), lade dir bitte dieses Repository als [ZIP-Datei](https://github.com/HAWK-GT1191/gt1191-starterkit/archive/refs/heads/main.zip) runter und entpacke es. Kopiere dir das Verzeichnis `gt1191-starterkit-main` in deinen Projektordner und benenne es z.B. in `neue-website` um. Führe dann die o.g. Installation (ohne `git clone`) durch.

## Entwicklung

Ist das Starterkit eingerichtet, kannst du mit der Entwicklung deiner Website anfangen. Folgende Verzeichnisse sind dabei zu beachten.

- `src`\
  ist dein Arbeitsverzeichnis und enhält die Startseite `index.html`, sowie eine Unterseiten.
- `styles`\
  enhält die Stylesheet-Datei `app.scss`, die Parcel in CSS umwandelt und in deine Website einbindet. Hier findest du auch `_presets.scss`, die deine Website vorformatiert. Diese Datei kannst du löschen, weiterverwenden oder dir Teile daraus kopieren. Eingebunden wird diese über `@use` im Stylesheet.
- `assets`\
  enthält die Schriftart [Roboto](https://fonts.google.com/specimen/Roboto) und ein Beispielbild von Unsplash. Beide sind bereits eingebunden, damit du weißt, wie das funktioniert.
- `components`\
  enhält HTML-Snippets (Codeschnipsel), die du mittels `<include>` in deine Website einbinden kannst. Praktisch für den Header oder Footer deiner Website, den du auf jeder Unterseite wiederverwenden möchtest.

### Entwicklungsserver starten

Starte nun Parcel mit dem folgenden Befehl. Dies erstellt einen Webserver und öffnet deine Website in deinem Browser.

```shell
$ yarn dev
```

Wenn du nun Änderungen (in Visual Studio Code) an deiner Website vornimmst, werden diese automatisch in deinem Browser angezeigt, ohne dass du die Seite neu laden musst.

### Bilder verwenden

Parcel unterstützt von Haus aus die Einbindung und Optimierung von Bildern. Nutze dazu bitte das Beispiel aus der `index.html`, sowie die [Image-Dokumentation](https://parceljs.org/recipes/image/).

_Vorsicht: Das Beispiel ist nicht responsiv oder mobil-optimiert. Es zeigt dir aber, wie du verschiedene Bildformate nutzen kannst._

### Website veröffentlichen

Wenn du deine Website veröffentlichen möchtest, muss diese einmal „gebacken” werden. Folgender Befehl startet den Build-Prozess und legt das Ergebnis im Verzeichnis `dist` ab. Dessen Inhalt kannst du dann mit FTP oder SSH auf deinen Webserver hochladen.

```shell
$ yarn build
```
