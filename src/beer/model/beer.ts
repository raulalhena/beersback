import * as fs from 'fs';

export const data = JSON.parse(fs.readFileSync('./data/data.json', 'utf-8'));
