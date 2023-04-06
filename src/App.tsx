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

function getRandomItem<T>(array: T[]): T | undefined {
  if (array.length === 0) {
    return undefined;
  }

  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function App() {
  const [randomClass, setRandomClass] = useState<Class | null>(null);
  const [randomRace, setRandomRace] = useState<Race | null>(null);
  const [randomName, setRandomName] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRandomClassAndRace() {

      // Make API request to retrieve all available classes
      const classResponse = await axios.get('http://www.dnd5eapi.co/api/classes');
      const classes: Class[] = classResponse.data.results;

      // Pick a random class from the list
      const randomClass = getRandomItem(classes);
      if (randomClass) {
        setRandomClass(randomClass);
      }

      // Make API request to retrieve all available races
      const raceResponse = await axios.get('http://www.dnd5eapi.co/api/races');
      const races: Race[] = raceResponse.data.results;

      // Pick a random race from the list
      const randomRace = getRandomItem(races);
      if (randomRace) {
        setRandomRace(randomRace);
      }

      // Pick a random item from an array of names
      const names = [
        'Quodri Longbraid',
        'Mankur Simben',
        'Queci Quickgift',
        'Bandysa Briskbranch',
        'Torrim Cahakuhr',
        'Belrus Boulderbranch',
        'Elria Goldpride',
        'Solmera Dardenn',
        'Leofir Rainheart',
        'Craven Summersense',
        'Gilwynn Nightcrown',
        'Valyra Lundrorirral',
        'Rhokk The Reckless',
        'Uhzak The Mad',
        'Rensu The Colossal',
        'Den The Fierce',
        'Aetrius',
        'Malecius',
        'Velki',
        'Zameia',
        'Davkas Bronzerabbit',
        'Ulfer Whisperstride',
        'Odidrey Mossgather',
        'Verna Fateye',
        'Zinceran Herdon',
        'Leoberos Ordalkaean',
        'Urifina Shise',
        'Gilphine Xirni',
        'Troth Bonesprinter',
        'Toa Chestfire',
        'Kelavri Battlesword',
        'Jey Tao',
        'Mae Humblebraid',
        'Wevay Nightwillow',
        'Gregrath Monstermoon',
        'Lorth Hammerroar',
        'Naisrel Springdrifter',
        'Tezed Autumncleanser',
        'Nineret Fallscreamer',
        'Rilthar Stonetree',
        'Presmoira Eagermind',
        'Eldan Birchwatcher',
        'Redding Orbgazer',
        'Hi Cei',
        'Mol Sumog',
        'Berdohr Loudpride',
        'Nesma Drorenaln',
        'Bellewin Goldeneye',
        'Arzag The Coarse',
        'Ban The Silent',
        'Mel The Rotten',
        'Hirrakar Goblinstep',
        'Dorfran Goblinbane',
        'Sinaren Keenhide',
        'Akilos',
        'Zofna',
        'Keokis',
        'Tylas',
        'Balmor Thruthgehk',
        'Hargrim Strongeye',
        'Craren Willowgrove',
        'Leofir Greenwish',
        'Kelfir Woodflight',
      ];

      const randomName = getRandomItem(names);
      if (randomName) {
        setRandomName(randomName);
      }
    }

    fetchRandomClassAndRace();
  }, []);

  return (
    <div className="App">
      <div>
        <h3>D&D Character Generator</h3>
      </div>
      {randomClass && randomRace && randomName ? (
        <div>
          <p>{randomName}</p>
          <p>{randomClass.name}</p>
          <p>{randomRace.name}</p>
        </div>
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
}

export default App;


