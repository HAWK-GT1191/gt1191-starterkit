#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import prompts from 'prompts';
import colors from 'picocolors';
import { version } from '../package.json';
import { execSync } from 'child_process';

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

const defaultTargetDir = 'website-starterkit';

let targetDir = defaultTargetDir;

const projectNamePattern = /^[a-z0-9-]+$/;

const cwd = process.cwd();

const { dim, blueBright, green, greenBright, red, yellow, italic, bold } = colors;

const templates: Template[] = [
  {
    title: 'Playground',
    value: 'playground',
    color: yellow,
    description: 'Zum Lernen von HTML und CSS',
  },
  {
    title: 'Multipager',
    value: 'multipager',
    color: blueBright,
    description: 'Website mit Unterseiten',
  },
  {
    title: 'Onepager',
    value: 'onepager',
    color: greenBright,
    description: 'Website mit nur einer Seite',
  },
];

const welcomeMessage = `\

────────────────────────────┐
${bold('Website-Starterkit')}
${dim('Version: ' + version)}
────────────────────────────┘

Was möchtest du nutzen?`;

(async () => {
  const currentDir = path.join(cwd);

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
          message: `Wo soll das Projekt gespeichert werden?\n${italic(dim('Du bist hier: ' + currentDir))}`,
          choices: [
            { title: 'Neuen Ordner anlegen', value: 'newfolder' },
            { title: 'Im aktuellen Verzeichnis', value: 'current' },
          ],
          onState: (state) => {
            if (state.value === 'current') {
              targetDir = '.';
            }
          },
        },
        {
          type: () => (!fs.existsSync(targetDir) || isEmpty(targetDir) ? null : 'select'),
          name: 'overwrite',
          message: () =>
            (targetDir === '.' ? 'Das aktuelle Verzeichnis' : `Das Verzeichnis „${targetDir}“`) +
            ' ist nicht leer. Wie möchetst du fortfahren?',
          initial: 0,
          choices: [
            { title: 'Abbrechen', value: 'no' },
            { title: 'Dateien löschen und fortfahren', value: 'yes' },
            { title: 'Dateien ignorieren und fortfahren', value: 'ignore' },
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
    console.error(red(`\nDie Installation wurde abgebrochen.`) + `\n${error}`);
    process.exit(1);
  }

  const { template, overwrite, projectName } = result;
  const root = path.join(cwd, targetDir);

  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent);
  let pkgManager = pkgInfo ? pkgInfo.name : 'npm';

  // Check for yarn version
  let yarnVersion = 1;

  try {
    const yarnVersionOutput = execSync('yarn --version').toString().trim();
    yarnVersion = parseInt(yarnVersionOutput.split('.')[0], 10);
  } catch (error) {}

  if (pkgManager === 'yarn' && yarnVersion >= 3) {
    pkgManager = 'yarn@berry';
  }

  if (overwrite === 'yes') {
    emptyDir(root);
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true });
  }

  console.log(`\nDein Projekt wird angelegt in ${root}…`);

  const templateDir = path.resolve(fileURLToPath(import.meta.url), '../../templates', template);

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
  const ignoreFilesAndFolders = [
    'package.json',
    'pnpm-lock.yaml',
    'node_modules',
    'dist',
    '.parcel-cache',
    '.DS_Store',
  ];

  for (const file of templateFiles) {
    const filePath = path.join(templateDir, file);
    const stat = fs.statSync(filePath);

    if (!ignoreFilesAndFolders.includes(file) && !(stat.isDirectory() && ignoreFilesAndFolders.includes(file))) {
      write(file);
    }
  }

  // package.json is copied separately to be able to modify it
  const pkg = JSON.parse(fs.readFileSync(path.join(templateDir, 'package.json'), 'utf-8'));

  pkg.name = projectName;

  // Rewrite scripts in package.json to set the used package manager
  const scripts = pkg.scripts;
  for (const scriptName in scripts) {
    let script = scripts[scriptName];
    // Replace 'pnpm run' with the detected package manager
    script = script.replace(/pnpm run/g, `${pkgManager} run`);
    scripts[scriptName] = script;
  }

  write('package.json', JSON.stringify(pkg, null, 2));

  const cdProjectName = path.relative(cwd, root);
  console.log(`\n${green('✔')} Das Projekt ${green(projectName)} wurde erfolgreich angelegt.\n`);

  console.log(yellow(`\nFühre im Terminal nun folgende Befehle aus:\n`));
  if (root !== cwd) {
    console.log(`  cd ${cdProjectName.includes(' ') ? `"${cdProjectName}"` : cdProjectName}`);
  }
  switch (pkgManager) {
    case 'yarn':
      console.log('  yarn');
      console.log('  yarn dev');
      break;
    case 'yarn@berry':
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

function pkgFromUserAgent(userAgent: string | undefined): { name: string; version: string } | undefined {
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
