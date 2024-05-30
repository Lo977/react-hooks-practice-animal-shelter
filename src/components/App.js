import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });
  const PET_URL =
    filters.type === "all"
      ? "http://localhost:3001/pets"
      : `http://localhost:3001/pets?type=${filters.type}`;
  function handleFindPets() {
    fetch(PET_URL)
      .then((r) => r.json())
      .then((data) => setPets(data));
  }
  function handleSetFilter(p) {
    setFilters({ type: p });
  }
  // console.log(pets);
  function handleAdopted(id) {
    const adoptedPet = pets.map((pet) => {
      return pet.id === id ? { ...pet, isAdopted: true } : pet;
    });
    setPets(adoptedPet);
  }
  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters
              onFindPetsClick={handleFindPets}
              onChangeType={handleSetFilter}
            />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={handleAdopted} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
