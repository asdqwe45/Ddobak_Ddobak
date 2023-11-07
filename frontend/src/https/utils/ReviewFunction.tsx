import { axiosWithAuth } from 'https/http';
const BASE_URL = '/review';

// 리뷰 등록
interface ReviewRegisterType {
  fontId: string;
  context: string;
}

export async function reviewRegisterAPI(data: ReviewRegisterType): Promise<any> {
  return axiosWithAuth
    .post(BASE_URL + `/register`, data)
    .then((r) => {
      return r.data;
    })
    .catch((e) => {
      throw e;
    });
}

// 리뷰 삭제
export async function reviewDeleteAPI(reviewId: string): Promise<any> {
  return axiosWithAuth
    .get(BASE_URL + `/delete/${reviewId}`)
    .then((r) => {
      return r.data;
    })
    .catch((e) => {
      throw e;
    });
}
