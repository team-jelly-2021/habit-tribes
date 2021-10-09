const request = require('supertest');

const server = request.agent('http://localhost:3000');

describe('Authentication tests', () => {
  it('Doesn\'t create a new user when invalid input sent', () => {
    return server
      .post('/api/register')
      .send({
        randomValue: 'true'
      })
      .expect(400)
  });

  it('Creates a new user', () => {
    // /api/register
    return server
      .post('/api/register')
      .send({
        name: 'Example user',
        email: 'example' + Math.random()*10 + '@example.com',
        password: 'pass',
        phoneNumber: '01235'
      })
      .expect(200)
  });
});

