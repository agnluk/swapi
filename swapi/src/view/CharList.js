import React, { useEffect, useState } from 'react';
import { SERVER_URL } from "../constants/url";
import Modal from '../components/Modal';
import "../styles/defaults.scss";
import '../styles/img.scss';

const CharList = () => {
  const [character, setChar] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const [homeworldData, setHomeworldData] = useState(null);
useEffect(() => {
  const fetchHomeworldData = async () => {
    if (selectedPerson && selectedPerson.homeworld) {
      try {
        const response = await fetch(selectedPerson.homeworld);
        const data = await response.json();
        setHomeworldData(data);
      } catch (error) {
        console.error("Error fetching homeworld data:", error);
      }
    }
  };

  fetchHomeworldData();
}, [selectedPerson]);

const [filmsData, setFilmsData] = useState([]);

useEffect(() => {
  const fetchFilmsData = async () => {
    if (selectedPerson && selectedPerson.films) {
      try {
        const filmPromises = selectedPerson.films.map(async (filmUrl) => {
          const response = await fetch(filmUrl);
          const data = await response.json();
          return data;
        });
        const films = await Promise.all(filmPromises);
        setFilmsData(films);
      } catch (error) {
        console.error("Error fetching films data:", error);
      }
    }
  };

  fetchFilmsData();
}, [selectedPerson]);

const [speciesData, setSpeciesData] = useState(null);

useEffect(() => {
  const fetchSpeciesData = async () => {
    if (selectedPerson && selectedPerson.species && selectedPerson.species.length > 0) {
      try {
        const response = await fetch(selectedPerson.species[0]);
        const data = await response.json();
        setSpeciesData(data);
      } catch (error) {
        console.error("Error fetching species data:", error);
      }
    }
  };

  fetchSpeciesData();
}, [selectedPerson]);

const [vehiclesData, setVehiclesData] = useState([]);
const [selectedVehicle, setSelectedVehicle] = useState(null);
const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);

useEffect(() => {
  const fetchVehiclesData = async () => {
    if (selectedPerson && selectedPerson.vehicles) {
      try {
        const vehiclePromises = selectedPerson.vehicles.map(async (vehicleUrl) => {
          const response = await fetch(vehicleUrl);
          const data = await response.json();
          return data;
        });
        const vehicles = await Promise.all(vehiclePromises);
        setVehiclesData(vehicles);
      } catch (error) {
        console.error("Error fetching vehicles data:", error);
      }
    }
  };

  fetchVehiclesData();
}, [selectedPerson]);

const [starshipsData, setStarshipsData] = useState([]);
const [selectedStarship, setSelectedStarship] = useState(null);
const [isStarshipModalOpen, setIsStarshipModalOpen] = useState(false);

useEffect(() => {
  const fetchStarshipsData = async () => {
    if (selectedPerson && selectedPerson.starships) {
      try {
        const starshipPromises = selectedPerson.starships.map(async (starshipUrl) => {
          const response = await fetch(starshipUrl);
          const data = await response.json();
          return data;
        });
        const starships = await Promise.all(starshipPromises);
        setStarshipsData(starships);
      } catch (error) {
        console.error("Error fetching starships data:", error);
      }
    }
  };

  fetchStarshipsData();
}, [selectedPerson]);

const toggleStarshipModal = (starship) => {
  setSelectedStarship(starship);
  setIsStarshipModalOpen(true);
};

const toggleVehicleModal = (vehicle) => {
  setSelectedVehicle(vehicle);
  setIsVehicleModalOpen(true);
};

  useEffect(() => {
    fetch(SERVER_URL)
      .then(response => response.json())
      .then(data => setChar(data.results))
      .catch(error => console.log(error));
  }, []);

  const toggleModal = (person) => {
    setSelectedPerson(person);
    setIsOpen(true);
  }

  return (
    <div className="char-list">
      <h1>Star Wars Characters</h1>
      <div className="grid-container">
      {character.map(person => (
  <div key={person.name} className="grid-item">
      <div className="image-container">
      <img className='img' onClick={() => toggleModal(person)} src='https://lumiere-a.akamaihd.net/v1/images/og-generic_02031d2b.png?region=0%2C0%2C1200%2C1200' alt={person.name} />
    <a onClick={() => toggleModal(person)}>{person.name}</a>
  </div>
  </div>
))}
      </div>
      {isOpen && selectedPerson && (
  <Modal open={isOpen} onClose={() => setIsOpen(false)}>
    <div>
      <p>Gender: {selectedPerson.gender}</p>
      <p>Height: {selectedPerson.height}</p>
      <p>Mass: {selectedPerson.mass}</p>
      <p>Hair Color: {selectedPerson.hair_color}</p>
      <p>Skin Color: {selectedPerson.skin_color}</p>
      <p>Eye Color: {selectedPerson.eye_color}</p>
      <p>Birth Year: {selectedPerson.birth_year}</p>
      <p>
        Homeworld:{" "}
        {selectedPerson.homeworld && homeworldData ? (
          <span>{homeworldData.name}</span>
        ) : (
          <span>no info</span>
        )}
      </p>
      <div>
        Films:{" "}
        {selectedPerson.films && filmsData.length > 0 ? (
          <ul>
            {filmsData.map((film) => (
              <li key={film.title}>{film.title}</li>
            ))}
          </ul>
        ) : (
          <span>no info</span>
        )}
      </div>
      <div>
        Vehicles:{" "}
        {selectedPerson.vehicles && vehiclesData.length > 0 ? (
          <ul>
            {vehiclesData.map((vehicle) => (
              <li key={vehicle.name}>
                <button onClick={() => toggleVehicleModal(vehicle)}>
                  {vehicle.name}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <span>no info</span>
        )}
      </div>
      <div>
        Starships:{" "}
        {selectedPerson.starships && starshipsData.length > 0 ? (
          <ul>
            {starshipsData.map((starship) => (
              <li key={starship.name}>
                <button onClick={() => toggleStarshipModal(starship)}>
                  {starship.name}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <span>no info</span>
        )}
      </div>
    </div>
  </Modal>
)}

      {isVehicleModalOpen && selectedVehicle && (
  <Modal open={isVehicleModalOpen} onClose={() => setIsVehicleModalOpen(false)}>
    <div>
      <h2>Vehicle Details</h2>
      <p>Name: {selectedVehicle.name}</p>
      <p>Model: {selectedVehicle.model}</p>
      <p>Manufacturer: {selectedVehicle.manufacturer}</p>
      <p>Vehicle Class: {selectedVehicle.vehicle_class}</p>
      <p>Crew: {selectedVehicle.crew}</p>
      <p>Passengers: {selectedVehicle.passengers}</p>
    </div>
  </Modal>
)}

{isStarshipModalOpen && selectedStarship && (
  <Modal open={isStarshipModalOpen} onClose={() => setIsStarshipModalOpen(false)}>
    <div>
      <h2>Starship Details</h2>
      <p>Name: {selectedStarship.name}</p>
      <p>Model: {selectedStarship.model}</p>
      <p>Manufacturer: {selectedStarship.manufacturer}</p>
      <p>Starship Class: {selectedStarship.starship_class}</p>
      <p>Crew: {selectedStarship.crew}</p>
      <p>Passengers: {selectedStarship.passengers}</p>
    </div>
  </Modal>
)}
    </div>
  );
}

export default CharList;