import type { RequestHandler } from "express";
import type { ZodObject } from "zod";

const validate = (schema: ZodObject): RequestHandler => {
   return (req, res, next) => {
    try {
      const result = schema.safeParse(req.body);

      if (!result.success) {
        return res.status(422).json({ errors: result.error.issues });
      }

      req.body = result.data;
      next();
    } catch {
      return res.status(400).json({ error: "Invalid JSON format" });
    }
  }; 
};

export default validate;