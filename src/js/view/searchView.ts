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
   * Publisher function that register an event and call the subscriber/handler when the event happens
   * @param {Function} handler Handler to be called when input event happen
   */
  addHandlerInput(
    handler: (filterTerm?: string, filterBy?: string) => Promise<void>
  ): void {
    (
      this.parentEl.querySelector(".search__control") as HTMLInputElement
    ).addEventListener("input", (e): void => {
      handler(e.target.value, undefined);
    });
  }
}

export default new SearchView();
