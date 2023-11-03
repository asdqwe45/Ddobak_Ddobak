import { axiosWithoutAuth } from 'https/http';


// Email Api
// 이메일 인증번호 발송
export function userEmailVerifyRequest(email: string): Promise<any> {
  const data = {
    email: email,
  };
  return axiosWithoutAuth
    .post('/email/verify-request', data)
    .then((r) => {
      return r;
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
    .post('/email/verify', data)
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
export function userSignup(data: SignupData): Promise<any> {
  return axiosWithoutAuth
    .post('/signup', data)
    .then((r) => {
      return r;
    })
    .catch((e) => {
      throw e;
    });
}

/*
// Save to local storage
window.localStorage.setItem(key, JSON.stringify(newValue))
const item = window.localStorage.getItem(key)
return item ? (parseJSON(item) as T) : initialValue
*/

// const localStorage = window.localStorage

interface LoginType {
  email: string;
  password: string;
}

export async function userTestLogin(data: LoginType) {
  console.log(data);
  const testToken = 'DFGHJDFGHJKGHJKFGHJKLFGHJKFGHJKLFGHJK';
  const jsonTestToken = JSON.stringify(testToken);
  localStorage.setItem('testToken', jsonTestToken);
  window.location.reload();
}

// 토큰이 있는지 확인해주는 함수
export async function checkToken() {
  const testToken = localStorage.getItem('testToken');
  if (testToken) {
    const newTestToken = JSON.parse(testToken);
    return newTestToken;
  }
  return false;
}
