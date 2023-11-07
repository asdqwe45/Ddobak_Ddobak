import { ChangeEvent, useState, useRef, useEffect } from 'react';
import classes from './SignupPage.module.css';
// Auth 컴포넌트 가져오기
import { AuthHeader, AuthInput } from 'common/authComponents/AuthComponents';
// 로그인으로 이동하기
import { NavLink } from 'react-router-dom';
// 아이콘 이름 입력해서 바로 사용
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { FaCircleUser } from 'react-icons/fa6';
import { ImCamera } from 'react-icons/im';
// styled
import styled from '@emotion/styled';

import { NotValid, TimerText, EmailCheckBox } from './signupPageComponents/SignupPageComponents';

//  ===================
//  ===    axios    ===
//  ===================
// userEmailVerifyAPI,  userSignup
import { userEmailVerifyAPI, userEmailVerifyRequest, userSignup } from 'https/utils/AuthFunction';

const Circle = styled.div`
  width: 36px;
  height: 36px;
  position: absolute;
  border-radius: 100%;
  border: 0px;
  background-color: #4e5867;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    opacity: 0.7; /* 원하는 투명도 값으로 설정 */
  }
`;

const NewAuthInput = styled(AuthInput)`
  margin-top: 8.5px;
  margin-bottom: 8.5px;
  font-size: 14px;
  font-weight: 600;
`;

const HiddenInput = styled.input`
  width: 36px;
  height: 36px;
  border-radius: 100%;
  border: 0px;
  opacity: 0;
  position: absolute;
  z-index: 9999;
`;

const ProfileImg = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 100%;
  border: 1px solid #B6B6B6;
  // object-fit: cover; /* 이미지 비율을 유지하면서 요소의 전체 너비와 높이에 맞게 조정합니다. */
