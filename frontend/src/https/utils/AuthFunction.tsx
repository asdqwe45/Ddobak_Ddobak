import {
  axiosWithoutAuth,
  axiosWithAuth,
  axiosWithoutFormData,
  axiosWithFormData,
} from 'https/http';
// 함수 실험
import { genSaltSync, hashSync } from 'bcrypt-ts';
// const salt = genSaltSync(10);
// const hash = hashSync("B4c0//", salt);
// const hash = hashSync("원하는 문자열", salt)
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
      return r.data;
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
      return r.data;
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
  const json = JSON.stringify(data);
  const jsonBlob = new Blob([json], { type: 'application/json' });
  // JSON 데이터를 추가합니다.
  await formData.append('signUpRequest', jsonBlob);

  // 이미지 파일을 추가합니다.
  if (profileImg) {
    await formData.append('profileImg', profileImg);
    return axiosWithoutFormData
      .post('/member/signup', formData)
      .then((r) => {
        return r.data;
      })
      .catch((e) => {
        throw e;
      });
  } else {
    return axiosWithoutFormData
      .post('/member/signup', formData)
      .then((r) => {
        return r.data;
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

export async function userTestLogin(data: LoginType) {
  console.log(data);
  const testToken = 'DFGHJDFGHJKGHJKFGHJKLFGHJKFGHJKLFGHJK';
  const jsonTestToken = JSON.stringify(testToken);
  localStorage.setItem('testToken', jsonTestToken);
  window.location.reload();
}

// 토큰이 있는지 확인해주는 함수
export async function checkToken() {
  const accessToken = await localStorage.getItem('accessToken');
  if (accessToken) {
    const NewAccessToken = await JSON.parse(accessToken);
    return NewAccessToken;
  }
  return false;
}

interface LoginType {
  email: string;
  loginPassword: string;
}
export async function userLogin(data: LoginType): Promise<any> {
  return axiosWithoutAuth
    .post('/member/login', data)
    .then(async (r) => {
      const offset = new Date().getTimezoneOffset() * 60000;
      const responseData = await r.data;
      const id = await JSON.stringify(responseData.id);
      const accessToken = await JSON.stringify(responseData.accessToken);
      const refreshToken = await JSON.stringify(responseData.refreshToken);
      const profileImgUrl = await JSON.stringify(responseData.profileImgUrl);
      const today = new Date(Date.now() - offset);
      await localStorage.setItem('id', id);
      await localStorage.setItem('accessToken', accessToken);
      await localStorage.setItem('refreshToken', refreshToken);
      await localStorage.setItem('profileImgUrl', profileImgUrl);
      await localStorage.setItem('today', today.toISOString());

      // 실험 시작
      const salt = genSaltSync(10);
      const hash = hashSync('1234', salt);
      const newHash = await JSON.stringify(hash);
      await localStorage.setItem('test', newHash);

      // 실험 끝
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

export async function userNicknameAPI(nickname: string): Promise<any> {
  const data = {
    nickname: nickname,
  };
  return axiosWithoutAuth
    .post('/member/nickname/duplicate', data)
    .then((r) => {
      return r.data;
    })
    .catch((e) => {
      throw e;
    });
}

// 비밀번호 변경
interface userChangePwType {
  prevLoginPassword: string;
  newLoginPassword: string;
}
export async function userChangePwAPI(data: userChangePwType): Promise<any> {
  return axiosWithAuth
    .post('/member/password', data)
    .then((r) => {
      return r.data;
    })
    .catch((e) => {
      throw e;
    });
}

// 프로필 이미지 변경 폼데이터
export async function userChangeProfileAPI(profileImg: File | string): Promise<any> {
  const formData = new FormData();
  if (profileImg) {
    formData.append('profileImg', profileImg);
  }
  return axiosWithFormData
    .post('/member/profileImg', formData)
    .then((r) => {
      return r.data;
    })
    .catch((e) => {
      throw e;
    });
}

// 닉네임 변경
interface userChnageNicknameType {
  nickname: string;
}

export async function userChangeNicknameAPI(data: userChnageNicknameType): Promise<any> {
  return axiosWithAuth
    .post('/member/nickname', data)
    .then((r) => {
      return r.data;
    })
    .catch((e) => {
      throw e;
    });
}

// 소개글 변경
interface userChangeInfoType {
  infoText: string;
}
export async function userChangeInfoAPI(data: userChangeInfoType): Promise<any> {
  return axiosWithAuth
    .post('/member/textinfo', data)
    .then((r) => {
      return r.data;
    })
    .catch((e) => {
      throw e;
    });
}

// accessToken 만료 갱신??
// 규민이한테 물어봐야함
interface userAccessTokenType {
  refreshToken: string;
}
export async function userAccessTokenAPI(data: userAccessTokenType): Promise<any> {
  return axiosWithAuth
    .post('/member/refresh')
    .then((r) => {
      return r.data;
    })
    .catch((e) => {
      throw e;
    });
}

// 마이페이지
export async function userMypageAPI(): Promise<any> {
  return axiosWithAuth
    .get('/member/mypage')
    .then((r) => {
      return r.data;
    })
    .catch((e) => {
      throw e;
    });
}
