import { axiosWithAuth, axiosWithFormData, getData } from 'https/http';
import JSZip from 'jszip';

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
      // console.log(e.message);
      throw e;
    });
}

export async function makeFontSettingRequest(sortUrl: string): Promise<any> {
  const params = new FormData();
  params.append('sortUrl', sortUrl);
  return axiosWithFormData
    .post('/font/goSetting', params) // `params` 객체를 사용
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
    .then(async (r) => {
      const zip = await JSZip.loadAsync(r.data);
      let imgFilesObj: { [key: string]: string } = {};

      await Promise.all(
        Object.keys(zip.files).map(async (fileName) => {
          const fileData = await zip.files[fileName].async('blob');
          const dataUrl = URL.createObjectURL(fileData);
          imgFilesObj[fileName] = dataUrl;
        }),
      );

      // 모든 프로미스가 완료될 때까지 기다립니다.
      return imgFilesObj;
    })
    .catch((e) => {
      console.error(e);
    });
}

export async function fontMypageAPI(): Promise<any> {
  const memberId = await getData('id');
  return axiosWithAuth
    .get('/font/mypage/' + memberId)
    .then((r) => {
      return r.data;
    })
    .catch((e) => {
      throw e;
    });
}
