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
   * @param {function} handler A subscriber function, called when click event happens on the parent element
   * @returns {undefined} void
   * @this {object} ThemeView instance
   */
  addHandlerThemeClick(handler) {
    this._parentEl.addEventListener("click", handler);
  }

  /**
   * Perform toggling of theme, replace icon, text, page theme color based on current theme
   * @returns {undefined} void
   * @this {object} ThemeView instance
   */
  render() {
    this._toggleTheme();
    this._replaceIcon();
    this._replaceTextContent();
    this._changePageTheme();
  }

  /**
   * Perform toggling of theme value
   * @access protected
   * @returns {undefined} void
   * @this {object} ThemeView instance
   */
  _toggleTheme() {
    this._data = this._data === "light" ? "dark" : "light";
  }

  /**
   * Perform replacing icon based on current theme value
   * @access protected
   * @returns {undefined} void
   * @this {object} ThemeView instance
   */
  _replaceIcon() {
    const iconEls = this._parentEl.querySelectorAll(".navbar__item-icon");
    iconEls.forEach((iconEl) => iconEl.classList.toggle("d-none"));
  }

  /**
   * Perform replacing of theme button text content based on current theme value
   * @access protected
   * @returns {undefined} void
   * @this {object} ThemeView instance
   */
  _replaceTextContent() {
    const themeBtnText = this._parentEl.querySelector(".navbar__item-text");
    themeBtnText.textContent = `${
      this._data === "light" ? "Dark" : "Light"
    } Mode`;
  }

  /**
   * Perform changing of page color based on current theme value
   * @access protected
   * @returns {undefined} void
   * @this {object} ThemeView instance
   */
  _changePageTheme() {
    const rootEl = this._parentEl.closest("html");
    rootEl.setAttribute("data-theme", this._data);
  }
}

export default new ThemeView();
