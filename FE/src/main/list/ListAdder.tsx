import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div``;

const IDinput = styled.input``;
const SubmitButton = styled.button``;

type adderProps = {
  userId?: string;
  fun: () => Promise<void>;
};

const ListAdder: React.FC<adderProps> = (props) => {
  const { userId, fun } = props;
  const [listName, setListName] = useState<string>('');

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListName(e.target.value);
  };

  const onSubmit = async () => {
    try {
      await axios.post(`http://localhost:3001/list/add`, {
        userId,
        listName,
      });
      fun();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <IDinput onChange={onNameChange} />
      <SubmitButton type="submit" onClick={onSubmit}>
        +
      </SubmitButton>
    </Container>
  );
};

export default ListAdder;
