import express from 'express';
import routes from './routes/index';

const app = express();

app.use(routes);

app.listen(1245, () => {
  console.log('Server running at http://localhost:1245/');
});

export default app;
