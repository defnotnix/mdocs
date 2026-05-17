import { get, del } from "@/components/helper/apiDispatch";
import { formPost, formPatch } from "@/components/helper/apiDispatch";

export async function getSingleSt(id: string) {
  const res: any = await get({
    url: "/docs/statement/" + id + "/",
  });

  return res.data;
}

export async function deleteDataSt(id: string) {
  const res: any = await del({
    url: "/docs/statement/",
    id: id,
  });

  return res.data;
}

export async function getSingleWoda(id: string) {
  const res: any = await get({
    url: "/docs/woda/" + id + "/",
  });

  return res.data;
}

export async function deleteDataWoda(id: string) {
  const res: any = await del({
    url: "/docs/woda/",
    id: id,
  });

  return res.data;
}

export const apiFile = {
  woda: {
    get: getSingleWoda,
    del: deleteDataWoda,
  },
  statement: {
    get: getSingleSt,
    del: deleteDataSt,
  },
};

const apilinkWoda = "/docs/woda/";

export async function createRecordWoda(body: any) {
  return await formPost({
    url: apilinkWoda,
    body: body,
  });
}

const apilinkStatement = "/docs/statement/";

export async function createRecordStatement(body: any) {
  return await formPost({
    url: apilinkStatement,
    body: body,
  });
}

export async function updateRecordWoda(body: any, id: any) {
  const res = await formPatch({
    url: apilinkWoda + id + "/",
    body: body,
  });

  return res;
}

export async function updateRecordStatement(body: any, id: any) {
  return await formPatch({
    url: apilinkStatement + id + "/",
    body: body,
  });
}
