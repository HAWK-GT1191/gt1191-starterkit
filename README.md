<h1>GT 1191 Starterkit</h1>

Mit diesem Starterkit des Seminars [GT 1191](https://hawk-gt1191.de/) der Hochschule für angewandte Wissenschaft und Kunst (HAWK) kannst du im Handumdrehen neue Websites entwickeln.

Das Starterkit nutzt das Build-Tool [Parcel](https://parceljs.org/) mit [Sass](https://parceljs.org/languages/sass/) sowie [PostHTML](https://parceljs.org/languages/html/#posthtml), ist für responsive Single- und Multi-Page-Websites vorkonfiguriert und nimmt dir viele manuelle Entwicklungsschritte ab.

## Voraussetzungen

Um mit dem Starterkit arbeiten zu können, musst du vorab Git und die Paketmanager Node.js und Yarn auf deinem Computer installieren:

[Zur Installationsanleitung](https://github.com/macx/starterguide.dev/blob/main/de/prerequisits.md)

## Neue Website anlegen

Lade dir die Dateien des Starterkits herunter und lege sie in dem Verzeichnis deiner neuen Website ab.

```shell
# Speichert die Dateien im aktuellen Verzeichnis
$ git clone --depth 1 https://github.com/HAWK-GT1191/gt1191-starterkit.git .

# Speichert die Dateien in einem neuen Verzeichnis
$ git clone --depth 1 https://github.com/HAWK-GT1191/gt1191-starterkit.git neue-website
```

Installiere nun die Abhängigkeiten des Starterkits:

```shell
$ yarn install
```

> Sollte die Installation fehlschlagen, lösche bitte das Verzeichnis `node_modules` und `yarn.lock` und starte die Installation erneut.

## Entwicklung

Ist das Starterkit eingerichtet, kannst du mit der Entwicklung deiner Website anfangen. Der folgende Befehl startet einen Webserver, erstellt einen „Build“ deiner Website im Verzeichnis `dist`, öffnet diesen im Browser und zeigt Datenänderungen ohne Reload an:

```shell
$ yarn dev
```

> Lässt sich das Starterkit im Fehlerfall – zum Beispiel nach dem Kopieren – nicht starten, gebe einmalig `yarn clean` in das Terminal ein.

### Datei- und Verzeichnisstruktur

Folgende Verzeichnisse sind dabei zu beachten.

- `src`\
  Das ist dein Arbeitsverzeichnis und enthält die das Template der Startseite `index.html`, sowie den Unterseiten.
- `src/snippets`\
  enthält HTML-Snippets (Codeschnipsel), die du mittels `<include>` in deine Website einbinden kannst. Praktisch für den Header oder Footer deiner Website, wenn du diese auf jeder Unterseite wiederverwenden möchtest.
- `styles`\
  enthält die Stylesheet-Datei `app.scss`, die das Starterkit in CSS umwandelt und in deine Website einbindet. Hier findest du auch `_presets.scss`, die deine Website für Demo-Zwecke vorformatiert. Diese Datei kannst du löschen, weiterverwenden oder dir Teile daraus kopieren. Eingebunden wird diese über `@use` im Stylesheet.
- `assets`\
  enthält die Schriftart [Roboto](https://fonts.google.com/specimen/Roboto) und Beispielbilder von [Unsplash](https://unsplash.com/de). Diese sind bereits in die Website eingebunden, damit du sehen kannst, wie das funktioniert.

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
