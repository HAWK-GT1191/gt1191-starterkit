<h1>GT 1191 Starterkit</h1>

Mit dem Starterkit des Seminars [GT 1191](https://hawk-gt1191.de/) der Hochschule für angewandte Wissenschaft und Kunst (HAWK) kannst du im Handumdrehen neue Websites entwickeln.

Das Starterkit nutzt das Build-Tool [Parcel](https://parceljs.org/) und ist vorkonfiguriert mit [CSS Nesting und Custom media queries](https://parceljs.org/languages/css/#draft-syntax) sowie [PostHTML](https://parceljs.org/languages/html/#posthtml) für die Erstellung von reponsiven Single- und Multi-Page-Websites.

![Build CI](https://github.com/HAWK-GT1191/gt1191-starterkit/actions/workflows/release.yml/badge.svg)

## Voraussetzungen

Um mit dem Starterkit arbeiten zu können, musst du vorab den Paketmanager Node.js auf deinem Computer installieren:

[Zur Installationsanleitung](https://starterguide.dev)

## Ein neues Projekt starten

Um mit dem Starterkit loszulegen, musst du ein neues Projekt anlegen. Führe den folgenden Befehl im Terminal aus:

```shell
npm create gt1191-starterkit
```

Du wirst hier Schritt für Schritt durch den Prozess geführt.

## Entwicklung

Ist das Starterkit eingerichtet, kannst du mit der Entwicklung deiner Website anfangen. Der folgende Befehl startet einen Webserver, erstellt einen „Build“ deiner Website im Verzeichnis `dist`, öffnet diesen im Browser und zeigt Datenänderungen ohne Reload an:

```shell
npm run dev
```

> Lässt sich das Starterkit im Fehlerfall – zum Beispiel nach dem Kopieren – nicht starten, gebe einmalig `npm run clean` in das Terminal ein.

### Datei- und Verzeichnisstruktur

Folgende Verzeichnisse sind dabei zu beachten.

- `src`\
  Das ist dein Arbeitsverzeichnis und enthält die das Template der Startseite `index.html`, sowie deine Unterseiten. Portfolio ist als Beispiel eingebunden.
- `src/snippets`\
  enthält die HTML-Snippets (Codeschnipsel), die du mittels `<include>` in deine Website einbinden kannst. Praktisch für den Header oder Footer deiner Website, wenn du diese auf jeder Unterseite wiederverwenden möchtest.
- `src/styles`\
  enthält die Stylesheet-Datei `main.css`, in der alle anderen CSS-Dateien zur besseren Organistation importiert werden. Daraus entsteht am Ende eine große CSS-Datei. Alle Vorgabgen darfst (und solltest) du gern anpassen oder ganz löschen.
- `src/images`\
  enthält ein paar Beispielbilder (u.&#8239;a. von [Unsplash](https://unsplash.com/de)). Diese sind bereits in die Website eingebunden, damit du sehen kannst, wie das funktioniert.

### Verwendung von Bildern

Das Starterkit unterstützt von Haus aus die Einbindung und Optimierung von Bildern. Nutze dazu bitte dafür die Beispiele und lese dir die [Image-Dokumentation](https://parceljs.org/recipes/image/) durch.

_Vorsicht: Das Beispiel ist nicht responsiv oder mobil-optimiert. Es zeigt dir aber, wie du verschiedene Bildformate nutzen kannst._

### Website veröffentlichen/versenden

Wenn du deine Website auf deinem eigenen Webserver veröffentlichen möchtest, muss diese einmal „gebacken” (build) werden. Folgender Befehl startet den Build-Prozess und legt das Ergebnis einer statischen Website im Verzeichnis `dist` ab. Dessen Inhalt kannst du dann mit FTP oder SSH auf deinen Webserver hochladen.

```shell
$ yarn build
```

Möchtest du deine Website zur Bewertung oder Benotung abgeben, verwende folgenden Befehl, um die Dateigröße vor dem zippen zu minimieren.

```shell
$ yarn deliver
```

Mit `yarn install` kannst du anschließend wieder weiterarbeiten.

```shell
$ npm run build
```
