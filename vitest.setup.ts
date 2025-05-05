import '@testing-library/jest-dom';
import { vi } from 'vitest';

globalThis.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
    headers: new Headers(),
    ok: true,
    redirected: false,
    status: 200,
    statusText: 'OK',
    type: 'default',
    url: '',
    clone: () => undefined,
    body: null,
    bodyUsed: false,
    arrayBuffer: async () => new ArrayBuffer(0),
    blob: async () => new Blob(),
    formData: async () => new FormData(),
    text: async () => '',
  } as unknown as Response)
);

globalThis.matchMedia =
  globalThis.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: vi.fn(),
      removeListener: vi.fn(),
    };
  };
