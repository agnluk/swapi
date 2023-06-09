
# SWAPI (Star Wars API) README

Welcome to the SWAPI! The goal of this project is to create a web application using React and SWAPI (Star Wars API) to fetch and display data. The application will fetch a list of people from SWAPI and create a view with the list. Detailed information about each person can be viewed by clicking on their respective item. Additionally, detailed information about vehicles can be displayed in a popup/modal.

The code provided includes the necessary React components and hooks to achieve this functionality. It fetches the list of people from the SWAPI and stores them in the people state using the useState hook. The useEffect hook is used to fetch additional data such as homeworld, films, vehicles, and starships for the selected person.

The Modal component is used to display the detailed information about each person, vehicles, and starships. The isOpen state controls the visibility of the modal. Clicking on a person's name or image triggers the toggleModal function, which sets the selected person and opens the modal.

The toggleVehicleModal and toggleStarshipModal functions are used to set the selected vehicle and starship, respectively, and open their respective modals.

Within the modals, the detailed information for each category (person, vehicle, starship) is displayed. The information is conditionally rendered based on the availability of data. If the data is not available, it displays "no info."

To fetch the additional data, fetch requests are made to the corresponding endpoints from the SWAPI. The response data is then stored in the respective state variables (e.g., homeworldData, filmsData, vehiclesData, starshipsData). These requests are made within separate useEffect hooks that depend on the selectedPerson state.

SERVER_URL constant, which should contain the URL to fetch the people data from the server.




## Authors

- [@agnluk](https://github.com/agnluk/agnluk)

