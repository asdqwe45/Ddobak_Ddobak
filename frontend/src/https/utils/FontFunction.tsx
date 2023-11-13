import { axiosWithAuth, axiosWithFormData, axiosWithoutAuth } from 'https/http';

export async function makerIntroRequest(id: string): Promise<any> {
  return axiosWithAuth
    .get(`/member/textinfo/${id}`)
    .then((r) => {
      return r.data;
    })
    .catch((e) => {
      throw e;
    });
}

export async function changeMakerIntroRequest(modifiedText: string): Promise<any> {
  return axiosWithAuth
    .post(`/member/textinfo`, { infoText: modifiedText })
    .then((r) => {
      return r.data;
    })
    .catch((e) => {
      console.log(e.message);
      throw e;
    });
}

export async function makeFontSettingRequest(sortUrl: string): Promise<any> {
  const params = { sortUrl: sortUrl };
  return axiosWithoutAuth
    .post('/font/goSetting', { params })
    .then((r) => {
      return r.data;
    })
    .catch((e) => console.error(e));
}

export async function makeFontPreveiwReqeust(sortUrl: string): Promise<any> {
  const params = new FormData();
  params.append('sortUrl', sortUrl);
  return axiosWithFormData
    .post(`/font/watch`, params, { responseType: 'blob' })
    .then((r) => {
      return r.data;
    })
    .catch((e) => {
      console.error(e);
    });
}
