import {renderHTML} from "../utils/render";
import {renderAppToString} from "../utils/render.app";
import HTML from "../../client/HTML";


const rendering = "server";

export default function renderFE(request, response) {
	if (rendering === "server") {
		renderAppToString(request, response);
	} else { // client
		response.status(200).send(renderHTML("", {
			getState: () => ({})
		}), HTML);
	}
}
