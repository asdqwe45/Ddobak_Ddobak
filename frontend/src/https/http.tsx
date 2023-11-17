import axios from 'axios';

const BASE_URL = 'https://ddobak.com/api/v1';

// 토큰 가져오기 함수
export const getData = async (key: string) => {
  try {
    const value = await localStorage.getItem(key);
    if (value !== null) {
      const validValue = JSON.parse(value);
      return validValue;
    }
  } catch (e) {
    console.error(e);
  }
};

// Authorization이 필요없는 인스턴스
export const axiosWithoutAuth = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});

// 폼데이터 형식일 때
export const axiosWithoutFormData = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const axiosWithFormData = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: '',
  },
});

// Authorization이 필요한 인스턴스
export const axiosWithAuth = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    Authorization: '', // 이곳에 토큰이나 필요한 인증 정보를 추가
  },
});

axiosWithAuth.interceptors.request.use(
  async (config) => {
    const accessToken = await getData('accessToken'); // await를 사용하여 토큰 값을 가져옵니다.
    if (accessToken) {
      config.headers['Authorization'] = 'Bearer ' + accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosWithFormData.interceptors.request.use(
  async (config) => {
    const accessToken = await getData('accessToken'); // await를 사용하여 토큰 값을 가져옵니다.
    if (accessToken) {
      config.headers['Authorization'] = 'Bearer ' + accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
