import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { confirm } from 'react-confirm-box';

const LoginPageHeader = styled.div``;

const InputContainer = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
`;

const LoginButton = styled.button``;

const IDinput = styled.input``;
const PWinput = styled.input``;

const Loginpage: React.FC = () => {
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');

  const onIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const onPwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
  };

  const onSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3001/user/login', {
        userId: id,
        userPw: pw,
      });
      const result = response.data;
      if (result === 'success') {
        window.location.href = `http://localhost:3000/main/${id}`;
      } else if (result === 'none') {
        const options = {
          labels: {
            confirmable: '확인',
            cancellable: '취소',
          },
        };
        const confirmMsg = '존재하지 않는 ID입니다. 회원가입을 하시겠습니까?';
        const isConfirmed = await confirm(confirmMsg, options);
        if (isConfirmed) {
          await axios.post('http://localhost:3001/user/register', {
            userId: id,
            userPw: pw,
          });
        }
      } else {
        const failMsg = '비밀번호가 틀렸습니다.';
        alert(failMsg);
      }
    } catch (err) {
      console.log(err);
    }
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

export default Loginpage;
