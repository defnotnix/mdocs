export async function toFormData({
  values,
  keyIgnore = [],
  valueIgnore = [],
  stringify = false,
  hasDirtCheck = false,
}: {
  values: Record<string, any>;
  keyIgnore?: any[];
  valueIgnore?: any[];
  stringify?: boolean;
  hasDirtCheck?: boolean;
}): Promise<FormData> {
  const fd = new FormData();

  function addToFormdata(key: string, value: any) {
    const _value =
      (typeof value === "object" || Array.isArray(value)) &&
      !(value instanceof File)
        ? JSON.stringify(value)
        : value;

    fd.append(key, stringify ? JSON.stringify(value) : _value);
  }

  try {
    if (hasDirtCheck) {
      for (const [key, value] of Object.entries(values)) {
        if (
          !valueIgnore?.includes(value) &&
          !keyIgnore?.includes(key) &&
          key !== "_dirtcheck"
        ) {
          addToFormdata(key, value);
        }
      }
    } else {
      for (const [key, value] of Object.entries(values)) {
        if (!valueIgnore?.includes(value) && !keyIgnore?.includes(key)) {
          addToFormdata(key, value);
        }
      }
    }

    return fd;
  } catch (err) {
    console.error(err);
  }

  return fd;
}
