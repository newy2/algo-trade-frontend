export default class BaseModel {
  static fromJson<T extends object | object[], U extends typeof BaseModel>(
    this: U,
    json: T,
  ): T extends object[] ? InstanceType<U>[] : InstanceType<U> {
    let result;
    if (Array.isArray(json)) {
      result = json.map((each) => this.createInstance(each));
    } else {
      result = this.createInstance(json);
    }

    return this.convertResultType(result);
  }

  private static createInstance<T extends object, U extends typeof BaseModel>(
    this: U,
    data: T,
  ): InstanceType<U> {
    // 객체 copy 성능이 안 좋으면 bindInstance 사용
    const result = new this();
    Object.assign(result, data);
    result.onCreated();
    return result as InstanceType<U>;
  }

  // private static bindInstance<T extends object, U extends typeof BaseModel>(
  //   this: U,
  //   data: T
  // ) {
  //   const result = data as InstanceType<U>;
  //   Object.setPrototypeOf(result, this.prototype);
  //   result.onCreated();
  //   return result;
  // }

  private static convertResultType<
    T extends object,
    U extends typeof BaseModel,
  >(data: object | object[]) {
    return data as T extends object[] ? InstanceType<U>[] : InstanceType<U>;
  }

  protected onCreated(): void {
    // Custom initialization logic
  }
}
