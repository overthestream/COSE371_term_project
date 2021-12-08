import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import ItemAdder from './ItemAdder';
import ToDoItem from './ToDoItem';

type toDoItem = {
  item_id: number;
  list_id: number;
  list_name: string;
  item_title: string;
  item_detail: string;
  is_done: boolean;
  is_important: boolean;
  due_date: string;
};

type req = {
  item_id: number;
  list_id: number;
  prereq_id: number;
  item_title: string;
  item_detail: string;
  is_done: boolean;
  is_important: boolean;
  due_date: string;
};

const Container = styled.div``;

const TitleModifier = styled.div``;
const TitleInput = styled.input``;
const TitleButton = styled.button``;

const ToDoPage: React.FC = () => {
  const temp = useParams().list_id;

  const listId = temp ? parseInt(temp, 10) : undefined;
  const [listName, setListName] = useState<string>('');
  const listTitle = listName;
  const getListName = async () => {
    const response = await axios.get(
      `http://localhost:3001/list/name/${listId}`
    );
    const list = await response.data;
    await setListName(list[0].list_name);
  };
  useEffect(() => {
    getListName();
  }, []);

  const [todoItems, setTodoItems] = useState<toDoItem[]>([]);
  const getItems = async () => {
    const response = await axios.get(
      `http://localhost:3001/item/get/${listId}`
    );
    const list = await response.data;
    setTodoItems(list);
  };
  useEffect(() => {
    getItems();
  }, []);

  const [req, setReq] = useState<req[]>([]);
  const getReq = async () => {
    const response = await axios.get(
      `http://localhost:3001/item/req/get/${listId}`
    );
    const list = await response.data;
    setReq(list);
  };
  useEffect(() => {
    getReq();
  }, []);

  const [title, setTitle] = useState<string>('');
  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onTitleSubmit = async () => {
    try {
      await axios.put(`http://localhost:3001/list/put`, {
        id: listId,
        newName: title,
      });
      window.location.href = `http://localhost:3000/todo/${listId}`;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      목록명 : {listTitle}
      <TitleModifier>
        제목 수정: <TitleInput onChange={onTitleChange} />
        <TitleButton onClick={onTitleSubmit}>confirm</TitleButton>
      </TitleModifier>
      {todoItems.map((item) => {
        for (let i = 0; i < req.length; i += 1) {
          if (item.item_id === req[i].item_id)
            return (
              <ToDoItem
                listId={item.list_id}
                item_id={item.item_id}
                item_title={item.item_title}
                item_detail={item.item_detail}
                is_done={item.is_done}
                is_important={item.is_important}
                due_date={item.due_date}
                refresh={getItems}
                refresh2={getReq}
                reqTitle={req[i].item_title}
              />
            );
        }
        return (
          <ToDoItem
            listId={item.list_id}
            item_id={item.item_id}
            item_title={item.item_title}
            item_detail={item.item_detail}
            is_done={item.is_done}
            is_important={item.is_important}
            due_date={item.due_date}
            refresh={getItems}
            refresh2={getReq}
            reqTitle=""
          />
        );
      })}
      <ItemAdder listId={listId} refresh={getItems} />
    </Container>
  );
};

export default ToDoPage;
