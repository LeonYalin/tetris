import React from 'react';
import { useState } from 'react';
import { RouteConfig } from 'react-router-config';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { AppPage } from './enums/appPage';
import Header from './shared/Header';

// lazy load
const GamePage = React.lazy(() => import('./pages/GamePage'));
const MainPage = React.lazy(() => import('./pages/MainPage'));
const StatsPage = React.lazy(() => import('./pages/StatsPage'));

const routes: RouteConfig[] = [
  {
    path: '/game',
    component: GamePage,
  },
  {
    path: '/stats',
    component: StatsPage,
  },
  {
    path: '/',
    component: MainPage,
  },
];

export default function App() {
  const [page, setPage] = useState<AppPage>(AppPage.MAIN_PAGE);

  return (
    <div className="App">
      <Header page={page}></Header>
      <Switch>
        {routes.map(({ path, component }, i) => (
          <Route key={i} path={path} component={component}></Route>
        ))}
      </Switch>
    </div>
  );
}
