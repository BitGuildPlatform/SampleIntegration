import {renderHTML} from "../utils/render";
import {renderAppToString} from "../utils/render.app";
import HTML from "../../client/HTML";


export default function renderFE(request, response) {
  if (process.env.RENDERING === "server") {
    renderAppToString(request, response);
  } else { // client
    response.status(200).send(renderHTML("", {
      getState: () => ({})
    }, HTML));
  }
}
