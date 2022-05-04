import { Request, Response, Router } from 'express';

const routes = Router();

routes.get('/teste', (_req: Request, res: Response) => {
  res.status(204);
});

export default routes;
