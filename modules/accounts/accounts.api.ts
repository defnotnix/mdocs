import { get, formPost, formPatch, del } from "@/components/helper/apiDispatch";

const apilinkWoda = "/auth/users/";

export async function getUser() {
  return await get({
    url: apilinkWoda,
  });
}

export async function createUser(body: any) {
  return await formPost({
    url: apilinkWoda,
    body: body,
  });
}

export async function updateUser(body: any, id: any) {
  const res = await formPatch({
    url: apilinkWoda + id + "/",
    body: body,
  });

  return res;
}

export async function deleteUser(id: string) {
  return await del({
    url: apilinkWoda,
    id: id,
  });
}
