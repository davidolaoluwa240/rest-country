// View
import View from "./View";

/**
 * @class
 */
class SelectOptionsView extends View {
  /**
   * @constructor
   * @returns {Object} SelectOptionsView instance
   */
  constructor() {
    super(document.querySelector(".custom-select__dropdown"));
  }

  /**
   * Publisher function that register an event, call the subscriber when the event happens
   * @param {Function} handler Subscriber/handler function, called when page is loaded
   * @returns {undefined} void
   */
  addHandlerLoad(handler) {
    document.addEventListener("DOMContentLoaded", handler);
  }

  /**
   * Publisher function that register an event, call the subscriber when the event happens
   * @param {Function} handler Subscriber/handler function, called when select item is clicked
   * @returns {undefined} void
   */
  addHandlerClick(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const selectOptionItem = e.target.closest(
        ".custom-select__dropdown-item"
      );
      if (!selectOptionItem) return;
      const filterBy = selectOptionItem.dataset.filter;
      handler(undefined, filterBy);
    });
  }

  /**
   * Highlight the current active select option item
   * @param {string} filterBy Current active filter by value
   * @returns {undefined} void
   */
  highlightActiveItem(filterBy) {
    this._parentEl
      .querySelectorAll(".custom-select__dropdown-item")
      .forEach((el) => {
        const filter = el.dataset.filter;
        filter === filterBy &&
          el.classList.add("custom-select__dropdown-item--active");
        filter !== filterBy &&
          el.classList.remove("custom-select__dropdown-item--active");
      });
  }

  /**
   * Combine single html markup string into a multiple big string that will be rendered inside the parentElement in the DOM
   * @access protected
   * @returns {string} Generated html markup string
   */
  _generateMarkup() {
    return this._data.map(this._generateDropdownItemMarkup).join("");
  }

  /**
   * Generate single dropdown item html markup string
   * @param {string} item country region data
   * @access protected
   * @returns {string} Html markup string
   */
  _generateDropdownItemMarkup(item) {
    return `
       <div
            class="custom-select__dropdown-item"
            data-filter="${item}"
        >
            ${item}
        </div>
    `;
  }
}

export default new SelectOptionsView();
