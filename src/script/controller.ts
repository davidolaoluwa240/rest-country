// Modules
import "core-js/stable";
import "regenerator-runtime/runtime";

// Models
import * as Model from "./model";

// Helpers
import { catchAsync } from "./helper";

// Views
import ThemeView from "./view/ThemeView";
import SelectOptionsView from "./view/SelectOptionsView";
import SelectBoxView from "./view/SelectBoxView";
import SearchView from "./view/SearchView";
import CountryListView from "./view/CountryListView";
import CountryDetailsView from "./view/CountryDetailsView";

// Interfaces
import { CountryTransformer } from "./interfaces/country";

// Views Instance
const themeView = new ThemeView();
const selectOptionsView = new SelectOptionsView();
const selectBoxView = new SelectBoxView();
const searchView = new SearchView();
const countryListView = new CountryListView();
const countryDetailsView = new CountryDetailsView();

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
  await Model.filterCountries.call(Model.state, filterTerm, filterBy);

  // 5) Render filtered country data
  countryListView.render(Model.state.filteredCountries);
},
countryListView.renderError.bind(countryListView));

/**
 * Controller For Country List
 */
const controlCountries = catchAsync(async function (): Promise<void> {
  // 1) Render loading spinner
  countryListView.renderSpinner();

  // 2) Fetch country data
  await Model.loadCountries.call(Model.state);

  // 3) Filter country data
  await Model.filterCountries.call(
    Model.state,
    Model.state.filterTerm,
    Model.state.filterBy
  );

  // 4) Render filtered country data
  countryListView.render(Model.state.filteredCountries);
}, countryListView.renderError.bind(countryListView));

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
  await Model.loadCountry.call(Model.state, countryName);

  // 7) Render country data
  countryDetailsView.render(Model.state.selectedCountry as CountryTransformer);
}, countryDetailsView.renderError.bind(countryDetailsView));

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
 * Main
 */
const init = function (): void {
  themeView.addHandlerThemeClick(controlTheme);
  searchView.addHandlerInput(controlFilter);
  selectOptionsView.addHandlerLoad(controlSelectOption);
  selectOptionsView.addHandlerClick(controlFilter);
  countryListView.addHandlerLoad(controlCountries);
  countryDetailsView.addHandlerUrlHashChangeLoadFire(controlCountryDetails);
  countryDetailsView.addHandlerGoBack(controlResetCountryDetails);
};

// Bootstrap Application
init();
