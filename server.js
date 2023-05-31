import express from 'express';
import startApp from './libs/boot';
import injectRoutes from './routes';
import middlewareInject from './libs/middlewares';

const app = express();

middlewareInject(app);
injectRoutes(app);
startApp(app);

export default app;