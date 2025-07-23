import type { Config, Context } from "@netlify/edge-functions";

// define tollbit log object 
interface TollbitLog {
  timestamp: string, // can be ISO 8601 format or unix timestamp
  geo_country?: string,
  geo_city?: string,
  geo_postal_code?: string,
  geo_latitude?: number,
  geo_longitude?: number,
  host: string,
  url: string,
  request_method?: string,
  request_protocol?: string,
  request_user_agent: string,
  request_latency?: number | string,
  response_state?: string,
  response_status: number | string,
  response_reason?: string,
  response_body_size?: number | string
}


export default async (request: Request, context: Context) => {
  // throw new Error("error");
	/*
  const url = new URL(request.url);

  if (url.searchParams.get("method") !== "set-response-header") {
    return context.next();
  }

  console.log(`Adding a custom header to the response for ${url}`);
*/
	const response = await context.next();
	const type = response.headers.get("Content-Type")
	console.log("Content type considered for tollbit logger:", type);
	if (!type || (!type.includes("html") && !type.includes("xml")) || type.includes("svg")) {
		console.log("Tollbit logger skipped for non-HTML/XML content type:", type);
		return response;
	}
	console.log("Tollbit logger running");
	const jsonObjectForLog: TollbitLog = {
		timestamp: new Date().toISOString(),
		geo_country: context.geo.country?.name || "",
		geo_city: context.geo.city || "",
		geo_postal_code: context.geo.postalCode || "",
		geo_latitude: context.geo.latitude || 0,
		geo_longitude: context.geo.longitude || 0,
		host: request.headers.get("host") || "",
		url: request.url,
		request_method: request.method,
		request_user_agent: request.headers.get("user-agent") || "",
		request_latency: response.headers.get("X-Response-Time") || "",
		response_state: response.statusText,
		response_status: response.status,
		response_reason: response.statusText,
		response_body_size: response.headers.get("content-length") || ""
	}
	console.log("Tollbit log:", jsonObjectForLog);
	fetch("https://log.tollbit.com/log", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"TollbitKey":  Netlify.env.get('TOLLBITKEY') || "",
			// https://docs.netlify.com/build/functions/environment-variables/#access-environment-variables
		},
		body: jsonObjectForLog ? JSON.stringify(jsonObjectForLog) : "{}"
	});
	//console.log("Tollbit log sent", check.status, check.statusText);
	console.log("Tollbit log sent");
	response.headers.set("X-tollbit-logged", "true");
	return response;
};

export const config: Config = {
  path: "/*",
  //name: "tollbit-logger",
  onError: "bypass"
}
