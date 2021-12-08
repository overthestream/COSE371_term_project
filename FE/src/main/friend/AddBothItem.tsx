import axios from 'axios';
import React from 'react';
import styled from 'styled-components';

type AddBothItemProps = {
  userId?: string;
  from: string;
  refreshBoth: () => Promise<void>;
  refreshMe: () => Promise<void>;
};

const Container = styled.div``;
const InfoButton = styled.button``;
const DeleteButton = styled.button``;

const AddBothItem: React.FC<AddBothItemProps> = (props) => {
  const { userId, from, refreshBoth, refreshMe } = props;
  const deleteItem = async () => {
    await axios.delete(`http://localhost:3001/friend/delete/${userId}/${from}`);
    refreshBoth();
    refreshMe();
  };
  return (
    <Container>
      {`ID: ${from}`}
      <DeleteButton onClick={deleteItem}>-</DeleteButton>
      <InfoButton>...</InfoButton>
    </Container>
  );
};

export default AddBothItem;
