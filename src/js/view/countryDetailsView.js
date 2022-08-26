// Helpers
import { numberFormat } from "../helper";

// View
import View from "./View";

/**
 * @class
 */
class CountryDetailsView extends View {
  /**
   * @constructor
   * @returns {Object} CountryDetailsView instance
   */
  constructor() {
    super(document.querySelector(".search-detail__content"));
  }

  /**
   * Register an event and call the subscriber/handler when the event happens
   * @param {function} handler Handler to be called when the url hash change and when the page is loaded
   * @returns {undefined} void
   * @this {Object} CountryDetailsView instance
   */
  addHandlerUrlHashChangeLoadFire(handler) {
    window.addEventListener("hashchange", handler);
    window.addEventListener("load", handler);
  }

  /**
   * Register an event and call an handler when the back button is clicked
   * @param {function} handler Function to be called when the event happens
   * @returns {undefined} void
   * @this {Object} CountryDetailsView instance
   */
  addHandlerGoBack(handler) {
    this._parentEl
      .closest(".search-detail__container")
      .querySelector(".search-detail__btn")
      .addEventListener("click", handler);
  }

  /**
   * Make the country details view visible
   * @returns {undefined} void
   * @this {Object} CountryDetailsView instance
   */
  activateCountryDetailsVisibility() {
    this._parentEl
      .closest(".main__container")
      .classList.add("main__container--right");
  }

  /**
   * Make the country details view in-visible
   * @returns {undefined} void
   * @this {Object} CountryDetailsView instance
   */
  deactivateCountryDetailsVisibility() {
    this._parentEl
      .closest(".main__container")
      .classList.remove("main__container--right");
  }

  /**
   * Generate markup for country details
   * @returns {string} html markup string
   * @this {object} CountryDetailsView instance
   */
  _generateMarkup() {
    return `
        <div class="country-details">
            <div class="country-details__left">
                <img class="country-details__photo img-fluid" src="${
                  this._data.flags?.png
                }" alt="${this._data.name?.common}" />
            </div> 
            <div class="country-details__right">
                <h2 class="country-details__name">${
                  this._data.name?.common
                }</h2>
                <div class="country-details__item">
                    <div class="country-details__item-left">
                        <p class="country-details__item-content">Native Name: <span class="country-details__item-subcontent">${
                          this._data.name?.common
                        }</span></p>
                         <p class="country-details__item-content">Population: <span class="country-details__item-subcontent">${numberFormat(
                           undefined,
                           +this._data.population
                         )}</span></p>
                         <p class="country-details__item-content">Region: <span class="country-details__item-subcontent">${
                           this._data.region
                         }</span></p>
                          <p class="country-details__item-content">Sub Region: <span class="country-details__item-subcontent">${
                            this._data.subregion
                          }</span></p>
                           <p class="country-details__item-content">Capital: <span class="country-details__item-subcontent">${this._data.capital?.join(
                             ", "
                           )}</span></p>
                    </div>
                    <div class="country-details__item-right">
                        <p class="country-details__item-content">Top Level Domain: <span class="country-details__item-subcontent">${this._data.tld?.join(
                          ", "
                        )}</span></p>
                        <p class="country-details__item-content">Currencies: <span class="country-details__item-subcontent">${Object.keys(
                          this._data.currencies
                        ).join(", ")}</span></p> 
                        <p class="country-details__item-content">Languages: <span class="country-details__item-subcontent">${Object.values(
                          this._data.languages
                        ).join(", ")}</span></p>
                    </div>
                </div>  
                ${
                  this._data.borders?.length
                    ? `
                      <div class="country-details__item country-details__item--borders">
                        <div class="country-details__item-left">
                          <p class="country-details__item-content">
                            Border Countries: 
                          </p>
                        </div>
                        <div class="country-details__item-right">
                           ${this._data.borders
                             .map(
                               (border) =>
                                 `<span class="country-details__item-subcontent country-details__item-subcontent--borders btn btn--sm btn--rounded-xm btn--secondary">
                            ${border}
                            </span>`
                             )
                             .join("")}
                        </div>
                      </div>
                `
                    : ""
                }
            </div>
        </div> 
    `;
  }
}

export default new CountryDetailsView();
