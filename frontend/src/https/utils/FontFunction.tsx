import {
  axiosWithAuth,
} from 'https/http';

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

export async function getfontList(id: string): Promise<any> {
  return 
}
