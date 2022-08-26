// View
import View from "./View";

/**
 * @class
 */
class SearchView extends View {
  /**
   * @constructor
   * @returns {object} SearchView instance
   */
  constructor() {
    super(document.querySelector(".search"));
  }

  /**
   * Publisher function that register an event and call the subscriber/handler when the event happens
   * @param {function} handler handler to be called when input event happen
   * @returns {undefined} void
   * @this {object} SearchView instance
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
