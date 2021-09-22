import React, { memo } from 'react';
import { RouteConfig } from 'react-router-config';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './shared/Header';
import StoreProvider from './store/StoreProvider';

const routes: RouteConfig[] = [
  {
    path: '/game',
    component: React.lazy(() => import('./features/game/GameMain')),
  },
  {
    path: '/stats',
    component: React.lazy(() => import('./features/highScores/HighScoresMain')),
  },
  {
    path: '/howToPlay',
    component: React.lazy(() => import('./features/howToPlay/HowToPlayMain')),
  },
  {
    path: '/',
    component: React.lazy(() => import('./features/home/HomeMain')),
  },
];

function App() {
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
