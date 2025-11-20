<h1>Website Starterkit</h1>

Mit dem Starterkit des Seminars [GT 1191](https://hawk-gt1191.de/) der HAWK Hochschule für angewandte Wissenschaft und Kunst kannst du im Handumdrehen neue Websites entwickeln.

Das Starterkit nutzt das Build-Tool [Parcel](https://parceljs.org/) und ist vorkonfiguriert mit [CSS Nesting und Custom media queries](https://parceljs.org/languages/css/#draft-syntax) sowie [PostHTML](https://parceljs.org/languages/html/#posthtml) für die Erstellung von reponsiven websites (mobile first).

## Voraussetzungen

Um mit dem Starterkit arbeiten zu können, musst du vorab den Paketmanager Node.js auf deinem Computer installieren:

[Zur Installationsanleitung](https://starterguide.dev)

## Ein neues Projekt starten

Das Starterkit hilft dir, ein Projekt für eine neue Website zu erstellen. Führe den folgenden Befehl im Terminal aus, wenn du eine neue Website anlegen möchtest:

```shell
npm create website-starterkit
```

Du wirst hier Schritt für Schritt durch den Prozess geführt.

### Updates

Vom Starterkit werden regelmäßig Updates veröffentlicht, um neue Funktionen, Verbesserungen und Fehlerbehebungen bereitzustellen. Wenn auch du die aktuellste Version des Starterkits verwenden möchtest, kannst du dies ganz einfach tun. Führe dazu folgenden Befehl im Terminal aus:

```shell
npm install -g create-website-starterkit@latest
```

Danach reicht für neue Projekte wieder der kurze Befehl von oben.

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

Weitere Informationen zur Struktur, den Varianten und den Möglichkeiten findest du in der [Dokumentation](https://starterguide.dev).

### Website veröffentlichen

Wenn du deine Website auf deinem eigenen Webserver veröffentlichen möchtest, muss diese einmal „gebacken” (build) werden. Folgender Befehl startet den Build-Prozess und legt das Ergebnis einer statischen Website im Verzeichnis `dist` ab.

```shell
npm run build
```

Lade die Inhalte aus dem Verzeichnis `dist` nun mit einem FTP-Programm oder SSH auf deinem Webserver hoch.

#### Website zur Bewertung abgeben

Wenn du deine Website zur Bewertung oder Benotung abgeben möchtest, verwende folgenden Befehl:

```shell
npm run deliver
```

Benenne jetzt das Verzeichnis `dist` nach dem Schema `vorname-nachname-matrikelnummer` mit deinen Daten um und erstelle daraus ein ZIP-Archiv. Dieses Archiv kannst du nun hochladen oder per E-Mail versenden.
