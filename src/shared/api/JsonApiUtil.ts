import _ from "lodash";
import { RequestParamsType, toQueryString } from "./toQueryString.ts";
import { ApiError } from "./ApiError.ts";

export class JsonApiUtil {
  private static instances = new Map<string, JsonApiUtil>();

  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public static getInstance(baseUrl = import.meta.env.VITE_BACKEND_API_URL) {
    if (!this.instances.has(baseUrl)) {
      this.instances.set(baseUrl, new JsonApiUtil(baseUrl));
    }

    return this.instances.get(baseUrl)!;
  }

  public async GET(
    path: string,
    requestParams?: RequestParamsType,
  ): Promise<object> {
    const response = await fetch(this.getFullUrl(path, requestParams));

    return await this.parseResponse(response);
  }

  public async DELETE(path: string): Promise<object> {
    const response = await fetch(this.getFullUrl(path), {
      method: "DELETE",
    });

    return await this.parseResponse(response);
  }

  public async POST(path: string, body: object): Promise<object> {
    const response = await fetch(this.getFullUrl(path), {
      method: "POST",
      ...this.getRequestBodyOption(body),
    });

    return await this.parseResponse(response);
  }

  public async PUT(path: string, body: object): Promise<object> {
    const response = await fetch(this.getFullUrl(path), {
      method: "PUT",
      ...this.getRequestBodyOption(body),
    });

    return await this.parseResponse(response);
  }

  public async PATCH(path: string, body: object): Promise<object> {
    const response = await fetch(this.getFullUrl(path), {
      method: "PATCH",
      ...this.getRequestBodyOption(body),
    });

    return await this.parseResponse(response);
  }

  private getFullUrl(path: string, requestParams?: RequestParamsType) {
    const url = this.baseUrl + path;
    if (requestParams === undefined) {
      return url;
    }

    return [url, toQueryString(requestParams)].join("?");
  }

  private async parseResponse(response: Response) {
    if (!response.ok) {
      throw new ApiError(await response.json());
    }

    return await response.json();
  }

  private getRequestBodyOption(body: object) {
    this.validateRequestBody(body);

    return {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
  }

  private validateRequestBody(body: object) {
    if (_.isEmpty(body)) {
      throw Error("empty body 를 사용할 수 없습니다.");
    }
  }
}
