import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './index.css'

import { MdRefresh } from 'react-icons/md'

interface Class {
  name: string;
  url: string;
}

interface Race {
  name: string;
  url: string;
}

interface Alignment {
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
  const [randomAlignment, setRandomAlignment] = useState<Alignment | null>(null);

  useEffect(() => {
    async function fetchRandomInfo() {

      // random class 
      // Make API request to retrieve all available classes
      const classResponse = await axios.get('http://www.dnd5eapi.co/api/classes');
      const classes: Class[] = classResponse.data.results;
      // Pick a random class from the list
      const randomClass = getRandomItem(classes);
      if (randomClass) {
        setRandomClass(randomClass);
      }

      // random race
      // Make API request to retrieve all available races
      const raceResponse = await axios.get('http://www.dnd5eapi.co/api/races');
      const races: Race[] = raceResponse.data.results;
      // Pick a random race from the list
      const randomRace = getRandomItem(races);
      if (randomRace) {
        setRandomRace(randomRace);
      }

      // random alignment 
      // Make API request to retrieve all available alignments
      const alignmentResponse = await axios.get('http://www.dnd5eapi.co/api/alignments');
      const alignments: Alignment[] = alignmentResponse.data.results;
      // Pick a random alignment from the list
      const randomAlignment = getRandomItem(alignments);
      if (randomAlignment) {
        setRandomAlignment(randomAlignment);
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
        'Hirrakar Goblinstepper',
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

    fetchRandomInfo();
  }, []);

  const handleRefresh = (): void => {
    window.location.reload();
  }

  return (
    <div className="App px-4">
      <div className="max-w-2xl mx-auto flex flex-col justify-center h-screen">
        <div className="text-4xl mb-6">
          <h3>D&D Character Generator</h3>
        </div>
        {randomClass && randomRace && randomName && randomAlignment ? (
          <div className="space-y-2 border-2 border-gray-400 p-8">
            <span className="flex justify-between"> 
              <p className="text-gray-400 uppercase text-sm">Name:</p> {randomName} 
            </span>
            <span className="flex justify-between"> 
              <p className="text-gray-400 uppercase text-sm">Class:</p> {randomClass.name} 
            </span>
            <span className="flex justify-between">
              <p className="text-gray-400 uppercase text-sm">Race:</p> {randomRace.name} 
            </span> 
            <span className="flex justify-between">
              <p className="text-gray-400 uppercase text-sm">Alignment:</p> {randomAlignment.name} 
            </span> 
          </div> 
        ) : (
          <h3>Loading...</h3>
        )}
        <div className="mt-2 flex justify-end group">
          <button onClick={handleRefresh}>
            <span className="flex items-center uppercase text-sm">reroll character <MdRefresh className="ml-2 text-xl group-hover:text-gray-400"/></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;


