import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";

const axios = require('axios');

function HomePage() {
  let history = useHistory();

  const moveToData = () => {
    history.push("/data");
  }

  return (
    <>
      <p>
        Move to HTTP page
      </p>
      <button onClick={moveToData}>
        GO
      </button>
    </>
  );
}

function DataPage() {
  let history = useHistory();
  const [data, setData] = useState('No data received');

  const postData = () => {
    axios.post('http://localhost:3039/users/', {
      name: 'Stevan',
      surname: 'YesMen'
    })
    .then((response) => {
      setData('WOOOW')
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const retreiveData = () => {
    setData('Retreiving data')

    axios.get('https://api.github.com/users/mapbox')
      .then((response) => {
        setData(response.data.avatar_url)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const moveHome = () => {
    history.push("/");
  }

  return (
    <>
      <p>
        Post data.
        <button onClick={postData}>
          Post
        </button>
      </p>
      <p>
        Retreive data.
        <button onClick={retreiveData}>
          Request
        </button>
      </p>
      <p>
        {data}
      </p>
      <button onClick={moveHome}>
        GO HOME
      </button>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Router>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/data">
              <DataPage />
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
