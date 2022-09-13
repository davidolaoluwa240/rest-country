// View
import View from "./View";

/**
 * @class
 */
class SelectBoxView extends View<string> {
  constructor() {
    super(document.querySelector(".custom-select") as HTMLElement);
    this.addHandlerSelectBoxClick();
  }

  /**
   * Toggle the select box icon/dropdown state
   * @access private
   */
  private addHandlerSelectBoxClick(): void {
    this.parentEl.addEventListener("click", (e) => {
      const dropdownEl = e.target.closest(".custom-select__dropdown");
      const selectBoxEl = e.target.closest(".custom-select__box");
      if (dropdownEl || selectBoxEl) {
        this.toggleDropdownState();
        this.toggleSelectIconState();
      }
    });

    document.body.addEventListener("click", (e) => {
      const iconEl = this.parentEl.querySelector(
        ".custom-select__box-icon"
      ) as HTMLElement;
      if (
        this.parentEl.contains(e.target) ||
        !iconEl.classList.contains("toggle--active")
      )
        return;
      this.toggleDropdownState();
      this.toggleSelectIconState();
    });
  }

  /**
   * Change the select box text based on the current filterby value
   * @param {string} data Current filterby value
   */
  render(data: string) {
    this.data = data;
    (
      this.parentEl.querySelector(".custom-select__box-text") as HTMLElement
    ).textContent = data;
  }

  /**
   * Toggle select box icon state(active/inactive)
   * @access private
   */
  private toggleSelectIconState(): void {
    const iconEl = this.parentEl.querySelector(
      ".custom-select__box-icon"
    ) as HTMLElement;
    iconEl.classList.toggle("toggle--active");
  }

  /**
   * Toggle select box dropdown state(active/inactive)
   * @access private
   */
  private toggleDropdownState() {
    const dropdownEl = this.parentEl.querySelector(
      ".custom-select__dropdown"
    ) as HTMLElement;
    dropdownEl.classList.toggle("d-none");
  }
}

export default new SelectBoxView();
