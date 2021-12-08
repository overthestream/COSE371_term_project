import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router';

import ListItem from './list/ListItem';
import ListAdder from './list/ListAdder';

import IaddItem from './friend/IaddItem';
import AddMeItem from './friend/AddMeItem';
import AddBothItem from './friend/AddBothItem';
import FriendSearch from './friend/FriendSearch';

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
`;
const FriendContainer = styled.div`
  border: 1px solid black;
`;

const IaddContainer = styled.div`
  border: 1px solid black;
`;
const AddMeContainer = styled.div`
  border: 1px solid black;
`;
const AddBothContainer = styled.div`
  border: 1px solid black;
`;

type listType = {
  list_id: number;
  list_name: string;
};

type from = {
  add_from: string;
};
type to = {
  add_to: string;
};

const Mainpage: React.FC = () => {
  const id = useParams().user_id;

  const [listItems, setListItems] = useState<listType[]>([]);
  const getList = async () => {
    const response = await axios.get(`http://localhost:3001/list/get/${id}`);
    const list = await response.data;
    setListItems(list);
  };
  useEffect(() => {
    getList();
  }, []);

  const [friendIaddList, setFriendIaddList] = useState<to[]>([]);
  const getIadd = async () => {
    const response = await axios.get(`http://localhost:3001/friend/iadd/${id}`);
    const list = await response.data;
    setFriendIaddList(list);
  };
  useEffect(() => {
    getIadd();
  }, []);

  const [friendAddMeList, setFriendAddmeList] = useState<from[]>([]);
  const getAddMe = async () => {
    const response = await axios.get(
      `http://localhost:3001/friend/addme/${id}`
    );
    const list = await response.data;
    setFriendAddmeList(list);
  };
  useEffect(() => {
    getAddMe();
  }, []);

  const [friendAddBothList, setFriendAddBothList] = useState<from[]>([]);
  const getAddBoth = async () => {
    const response = await axios.get(
      `http://localhost:3001/friend/addboth/${id}`
    );
    const list = await response.data;
    setFriendAddBothList(list);
  };
  useEffect(() => {
    getAddBoth();
  }, []);

  return (
    <Container>
      <ListContainer>
        나의 할 일 목록들
        {listItems.map((item) => {
          return (
            <ListItem
              list_id={item.list_id}
              list_name={item.list_name}
              refresh={getList}
            />
          );
        })}
        <ListAdder userId={id} fun={getList} />
      </ListContainer>
      <FriendContainer>
        <FriendSearch
          userId={id}
          refreshI={getIadd}
          refreshBoth={getAddBoth}
          refreshMe={getAddMe}
        />
        <IaddContainer>
          내가 추가한 친구
          {friendIaddList.map((item) => {
            return <IaddItem to={item.add_to} refresh={getIadd} userId={id} />;
          })}
        </IaddContainer>
        <AddMeContainer>
          나를 추가한 친구
          {friendAddMeList.map((item) => {
            return (
              <AddMeItem
                refreshBoth={getAddBoth}
                refreshMe={getAddMe}
                userId={id}
                from={item.add_from}
              />
            );
          })}
        </AddMeContainer>
        <AddBothContainer>
          서로 친구
          {friendAddBothList.map((item) => {
            return (
              <AddBothItem
                userId={id}
                refreshBoth={getAddBoth}
                refreshMe={getAddMe}
                from={item.add_from}
              />
            );
          })}
        </AddBothContainer>
      </FriendContainer>
    </Container>
  );
};

export default Mainpage;
