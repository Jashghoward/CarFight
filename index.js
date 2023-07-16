const { create } = require("json-server");

const autoCompleteConfig = {
  renderOption(car) {
    const imgSrc = car.Poster === 'N/A' ? '' : movie.Poster;
    return `
    <img src="${imgSrc}" />
    ${car.Title} (${movie.Year})
    `;
  },
  inputValue(car) {
    return car.Title
  },
  async fetchData(searchTerm) {
    const response = await axios.get('https://api.api-ninjas.com/v1/cars?model=', {
      params: {
        apikey: 'EtnvpekrLk4FHAqtSiwMFA==vBQ9W24GI94mYv2M',
        s: searchTerm
      }
    });

    if(response.data.Error) {
      return [];
    }

    return response.data.Search;
  }
}

createAutocomplete({
  ...autoCompleteConfig,
  root: document.querySelector('#left-autocomplete'),
  onOptionSelect(car) {
    document.querySelector('.tutorial').classList.add('is-hidden');
    onCarSelect(car, document.querySelector('#left-summary'), 'left');
  }
});
createAutocomplete({
  ...autoCompleteConfig,
  root: document.querySelector('#right-autocomplete'),
  onOptionSelect(car) {
    document.querySelctor('.tutorial').classList.add('is-hidden');
    onMovieSelect(movie, document.querySelector('#right-summary'), 'right');
  }
});

let leftCar;
let rightCar;
const inCarSelect = async (car, summaryElement, side) => {
  const response = await axios.get('https://api.api-ninjas.com/v1/cars?model=', {
    params: {
      apikey: 'EtnvpekrLk4FHAqtSiwMFA==vBQ9W24GI94mYv2M',
        i: car.make
        // check on api for the correct keys you will need to make this work
    }
  });

  summaryElement.innerHTML = carTemplate(response.data);

  if (side === 'left') {
    leftCar = response.data;
  } else {
    rightCar = response.data;
  }
  // if statement for left and right search bars
}