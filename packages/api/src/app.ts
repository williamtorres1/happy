import express from 'express';

// connect with database
import './database/connection';

const app = express();

app.get('/', (request, response) => {
  return response.json({ message: 'Hello World' });
});

export default app;
