import { fetch } from 'cross-fetch';

export async function checkProofServerStatus(url: string): Promise<boolean> {
  if (!url) return false;
  try {
    const response = await fetch(`${url}/health`, { method: 'GET' });
    return response.ok;
  } catch {
    return false;
  }
}
