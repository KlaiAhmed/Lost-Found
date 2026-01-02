import type { RequestHandler } from "express";
import type { ZodObject } from "zod";

const validate = (schema: ZodObject): RequestHandler => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(422).json({ errors: result.error.issues });
    }
    req.body = result.data;
    return next();
  };
};

export default validate;