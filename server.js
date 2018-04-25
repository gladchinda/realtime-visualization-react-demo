const cors = require('cors');
const next = require('next');
const Pusher = require('pusher');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;

const app = next({ dev });
const handler = app.getRequestHandler();

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  encrypted: true
});

app.prepare()
  .then(() => {
		const server = express();
		let answers = {};

    server.use(cors());
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));

    server.get('*', (req, res) => {
      return handler(req, res);
		});

		server.post('/answer', (req, res, next) => {
			const { choice = null } = req.body;

			if (choice) {
				const hasChoice = choice in answers && typeof answers[choice] === 'number';
				const count = ( hasChoice ? Math.max(0, answers[choice]) : 0 ) + 1;

				answers = { ...answers, [choice]: count };
				pusher.trigger('poll-board', 'new-answer', { choice, count });
			}
		});

		server.post('/answers', (req, res, next) => {
			res.json({ answers, status: 'success' });
		});

    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
