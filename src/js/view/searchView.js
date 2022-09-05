// View
import View from "./View";

/**
 * @class
 */
class SearchView extends View {
  /**
   * @constructor
   * @returns {Object} SearchView instance
   */
  constructor() {
    super(document.querySelector(".search"));
  }

  /**
   * Publisher function that register an event and call the subscriber/handler when the event happens
   * @param {Function} handler Handler to be called when input event happen
   * @returns {undefined} void
   */
  addHandlerInput(handler) {
    this._parentEl
      .querySelector(".search__control")
      .addEventListener("input", (e) => {
        handler(e.target.value, undefined);
      });
  }
}

export default new SearchView();
