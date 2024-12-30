import { JsonApiUtil } from "shared/api";
import { BaseModel } from "shared/model";

class PingModel extends BaseModel {
  public message!: string;
}

export async function fetchPingMessage(path: string) {
  const response = await JsonApiUtil.getInstance().GET(path);
  return PingModel.fromJson(response);
}
