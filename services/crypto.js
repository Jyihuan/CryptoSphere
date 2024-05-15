import { GET, POST } from "../utils/http";

export function CRYPTO_LIST(params = {}) {
  return GET("/crypto/list", params);
}

export function PREDICTED(params = {}) {
  return POST("/crypto/predicted", params);
}
