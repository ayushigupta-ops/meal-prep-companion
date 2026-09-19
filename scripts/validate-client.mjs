import worker from '../worker/index.js';

const response = await worker.fetch(new Request('https://example.test/'), {});
if (!response.ok) throw new Error(`Home page returned ${response.status}`);

const html = await response.text();
const match = html.match(/<script>([\s\S]*?)<\/script>/);
if (!match) throw new Error('Client script was not found');

new Function(match[1]);
console.log('Server and browser scripts are valid');
