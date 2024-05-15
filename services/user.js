import { GET, POST } from "../utils/http";

export function LOGIN(params = {}) {
  return POST("/user/login", params);
}

export function USER_INRO(params = {}) {
  return GET("/user/info", params);
}
