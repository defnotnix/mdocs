import { get, del } from "@/components/helper/apiDispatch";

export async function getData(id: string) {
  const res: any = await get({
    url: "/docs/woda/" + id + "/",
  });

  return res.data;
}

export async function getWodaHistory(id: string) {
  const res: any = await get({
    url: "/docs/woda/logs/filter/",
    params: {
      wodadoc_id: id,
    },
  });
  return res.data;
}

export async function getStatementHistory(id: string) {
  const res: any = await get({
    url: "/docs/statement/logs/filter/",
    params: {
      statement_id: id,
    },
  });
  return res.data;
}

export async function deleteWoda(id: string) {
  const res: any = await del({
    url: "/docs/woda/",
    id: id,
  });

  return res.data;
}
