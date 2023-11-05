import { axiosWithoutAuth, axiosWithAuth } from 'https/http';

// formData
/*
const aiDiagnosisRequest = {
      surveyResult: arrayString,
    };

    const json = JSON.stringify(aiDiagnosisRequest);
    const jsonBlob = new Blob([json], { type: "application/json" });

    const formData = new FormData();
    formData.append("aiDiagnosisRequest", jsonBlob);
*/

// Email Api
// 이메일 인증번호 발송
export async function userEmailVerifyRequest(email: string): Promise<any> {
  const data = {
    email: email,
  };
  return axiosWithoutAuth
    .post('/member/email/verify-request', data)
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

export async function userEmailVerifyAPI(data: EmailCheckData): Promise<any> {
  return axiosWithoutAuth
    .post('/member/email/verify', data)
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
export async function userSignup(data: SignupData, profileImg: File | string): Promise<any> {
  const formData = new FormData();

  // JSON 데이터를 추가합니다.
  formData.append('signUpRequest', new Blob([JSON.stringify(data)], { type: 'application/json' }));

  // 이미지 파일을 추가합니다.
  if (profileImg) {
    formData.append('profileImg', profileImg);
    return axiosWithoutAuth
      .post('/member/signup', formData)
      .then((r) => {
        return r;
      })
      .catch((e) => {
        throw e;
      });
  } else {
    return axiosWithoutAuth
      .post('/member/signup', formData)
      .then((r) => {
        return r;
      })
      .catch((e) => {
        throw e;
      });
  }
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

export async function userLogin(data: LoginType): Promise<any> {
  return axiosWithoutAuth
    .post('/member/login', data)
    .then((r) => {
      return r.data;
    })
    .catch((e) => {
      throw e;
    });
}

export async function userLogout(): Promise<any> {
  return axiosWithAuth
    .get('/member/logout')
    .then((r) => {
      return r.data;
    })
    .catch((e) => {
      throw e;
    });
}