`

const SignupPage: React.FC = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [checkPWShow, setCheckPWShow] = useState(false);
  // 프로필 이미지
  const [profile, setProfile] = useState<string | null>(null);
  const [haveProfile, setHaveProfile] = useState(false)
  // 연결
  const fileInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const checkEmailRef = useRef<HTMLInputElement>(null);
  const nickNameRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const checkPWInputRef = useRef<HTMLInputElement>(null);
  const handleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(reader.result as string);
      };
      reader.readAsDataURL(file);
      setHaveProfile(true)
    } else {
      setProfile(null);
      setHaveProfile(false)
    }
  };

  // 이메일 확인
  // 이메일 형식을 확인하는 함수
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  // 이메일 input의 onChange 이벤트 핸들러
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setIsValidEmail(validateEmail(email));
  };

  // 인증 버튼 클릭
  const [timer, setTimer] = useState<number | null>(null); // 타이머의 현재 초
  const [isActive, setIsActive] = useState<boolean>(false); // 타이머가 활성화되어 있는지 여부

  useEffect(() => {
    if (isActive && timer !== null && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => (prevTimer !== null ? prevTimer - 1 : null));
      }, 1000);

      // Cleanup function
      return () => {
        clearInterval(interval);
      };
    } else if (timer !== null && timer === 0) {
      setIsActive(false); // 타이머가 끝나면 비활성화
      setTimer(null);
    }
  }, [isActive, timer]);

  const startTimer = () => {
    setIsActive(true);
    setTimer(1800); // 5분 = 300초
  };
  const clickCheckBtn = async () => {
    // 타이머 실행
    // 인증번호 재발송 버튼 활성화
    // 인증번호 유효한지 확인
    const email = emailInputRef.current?.value;
    console.log(email);
    if (email) {
      await userEmailVerifyRequest(email)
        .then((r) => console.log(r))
        .catch((e) => console.error(e));
    }
    await startTimer();
  };

  const changeEmail = () => {
    setIsActive(false);
    setTimer(null);
  };

  // 인증번호 확인
  const [isValidCheckNumber, setIsValidCheckNumber] = useState<boolean>(false);
  const checkNumberHandler = async () => {
    const email = emailInputRef.current?.value;
    const authCode = checkEmailRef.current?.value;
    if (email && authCode) {
      const data = {
        email: email,
        authCode: authCode,
      };
      userEmailVerifyAPI(data)
        .then((r) => {
          console.log(r);
          setTimer(null);
          setIsActive(false);
          setIsValidCheckNumber(true);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };
  // isValidCheckNumber 가 true일 경우 이메일 확인 비활성화
  const signupHandler = () => {
    console.log(isValidCheckNumber);
    const email = emailInputRef.current?.value;
    const nickname = nickNameRef.current?.value;
    const loginPassword = passwordInputRef.current?.value;
    if (email && nickname && loginPassword) {
      const data = {
        email: email,
        nickname: nickname,
        loginPassword: loginPassword,
      };
      console.log(data);
      userSignup(data)
        .then((r) => {
          console.log(r);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  return (
    <div className={classes.container}>
      <AuthHeader>회원가입</AuthHeader>
      <div className={classes.profileBox}>
        {haveProfile ? <ProfileImg  src={profile ? profile: "#"}/> : <FaCircleUser color="#B6B6B6" size={90} />}
        <Circle className={classes.cameraTransfrom}>
          <HiddenInput
            type="file"
            id="uploadImg"
            onChange={handleImgChange}
            accept="image/*"
            ref={fileInputRef}
          />
          <ImCamera color="white" size={23} />
        </Circle>
      </div>
      <div>
        <NewAuthInput
          ref={emailInputRef}
          placeholder="이메일 입력"
          onChange={handleEmailChange}
          disabled={isActive}
        ></NewAuthInput>
        <button
          className={isValidEmail ? classes.emailCheckBtn : classes.notValidEmail}
          disabled={!isValidEmail}
          onClick={clickCheckBtn}
        >
          {timer !== null ? '재인증' : '인증'}
        </button>
        {isValidEmail ? <></> : <NotValid>이메일이 유효하지 않습니다.</NotValid>}
        {/* 타이머 출력 */}
        <EmailCheckBox>
          {timer !== null && (
            <TimerText>
              남은 시간: {Math.floor(timer / 60)}분 {timer % 60}초
            </TimerText>
          )}
          {timer !== null && isValidEmail ? (
            <TimerText onClick={changeEmail} style={{ cursor: 'pointer' }}>
              이메일 변경
            </TimerText>
          ) : (
            <></>
          )}
        </EmailCheckBox>
      </div>
      <div>
        <NewAuthInput ref={checkEmailRef} placeholder="인증번호"></NewAuthInput>
        <button className={classes.emailCheckBtn} onClick={checkNumberHandler}>
          확인
        </button>
      </div>
      <NewAuthInput ref={nickNameRef} placeholder="닉네임"></NewAuthInput>
      <div>
        <NewAuthInput
          ref={passwordInputRef}
          type={passwordShow ? undefined : 'password'}
          placeholder="비밀번호"
        ></NewAuthInput>
        <div
          className={classes.passwordIcon}
          onClick={() => {
            setPasswordShow(!passwordShow);
          }}
        >
          {passwordShow ? (
            <FaEye size={24} color="black" />
          ) : (
            <FaEyeSlash size={24} color="black" />
          )}
        </div>
      </div>
      <div>
        <NewAuthInput
          ref={checkPWInputRef}
          type={checkPWShow ? undefined : 'password'}
          placeholder="비밀번호 확인"
        ></NewAuthInput>
        <div
          className={classes.passwordIcon}
          onClick={() => {
            setCheckPWShow(!checkPWShow);
          }}
        >
          {checkPWShow ? <FaEye size={24} color="black" /> : <FaEyeSlash size={24} color="black" />}
        </div>
      </div>
      <button className={classes.signupBtn} onClick={signupHandler}>
        회원가입
      </button>
      <NavLink className={classes.navigator} to={'/login'}>
        로그인 하러 가기
      </NavLink>
    </div>
  );
};

export default SignupPage;
