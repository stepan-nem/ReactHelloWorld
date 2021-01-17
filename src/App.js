import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

const axios = require('axios');

function App() {
  const [data, setData] = useState('No data received');

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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Click to retreive data. 
        </p>
        <button onClick={retreiveData}>
          Request
        </button>
        <p>
          {data}
        </p>
      </header>
    </div>
  );
}

export default App;
