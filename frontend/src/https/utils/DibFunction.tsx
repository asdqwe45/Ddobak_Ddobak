import { axiosWithoutAuth, getData } from 'https/http';

const BASE_URL = '/dib';

// 찜 조회하기
export async function dibIsActiveAPI(fontId: string): Promise<any> {
  const memberId = await getData('id');
  return axiosWithoutAuth
    .get(BASE_URL + `/${memberId}/${fontId}`)
    .then((r) => {
      return r.data;
    })
    .catch((e) => {
      throw e;
    });
}

// 폰트 찜하기
export async function dibAddAPI(fontId: string): Promise<any> {
  const memberId = await getData('id');
  return axiosWithoutAuth
    .post(BASE_URL + `/add/${memberId}/${fontId}`)
    .then((r) => {
      return r.data;
    })
    .catch((e) => {
      throw e;
    });
}

// 찜 삭제하기
export async function dibRemoveAPI(fontId: string): Promise<any> {
  const memberId = await getData('id');
  return axiosWithoutAuth
    .delete(BASE_URL + `/remove/${memberId}/${fontId}`)
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
  const memberId = await getData('id');
  return axiosWithoutAuth
    .get(BASE_URL + `/${memberId}/`)
    .then((r) => {
      return r.data;
    })
    .catch((e) => {
      throw e;
    });
}
