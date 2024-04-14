import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Header } from './components/ui/Header';
import { MediaView } from './components/media/MediaView';
import { GeneroView } from './components/genero/GeneroView';
import { TipoView } from './components/tipo/TipoView';
import { DirectorView } from './components/director/DirectorView';
import { ProductoraView } from './components/productora/ProductoraView';
import { MediaUpdate } from './components/media/MediaUpdate';
import { GeneroUpdate } from './components/genero/GeneroUpdate';
import { TipoUpdate } from './components/tipo/TipoUpdate';
import { DirectorUpdate } from './components/director/DirectorUpdate';
import { ProductoraUpdate } from './components/productora/ProductoraUpdate';

const App = () => {
  return <Router forceRefresh>
      <Header />
      <Switch>
        <Route exact path='/' component = { MediaView } />
        <Route exact path='/genero' component = { GeneroView } />
        <Route exact path='/tipo' component = { TipoView } />
        <Route exact path='/director' component = { DirectorView } />
        <Route exact path='/productora' component = { ProductoraView } />
        <Route exact path='/media/edit/:mediaId' component = { MediaUpdate } />
        <Route exact path='/genero/edit/:generoId' component = { GeneroUpdate } />
        <Route exact path='/tipo/edit/:tipoId' component = { TipoUpdate } />
        <Route exact path='/director/edit/:directorId' component = { DirectorUpdate } />
        <Route exact path='/productora/edit/:productoraId' component = { ProductoraUpdate } />
        <Redirect to='/' />
      </Switch>
    </Router>
}

export {
    App,
}