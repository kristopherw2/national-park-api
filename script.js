const apiKey = "";

function main() {
  $(`fieldset`).on("click", "#submit", function () {
    event.preventDefault();
    let stateName = $('#text-box').val();
    let numOfParks = $('#of-parks').val();
    getParkInfo(stateName, numOfParks);
  });
  
}

function getParkInfo(stateName, numOfParks) {
  const searchUrl = `https://developer.nps.gov/api/v1/parks?stateCode=[${stateName}]&limit=${numOfParks}&api_key=WLKboTCTVvJk4NTP6ljXAddPfHaBw5ZPb0IAChen`;

  fetch(searchUrl)
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
        <div>${data.fullName}</div>  
        <div>${data.description}</div>
        <div>${data.url}</div>
     `)
  })

}

$(main);