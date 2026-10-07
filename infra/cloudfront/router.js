/* eslint-disable @typescript-eslint/no-unused-vars -- CloudFront invokes handler and requires catch bindings. */
import cf from "cloudfront";

const routes = cf.kvs();

function redirect(request, path) {
  const query = [];
  for (const key in request.querystring || {}) {
    const parameter = request.querystring[key];
    const values = parameter.multiValue || [parameter];
    // CloudFront supplies URL-encoded names and values; keep them encoded.
    for (let i = 0; i < values.length; i++) {
      query.push(`${key}=${values[i].value}`);
    }
  }
  return {
    statusCode: 301,
    statusDescription: "Moved Permanently",
    headers: {
      location: { value: path + (query.length ? `?${query.join("&")}` : "") },
    },
  };
}

// CloudFront invokes this entry point directly.
async function handler(event) {
  const request = event.request;

  // Run before origin rewrites: internal index.html objects stay accessible.
  if (request.uri.endsWith("/index.html")) {
    return redirect(request, request.uri.slice(0, -"index.html".length));
  }

  try {
    const target = await routes.get(request.uri);
    if (target) {
      request.uri = target;
      return request;
    }
  } catch (error) {
    // Continue to project-folder routing.
  }

  const segments = request.uri.split("/").filter(Boolean);
  if (segments.length > 0) {
    try {
      const projectValue = await routes.get(`project:${segments[0]}`);
      const project = JSON.parse(projectValue);
      if (request.uri === `/${segments[0]}`) {
        return redirect(request, `${request.uri}/`);
      }
      const relativePath = segments.slice(1).join("/") || project.entry;
      request.uri = `${project.prefix}/${relativePath}`;
    } catch (error) {
      // Unregistered paths continue to the portfolio origin unchanged.
    }
  }

  return request;
}
