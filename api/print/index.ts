import { formPost, formPatch } from "@/components/helper/apiDispatch";

const apiSaveWoda = "/docs/woda/print/";

export async function createRecordWoda(body: any) {
  return await formPost({
    url: apiSaveWoda,
    body: body,
  });
}

const apiSaveStatement = "/docs/statement/print/";

export async function createRecordStatement(body: any) {
  return await formPost({
    url: apiSaveStatement,
    body: body,
  });
}
