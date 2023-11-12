import { axiosWithAuth } from 'https/http';

const BASE_URL = '/cart';

// 장바구니 등록
export async function cartAddAPI(fontId: string): Promise<any> {
  return axiosWithAuth
    .post(BASE_URL + `/add/${fontId}`)
    .then((r) => {
      return r.data;
    })
    .catch((e) => {
      throw e;
    });
}
// 장바구니 리스트
export async function cartGetAPI(): Promise<any> {
  return axiosWithAuth
    .get(BASE_URL + '/get')
    .then((r) => {
      return r.data;
    })
    .catch((e) => {
      throw e;
    });
}
// 장바구니 삭제
export async function cartDeleteAPI(fontList: number[]): Promise<any> {
  const params = fontList.join(',');
  return axiosWithAuth
    .delete(BASE_URL + '/delete', { params })
    .then((r) => {
      return r.data;
    })
    .catch((e) => {
      throw e;
    });
}
