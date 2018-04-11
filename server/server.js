import app from "./configs/express";

import assets from "./routes/assets";
import main from "./routes/main";
import notFound from "./routes/404";
import {sendError} from "./utils/wrapper";
import fe from "./routes/fe";


app.use(assets);
app.use(main);
app.use(notFound);
app.use(sendError);
app.use(fe);

const listener = app.listen(process.env.PORT, () => {
  console.info(`Express server listening on port ${listener.address().port}`);
});

process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);

export default app;
