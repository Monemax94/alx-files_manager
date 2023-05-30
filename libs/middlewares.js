import express from 'express';

/**
 * inject middlewares to the express app.
 * @param {express.Express} api express app.
 */
const middlewareInject = (api) => {
  api.use(express.json({ limit: '200mb' }));
};

export default middlewareInject;