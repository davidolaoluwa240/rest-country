// Helper
import { numberFormat } from "../helper";

// View
import View from "./View";

/**
 * @class
 */
class CountryListView extends View {
  /**
   * @constructor
   * @returns {Object} CountryListView instance
   */
  constructor() {
    super(document.querySelector(".search-result__container"));
  }

  /**
   * Register a load event and call the subscriber/handler when the event happens
   * @param {function} handler Subscriber/Handler to be called when the page is loaded
   * @returns {undefined} void
   * @this {Object} CountryListView instance
   */
  addHandlerLoad(handler) {
    document.addEventListener("DOMContentLoaded", handler);
  }

  /**
   * Make the country list view visible
   * @returns {undefined} void
   * @this {Object} CountryListView instance
   */
  activateCountryListVisibility() {
    this._parentEl.classList.remove("d-none");
  }

  /**
   * Make the country list view in-visible
   * @returns {undefined} void
   * @this {Object} CountryListView instance
   */
  deactivateCountryListVisibility() {
    this._parentEl.classList.add("d-none");
  }

  /**
   * Combine multiple country card markup into one single markup string
   * @returns {string} markup string
   * @this {Object} CountryListView instance
   */
  _generateMarkup() {
    return this._data.map(this._countryCardMarkup).join("");
  }

  /**
   * Generate single country card html markup string
   * @returns {string} markup string
   * @this {Object} CountryListView instance
   */
  _countryCardMarkup(item) {
    return `
        <article class="country-card">
            <a class="country-card__link" href="#${item.name.common}"></a>
            <header class="country-card__header">
                <img class="country-card__photo img-fluid" src="${
                  item.flags.png
                }" alt="${item.name.common}" />
            </header>
            <div class="country-card__content">
                <h2 class="country-card__title" title="${item.name.common}">${
      item.name.common
    }</h2>
                <h3 class="country-card__info">Population: <span class="country-card__info-content">${numberFormat(
                  undefined,
                  +item.population
                )}</span></h3>
                <h3 class="country-card__info">Region: <span class=" country-card__info-content">${
                  item.region
                }</span></h3>
                <h3 class="country-card__info">Capital: <span class="country-card__info-content ${
                  !item.capital ? "d-none" : ""
                }">${item.capital?.[0]}</span></h3>
            </div>
        </article>
    `;
  }
}

export default new CountryListView();
