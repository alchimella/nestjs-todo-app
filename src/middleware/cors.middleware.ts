import * as cors from 'cors';

const corsMiddleware = cors({
  origin: true,
  credentials: true,
});

export { corsMiddleware };
