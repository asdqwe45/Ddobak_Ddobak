import { ChangeEvent, useState, useRef } from 'react';
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
            className="hiddenInput"
          />
          <ImCamera color="white" size={23} />
        </Circle>
      </div>
      <div>
        <NewAuthInput ref={emailInputRef} placeholder="이메일 입력"></NewAuthInput>
        <button className={classes.emailCheckBtn}>인증</button>
      </div>
      <div>
        <NewAuthInput ref={checkEmailRef} placeholder="인증번호"></NewAuthInput>
        <button className={classes.emailCheckBtn}>확인</button>
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
      <button className={classes.signupBtn}>회원가입</button>
      <NavLink className={classes.navigator} to={'/login'}>
        로그인 하러 가기
      </NavLink>
    </div>
  );
};

export default SignupPage;
