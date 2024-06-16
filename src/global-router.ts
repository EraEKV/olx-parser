import { Router } from 'express';
import authRouter from './auth/auth-router';
import eventRouter from './events/event-router';
import parseRouter from './parser/parse-router';
// other routers can be imported here

const globalRouter = Router();


globalRouter.use(authRouter);
globalRouter.use(eventRouter);
globalRouter.use(parseRouter);


// other routers can be added here

export default globalRouter;
