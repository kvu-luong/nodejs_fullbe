type TResult = object[] | string[] | any[] | object | string;
export class ResponseBuilder {
  message: string | undefined;
  result: TResult | undefined;
  code: number | undefined;

  setCode(code: number) {
    this.code = code;
    return this;
  }

  setMessage(message: string) {
    this.message = message;
    return this;
  }

  setResult(result: TResult) {
    this.result = result;
    return this;
  }

  build() {
    return this;
  }
}
