import fs from 'fs/promises';

export default async function loadWordsJSON(url) {
  const buf = await fs.readFile(url);
  const json = await JSON.parse(buf);
  return Object.keys(json);
}
