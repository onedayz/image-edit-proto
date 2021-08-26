import React from 'react';
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom';
import ImageEditComponent from './pages/ImageEdit/ImageEditComponent'
import ImageLocalStorageComponent from './pages/ImageLocalStorage/ImageLocalStorageComponent'


function App() {
  return (
    <>
      <BrowserRouter>
        <React.Suspense fallback={<div>Loading...</div>}>
          <ul style={{ textAlign: 'center' }}>
            <li style={{ display: 'inline-block', border: '1px solid red', margin: '0 5px' }}>
              <Link to="/image">image</Link>
            </li>
            <li style={{ display: 'inline-block', border: '1px solid red', margin: '0 5px' }}>
              <Link to="/save">save</Link>
            </li>
          </ul>
          <Switch>
            <Route exact path={`/image`} component={ImageEditComponent} />
            <Route exact path={`/save`} component={ImageLocalStorageComponent} />
            <Route exact path={`/`}>
              <Redirect to="/image" />
            </Route>
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
