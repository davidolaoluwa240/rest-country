// Helpers
import { numberFormat } from "../helper";

// Interfaces
import { CountryTransformer } from "../interfaces/country";

// View
import View from "./View";

/**
 * @class
 */
class CountryDetailsView extends View<CountryTransformer> {
  constructor() {
    super(document.querySelector(".search-detail__content") as HTMLElement);
  }

  /**
   * Register an event and call the subscriber/handler when the event happens
   * @param {Function} handler Handler to be called when the url hash change and when the page is loaded
   */
  addHandlerUrlHashChangeLoadFire(handler: () => Promise<void>): void {
    window.addEventListener("hashchange", handler);
    window.addEventListener("load", handler);
  }

  /**
   * Register an event and call an handler when the back button is clicked
   * @param {Function} handler Handler to be called when the click event happens on the back button
   */
  addHandlerGoBack(handler: () => void): void {
    (
      (
        this.parentEl.closest(".search-detail__container") as HTMLElement
      ).querySelector(".search-detail__btn") as HTMLElement
    ).addEventListener("click", handler);
  }

  /**
   * Make the country details view visible
   */
  activateCountryDetailsVisibility(): void {
    (this.parentEl.closest(".main__container") as HTMLElement).classList.add(
      "main__container--right"
    );
  }

  /**
   * Make the country details view in-visible
   */
  deactivateCountryDetailsVisibility(): void {
    (this.parentEl.closest(".main__container") as HTMLElement).classList.remove(
      "main__container--right"
    );
  }

  /**
   * Generate Markup
   */
  generateMarkup(): string {
    return `
        <div class="country-details">
            <div class="country-details__left">
                <img class="country-details__photo img-fluid" src="${
                  this.data.flag
                }" alt="${this.data.countryName}" />
            </div> 
            <div class="country-details__right">
                <h2 class="country-details__name">${this.data.countryName}</h2>
                <div class="country-details__item">
                    <div class="country-details__item-left">
                        <p class="country-details__item-content">Native Name: <span class="country-details__item-subcontent">${
                          this.data.countryName
                        }</span></p>
                         <p class="country-details__item-content">Population: <span class="country-details__item-subcontent">${numberFormat(
                           undefined,
                           +this.data.population
                         )}</span></p>
                         <p class="country-details__item-content">Region: <span class="country-details__item-subcontent">${
                           this.data.region
                         }</span></p>
                          <p class="country-details__item-content">Sub Region: <span class="country-details__item-subcontent">${
                            this.data.subregion
                          }</span></p>
                           <p class="country-details__item-content">Capital: <span class="country-details__item-subcontent">${this.data.capital?.join(
                             ", "
                           )}</span></p>
                    </div>
                    <div class="country-details__item-right">
                        <p class="country-details__item-content">Top Level Domain: <span class="country-details__item-subcontent">${this.data.topLevelDomain?.join(
                          ", "
                        )}</span></p>
                        <p class="country-details__item-content">Currencies: <span class="country-details__item-subcontent">${Object.keys(
                          this.data.currencies
                        ).join(", ")}</span></p> 
                        <p class="country-details__item-content">Languages: <span class="country-details__item-subcontent">${Object.values(
                          this.data.languages
                        ).join(", ")}</span></p>
                    </div>
                </div>  
                ${
                  this.data.borders?.length
                    ? `
                      <div class="country-details__item country-details__item--borders">
                        <div class="country-details__item-left">
                          <p class="country-details__item-content">
                            Border Countries: 
                          </p>
                        </div>
                        <div class="country-details__item-right">
                           ${this.data.borders
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
