import React from 'react';
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom';
import ImageEditOriginComponent from './pages/ImageEditOrigin/ImageEditOriginComponent'
import ImageLocalStorageComponent from './pages/ImageLocalStorage/ImageLocalStorageComponent'
import ExifComponent from './pages/Exif/ExifComponent'



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
            <li style={{ display: 'inline-block', border: '1px solid red', margin: '0 5px' }}>
              <Link to="/exif">exif</Link>
            </li>
          </ul>
          <Switch>
            <Route exact path={`/image`} component={ImageEditOriginComponent} />
            <Route exact path={`/save`} component={ImageLocalStorageComponent} />
            <Route exact path={`/exif`} component={ExifComponent} />
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
