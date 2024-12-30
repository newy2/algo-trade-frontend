type PrimitiveType = boolean | number | string;

export type RequestParamsType = {
  [key: string]: PrimitiveType | PrimitiveType[];
};

export function toQueryString(requestParams: RequestParamsType) {
  const result = new URLSearchParams();

  Object.keys(requestParams).forEach((key) => {
    const value = requestParams[key];
    if (Array.isArray(value)) {
      value.forEach((eachValue) => result.append(key, eachValue.toString()));
    } else {
      result.append(key, value.toString());
    }
  });

  return result.toString();
}
