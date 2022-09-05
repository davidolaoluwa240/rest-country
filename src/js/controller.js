// Modules
import "core-js/stable";
import "regenerator-runtime/runtime";

// Model
import * as Model from "./model";

// Helpers
import { catchAsync } from "./helper";

// Views
import themeView from "./view/themeView";
import selectOptionsView from "./view/selectOptionsView";
import selectBoxView from "./view/selectBoxView";
import searchView from "./view/searchView";
import countryListView from "./view/countryListView";
import countryDetailsView from "./view/countryDetailsView";

/**
 * Controller for theming
 * @returns {undefined} void
 */
const controlTheme = function () {
  // Render theme
  themeView.render();
};

/**
 * Controller for rendering all country regions inside the select option view
 * @returns {undefined} void
 */
const controlSelectOption = function () {
  // 1)  Get all country regions
  const regions = Model.state.countryRegions;

  // 2) Render all country regions
  selectOptionsView.render(regions);
};

/**
 * Controller For Filtering Countries Based on filterTerm and filterBy
 * @param {string} filterTerm Country name to filter
 * @param {string} filterBy Country region to filter
 * @returns {undefined} void
 */
const controlFilter = catchAsync(async function (
  filterTerm = Model.state.filterTerm,
  filterBy = Model.state.filterBy
) {
  // 1) Highlight the current active select option item
  selectOptionsView.highlightActiveItem(filterBy);

  // 2) Update the active text in the select box
  selectBoxView.render(filterBy);

  // 3) Render loading Spinner
  countryListView.renderSpinner();

  // 3) Perform filtering
  await Model.filterCountries(filterTerm, filterBy);

  // 4) Render Filtered Country Data
  countryListView.render(Model.state.filteredCountries);
},
countryListView.renderError);

/**
 * Controller For Country List
 * @returns {undefined} void
 */
const controlCountries = catchAsync(async function () {
  // 1) Render Loading Spinner
  countryListView.renderSpinner();

  // 2) Fetch Country Data
  await Model.loadCountries();

  // 3) Filter Country Data
  await Model.filterCountries(Model.state.filterTerm, Model.state.filterBy);

  // 4) Render Filtered Country Data
  countryListView.render(Model.state.filteredCountries);
}, countryListView.renderError);

/**
 * Controller For Country Details
 * @returns {undefined} void
 */
const controlCountryDetails = catchAsync(async function () {
  // 1) Get Country Name From the URL Hash
  const countryName = window.location.hash.slice(1);

  // 2) Return When CountryName Is Empty
  if (!countryName) return;

  // 3) Disable country list view
  countryListView.deactivateCountryListVisibility();

  // 4) Show Country details View
  countryDetailsView.activateCountryDetailsVisibility();

  // 5) Render Loading Spinner
  countryDetailsView.renderSpinner();

  // 6) Fetch Country Data
  await Model.loadCountry(countryName);

  // 7) Render Country Data
  countryDetailsView.render(Model.state.selectedCountry);
}, countryDetailsView.renderError);

/**
 * Controller to be called when the back button in the country details is clicked
 * @returns {undefined} void
 */
const controlResetCountryDetails = function () {
  // 1) Reset the url
  window.history.pushState(null, "", "/");

  // 2) Enable country list view
  countryListView.activateCountryListVisibility();

  // 3) Hide country details
  countryDetailsView.deactivateCountryDetailsVisibility();
};

/**
 * Called when the page is loaded
 * @returns {undefined} void
 */
const init = function () {
  themeView.addHandlerThemeClick(controlTheme);
  selectOptionsView.addHandlerLoad(controlSelectOption);
  selectOptionsView.addHandlerClick(controlFilter);
  searchView.addHandlerInput(controlFilter);
  countryListView.addHandlerLoad(controlCountries);
  countryDetailsView.addHandlerUrlHashChangeLoadFire(controlCountryDetails);
  countryDetailsView.addHandlerGoBack(controlResetCountryDetails);
};

// Bootstrap Application
init();

// Parcel Hot Module Reload
if (module.hot) {
  module.hot.accept();
}
