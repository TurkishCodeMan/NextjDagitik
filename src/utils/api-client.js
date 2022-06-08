import * as auth from "./auth-provider";

const apiURL = "http://localhost:3000/api";

async function client(
  endpoint,
  { data, token, headers: customHeaders, ...customConfig } = {}
) {
  console.log(endpoint)
  const config = {
    method: data ? "POST" : "GET",
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": data ? "application/json" : undefined,
      Token: token,
      ...customHeaders,
    },
    ...customConfig,
  };
  return fetch(`${apiURL}/${endpoint}`, config).then(async (response) => {
    console.log("------")
    if (response.status === 401) {
      await auth.logout();
      // refresh the page for them
      //window.location.assign(window.location);
      return Promise.reject({ message: "Please re-authenticate." });
    }
    if (response.status === 405) {
      return Promise.reject({ message: "Method not allowed !" });
    }

    const data = await response?.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
}

export { client };
