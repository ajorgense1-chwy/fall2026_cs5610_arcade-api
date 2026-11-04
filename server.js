import { Hono } from "hono";
import { serve } from "@hono/node-server";
import tictactoe from './routes/tictactoe.route.js'


const app = new Hono();

app.use(async function (c, next) {
  const start = Date.now();
  await next();
  console.log(c.req.method, c.req.path, Date.now() - start, 'ms');
});


app.route('/api/tictactoe', tictactoe)

app.onError(function (err, c) {
  console.error(err);
  return c.json({ error: 'Something went wrong!' }, 500);
});


serve({
  fetch: app.fetch,
  port: Number(process.env.PORT) || 3000
});


// import { createServer } from 'node:http';

// const server = createServer(
//   function (req, res) {
//     console.log(req)
//     console.log('-----------------')
//     res.writeHead(404, {
//       'Content-Type': 'application/json'
//     });
//     res.end('Hello from Node!!');
//   }
// );

// server.listen(3000, function () {
//   console.log('http://localhost:3000');
// });
