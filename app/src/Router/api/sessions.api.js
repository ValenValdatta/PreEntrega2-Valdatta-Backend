import { Router } from "express";
import usersManager from "../../data/mongo/UsersManager.mongo.js";
import isValidEmail from "../../middlewares/isValidEmail.mid.js";
import isValidData from "../../middlewares/isValidData.mid.js";
import isValidUser from "../../middlewares/isValidUser.mid.js";
import isValidPassword from "../../middlewares/isValidPassword.mid.js";

const sessionRouter = Router();

sessionRouter.post(
   "/register",
   isValidData,
   isValidEmail,
   async (req, res, next) => {
      try {
         const data = req.body;
         await usersManager.create(data);
         return res.json({
            statusCode: 201,
            message: "Registered!",
         });
      } catch (error) {
         return next(error);
      }
   }
);

sessionRouter.post(
   "/login",
   isValidUser,
   isValidPassword,
   async (req, res, next) => {
      try {
         const { email, password } = req.body;
         const one = await usersManager.readByEmail(email);
         req.session.email = email;
         req.session.password = password;
         req.session.online = true;
         req.session.role = one.role;
         req.session.photo = one.photo;
         req.session.user_id = one._id;
         return res.json({
            statusCode: 200,
            message: "Logged in",
         });
      } catch (error) {
         return next(error);
      }
   }
);

sessionRouter.get("/online", async (req, res, next) => {
   try {
      if (req.session.online) {
         return res.json({
            statusCode: 200,
            message: "Is online",
            user_id: req.session.user_id,
         });
      }
      return res.json({
         statusCode: 401,
         message: "Bad authentication",
      });
   } catch (error) {
      return next(error);
   }
});

sessionRouter.post("/signout", (req, res, next) => {
   try {
      if (req.session.email) {
         req.session.destroy();
         return res.json({
            statusCode: 200,
            message: "Signed Out",
         });
      }
      const error = new Error("invalid credentials")
      error.statusCode = 401;
      throw error
   } catch (error) {
      return next(error);
   }
});

export default sessionRouter;