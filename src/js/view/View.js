/**
 * @class
 */
class View {
  /**
   * Parent Element where content will be rendered
   * @access protected
   */
  _parentEl;
  /**
   * View Data
   * @access protected
   */
  _data;

  /**
   * @constructor
   * @param {HTMLElement} parentEl Parent Element that content will be rendered inside
   * @returns {Object} View instance
   */
  constructor(parentEl) {
    this._parentEl = parentEl;
  }

  /**
   * Clear Parent Element Content
   * @returns {undefined} void
   */
  _clear() {
    this._parentEl.innerHTML = "";
  }

  /**
   * Render Content to the DOM
   * @param {any} data Data that will be rendered inside the parent element
   * @returns {undefined} void
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
   * @param {string} err Error message
   * @returns {undefined} void
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
