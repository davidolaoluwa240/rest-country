// View
import View from "./View";

/**
 * @class
 */
class ThemeView extends View {
  /**
   * @constructor
   * @returns {object} ThemeView instance
   */
  constructor() {
    super(document.querySelector(".navbar__item--btn"));
    this._data = "dark";
  }

  /**
   * A publisher function that register an event and call the subscriber/handler when it happens
   * @param {Function} handler A subscriber function, called when click event happens on the parent element
   * @returns {undefined} void
   */
  addHandlerThemeClick(handler) {
    this._parentEl.addEventListener("click", handler);
  }

  /**
   * Perform toggling of theme, replace icon, text, page theme color based on current theme
   * @returns {undefined} void
   */
  render() {
    this._data = this._toggleTheme();
    this._replaceIcon();
    this._replaceTextContent();
    this._changePageTheme();
  }

  /**
   * Perform toggling of theme value
   * @access protected
   * @returns {string} New theme value
   */
  _toggleTheme() {
    return this._data === "light" ? "dark" : "light";
  }

  /**
   * Perform replacing icon based on current theme value
   * @access protected
   * @returns {undefined} void
   */
  _replaceIcon() {
    const iconEls = this._parentEl.querySelectorAll(".navbar__item-icon");
    iconEls.forEach((iconEl) => iconEl.classList.toggle("d-none"));
  }

  /**
   * Perform replacing of theme button text content based on current theme value
   * @access protected
   * @returns {undefined} void
   */
  _replaceTextContent() {
    const themeBtnText = this._parentEl.querySelector(".navbar__item-text");
    themeBtnText.textContent = `${this._toggleTheme()} Mode`;
  }

  /**
   * Perform changing of page color based on current theme value
   * @access protected
   * @returns {undefined} void
   */
  _changePageTheme() {
    const rootEl = this._parentEl.closest("html");
    rootEl.setAttribute("data-theme", this._data);
  }
}

export default new ThemeView();
