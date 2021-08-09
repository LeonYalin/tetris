import React from 'react';
import { useState } from 'react';
import { RouteConfig } from 'react-router-config';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { AppPage } from './enums/appPage';
import Header from './shared/Header';

const routes: RouteConfig[] = [
  {
    path: '/game',
    component: React.lazy(() => import('./pages/GamePage')),
  },
  {
    path: '/stats',
    component: React.lazy(() => import('./pages/StatsPage')),
  },
  {
    path: '/options',
    component: React.lazy(() => import('./pages/OptionsPage')),
  },
  {
    path: '/',
    component: React.lazy(() => import('./pages/MainPage')),
  },
];

export default function App() {
  const [page, setPage] = useState<AppPage>(AppPage.MAIN);

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
