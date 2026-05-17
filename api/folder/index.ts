import { get, formPost, formPatch, del } from "@/components/helper/apiDispatch";

const apiurl = "/docs/folder/";

async function _get(params?: any) {
  return await get({
    url: apiurl + (params.parent ? `${params.parent}/` : ""),
  });
}

async function create(body: any) {
  return await formPost({
    url: apiurl,
    body: body,
  });
}

async function update(body: any, id: any) {
  const res = await formPatch({
    url: apiurl + id + "/",
    body: body,
  });

  return res;
}

async function deleteData(id: string) {
  const res = await del({
    url: "/docs/woda/",
    id: id,
  });

  return res;
}

export const apiFileExplorer = {
  get: _get,
  create,
  update,
  del: deleteData,
};
