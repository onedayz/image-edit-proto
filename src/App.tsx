import React from 'react';
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom';
import ImageEditOriginComponent from './pages/ImageEditOrigin/ImageEditOriginComponent'
import ImageEditMergeComponent from './pages/ImageEditMerge/ImageEditMergeComponent'
import ImageLocalStorageComponent from './pages/ImageLocalStorage/ImageLocalStorageComponent'
import ExifComponent from './pages/Exif/ExifComponent'
import ToastImageComponent from './pages/ToastImage/ToastImageComponent'
import ReactCropperComponent from './pages/ReactCropper/ReactCropperComponent'
import FabricComponent from './pages/Fabric/FabricComponent'
import FabricMergeComponent from './pages/FabricMerge/FabricMergeComponent'
import FabricFilterComponent from './pages/FabricFilter/FabricFilterComponent'

import './App.css';

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
              <Link to="/merge">merge</Link>
            </li>
            <li style={{ display: 'inline-block', border: '1px solid red', margin: '0 5px' }}>
              <Link to="/save">save</Link>
            </li>
            <li style={{ display: 'inline-block', border: '1px solid red', margin: '0 5px' }}>
              <Link to="/exif">exif</Link>
            </li>
            <li style={{ display: 'inline-block', border: '1px solid red', margin: '0 5px' }}>
              <Link to="/toast">toast</Link>
            </li>
            <li style={{ display: 'inline-block', border: '1px solid red', margin: '0 5px' }}>
              <Link to="/reactcropper">react-cropper</Link>
            </li>
            <li style={{ display: 'inline-block', border: '1px solid red', margin: '0 5px' }}>
              <Link to="/fabric">Fabric</Link>
            </li>
            <li style={{ display: 'inline-block', border: '1px solid red', margin: '0 5px' }}>
              <Link to="/fabricmerge">fabricmerge</Link>
            </li>
            <li style={{ display: 'inline-block', border: '1px solid red', margin: '0 5px' }}>
              <Link to="/fabricfilter">fabricfilter</Link>
            </li>
          </ul>
          <Switch>
            <Route exact path={`/image`} component={ImageEditOriginComponent} />
            <Route exact path={`/merge`} component={ImageEditMergeComponent} />
            <Route exact path={`/save`} component={ImageLocalStorageComponent} />
            <Route exact path={`/exif`} component={ExifComponent} />
            <Route exact path={`/toast`} component={ToastImageComponent} />
            <Route exact path={`/reactcropper`} component={ReactCropperComponent} />
            <Route exact path={`/fabric`} component={FabricComponent} />
            <Route exact path={`/fabricmerge`} component={FabricMergeComponent} />
            <Route exact path={`/fabricfilter`} component={FabricFilterComponent} />
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
