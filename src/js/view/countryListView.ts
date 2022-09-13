// Helpers
import { numberFormat } from "../helper";

// Interfaces
import { CountryTransformer } from "../interfaces/country";

// View
import View from "./View";

/**
 * @class
 */
class CountryListView extends View<CountryTransformer[]> {
  constructor() {
    super(document.querySelector(".search-result__container") as HTMLElement);
  }

  /**
   * Register a load event and call the subscriber/handler when the event happens
   * @param {Function} handler Subscriber/Handler to be called when the page is loaded
   */
  addHandlerLoad<T>(handler: () => T): void {
    document.addEventListener("DOMContentLoaded", handler);
  }

  /**
   * Make the country list view visible
   */
  activateCountryListVisibility(): void {
    this.parentEl.classList.remove("d-none");
  }

  /**
   * Make the country list view in-visible
   */
  deactivateCountryListVisibility(): void {
    this.parentEl.classList.add("d-none");
  }

  /**
   * Generate Markup
   */
  generateMarkup(): string {
    return this.data.map(this.countryCardMarkup).join("");
  }

  /**
   * Generate Country Card Markup
   * @access private
   */
  private countryCardMarkup(item: CountryTransformer): string {
    return `
        <article class="country-card">
            <a class="country-card__link" href="#${item.countryName}"></a>
            <header class="country-card__header">
                <img class="country-card__photo img-fluid" src="${
                  item.flag
                }" alt="${item.countryName}" />
            </header>
            <div class="country-card__content">
                <h2 class="country-card__title" title="${item.countryName}">${
      item.countryName
    }</h2>
                <h3 class="country-card__info">Population: <span class="country-card__info-content">${numberFormat(
                  undefined,
                  item.population
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
