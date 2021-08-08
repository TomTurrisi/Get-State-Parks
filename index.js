"use strict";

// https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=HvOrsrT3uhFfFQSltPcKfdkTlCC18nD6UBguVGuj

const apiKey = "HvOrsrT3uhFfFQSltPcKfdkTlCC18nD6UBguVGuj";
const searchURL = "https://api.nps.gov/api/v1/parks";

$(document).ready(function() {
    watchSubmitForm();
});

function watchSubmitForm() {
    console.log("watchSumbitForm works!");
    $("#search-form").submit(e => {
        e.preventDefault();
        let searchState = $("#name-state").val();
        let numResults = $("#number-input").val();
        getNationalParks(searchState, numResults);
    });
}

function formatQueryParams(params) {
    console.log("formatQueryParams function works!");
    const queryItems = Object.keys(params).map(
        key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    );
    return queryItems.join("&");
}

function getNationalParks(query, limit) {
    console.log("getNationalPark works!");
    if (limit.length === 0) {
        limit = "10"
    }
    const params = {
        stateCode: query,
        limit,
        api_key: apiKey
    };
    console.log("params", params)
    const queryString = formatQueryParams(params);
    const url = searchURL + "?" + queryString;

    console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            console.log(err);
            alert("Something went wrong, try again!");
        });
}

function displayResults(responseJson) {
    console.log("displayResult function works");
    $("#results-parks").empty();
    for (let i = 0; i < responseJson.data.length; i++) {
        $("#results-parks").append(`<br> <br>
    <div class="all-parks">
    <h3>${responseJson.data[i].fullName}</h3>
    <h4>${responseJson.data[i].description}</h4>
    <a href=" ${responseJson.data[i].url}">Visit Park's Website</a>
    </div>`);
    }
    $("#results-parks").removeClass("hidden");
}