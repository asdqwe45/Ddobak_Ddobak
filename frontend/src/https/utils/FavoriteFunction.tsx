import { axiosWithoutAuth, axiosWithAuth } from 'https/http';

const BASE_URL = '/favorite';

// 찜 조회하기
export async function dibIsActiveAPI(fontId: string): Promise<any> {
  return axiosWithAuth
    .get(BASE_URL + `/check/${fontId}`)
    .then((r) => {
      return r.data;
    })
    .catch((e) => {
      throw e;
    });
}

// 폰트 찜하기
export async function dibAddAPI(fontId: string): Promise<any> {
  return axiosWithAuth
    .post(BASE_URL + `/${fontId}`)
    .then((r) => {
      return r.data;
    })
    .catch((e) => {
      throw e;
    });
}

// 찜 삭제하기
export async function dibRemoveAPI(fontId: string): Promise<any> {
  return axiosWithAuth
    .delete(BASE_URL + `/${fontId}`)
    .then((r) => {
      return r.data;
    })
    .catch((e) => {
      throw e;
    });
}

// 폰트 찜한 사용자 수
export async function dibCountAPI(fontId: string): Promise<any> {
  return axiosWithoutAuth
    .get(BASE_URL + `/count/${fontId}`)
    .then((r) => {
      return r.data;
    })
    .catch((e) => {
      throw e;
    });
}

// 사용자 찜 목록 가져오기
export async function dibListAPI(): Promise<any> {
  return axiosWithAuth
    .get(BASE_URL + `/list`)
    .then((r) => {
      return r.data;
    })
    .catch((e) => {
      throw e;
    });
}
