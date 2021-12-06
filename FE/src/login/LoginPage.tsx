import React, { useState } from 'react';
import styled from 'styled-components';

const LoginPageHeader = styled.div``;

const InputContainer = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
`;

const LoginButton = styled.button``;

const IDinput = styled.input``;
const PWinput = styled.input``;

const LoginPage: React.FC = () => {
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');

  const onIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const onPwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
  };

  const onSubmit = () => {
    // id, pw로 뭐시기 해보기 .
    const login = { id, pw };
    return login;
  };

  return (
    <>
      <LoginPageHeader>로그인 / 회원가입</LoginPageHeader>
      <InputContainer>
        <IDinput onChange={onIdChange} />
        <PWinput onChange={onPwChange} />
      </InputContainer>
      <LoginButton type="submit" onClick={onSubmit} />
    </>
  );
};

export default LoginPage;
