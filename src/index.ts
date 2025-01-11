#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import prompts from 'prompts';
import colors from 'picocolors';
import { version } from '../package.json';

type ColorFunc = (str: string | number) => string;

interface Template {
  title: string;
  value: string;
  color: ColorFunc;
  description: string;
}

const renameFiles: Record<string, string | undefined> = {
  _gitignore: '.gitignore',
};

const defaultTargetDir = 'gt1191-projekt';

let targetDir = defaultTargetDir;

const projectNamePattern = /^[a-z0-9-]+$/;

const cwd = process.cwd();

const { dim, inverse, blueBright, green, greenBright, red, yellow } = colors;

const templates: Template[] = [
  {
    title: 'Multipager',
    value: 'multipager',
    color: blueBright,
    description: 'Projekt mit mehreren Unterseiten',
  },
  {
    title: 'Onepager',
    value: 'onepager',
    color: greenBright,
    description: 'Projekt mit einer einzigen Seite',
  },
  {
    title: 'Playground',
    value: 'playground',
    color: yellow,
    description: 'Leeres Projekt zum Experimentieren',
  },
];

const welcomeMessage = `\

┌─────────────────────────────────────────┐
  ${inverse('GT1191 Starterkit')}
  ${dim('Version: ' + version)}
└─────────────────────────────────────────┘

Womit möchtest du starten?`;

(async () => {
  // const argTargetDir = process.argv[2];

  let result: prompts.Answers<'template' | 'projectName' | 'overwrite'>;

  try {
    result = await prompts(
      [
        {
          type: 'select',
          name: 'template',
          message: welcomeMessage,
          choices: templates.map((template) => {
            const templateColor = template.color;
            return {
              title: templateColor(template.title),
              value: template.value,
              description: template.description,
            };
          }),
        },
        {
          type: 'text',
          name: 'projectName',
          message: 'Wie soll dein Projekt heißen?',
          initial: defaultTargetDir,
          format: (value) => value.toLowerCase().split(' ').join('-'),
          validate: (value) =>
            projectNamePattern.test(value)
              ? true
              : 'Der Projektname darf nur Kleinbuchstaben und Bindestriche enthalten. Verzichte bitte auf Umlaute und Sonderzeichen',
          onState: (state) => {
            targetDir = state.value || defaultTargetDir;
          },
        },
        {
          type: 'select',
          name: 'currentdir',
          message: 'Soll ein neues Verzeichnis angelegt werden?',
          choices: [
            { title: 'Ja', value: 'yes' },
            { title: 'Nein', value: 'no' },
          ],
          onState: (state) => {
            if (state.value === 'no') {
              targetDir = '.';
            }
          },
        },
        {
          type: () => (!fs.existsSync(targetDir) || isEmpty(targetDir) ? null : 'select'),
          name: 'overwrite',
          message: () =>
            (targetDir === '.'
              ? 'Das aktuelle Verzeichnis'
              : `Das Verzeichnis „${targetDir}“`) +
            ' ist nicht leer. Wie möchetst du fortfahren?',
          initial: 0,
          choices: [
            { title: 'Abbrechen', value: 'no' },
            { title: 'Dateien löschen und fortfahren', value: 'yes' },
            { title: 'Datein ignorieren und fortfahren', value: 'ignore' },
          ],
        },
        {
          type: (_, { overwrite }: { overwrite?: string }) => {
            if (overwrite === 'no') {
              throw new Error(red('✖') + ' Abgebrochen');
            }
            return null;
          },
          name: 'overwriteChecker',
        },
      ],
      {
        onCancel: () => {
          throw new Error(red('✖') + ' Abgebrochen');
        },
      }
    );
  } catch (error) {
    console.error(red(`\nFehler beim Erstellen des Projekts.`) + `\n${error}`);
    process.exit(1);
  }

  const { template, overwrite, projectName } = result;

  const root = path.join(cwd, targetDir);

  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent);
  const pkgManager = pkgInfo ? pkgInfo.name : 'npm';

  if (overwrite === 'yes') {
    emptyDir(root);
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true });
  }

  console.log(`\nDein Projekt wird angelegt in ${root}…`);

  const templateDir = path.resolve(
    fileURLToPath(import.meta.url),
    '../../templates',
    template
  );

  const write = (file: string, content?: string) => {
    const targetPath = path.join(root, renameFiles[file] ?? file);

    if (content) {
      fs.writeFileSync(targetPath, content);
    } else {
      copy(path.join(templateDir, file), targetPath);
    }
  };

  // Copy all files from the template directory to the target directory
  const templateFiles = fs.readdirSync(templateDir);
  const ignoreFiles = ['package.json', 'pnpm-lock.yaml'];
  for (const file of templateFiles.filter((f) => !ignoreFiles.includes(f))) {
    write(file);
  }

  // package.json is copied separately to be able to modify it
  const pkg = JSON.parse(
    fs.readFileSync(path.join(templateDir, 'package.json'), 'utf-8')
  );

  pkg.name = projectName;

  write('package.json', JSON.stringify(pkg, null, 2));

  const cdProjectName = path.relative(cwd, root);
  console.log(
    `\n${green('✔')} Das Projekt ${green(projectName)} wurde erfolgreich angelegt.\n`
  );

  console.log(yellow(`\nFühre im Terminal nun folgende Befehle aus:\n`));
  if (root !== cwd) {
    console.log(
      `  cd ${cdProjectName.includes(' ') ? `"${cdProjectName}"` : cdProjectName}`
    );
  }
  switch (pkgManager) {
    case 'yarn':
      console.log('  yarn');
      console.log('  yarn dev');
      break;
    default:
      console.log(`  ${pkgManager} install`);
      console.log(`  ${pkgManager} run dev`);
      break;
  }
})();

function isEmpty(path: string): boolean {
  const files = fs.readdirSync(path);
  return files.length === 0 || (files.length === 1 && files[0] === '.git');
}

function pkgFromUserAgent(
  userAgent: string | undefined
): { name: string; version: string } | undefined {
  if (!userAgent) return undefined;
  const pkgSpec = userAgent.split(' ')[0];
  const pkgSpecArr = pkgSpec.split('/');
  return {
    name: pkgSpecArr[0] || '',
    version: pkgSpecArr[1] || '',
  };
}

function emptyDir(dir: string): void {
  if (!fs.existsSync(dir)) {
    return;
  }
  for (const file of fs.readdirSync(dir)) {
    if (file === '.git') {
      continue;
    }
    fs.rmSync(path.resolve(dir, file), { recursive: true, force: true });
  }
}

function copy(src: string, dest: string): void {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const file of fs.readdirSync(src)) {
      copy(path.join(src, file), path.join(dest, file));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}
