import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './index.css'

import { SiDungeonsanddragons } from 'react-icons/si'
import { FaDiceD20 } from 'react-icons/fa'

interface Class {
  name: string;
  url: string;
  starting_equipment: {
    equipment: {
      index: string;
      name: string;
      url: string;
    };
    quanitity: number;
  }[],
}

interface CustomClass extends Class {
  index: string;
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
  const [startingEquipment, setStartingEquipment] = useState<string[]>([]);

  useEffect(() => {
    async function fetchRandomInfo() {

      // random class 
      // Make API request to retrieve all available classes
      const classResponse = await axios.get('https://www.dnd5eapi.co/api/classes');
      const classes: CustomClass[] = classResponse.data.results;
      // Pick a random class from the list
      const randomClass = getRandomItem(classes);
      if (randomClass) {
        setRandomClass(randomClass);
      }

      // random race
      // Make API request to retrieve all available races
      const raceResponse = await axios.get('https://www.dnd5eapi.co/api/races');
      const races: Race[] = raceResponse.data.results;
      // Pick a random race from the list
      const randomRace = getRandomItem(races);
      if (randomRace) {
        setRandomRace(randomRace);
      }

      // random alignment 
      // Make API request to retrieve all available alignments
      const alignmentResponse = await axios.get('https://www.dnd5eapi.co/api/alignments');
      const alignments: Alignment[] = alignmentResponse.data.results;
      // Pick a random alignment from the list
      const randomAlignment = getRandomItem(alignments);
      if (randomAlignment) {
        setRandomAlignment(randomAlignment);
      }

      // Pick a random name from an array of names
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
        'Elaren Vinnan',
        'Neridi Featherwatcher',
        'Cairieth Valdiraean',
      ];
      const randomName = getRandomItem(names);
      if (randomName) {
        setRandomName(randomName);
      };
    }

    fetchRandomInfo();
  }, []);

  const handleRefresh = (): void => {
    window.location.reload();
  }

  return (
    <div className="App px-4">
      <div className="max-w-2xl mx-auto flex flex-col justify-center h-screen">
        <div className="text-4xl mb-2 flex items-end px-2">
          <SiDungeonsanddragons 
            className="text-7xl text-red-600" />
          <h1 className="ml-2 uppercase text-2xl">Character Generator</h1>
        </div>
        {randomClass && randomRace && randomName && randomAlignment ? (
          <div className="border-2 border-gray-400 p-8 rounded-xl">
            
            {/* character essentials */}
            {/* name */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-sm uppercase text-gray-400">Name</p>
                <span>{randomName}</span>
              </div>
              {/* race */}
              <div className="flex justify-between items-center">
                <p className="text-sm uppercase text-gray-400">Race</p>
                <span>{randomRace.name}</span>
              </div>
              {/* class */}
              <div className="flex justify-between items-center">
                <p className="text-sm uppercase text-gray-400">Class</p>
                <span>{randomClass.name}</span>
              </div>

            </div>

            {/* additional generated options */}
            <p className="mt-4 mb-2 text-xs uppercase text-gray-300"> additional information</p>
            <div className="space-y-2">

              {/* alignment */}
              <div className="flex justify-between items-center">
                <p className="text-sm uppercase text-gray-400">Alignment</p>
                <span>{randomAlignment.name}</span>
              </div>

              {/* trying to get the other info from the DND API is driving me crazy.
                  this will have to work for now. this is DISGUSTING, brother, but it works. */}
              {/* starting equipment & proficiencies based on class */}
              {randomClass.name === "Barbarian" ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm uppercase text-gray-400">Starting Equipment</p>
                  <span className="flex flex-col text-gray-400">From {randomClass.name}'s Equipment Selection</span>
                </div>
                <div className="flex flex-col items-end text-right">
                  <p><strong>(a)</strong> a greataxe <em>or</em> <strong>(b)</strong> any martial melee weapon</p>
                  <p><strong>(a)</strong> two handaxes <em>or</em> <strong>(b)</strong> any simple weapon</p>
                  <p>An explorer's pack and four javelins</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm uppercase text-gray-400">Proficiencies</p>
                  <span className="flex flex-col text-gray-400 text-right">From {randomClass.name}'s Proficiencies</span>
                </div>
                <div className="flex flex-col items-end">
                  <p>Light and medium armor</p>
                  <p>Shields</p>
                  <p>Simple and martial weapons</p>
                </div>
              </div>
              ) : ( null )}
              {randomClass.name === "Bard" ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm uppercase text-gray-400">Starting Equipment</p>
                  <span className="flex flex-col text-gray-400">From {randomClass.name}'s Equipment Selection</span>
                </div>
                <div className="flex flex-col items-end text-right">
                  <p><strong>(a)</strong> a rapier, <strong>(b)</strong> a longsword, <em>or</em> <strong>(c)</strong> any simple weapon</p>
                  <p><strong>(a)</strong> a diplomat's pack <em>or</em> <strong>(b)</strong> an entertainer's pack</p>
                  <p><strong>(a)</strong> a lute <em>or </em> <strong>(b)</strong> any other musical instrument</p>
                  <p>Leather armor and a dagger</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm uppercase text-gray-400">Proficiencies</p>
                  <span className="flex flex-col text-gray-400">From {randomClass.name}'s Proficiencies</span>
                </div>
                <div className="flex flex-col items-end">
                  <p>Light armor</p>
                  <p>Simple weapons</p>
                  <p>Hand crossbows</p>
                  <p>Longswords</p>
                  <p>Rapiers</p>
                  <p>Shortswords</p>
                </div>
              </div>
              ) : ( null )}
              {randomClass.name === "Cleric" ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm uppercase text-gray-400">Starting Equipment</p>
                  <span className="flex flex-col text-gray-400">From {randomClass.name}'s Equipment Selection</span>
                </div>
                <div className="flex flex-col items-end text-right">
                  <p><strong>(a)</strong> a mace <em>or</em> <strong>(b)</strong> a warhammer (if proficient)</p>
                  <p><strong>(a)</strong> scale mail, <strong>(b)</strong> leather armor, <em>or </em> <strong>(c)</strong> chain mail (if proficient)</p>
                  <p><strong>(a)</strong> a light crossbow and 20 bolts <em>or</em> <strong>(b)</strong> any simple weapon</p>
                  <p><strong>(a)</strong> a priest&apos;s pack <em>or</em> <strong>(b)</strong> an explorer's pack</p>
                  <p>A shield and a holy symbol</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm uppercase text-gray-400">Proficiencies</p>
                  <span className="flex flex-col text-gray-400">From {randomClass.name}'s Proficiencies</span>
                </div>
                <div className="flex flex-col items-end">
                  <p>Light and medium armor</p>
                  <p>Shields</p>
                  <p>Simple weapons</p>
                </div>
              </div>
              ) : ( null )}
              {randomClass.name === "Druid" ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm uppercase text-gray-400">Starting Equipment</p>
                  <span className="flex flex-col text-gray-400">From {randomClass.name}'s Equipment Selection</span>
                </div>
                <div className="flex flex-col items-end text-right">
                  <p><strong>(a)</strong> a wooden shield <em>or</em> <strong>(b)</strong> any simple weapon</p>
                  <p><strong>(a)</strong> a scimitar <em>or</em> <strong>(b)</strong> any simple melee weapon</p>
                  <p>Leather armor, an explorer&apos;s pack, and a druidic focus</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm uppercase text-gray-400">Proficiencies</p>
                  <span className="flex flex-col text-gray-400">From {randomClass.name}'s Proficiencies</span>
                </div>
                <div className="flex flex-col items-end">
                  <p>Light and medium armor (nonmetal)</p>
                  <p>Shields (nonmetal)</p>
                  <p>Clubs</p>
                  <p>Daggers</p>
                  <p>Darts</p>
                  <p>Javelins</p>
                  <p>Maces</p>
                  <p>Quarterstaffs</p>
                  <p>Scimitars</p>
                  <p>Sickles</p>
                  <p>Slings</p>
                  <p>Spears</p>
                </div>
              </div>
              ) : ( null )}
              {randomClass.name === "Fighter" ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm uppercase text-gray-400">Starting Equipment</p>
                  <span className="flex flex-col text-gray-400">From {randomClass.name}'s Equipment Selection</span>
                </div>
                <div className="flex flex-col items-end text-right">
                  <p><strong>(a)</strong> chain mail <em>or</em> <strong>(b)</strong> leather armor, longbow, and 20 arrows</p>
                  <p><strong>(a)</strong> a martial weapon and a shield <em>or</em> <strong>(b)</strong> two martial weapons</p>
                  <p><strong>(a)</strong> a light crossbow and 20 bolts <em>or</em> <strong>(b)</strong> two handaxes</p>
                  <p><strong>(a)</strong> a dungeoneer&apos;s pack <em>or</em> <strong>(b)</strong> an explorer&apos;s pack</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm uppercase text-gray-400">Proficiencies</p>
                  <span className="flex flex-col text-gray-400">From {randomClass.name}'s Proficiencies</span>
                </div>
                <div className="flex flex-col items-end">
                  <p>All armor</p>
                  <p>Shields</p>
                  <p>Simple and martial weapons</p>
                  <p>Daggers</p>
                </div>
              </div>
              ) : ( null )}
              {randomClass.name === "Monk" ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm uppercase text-gray-400">Starting Equipment</p>
                  <span className="flex flex-col text-gray-400">From {randomClass.name}'s Equipment Selection</span>
                </div>
                <div className="flex flex-col items-end text-right">
                  <p><strong>(a)</strong> a shortsword <em>or</em> <strong>(b)</strong> any simple weapon</p>
                  <p><strong>(a)</strong> a dungeoneer&apos;s  pack <em>or</em> <strong>(b)</strong> an explorer&apos;s pack</p>
                  <p>10 darts</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm uppercase text-gray-400">Proficiencies</p>
                  <span className="flex flex-col text-gray-400">From {randomClass.name}'s Proficiencies</span>
                </div>
                <div className="flex flex-col items-end">
                  <p>Simple weapons</p>
                  <p>Shortswords</p>
                </div>
              </div>
              ) : ( null )}
              {randomClass.name === "Paladin" ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm uppercase text-gray-400">Starting Equipment</p>
                  <span className="flex flex-col text-gray-400">From {randomClass.name}'s Equipment Selection</span>
                </div>
                <div className="flex flex-col items-end text-right">
                  <p><strong>(a)</strong> a martial weapon and a shield <em>or</em> <strong>(b)</strong> two martial weapons</p>
                  <p><strong>(a)</strong> five javelins <em>or</em> <strong>(b)</strong> any simple melee weapon</p>
                  <p><strong>(a)</strong> a priest&apos;s pack <em>or</em> <strong>(b)</strong> an explorer&apos;s pack</p>
                  <p>Chain mail and a holy symbol</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm uppercase text-gray-400">Proficiencies</p>
                  <span className="flex flex-col text-gray-400">From {randomClass.name}'s Proficiencies</span>
                </div>
                <div className="flex flex-col items-end">
                  <p>All armor</p>
                  <p>Shields</p>
                  <p>Simple and martial weapons</p>
                </div>
              </div>
              ) : ( null )}
              {randomClass.name === "Ranger" ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm uppercase text-gray-400">Starting Equipment</p>
                  <span className="flex flex-col text-gray-400">From {randomClass.name}'s Equipment Selection</span>
                </div>
                <div className="flex flex-col items-end text-right">
                  <p><strong>(a)</strong> scale mail <em>or</em> <strong>(b)</strong> leather armor</p>
                  <p><strong>(a)</strong> two shortswords <em>or</em> <strong>(b)</strong> two simple melee weapons</p>
                  <p><strong>(a)</strong> a dungeoneer&spo;s pack <em>or</em> <strong>(b)</strong> an explorer&apos;s pack</p>
                  <p>A longbow and a quiver of 20 arrows</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm uppercase text-gray-400">Proficiencies</p>
                  <span className="flex flex-col text-gray-400">From {randomClass.name}'s Proficiencies</span>
                </div>
                <div className="flex flex-col items-end">
                  <p>Light and medium armor</p>
                  <p>Shields</p>
                  <p>Simple and martial weapons</p>
                </div>
              </div>
              ) : ( null )}    
              {randomClass.name === "Rogue" ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm uppercase text-gray-400">Starting Equipment</p>
                  <span className="flex flex-col text-gray-400">From {randomClass.name}'s Equipment Selection</span>
                </div>
                <div className="flex flex-col items-end text-right">
                  <p><strong>(a)</strong> a rapier <em>or</em> <strong>(b)</strong> a shortsword</p>
                  <p><strong>(a)</strong> a shortbow and a quiver of 20 arrows <em>or</em> <strong>(b)</strong> a shortsword</p>
                  <p><strong>(a)</strong> a burglar&apos;s pack, <strong>(b)</strong> a dungeoneer&apos;s pack, <em>or</em> <strong>(c)</strong> an explorer&apos;s pack</p>
                  <p>Leather armor, two daggers, and thieves&apos; tools</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm uppercase text-gray-400">Proficiencies</p>
                  <span className="flex flex-col text-gray-400">From {randomClass.name}'s Proficiencies</span>
                </div>
                <div className="flex flex-col items-end">
                  <p>Light armor</p>
                  <p>Simple weapons</p>
                  <p>Hand crossbows</p>
                  <p>Longswords</p>
                  <p>Rapiers</p>
                  <p>Shortswords</p>
                </div>
              </div>
              ) : ( null )}
              {randomClass.name === "Sorcerer" ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm uppercase text-gray-400">Starting Equipment</p>
                  <span className="flex flex-col text-gray-400">From {randomClass.name}'s Equipment Selection</span>
                </div>
                <div className="flex flex-col items-end text-right">
                  <p><strong>(a)</strong> a light crossbow and 20 bolts <em>or</em> <strong>(b)</strong> any simple weapon</p>
                  <p><strong>(a)</strong> a component pouch <em>or</em> <strong>(b)</strong> an arcane focus</p>
                  <p><strong>(a)</strong> a dungeoneer&apos;s pack <em>or</em> <strong>(b)</strong> an explorer&apos;s pack</p>
                  <p>Two daggers</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm uppercase text-gray-400">Proficiencies</p>
                  <span className="flex flex-col text-gray-400">From {randomClass.name}'s Proficiencies</span>
                </div>
                <div className="flex flex-col items-end">
                  <p>Daggers</p>
                  <p>Darts</p>
                  <p>Slings</p>
                  <p>Quartstaffs</p>
                  <p>Light crossbows</p>
                </div>
              </div>
              ) : ( null )}
              {randomClass.name === "Warlock" ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm uppercase text-gray-400">Starting Equipment</p>
                  <span className="flex flex-col text-gray-400">From {randomClass.name}'s Equipment Selection</span>
                </div>
                <div className="flex flex-col items-end text-right">
                  <p><strong>(a)</strong> a light crossbow and 20 bolts <em>or</em> <strong>(b)</strong> any simple weapon</p>
                  <p><strong>(a)</strong> a components pouch <em>or</em> <strong>(b)</strong> an arcane focus</p>
                  <p><strong>(a)</strong> a scholar&apos;s pack <em>or</em> <strong>(b)</strong> a dungeoneer&apos;s pack</p>
                  <p>Leather armor, any simple weapon, and two daggers</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm uppercase text-gray-400">Proficiencies</p>
                  <span className="flex flex-col text-gray-400">From {randomClass.name}'s Proficiencies</span>
                </div>
                <div className="flex flex-col items-end">
                  <p>Light armor</p>
                  <p>Simple weapons</p>
                </div>
              </div>
              ) : ( null )}
              {randomClass.name === "Wizard" ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm uppercase text-gray-400">Starting Equipment</p>
                  <span className="flex flex-col text-gray-400">From {randomClass.name}'s Equipment Selection</span>
                </div>
                <div className="flex flex-col items-end text-right">
                  <p><strong>(a)</strong> a quarterstaff <em>or</em> <strong>(b)</strong> a dagger</p>
                  <p><strong>(a)</strong> a component pouch <em>or</em> <strong>(b)</strong> an arcane focus</p>
                  <p><strong>(a)</strong> a scholar&apos;s pack <em>or</em> <strong>(b)</strong> an explorer&apos;s pack</p>
                  <p>A spellbook</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm uppercase text-gray-400">Proficiencies</p>
                  <span className="flex flex-col text-gray-400">From {randomClass.name}'s Proficiencies</span>
                </div>
                <div className="flex flex-col items-end">
                  <p>Daggers</p>
                  <p>Darts</p>
                  <p>Slings</p>
                  <p>Quarterstaffs</p>
                  <p>Light crossbows</p>
                </div>
              </div>
              ) : ( null )}                                                                                                                    
            </div>
          </div> 
        ) : (
          <h3 className="px-2">Loading...</h3>
        )}
        <div className="mt-2 flex justify-end group px-2">
          <button onClick={handleRefresh}>
            <span className="flex items-center uppercase text-sm group-hover:text-gray-400">reroll character <FaDiceD20 className="ml-2 text-xl group-hover:text-red-600 group-hover:animate-spin"/></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;


