import { post } from "@/components/helper/apiDispatch";

export async function makeLogin(body: any) {
  return await post({
    url: "/auth/login/",
    body: body,
  });
}

export async function makeLogout() {
  return await post({
    url: "/auth/logout/",
    body: {},
  });
}
