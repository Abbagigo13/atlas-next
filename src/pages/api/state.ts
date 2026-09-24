import type { NextApiRequest, NextApiResponse } from 'next';
import { Redis } from '@upstash/redis';
import type { DebateRecord, PaperState } from '@/lib/atlas/types';

const redis = Redis.fromEnv();

type SharedState = {
  paper: PaperState | null;
  history: DebateRecord[];
};

const KEY = 'atlas:state:v1';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const data = (await redis.get<SharedState>(KEY)) ?? { paper: null, history: [] };
      res.setHeader('Cache-Control', 'no-store');
      return res.status(200).json(data);
    } catch (err) {
      console.error('[state] read failed:', err instanceof Error ? err.message : err);
      return res.status(200).json({ paper: null, history: [] });
    }
  }

  if (req.method === 'POST') {
    try {
      const body = req.body as Partial<SharedState>;
      const current = (await redis.get<SharedState>(KEY)) ?? { paper: null, history: [] };
      const next: SharedState = {
        paper: body.paper !== undefined ? body.paper : current.paper,
        history: body.history !== undefined ? body.history : current.history,
      };
      await redis.set(KEY, next);
      res.setHeader('Cache-Control', 'no-store');
      return res.status(200).json({ ok: true });
    } catch (err) {
      console.error('[state] write failed:', err instanceof Error ? err.message : err);
      return res.status(500).json({ ok: false });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end();
}