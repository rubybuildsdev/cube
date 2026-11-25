import fs from 'fs';
import path from 'path';
import { translations } from '../src/utils/i18n.js';

function getKeys(obj, prefix = '') {
  let keys = [];
  for (const k in obj) {
    const full = prefix ? prefix + '.' + k : k;
    if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
      keys = keys.concat(getKeys(obj[k], full));
    } else {
      keys.push(full);
    }
  }
  return keys;
}

const enKeys = new Set(getKeys(translations.en));

function walk(dir) {
  let res = [];
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      if (f !== 'node_modules' && f !== 'dist' && f !== '.git') res = res.concat(walk(p));
    } else if (f.endsWith('.jsx') || f.endsWith('.js')) {
      res.push(p);
    }
  }
  return res;
}

const files = walk('./src');
const tRegex = /\bt\(\s*['"]([^'"`${}]+)['"]/g;
let foundKeys = new Set();
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = tRegex.exec(content)) !== null) {
    foundKeys.add(match[1]);
  }
}

function checkDict(keys, dict) {
  const missing = [];
  for (const k of keys) {
    const parts = k.split('.');
    let curr = dict;
    let ok = true;
    for (const p of parts) {
      if (curr && typeof curr === 'object' && p in curr) {
        curr = curr[p];
      } else {
        ok = false;
        break;
      }
    }
    if (!ok) {
      missing.push(k);
    }
  }
  return missing;
}

const missingInEn = checkDict(foundKeys, translations.en);
const missingInId = checkDict(foundKeys, translations.id);

console.log('Keys used in components:', foundKeys.size);
console.log('Keys not found in translations.en:', missingInEn);
console.log('Keys not found in translations.id:', missingInId);

if (missingInEn.length > 0 || missingInId.length > 0) {
  process.exit(1);
}
