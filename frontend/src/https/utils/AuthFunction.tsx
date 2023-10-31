import { axiosWithoutAuth } from 'https/http';

const BASE_URL = '/api/v1/member';

// Email Api
// 이메일 인증번호 발송
export function userEmailVerifyRequest(email: string): Promise<void> {
  const data = {
    email: email,
  };
  return axiosWithoutAuth
    .post(BASE_URL + '/email/verify-request', data)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      throw e;
    });
}

// 이메일 인증번호 유효성 검증
type EmailCheckData = {
  email: string;
  authCode: string;
};

// type Response = {
//     response: {
//         data : string[]
//     }
// }

export function userEmailVerifyAPI(data: EmailCheckData): Promise<any> {
  return axiosWithoutAuth
    .post(BASE_URL + '/email/verify', data)
    .then((r) => {
      return r;
    })
    .catch((e) => {
      throw e;
    });
}

// 회원가입
type SignupData = {
  email: string;
  nickname: string;
  loginPassword: string;
};
export function userSignup(data: SignupData): Promise<void> {
  return axiosWithoutAuth.post(BASE_URL + '/signup', data);
}
