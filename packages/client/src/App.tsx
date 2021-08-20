import React, { memo } from 'react';
import { RouteConfig } from 'react-router-config';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import { AppPage } from './enums/appPage';
import Header from './shared/Header';
import StoreProvider from './store/StoreProvider';

const routes: RouteConfig[] = [
  {
    path: '/game',
    component: React.lazy(() => import('./features/game/GameMain')),
  },
  {
    path: '/stats',
    component: React.lazy(() => import('./features/stats/StatsPage')),
  },
  {
    path: '/options',
    component: React.lazy(() => import('./features/options/OptionsPage')),
  },
  {
    path: '/',
    component: React.lazy(() => import('./features/home/HomeMain')),
  },
];

function App() {
  const history = useHistory();
  history.push(`/${AppPage.GAME}`);
  return (
    <StoreProvider>
      <div className="App">
        <Header></Header>
        <Switch>
          {routes.map(({ path, component }, i) => (
            <Route key={i} path={path} component={component}></Route>
          ))}
        </Switch>
      </div>
    </StoreProvider>
  );
}

export default memo(App);
