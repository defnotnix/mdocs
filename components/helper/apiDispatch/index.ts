"use client";

import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { triggerNotification } from "../notification";

const withCredentials = true;

async function handleTokenExpiry() {
  const res = await axios
    .post(
      "/auth/refresh/token/",
      {},
      {
        withCredentials,
        headers: {
          Authorization: "Kilimanjaro " + sessionStorage.getItem("doctoken"),
        },
      }
    )
    .then((e) => {
      sessionStorage.setItem("doctoken", e?.headers?.xauthorization);
      return true;
    })
    .catch((err) => {
      return false;
    });

  console.log("Token Expired, Calling Refresh Token");
  return res;
}

function triggerLogout(res: any) {
  triggerNotification.Login.isTokenExpired({
    onClose: () => {
      window.location.href = "/";
    },
  });
}

export async function get({
  url = "",
  params = {},
}: {
  url: string;
  params?: any;
}) {
  try {
    const response = await axios.get(url, {
      params,
      withCredentials,
      headers: {
        Authorization: "Kilimanjaro " + sessionStorage.getItem("doctoken"),
      },
    });

    return {
      err: false,
      data: response.data,
    };
  } catch (error: any) {
    let err: any = new Error("Error");

    if (error?.response?.data?.message == "Token Expired") {
      const res = await handleTokenExpiry();

      if (res) {
        return await get({ url, params });
      } else {
        triggerLogout(res);
        throw err;
      }
    } else {
      if (error?.code == "ERR_NETWORK") {
        triggerNotification.Network.isServerOffline();
      } else {
        err.object = error;
        throw err;
      }
    }
  }
}

export async function getPaginated({
  url = "",
  params = {},
}: {
  url: string;
  params?: any;
}) {
  try {
    const response = await axios.get(url, {
      params,
      withCredentials,
      headers: {
        Authorization: "Kilimanjaro " + sessionStorage.getItem("doctoken"),
      },
    });

    return {
      err: false,
      data: response,
    };
  } catch (error: any) {
    let err: any = new Error("Error");

    if (error?.response?.data?.message == "Token Expired") {
      const res = await handleTokenExpiry();

      if (res) {
        return await get({ url, params });
      } else {
        triggerLogout(res);
        throw err;
      }
    } else {
      err.object = error;
      throw err;
    }
  }
}

export async function post({
  url = "",
  body,
  headers,
}: {
  url: string;
  body: any;
  headers?: any;
}) {
  try {
    const response = await axios.post(url, body, {
      withCredentials,
      headers: {
        ...headers,
        Authorization: "Kilimanjaro " + sessionStorage.getItem("doctoken"),
      },
    });

    return {
      err: false,
      data: response.data,
    };
  } catch (error: any) {
    let err: any = new Error("Error");

    if (error?.response?.data?.message == "Token Expired") {
      const res = await handleTokenExpiry();

      if (res) {
        return await post({ url, body, headers });
      } else {
        triggerLogout(res);
        throw err;
      }
    } else {
      err.object = error;
      throw err;
    }
  }
}

export async function patch({
  url = "",
  body,
  headers,
}: {
  url: string;
  body: any;
  headers?: any;
}) {
  try {
    const response = await axios.patch(url, body, {
      withCredentials,
      headers: {
        ...headers,
        Authorization: "Kilimanjaro " + sessionStorage.getItem("doctoken"),
      },
    });
    return {
      err: false,
      data: response.data,
    };
  } catch (error: any) {
    let err: any = new Error("Error");

    if (error?.response?.data?.message == "Token Expired") {
      const res = await handleTokenExpiry();

      if (res) {
        return await patch({ url, body, headers });
      } else {
        triggerLogout(res);
        throw err;
      }
    } else {
      err.object = error;
      throw err;
    }
  }
}

export async function del({
  url = "",
  id,
  headers,
}: {
  url: string;
  headers?: any;
  id: string;
}) {
  try {
    const response = await axios.delete(url + id + "/", {
      withCredentials,
      headers: {
        ...headers,
        Authorization: "Kilimanjaro " + sessionStorage.getItem("doctoken"),
      },
    });
    return {
      err: false,
      data: response.data,
    };
  } catch (error: any) {
    let err: any = new Error("Error");

    if (error?.response?.data?.message == "Token Expired") {
      const res = await handleTokenExpiry();

      if (res) {
        return await del({ url, id, headers });
      } else {
        triggerLogout(res);
        throw err;
      }
    } else {
      err.object = error;
      throw err;
    }
  }
}

export async function formPost({ url = "", body }: { url: string; body: any }) {
  return post({
    url,
    body,

    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function formPatch({
  url = "",
  body,
}: {
  url: string;
  body: any;
}) {
  return patch({
    url,
    body,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function login({ url = "", body }: { url: string; body: any }) {
  return post({
    url,
    body,
    headers: {
      withCredentials,
    },
  });
}
