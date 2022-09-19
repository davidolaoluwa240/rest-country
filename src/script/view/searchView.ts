// View
import View from "./View";

/**
 * @class
 */
class SearchView extends View<string> {
  constructor() {
    super(document.querySelector(".search") as HTMLFormElement);
  }

  /**
   * Publisher Function
   * @param {Function} handler Handler to be called when input event happen on the search input
   */
  addHandlerInput(
    handler: (filterTerm?: string, filterBy?: string) => Promise<void>
  ): void {
    const inputEl = this.parentEl.querySelector(
      ".search__control"
    ) as HTMLInputElement;
    inputEl.addEventListener("input", (e: Event): void => {
      const target = e.target as HTMLInputElement;
      handler(target.value, undefined);
    });
  }
}

export default SearchView;
