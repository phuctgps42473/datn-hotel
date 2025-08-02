export async function fetcher(path, method = "GET", body) {
  let accessToken = localStorage.getItem("accessToken");
  let headers = { "Content-Type": "Application/json" };
  if (typeof accessToken !== "undefined") {
    headers["Authorization"] = "Bearer" + accessToken;
  }

  if (typeof body !== "undefined") {
    return fetch(path, {
      method,
      headers,
      body
    });
  } else {
    return fetch(path, {
      method,
      headers
    });

  }
}