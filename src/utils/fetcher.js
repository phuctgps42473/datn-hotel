import { BASE_URL } from "@/const";


export async function fetcher(endpoint, method = "GET", body) {
  let accessToken = localStorage.getItem("accessToken");
  let headers = { "Content-Type": "Application/json" };
  if (typeof accessToken !== "undefined") {
    headers["Authorization"] = "Bearer " + accessToken;
  }

  if (typeof body !== "undefined") {
    return fetch(BASE_URL + endpoint, {
      method,
      headers,
      body
    });
  } else {
    return fetch(BASE_URL + endpoint, {
      method,
      headers
    });

  }
}