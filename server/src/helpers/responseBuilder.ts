import { TResult } from "../types/TResult";
export class ResponseBuilder {
  message!: string;
  result?: TResult;
  code!: number;

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
