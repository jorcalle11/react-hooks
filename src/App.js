import React, { Suspense } from 'react';
import Router from 'react-router-dom/BrowserRouter';
import Route from 'react-router-dom/Route';
import Link from 'react-router-dom/Link';
import Redirect from 'react-router-dom/Redirect';
import Switch from 'react-router-dom/Switch';

const Counter = React.lazy(() => import('./Counter'));
const StopWatch = React.lazy(() => import('./StopWatch'));
const Todo = React.lazy(() => import('./Todo'));
const Greeting = React.lazy(() => import('./Gretting'));
const Pokemon = React.lazy(() => import('./Pokemon'));

export default function App() {
  return (
    <Router>
      <>
        <nav>
          <ul>
            <li>
              <Link to="/counter">Counter</Link>
            </li>
            <li>
              <Link to="/stop-watch">Stop Watch</Link>
            </li>
            <li>
              <Link to="/todo">Todo</Link>
            </li>
            <li>
              <Link to="/greeting">Greeting</Link>
            </li>
            <li>
              <Link to="/pokemon">Pokemon</Link>
            </li>
          </ul>
        </nav>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/counter" component={Counter} />
            <Route path="/stop-watch" component={StopWatch} />
            <Route path="/todo" component={Todo} />
            <Route path="/greeting" component={Greeting} />
            <Route path="/pokemon" component={Pokemon} />
            <Redirect from="/" to="/counter" />
          </Switch>
        </Suspense>
      </>
    </Router>
  );
}
