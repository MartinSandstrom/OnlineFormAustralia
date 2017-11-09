import React from 'react';
import {render} from 'react-dom';
import {Navbar} from './components/Navbar.jsx';
import AustralianForm from './components/AustralianForm.jsx';

class App extends React.Component {
  render () {
    return (
      <div>
          <Navbar></Navbar>
          <AustralianForm></AustralianForm>
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
