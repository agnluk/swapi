import React, { useState, useEffect } from 'react';
import Banner from './components/Banner';
import PeopleList from './view/CharList';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating an asynchronous operation
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="App">
      <Banner />
      <div className="content">
        {loading ? <p>Loading...</p> : <PeopleList />}
      </div>
    </div>
  );
}

export default App;
