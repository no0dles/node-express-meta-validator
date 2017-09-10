import { assert } from 'chai';
import express = require('express');
import supertest = require('supertest');
import bodyParser = require('body-parser');
import validator = require('./index');
import { Required } from './decorators/required.decorator';
import { Length } from './decorators/length.decorator';

describe('middlewares', () => {
  class TestQuery {
    @Required
    testProp: string;
  }

  class TestBody {
    @Required
    testProp: string;
  }

  class TestParams {
    @Required
    @Length({ min: 4 })
    id: string;
  }

  it('should allow valid query', (done) => {
    const app = express();
    app.get('/', validator.query(TestQuery), (req, res) => {
      assert.equal(req.query.testProp, 'prop')
      res.status(200).end();
    });
    supertest(app)
      .get('/')
      .query({
        testProp: 'prop'
      })
      .expect(200, done);
  });

  it('should not allow invalid query', (done) => {
    const app = express();
    app.get('/', validator.query(TestQuery), () => {
      done(new Error('should not be called'));
    });
    supertest(app)
      .get('/')
      .query({})
      .expect(400, done);
  });

  it('should allow valid body', (done) => {
    const app = express();
    app.use(bodyParser.json());
    app.post('/', validator.body(TestBody), (req, res) => {
      assert.equal(req.body.testProp, 'prop');
      res.status(200).end();
    });
    supertest(app)
      .post('/')
      .send({
        testProp: 'prop'
      })
      .expect(200, done);
  });

  it('should not allow invalid body', (done) => {
    const app = express();
    app.post('/', validator.query(TestQuery), () => {
      done(new Error('should not be called'));
    });
    supertest(app)
      .post('/')
      .send({})
      .expect(400, done);
  });

  it('should allow valid params', (done) => {
    const app = express();
    app.get('/:id', validator.params(TestParams), (req, res) => {
      assert.equal(req.params.id, '1234');
      res.status(200).end();
    });
    supertest(app)
      .get('/1234')
      .expect(200, done);
  });

  it('should not allow invalid params', (done) => {
    const app = express();
    app.post('/:id', validator.params(TestQuery), () => {
      done(new Error('should not be called'));
    });
    supertest(app)
      .post('/123')
      .expect(400, done);
  });
});
