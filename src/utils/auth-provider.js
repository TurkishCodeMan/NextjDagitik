import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";

const authURL = "https://doctor-ad-app.herokuapp.com";
const localStorageKey = "my__token";
const localStorageUser = "my__user";

const userQueryConfig = {
  staleTime: 1000 * 60 * 60,
  cacheTime: 1000 * 60 * 60,
};

export function useUser(options = {}) {
  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: "user",
    queryFn: () => {
      // const data = queryClient.getQueryData("user");
      // if (data?.User) return data;
      return getUser()
        .then((data) => data)
        .catch((er) => console.error(er));
    },

    onSuccess(result) {
      queryClient.setQueryData(
        ["user", { ...result?.User }],
        result?.User,
        userQueryConfig
      );
    },
    ...options,
  });

  return { ...result };
}

export function useLoginMutation(options = {}) {
  const queryClient = useQueryClient();

  const result = useMutation(
    (formData) =>
      login({
        email: formData.email,
        password: formData.password,
      }).then((data) => data),
    {
      onMutate(newItem) {
        console.log(newItem);
      },
      onSuccess(res) {
        if (res) {
          return toast("Login Successfully", {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: "foo-bar",
          });
        }

        return toast("Login Failed Check Credentials ..", {
          position: toast.POSITION.BOTTOM_RIGHT,
          className: "foo-bar",
        });
      },
      onSettled: () => queryClient.invalidateQueries("user"),
    }
  );
  return { ...result };
}

export function useRegisterMutation(options = {}) {
  const queryClient = useQueryClient();

  const result = useMutation(
    (formData) =>
      register({
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password,
      }).then((data) => data),
    {
      onMutate(newItem) {
        console.log(newItem);
      },
      onSettled: () => queryClient.invalidateQueries("user"),
    }
  );
  return { ...result };
}

export function useLogout(options = {}) {
  const queryClient = useQueryClient();

  const result = useMutation(() => logout(), {
    onMutate(newItem) {
      console.log(newItem);
    },
    onSettled: () => queryClient.invalidateQueries("user"),
  });
  return { ...result };
}

function getToken() {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem(localStorageKey);
  }
}

async function getUser() {
  const token = getToken();
  if (token) {
    return fetchUser(token);
  }
  return undefined;
}

function handleUserResponse(res) {
  console.log(res);
  if (res.token) {
    if (process.env.NODE_ENV !== "test")
      window.localStorage.setItem(localStorageKey, res.token);
    return res.token;
  }
}

function userResponse(res) {
  return res;
}

async function login({ email, password }) {
  return client("user/login", { data: { email, password } })
    .then(handleUserResponse)
    .then(fetchUser);
}

function fetchUser(token) {
  return client("user", { method: "GET", token }).then(userResponse);
}

function register({ first_name, last_name, email, password }) {
  return client("user/register", {
    data: { first_name, last_name, email, password },
  }).then(handleUserResponse);
}
async function logout() {
  return client("user/logout").then(logoutHandler);
}
async function logoutHandler() {
  window.localStorage.removeItem(localStorageKey);
  window.localStorage.removeItem(localStorageUser);
}

async function client(endpoint, { data, token, ...options } = {}) {
  const config = {
    method: "POST",
    body: data ? JSON.stringify(data) : null,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Token: token,
    },
    ...options,
  };

  return fetch(`${authURL}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await logoutHandler();
        return Promise.reject({ message: "Please re-authenticate." });
      }

      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });
}

export {
  getToken,
  getUser,
  handleUserResponse,
  login,
  register,
  logout,
  localStorageKey,
};
