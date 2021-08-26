import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import ImageEditComponent from './pages/ImageEdit/ImageEditComponent'


function App() {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path={`/image`} component={ImageEditComponent} />
          <Route exact path={`/`}>
            <Redirect to="/image" />
          </Route>
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;
