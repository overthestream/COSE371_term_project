import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import SearchItem from './SearchItem';

const Container = styled.div`
  border: 1px solid black;
`;

const IDinput = styled.input``;
const SubmitButton = styled.button``;

type searchProps = {
  userId?: string;
  refreshBoth: () => Promise<void>;
  refreshMe: () => Promise<void>;
  refreshI: () => Promise<void>;
};

type searchResultType = {
  user_id?: string;
};

const FriendSearch: React.FC<searchProps> = (props) => {
  const { userId, refreshBoth, refreshI, refreshMe } = props;
  const [searchVal, setSearchVal] = useState<string>('');

  const [searchResult, setSearchResult] = useState<searchResultType[]>([]);
  const getResult = async () => {
    const response = await axios.get(
      `http://localhost:3001/user/find/${searchVal}`
    );
    const list = await response.data;
    setSearchResult(list);
  };

  const onSearchValChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  };

  const onSubmit = async () => {
    try {
      getResult();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      유저 검색
      <IDinput onChange={onSearchValChange} />
      <SubmitButton type="submit" onClick={onSubmit}>
        검색
      </SubmitButton>{' '}
      <br />
      검색 결과
      {searchResult.map((item) => {
        if (item.user_id === userId) return null;
        return (
          <SearchItem
            userId={userId}
            resultId={item.user_id}
            refreshI={refreshI}
            refreshBoth={refreshBoth}
            refreshMe={refreshMe}
          />
        );
      })}
    </Container>
  );
};

export default FriendSearch;
