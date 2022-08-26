/**
 * @class
 */
class View {
  /**
   * @access protected
   */
  _parentEl;
  /**
   * @access protected
   */
  _data;

  /**
   * @constructor
   * @param {Node} parentEl Parent Element that content will be rendered inside
   * @returns {Object} View instance
   */
  constructor(parentEl) {
    this._parentEl = parentEl;
  }

  /**
   * Clear Parent Element Content
   * @returns {undefined} void
   * @this {Object} View instance
   */
  _clear() {
    this._parentEl.innerHTML = "";
  }

  /**
   * Render Content to the DOM
   * @param {any} data Data that will be rendered inside the parent element
   * @returns {undefined} void
   * @this {Object} View instance
   */
  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  /**
   * Render Loading Spinner
   * @returns {undefined} void
   * @this {Object} View instance
   */
  renderSpinner() {
    const markup = `
      <div class="loader">
        <div class="loader__container"></div>
      </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  /**
   * Render Error
   * @param {string} err error message
   * @returns {undefined} void
   * @this {Object} View instance
   */
  renderError = (err) => {
    const markup = `
      <p class="error-message">${err}💥💥💥</p>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  };
}

export default View;
