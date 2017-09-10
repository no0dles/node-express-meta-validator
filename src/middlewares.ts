import { Constructable } from './constructable';
import express = require('express');
import { ValidatorUtil } from './validator.util';

export function body(model: Constructable<any>) {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errors = ValidatorUtil.validate(model, 'body', req.body);
    if (errors.length === 0) {
      return next();
    }

    res.status(400).json({ errors });
  };
}

export function query(model: Constructable<any>) {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errors = ValidatorUtil.validate(model, 'query', req.query);
    if (errors.length === 0) {
      return next();
    }

    res.status(400).json({ errors });
  };
}

export function params(model: Constructable<any>) {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errors = ValidatorUtil.validate(model, 'params', req.params);
    if (errors.length === 0) {
      return next();
    }

    res.status(400).json({ errors });
  };
}

