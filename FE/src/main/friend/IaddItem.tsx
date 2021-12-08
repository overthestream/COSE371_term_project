import axios from 'axios';
import React from 'react';
import styled from 'styled-components';

type IaddItemProps = {
  to: string;
  userId?: string;
  refresh: () => Promise<void>;
};

const Container = styled.div``;
const InfoButton = styled.button``;
const DeleteButton = styled.button``;

const IaddItem: React.FC<IaddItemProps> = (props) => {
  const { to, userId, refresh } = props;

  const deleteItem = async () => {
    await axios.delete(`http://localhost:3001/friend/delete/${userId}/${to}`);
    refresh();
  };

  return (
    <Container>
      {`ID: ${to}`}
      <DeleteButton onClick={deleteItem}>-</DeleteButton>
      <InfoButton>...</InfoButton>
    </Container>
  );
};

export default IaddItem;
