import { NextApiRequest, NextApiResponse } from 'next';
import { TranslateChatResponse } from '@twtts/shared';
import axios from 'axios';

const client = axios.create({
  baseURL: process.env.CORE_TRANSLATION_SERVICE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TranslateChatResponse>
) {
  if (req.method !== 'POST') {
    res.status(405);
    return;
  }

  const response = await client.post<TranslateChatResponse>(
    '/translate/chat',
    req.body
  );

  if (response.status >= 400) {
    res.status(response.status);
    return;
  }

  res.send(response.data);
}
