import axios from 'axios';
import React from 'react';
import styled from 'styled-components';

type SearchItemProps = {
  userId?: string;
  resultId?: string;
  refreshI: () => Promise<void>;
  refreshBoth: () => Promise<void>;
  refreshMe: () => Promise<void>;
};

const Container = styled.div``;
const AddButton = styled.button``;
const InfoButton = styled.button``;

const SearchItem: React.FC<SearchItemProps> = (props) => {
  const { resultId, userId, refreshBoth, refreshMe, refreshI } = props;
  const addNewFriend = async () => {
    await axios.post(`http://localhost:3001/friend/add`, {
      addFrom: userId,
      addTo: resultId,
    });
    refreshBoth();
    refreshMe();
    refreshI();
  };
  return (
    <Container>
      {`ID: ${resultId}`}
      <AddButton onClick={addNewFriend}>+</AddButton>
      <InfoButton>...</InfoButton>
    </Container>
  );
};

export default SearchItem;
