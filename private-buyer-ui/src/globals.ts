import { Buffer } from 'buffer';

if (!globalThis.process) {
  // @ts-expect-error — polyfill process for browser
  globalThis.process = {
    env: {
      NODE_ENV: import.meta.env.MODE,
    },
    version: '1.0.0',
    cwd: () => '/',
  };
}

// @ts-expect-error — polyfill browser flag
if (globalThis.process && !globalThis.process.browser) {
  // @ts-expect-error — polyfill
  globalThis.process.browser = true;
}

if (!globalThis.Buffer) {
  globalThis.Buffer = Buffer;
}
