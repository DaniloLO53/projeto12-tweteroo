import express from 'express';
import cors from 'cors';
import tweets from './model/tweet.model.js';
import users from './model/user.model.js';

const PORT = 5000;

const CODE_BAD_REQUEST = 400;
const CODE_OK = 200;
const CODE_CREATED = 201;

const server = express();
server.use(cors());
server.use(express.json());

server.post('/sign-up', (request, response) => {
  if (!request.body.username || !request.body.avatar) {
    return response.status(CODE_BAD_REQUEST).send('Todos os campos são obrigatórios!');
  }

  users.push(request.body);

  response.send(request.body);
  response.status(CODE_CREATED).send('OK');
});

server.post('/tweets', (request, response) => {
  if (!request.body.username || !request.body.tweet) {
    return response.status(CODE_BAD_REQUEST).send('Todos os campos são obrigatórios!');
  }

  const user = request.body.username;
  const isSignedUp = users.some(({ username }) => username === user);

  if (!isSignedUp) {
    return response.status(401).send('UNAUTHORIZED');
  }

  tweets.push(request.body);

  response.send(request.body);
  response.status(CODE_CREATED).send('OK');
});

server.get('/tweets', (request, response) => {
  const last10Tweets = tweets.slice(tweets.length - 10);
  const avatars = last10Tweets.map((tweet) => {
    return users.find(({ username }) => tweet.username === username).avatar
  });

  last10Tweets.forEach((tweet, index) => tweet.avatar = avatars[index]);

  response.send(last10Tweets);
});

server.listen(PORT, () => console.log('Listening to port ', PORT));
