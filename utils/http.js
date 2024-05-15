// api.js

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://127.0.0.1:5000";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10 * 1000, // 设置超时时间（单位：毫秒）
  headers: {
    "Content-Type": "application/json",
    // 如果有需要，可以在这里添加其他头部信息，比如认证信息
  },
});

// 请求拦截器
instance.interceptors.request.use(
  async function (config) {
    const token = await AsyncStorage.getItem("token");

    // 将token添加到请求头中
    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
// 响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    const { data } = response;
    // console.log("正确的响应", data);
    return data.data;
  },
  function (error) {
    // 对响应错误做点什么
    console.log("err", error);
    return Promise.reject(error);
  }
);

export const GET = async (url, params) => {
  return instance.get(url, { params });
};

export const POST = async (url, params) => {
  return instance.post(url, params);
};
