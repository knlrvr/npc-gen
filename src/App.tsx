import axios from 'axios';
import React, { useEffect, useState } from 'react';

import './App.css'

interface Class {
  name: string;
  url: string;
}

interface Race {
  name: string;
  url: string;
}

function App() {
  const [randomClass, setRandomClass] = useState<Class | null>(null);
  const [randomRace, setRandomRace] = useState<Race | null>(null);

  useEffect(() => {
    async function fetchRandomClassAndRace() {
      // Make API request to retrieve all available classes
      const classResponse = await axios.get('http://www.dnd5eapi.co/api/classes');
      const classes: Class[] = classResponse.data.results;

      // Pick a random class from the list
      const randomClassIndex = Math.floor(Math.random() * classes.length);
      const randomClass = classes[randomClassIndex];
      setRandomClass(randomClass);

      // Make API request to retrieve all available races
      const raceResponse = await axios.get('http://www.dnd5eapi.co/api/races');
      const races: Race[] = raceResponse.data.results;

      // Pick a random race from the list
      const randomRaceIndex = Math.floor(Math.random() * races.length);
      const randomRace = races[randomRaceIndex];
      setRandomRace(randomRace);
    }

    fetchRandomClassAndRace();
  }, []);

  return (
    <div className="App">
      {randomClass && randomRace ? (
        <div>
          <h1>{randomRace.name}</h1>
          <h1>{randomClass.name}</h1>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default App;




