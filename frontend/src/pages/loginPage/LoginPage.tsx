import styled from '@emotion/styled';
import classes from './LoginPage.module.css';
// 아이콘 이름 입력해서 바로 사용
import { FaEyeSlash, FaEye } from 'react-icons/fa';
// 상태관리
import { useState } from 'react';
// 회원가입으로 이동하기
import { NavLink } from 'react-router-dom';

export const AuthInput = styled.input`
  width: 260px;
  height: 48px;
  background-color: #fff1f0;
  color: #6d6d6d;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 13px;
  border-radius: 6.5px;
  border: 0px;
  margin-top: 22px;
  margin-bottom: 8px;
  font-weight: bold;
  positon: relative;
`;
export const AuthHeader = styled.p`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
`;
const Forgot = styled.div`
  width: 300px;
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  font-weight: 500;
`;

export const AuthNavigator = styled.div`
  text-decoration: none;
`;

const LoginPage: React.FC = () => {
  const [wantSee, setWantSee] = useState(false);
  const wantSeeHandle = () => {
    setWantSee(!wantSee);
  };
  return (
    <div className={classes.container}>
      <AuthHeader>로그인</AuthHeader>
      <AuthInput placeholder="이메일"></AuthInput>
      <div className={classes.passwordBox}>
        <AuthInput placeholder="비밀번호"></AuthInput>
        <div className={classes.passwordIcon} onClick={wantSeeHandle}>
          {wantSee ? <FaEye size={24} color="black" /> : <FaEyeSlash size={24} color="black" />}
        </div>
      </div>
      <Forgot>
        <p>비밀번호를 잊어버리셨나요?</p>
      </Forgot>
      <button className={classes.loginBtn} type="button">
        로그인
      </button>
      <NavLink className={classes.navigator} to={'/signup'}>
        회원가입
      </NavLink>
    </div>
  );
};

export default LoginPage;
