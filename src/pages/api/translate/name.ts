import { NextApiRequest, NextApiResponse } from 'next';
import { TranslateNameResponse } from '@twtts/shared';
import axios from 'axios';

const client = axios.create({
  baseURL: process.env.CORE_TRANSLATION_SERVICE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TranslateNameResponse>
) {
  if (req.method !== 'POST') {
    res.status(405);
    return;
  }

  console.log('body:', req.body);

  const response = await client.post<TranslateNameResponse>(
    '/translate/name',
    req.body
  );

  if (response.status >= 400) {
    res.status(response.status);
    return;
  }

  res.send(response.data);
}
