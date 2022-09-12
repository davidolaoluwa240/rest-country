// Modules
import "core-js/stable";
import "regenerator-runtime/runtime";

// Models
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
 * Controller For Theming
 */
const controlTheme = function (): void {
  // Render theme
  themeView.render();
};

/**
 * Controller For Rendering All Country Regions Inside The Select Option View
 */
const controlSelectOption = function (): void {
  // 1)  Get all country regions
  const regions = Model.state.countryRegions;

  // 2) Render all country regions
  selectOptionsView.render(regions);
};

/**
 * Controller For Filtering Countries Based On FilterTerm And FilterBy
 * @param {string} filterTerm Country name to filter
 * @param {string} filterBy Country region to filter
 */
const controlFilter = catchAsync(async function (
  filterTerm: string = Model.state.filterTerm,
  filterBy: string = Model.state.filterBy
): Promise<void> {
  // 1) Highlight the current active select option item
  selectOptionsView.highlightActiveItem(filterBy);

  // 2) Update the active text in the select box
  selectBoxView.render(filterBy);

  // 3) Render loading Spinner
  countryListView.renderSpinner();

  // 4) Perform filtering
  await Model.filterCountries(filterTerm, filterBy);

  // 5) Render filtered country data
  countryListView.render(Model.state.filteredCountries);
},
countryListView.renderError);

/**
 * Controller For Country List
 */
const controlCountries = catchAsync(async function (): Promise<void> {
  // 1) Render loading spinner
  countryListView.renderSpinner();

  // 2) Fetch country data
  await Model.loadCountries();

  // 3) Filter country data
  await Model.filterCountries(Model.state.filterTerm, Model.state.filterBy);

  // 4) Render filtered country fata
  countryListView.render(Model.state.filteredCountries);
}, countryListView.renderError);

/**
 * Controller For Country Details
 */
const controlCountryDetails = catchAsync(async function (): Promise<void> {
  // 1) Get country name from the URL Hash
  const countryName = window.location.hash.slice(1);

  // 2) Return when countryName is empty
  if (!countryName) return;

  // 3) Disable country list view
  countryListView.deactivateCountryListVisibility();

  // 4) Show country details view
  countryDetailsView.activateCountryDetailsVisibility();

  // 5) Render loading spinner
  countryDetailsView.renderSpinner();

  // 6) Fetch country data
  await Model.loadCountry(countryName);

  // 7) Render country data
  countryDetailsView.render(Model.state.selectedCountry);
}, countryDetailsView.renderError);

/**
 * Controller To Be Called When The Back Button In The Country Details Is Clicked
 */
const controlResetCountryDetails = function (): void {
  // 1) Reset the url
  window.history.pushState(null, "", "/");

  // 2) Enable country list view
  countryListView.activateCountryListVisibility();

  // 3) Hide country details view
  countryDetailsView.deactivateCountryDetailsVisibility();
};

/**
 * Called When The Page Is Loaded
 */
const init = function (): void {
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
