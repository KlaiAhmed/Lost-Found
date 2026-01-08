import type { RequestHandler } from "express";
import { ZodTypeAny } from "zod";

const validate = (schema: ZodTypeAny): RequestHandler => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(422).json({ errors: result.error.issues });
    }

    req.body = result.data;
    next();
  };
};

export default validate;