
const apiKey = "WLKboTCTVvJk4NTP6ljXAddPfHaBw5ZPb0IAChen";
const searchUrl = `https://developer.nps.gov/api/v1/parks`;

function formatUserQuery (params){
  const formattedQuery = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return formattedQuery.join('&');
}

function main() {
  $(`fieldset`).on("click", "#submit", function () {
    event.preventDefault();
    let stateName = $('#text-box').val();
    let numOfParks = $('#of-parks').val();
    getParkInfo(stateName, numOfParks);
  });
  
}

function getParkInfo(stateName, numOfParks) {
  const params = {
    "stateCode": stateName,
    "limit": numOfParks,
    "api_key": apiKey
  }

  const userURLInfo = formatUserQuery(params);
  const newSearchURL = searchUrl + '?' + userURLInfo


  fetch(newSearchURL)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => {
      if (!responseJson.data.length) {
        throw new Error('Empty dataset returned');
      }
      displayResults(responseJson)
      })
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });

}

function displayResults (responseJson) {
  $('.search-results').empty();
  responseJson.data.forEach((data) => {
  $('.search-results').append(`
        <div class="data-firstname">${data.fullName}</div>  
        <div class="data-description">${data.description}
        <p class="data-url"><a href="${data.url}">${data.url}</a></p></div>
     `)
  })

}

$(main);
