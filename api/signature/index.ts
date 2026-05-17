import { get, formPost, formPatch, del } from "@/components/helper/apiDispatch";

const apiurl = "/docs/signature/";

export async function _get() {
  return await get({
    url: apiurl,
  });
}

export async function create(body: any) {
  return await formPost({
    url: apiurl,
    body: body,
  });
}

export async function update(body: any, id: any) {
  const res = await formPatch({
    url: apiurl + id + "/",
    body: body,
  });

  return res;
}

export async function _del(id: any) {
  return await del({
    url: apiurl,
    id: id,
  });
}

export const apiSignature = {
  get: _get,
  create,
  update,
  del: _del,
};
