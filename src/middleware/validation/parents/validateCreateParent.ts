import { Request, Response, NextFunction } from 'express';
import { isEmpty, isEmail, isMobilePhone } from 'validator';

export async function validateCreateParent(req: Request, _res: Response, next: NextFunction) {
  const { first_name, last_name, phone, email } = req.body;

  if (isEmpty(first_name || '')) {
    return next(new Error('first_name is required'));
  }

  if (isEmpty(last_name || '')) {
    return next(new Error('last_name is required'));
  }

  if (!isMobilePhone(phone || '', 'uk-UA')) {
    return next(new Error('phone must be a valid Ukrainian phone number'));
  }

  if (!isEmail(email || '')) {
    return next(new Error('email must be valid'));
  }

  return next();
}
