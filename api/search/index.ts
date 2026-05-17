import { get, getPaginated } from "@/components/helper/apiDispatch";

export async function getSignatureFiles({ params }: any) {
  return await get({
    url: "/docs/search/statement",
    params: params,
  });
}

export async function getWodaFiles({ params }: any) {
  return await get({
    url: "/docs/search/wodadoc",
    params: params,
  });
}
