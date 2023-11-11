import { axiosWithAuth, axiosWithoutAuth, getData } from 'https/http';
const BASE_URL = '/follow';

// 팔로우하기
export async function followCreateAPI(followingId: string): Promise<any> {
  return axiosWithAuth
    .post(BASE_URL + `/${followingId}`)
    .then((r) => {
      return r;
    })
    .catch((e) => {
      throw e;
    });
}

// 언팔
export async function followDeleteAPI(followingId: string): Promise<any> {
  return axiosWithAuth
    .delete(BASE_URL + `/unfollow/${followingId}`)
    .then((r) => {
      return r;
    })
    .catch((e) => {
      throw e;
    });
}

// 팔로워 조회
export async function followListAPI(): Promise<any> {
  const followerId = getData('id');
  return axiosWithoutAuth
    .get(BASE_URL + `/${followerId}`)
    .then((r) => {
      return r.data;
    })
    .catch((e) => {
      throw e;
    });
}

// 팔로우 했는지 확인
export async function followCheckAPI(followingId: string): Promise<any> {
  return axiosWithAuth
    .get(BASE_URL + `/check/${followingId}`)
    .then((r) => {
      return r.data;
    })
    .catch((e) => {
      throw e;
    });
}

// 팔로우 수 확인
export async function getCountFollowing(followingId: string): Promise<any> {
  return axiosWithAuth
    .get(BASE_URL + `/count/${followingId}`)
    .then((r) => {
      return r.data;
    })
    .catch((e) => {
      throw e;
    });
}
