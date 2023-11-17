import { axiosWithAuth, axiosWithFormData } from 'https/http';
const BASE_URL = '/review';

// 리뷰 등록
interface ReviewRegisterType {
  fontId: number;
  context: string;
}

export async function reviewRegisterAPI(
  data: ReviewRegisterType,
  image: File | string,
): Promise<any> {
  const formdata = new FormData();
  const json = JSON.stringify(data);
  const jsonBlob = new Blob([json], { type: 'application/json' });
  formdata.append('data', jsonBlob);
  formdata.append('file', image);
  return axiosWithFormData
    .post(BASE_URL + `/register`, formdata)
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

// 후기 리스트
/*
public record ReviewResponse(
        String reviewer,
        String reviewContext,
        String reviewUrl
)
*/
interface ReviewListType {
  reviewer: string;
  reviewContext: string;
  reviewUrl: string;
}
interface DataType {
  reviewCount: number;
  reviewResponseList: ReviewListType[];
}

export async function reviewListAPI(fontId: string): Promise<any> {
  return axiosWithAuth
    .get(BASE_URL + `/list/${fontId}`)
    .then((r) => {
      const responseData: DataType = r.data;
      return responseData;
    })
    .catch((e) => {
      throw e;
    });
}
