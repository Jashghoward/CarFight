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
})