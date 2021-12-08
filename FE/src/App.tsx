import React from 'react';
import { useRoutes } from 'react-router-dom';
import './App.css';
import Loginpage from './login/Loginpage';

import Mainpage from './main/Mainpage';
import ToDoPage from './todo/ToDoPage';

const App: React.FC = () => {
  const routes = useRoutes([
    { path: '/', element: <Loginpage /> },
    { path: '/main/:user_id', element: <Mainpage /> },
    { path: '/todo/:list_id', element: <ToDoPage /> },
  ]);
  return routes;
};

export default App;
