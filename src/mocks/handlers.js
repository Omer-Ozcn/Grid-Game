import { http, HttpResponse } from 'msw';
import { buildResponse } from './helpers.js';

export const handlers = [
  http.post(
    'https://nextgen-project.onrender.com/api/s9d5/result',
    async ({ request }) => {
      const data = await request.json();
      const [status, payload] = await buildResponse(data);
      return HttpResponse.json(payload, { status: status });
    }
  ),
  http.all('https://nextgen-project.onrender.com/*', async ({ request }) => {
    const data = await request.json();
    const message = `Endpoint [${data.method}] /${data.params['0']} does not exist`;
    return HttpResponse.status(404).json({ message });
  }),
];
