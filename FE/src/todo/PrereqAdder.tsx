import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div``;

const Titleinput = styled.input``;
const DetailInput = styled.input``;
const SubmitButton = styled.button``;

type adderProps = {
  listId: number;
  itemId: number;
  refresh: () => Promise<void>;
  refresh2: () => Promise<void>;
};

const PrereqAdder: React.FC<adderProps> = (props) => {
  const { listId, refresh, refresh2, itemId } = props;

  const [itemDetail, setItemDetail] = useState<string>('');
  const [itemTitle, setItemTitle] = useState<string>('');
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemTitle(e.target.value);
  };
  const onDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemDetail(e.target.value);
  };

  const onSubmit = async () => {
    try {
      await axios.post(`http://localhost:3001/item/req`, {
        listId,
        itemTitle,
        itemDetail,
        reqId: itemId,
      });
      refresh();
      refresh2();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      제목: <Titleinput onChange={onNameChange} />
      설명: <DetailInput onChange={onDetailChange} />
      <SubmitButton type="submit" onClick={onSubmit}>
        +
      </SubmitButton>
    </Container>
  );
};

export default PrereqAdder;
