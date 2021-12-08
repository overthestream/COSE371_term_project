import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

type listItemProps = {
  list_name: string;
  list_id: number;
  refresh: () => Promise<void>;
};

const Container = styled.div``;

const MoreButton = styled.button``;
const DeleteButton = styled.button``;
const ListItem: React.FC<listItemProps> = (props: listItemProps) => {
  const { list_name, list_id, refresh } = props;
  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    const getCount = async () => {
      const response = await axios.get(
        `http://localhost:3001/item/count/${list_id}`
      );
      const result = await response.data;
      setCount(result);
    };
    getCount();
  }, []);
  const deleteItem = async () => {
    await axios.delete(`http://localhost:3001/list/delete/${list_id}`);
    refresh();
  };
  return (
    <Container>
      {`제목: ${list_name}, 개수: ${count}`}
      <DeleteButton onClick={deleteItem}>-</DeleteButton>{' '}
      <Link to={`/todo/${list_id}`}>
        <MoreButton>...</MoreButton>
      </Link>
    </Container>
  );
};

export default ListItem;
