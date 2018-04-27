import {Router} from "express";
import {makeError} from "../utils/error";


const router = Router(); // eslint-disable-line new-cap

router.use("/api", (request, response, next) => {
  next(makeError("page-not-found", 404, {url: request.url}));
});


export default router;
