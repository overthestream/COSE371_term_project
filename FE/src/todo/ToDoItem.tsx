import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import PrereqAdder from './PrereqAdder';

type toDoItemProps = {
  listId: number;
  item_id: number;
  item_title: string;
  item_detail: string;
  is_done: boolean;
  is_important: boolean;
  due_date: string;
  refresh: () => Promise<void>;
  refresh2: () => Promise<void>;
  reqTitle: string;
};

type textProps = {
  isDone: boolean;
  isImportant: boolean;
};

const Container = styled.div`
  width: 30%;
  border: 1px solid black;
`;
const TextContainer = styled.div<textProps>`
  color: ${(props) => (props.isImportant ? 'blue' : 'black')};
  text-decoration: ${(props) => (props.isDone ? 'line-through' : 'none')};
`;
const TitleModifier = styled.div``;
const TitleInput = styled.input``;
const TitleButton = styled.button``;

const DeleteButton = styled.button``;
const ToDoItem: React.FC<toDoItemProps> = (props: toDoItemProps) => {
  const {
    listId,
    is_important,
    item_id,
    item_title,
    item_detail,
    due_date,
    refresh,
    refresh2,
    is_done,
    reqTitle,
  } = props;
  const detailInfo = item_detail ? `설명: ${item_detail}` : '';
  const dueInfo = due_date ? `기한: ${due_date.split('T')[0]}` : '';
  const importantInfo = is_important ? '중요!' : '';
  const doneInfo = is_done ? '완료!' : '';
  const reqInfo = reqTitle ? `먼저할 일 : ${reqTitle}` : ``;

  const [title, setTitle] = useState<string>('');
  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onTitleSubmit = async () => {
    try {
      await axios.put(`http://localhost:3001/item/title`, {
        id: item_id,
        newTitle: title,
      });
      refresh();
    } catch (err) {
      console.log(err);
    }
  };

  const [detail, setDetail] = useState<string>('');
  const onDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetail(e.target.value);
  };
  const onDetailSubmit = async () => {
    try {
      await axios.put(`http://localhost:3001/item/detail`, {
        id: item_id,
        newDetail: detail,
      });
      refresh();
    } catch (err) {
      console.log(err);
    }
  };

  const [dueDate, setDueDate] = useState<string>('');
  const onDueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDueDate(e.target.value);
  };
  const onDueSubmit = async () => {
    try {
      await axios.put(`http://localhost:3001/item/due`, {
        id: item_id,
        dueDate,
      });
      refresh();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteItem = async () => {
    await axios.delete(`http://localhost:3001/item/delete/${item_id}`);
    refresh();
    refresh2();
  };

  const pinItem = async () => {
    await axios.put(`http://localhost:3001/item/pin`, {
      id: item_id,
    });
    refresh();
  };
  const doneItem = async () => {
    await axios.put(`http://localhost:3001/item/done`, {
      id: item_id,
    });
    refresh();
  };

  return (
    <Container>
      <TextContainer isDone={is_done} isImportant={is_important}>
        {`제목: ${item_title}`}
        <TitleModifier>
          제목 수정: <TitleInput onChange={onTitleChange} />{' '}
          <TitleButton onClick={onTitleSubmit}>confirm</TitleButton>
        </TitleModifier>
        {detailInfo}
        <TitleModifier>
          설명 수정: <TitleInput onChange={onDetailChange} />{' '}
          <TitleButton onClick={onDetailSubmit}>confirm</TitleButton>
        </TitleModifier>
        {dueInfo}
        <TitleModifier>
          기한 수정(YYYY-MM-DD): <TitleInput onChange={onDueChange} />{' '}
          <TitleButton onClick={onDueSubmit}>confirm</TitleButton>
        </TitleModifier>
        <input type="checkbox" checked={is_important} onClick={pinItem} />
        {importantInfo}
        <br />
        <input type="checkbox" checked={is_done} onClick={doneItem} />
        {doneInfo}
      </TextContainer>
      다음 할 일 추가
      <PrereqAdder
        refresh={refresh}
        refresh2={refresh2}
        listId={listId}
        itemId={item_id}
      />
      {reqInfo}
      <br />
      <DeleteButton onClick={deleteItem}>삭제</DeleteButton>
    </Container>
  );
};

export default ToDoItem;
