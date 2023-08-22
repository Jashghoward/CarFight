const { create } = require ("json-server");

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

  if (leftCar && rightCar) {
    runComparison();
  }
  // if statement for left and right search bars
  // look into the if statement
}
  const runComparison = () => {
    const leftSideStats = document.querySelectorAll('#left-summary . notification');
    const rightSideStats = document.querySelectorAll('#right-summary . notification');

    leftSideStats.forEach((leftStat, index) => {
      const rightStat = rightSideStats[index];

      const leftSideValue = parseInt(leftStat.dataset.value);
      const rightSideValue = parseInt(rightStat.dataset.value);

      if(rightSideValue > leftSideValue) {
        leftStat.classList.remove('is-primary');
        leftStat.classList.add('is-warning');
      } else {
        rightStat.classList.remove('is-primary');
        rightStat.classList.add('is-warning');
      }
    });
  };

  const carTemplate = (carDetail) => {
    const engine = parseInt(carDetail.cylinders.replace(/\$/g, '').replace(/,/g, ''));
    const gears = parseInt(carDetail.transmission);
    const fuel = parseInt(carDetail.fuel_type);
    const driveTrain = parseInt(carDetail.drive);

    return `
    <article class="media">
    <figure class="media-left">
      <p class="image">
        <img src="${carDetail.make}" />
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <h1>${movieDetail.Title}</h1>
        <h4>${movieDetail.Genre}</h4>
        <p>${movieDetail.Plot}</p>
      </div>
    </div>
  </article>  
  <article data-value=${awards} class="notification is-primary">
    <p class="title">${movieDetail.Awards}</p>
    <p class="subtitle">Awards</p>
  </article>
  <article data-value=${dollars} class="notification is-primary">
    <p class="title">${movieDetail.BoxOffice}</p>
    <p class="subtitle">Box Office</p>
  </article>
  <article data-value=${metascore} class="notification is-primary">
    <p class="title">${movieDetail.Metascore}</p>
    <p class="subtitle">Metascore</p>
  </article>
  <article data-value=${imdbRating} class="notification is-primary">
    <p class="title">${movieDetail.imdbRating}</p>
    <p class="subtitle">IMDB Rating</p>
  </article>
  <article data-value=${imdbVotes} class="notification is-primary">
    <p class="title">${movieDetail.imdbVotes}</p>
    <p class="subtitle">IMDB Votes</p>
  </article>
    `
  }



