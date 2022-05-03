# GT 1191 Starterkit

Mit diesem Starterkit des Seminars [GT 1191](https://hawk-gt1191.de/) der Hochschule für angewandte Wissenschaft und Kunst (HAWK) kannst du im Handumdrehen neue Websites entwickeln.

Wir nutzen das Build-Tool [Parcel](https://parceljs.org/) mit [Sass](https://parceljs.org/languages/sass/) und [PostHTML](https://parceljs.org/languages/html/#posthtml), um Multi-Page-Websites mit Includes zu unterstützen.

## Voraussetzungen

Um mit diesem Starterkit/Repository arbeiten zu können, solltest du auf deinem Rechner Node und Yarn installieren, falls noch nicht geschehen:

- Lade dir den [Node.js-Installer](https://nodejs.org/en/download/) für dein System runter und führe die Installation durch.
- Öffne das Terminal (Mac) bzw. die PowerShell (Windows).
- Führe dort die folgenden Befehle aus. Mit ihnen kannst du die erfolgreiche Installation von Node.js überprüfen (1), Yarn installieren (2) und auch dessen Installation überprüfen (3).

```shell
$ npm -v
$ npm install -g yarn
$ yarn -v
```

Optional sollest du dir auch Git [installieren](https://git-scm.com/downloads) und [einrichten](https://docs.github.com/en/get-started/getting-started-with-git/setting-your-username-in-git), um noch schneller eine neue Website mit diesem Starterkit aufsetzen zu können.

## Installation

Wechle im Terminal / in der PowerShell in dein Projektverzeichnis und lade dir eine Kopie herunter, das nennt sich in Git „klonen”. Installiere anschließend mit Yarn die Abhängigkeiten.

_Wir verwenden hier beispielhaft `Projects` für deinen Projektordner und `neue-website` für die Kopie._

```sh
$ cd Projects
$ git clone git@github.com:HAWK-GT1191/gt1191-starterkit.git neue-website
$ cd neue-website
$ yarn install
```

### Manuelle Installation

Solltest du Git nicht verwenden (wollen), lade dir bitte dieses Repository als [ZIP-Datei](https://github.com/HAWK-GT1191/gt1191-starterkit/archive/refs/heads/main.zip) runter und entpacke es.

- Kopiere dir das Verzeichnis `gt1191-starterkit-main` in deinen Projektordner und benenne es z.B. in `neue-webiste` um.
- Führe dann die o.g. Installation (ohne `git clone`) durch.

## Entwicklung

Ist das Starterkit eingerichtet, kannst du mit der Entwicklung deiner Website anfangen. Folgende Verzeichnisse sind dabei zu beachten.

- `src`\
  ist dein Arbeitsverzeichnis und enhält die Startseite `index.html`, sowie eine Unterseiten.
- `styles`\
  enhält die Stylesheet-Datei `app.scss`, die Parcel in CSS umwandelt und in deine Website einbindet. Hier findest du auch `_presets.scss`, die deine Website vorformatiert. Diese Datei kannst du löschen, weiterverwenden oder dir Teile daraus kopieren. Eingebunden wird diese über `@use` im Stylesheet.
- `assets`\
  enthält die Schriftart [Roboto](https://fonts.google.com/specimen/Roboto) und ein Beispielbild von Unsplash. Beide sind bereits eingebunden, damit du weißt, wie das funktioniert.
- `components`\
  enhält HATML-Snippets (Codeschnipsel), die du mittels `<include>` in deine Website einbinden kannst. Praktisch für den Header oder Footer deiner Website, den du auf jeder Unterseite wiederverwenden möchtest.

### Entwicklungsserver starten

Starte nun Parcel mit dem folgenden Befehl. Dieser erstellt einen Webserver und öffnet deine Website in deinem Browser. Solltest du Änderungen vornehmen, werden diese automatisch angezeigt, ohne dass du die Seite im Browser neu laden musst.

```shell
$ yarn dev --open
```

### Bilder verwenden

Parcel unterstützt von Haus aus die Einbindung und Optimierung von Bildern. Nutze dazu bitte das Beispiel aus der `index.html`, sowie die [Image-Dokumentation](https://parceljs.org/recipes/image/).

_Vorsicht: Das Beispiel ist nicht responsiv oder mobil-optimiert. Es zeigt dir aber, wie du verschiedene Bildformate nutzen kannst._

### Website veröffentlichen

Wenn du deine Website veröffentlichen möchtest, muss diese einmal „gebacken” werden. Folgender Befehl startet den Build-Prozess und legt das Ergebnis im Verzeichnis `dist` ab. Dessen Inhalt kannst du dann mit FTP oder SSH auf deinen Webserver hochladen.

```shell
$ yarn build
```
