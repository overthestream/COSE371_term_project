import axios from 'axios';
import React from 'react';
import styled from 'styled-components';

type AddMeItemProps = {
  userId?: string;
  from: string;
  refreshBoth: () => Promise<void>;
  refreshMe: () => Promise<void>;
};

const Container = styled.div``;
const AddButton = styled.button``;
const InfoButton = styled.button``;
const AddMeItem: React.FC<AddMeItemProps> = (props) => {
  const { from, userId, refreshBoth, refreshMe } = props;
  const addNewFriend = async () => {
    axios.post(`http://localhost:3001/friend/add`, {
      addFrom: userId,
      addTo: from,
    });
    refreshBoth();
    refreshMe();
  };
  return (
    <Container>
      {`ID: ${from}`}
      <AddButton onClick={addNewFriend}>+</AddButton>
      <InfoButton>...</InfoButton>
    </Container>
  );
};

export default AddMeItem;
