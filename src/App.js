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

  const moveToImage = () => {
    history.push("/image");
  }

  return (
    <>
      <p>
        Write something
      </p>
      <input type="text" />
      <p>
        Move to HTTP page
      </p>
      <button onClick={moveToData}>
        GO
      </button>
      <p>
        Move to Image page
      </p>
      <button onClick={moveToImage}>
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

function ImagePage() {
  let history = useHistory();

  const moveHome = () => {
    history.push("/");
  }

  return (
    <>
      <p>
        <img 
          src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2021-lamborghini-aventador-mmp-1-1601499002.jpg"
          alt="Lambo"
          width="400"
          height="300"
        />
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
            <Route path="/image">
              <ImagePage />
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
