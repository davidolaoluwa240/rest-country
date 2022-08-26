// View
import View from "./View";

/**
 * @class
 */
class SelectBoxView extends View {
  /**
   * @constructor
   * @returns {Object} SelectBoxView instance
   */
  constructor() {
    super(document.querySelector(".custom-select"));
    this._addHandlerSelectBoxClick();
  }

  /**
   * Toggle the select box icon/dropdown state
   * @returns {undefined} void
   * @this {Object} SelectBoxView instance
   */
  _addHandlerSelectBoxClick() {
    this._parentEl.addEventListener("click", (e) => {
      const dropdownEl = e.target.closest(".custom-select__dropdown");
      const selectBoxEl = e.target.closest(".custom-select__box");
      if (dropdownEl || selectBoxEl) {
        this._toggleDropdownState();
        this._toggleSelectIconState();
      }
    });

    document.body.addEventListener("click", (e) => {
      const iconEl = this._parentEl.querySelector(".custom-select__box-icon");
      if (
        this._parentEl.contains(e.target) ||
        !iconEl.classList.contains("toggle--active")
      )
        return;
      this._toggleDropdownState();
      this._toggleSelectIconState();
    });
  }

  /**
   * Change the select box text based on the current filterby value
   * @param {string} data current filterby value
   * @returns {undefined} void
   * @this {Object} SelectBoxView instance
   */
  render(data) {
    this._data = data;
    this._parentEl.querySelector(".custom-select__box-text").textContent = data;
  }

  /**
   * Toggle select box icon state(active/inactive)
   * @returns {undefined} void
   * @this {Object} SelectBoxView instance
   */
  _toggleSelectIconState() {
    const iconEl = this._parentEl.querySelector(".custom-select__box-icon");
    iconEl.classList.toggle("toggle--active");
  }

  /**
   * Toggle select box dropdown state(active/inactive)
   * @returns {undefined} void
   * @this {Object} SelectBoxView instance
   */
  _toggleDropdownState() {
    const dropdownEl = this._parentEl.querySelector(".custom-select__dropdown");
    dropdownEl.classList.toggle("d-none");
  }
}

export default new SelectBoxView();
