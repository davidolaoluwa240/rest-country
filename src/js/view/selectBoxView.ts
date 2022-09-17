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
   * Toggle The Select Box Icon/Dropdown State
   * @access private
   */
  private addHandlerSelectBoxClick(): void {
    const performTogglingDropdownIconState = () => {
      this.toggleDropdownState();
      this.toggleSelectIconState();
    };

    this.parentEl.addEventListener("click", (e: Event): void => {
      const target = e.target as Element;
      const dropdownEl = target.closest(".custom-select__dropdown");
      const selectBoxEl = target.closest(".custom-select__box");
      if (dropdownEl || selectBoxEl) {
        performTogglingDropdownIconState();
      }
    });

    document.body.addEventListener("click", (e: Event): void => {
      const target = e.target as Element;
      const iconEl = this.parentEl.querySelector(
        ".custom-select__box-icon"
      ) as HTMLElement;
      if (
        this.parentEl.contains(target) ||
        !iconEl.classList.contains("toggle--active")
      )
        return;
      performTogglingDropdownIconState();
    });
  }

  /**
   * Change The Select Box Text Based On The Current Filterby Value
   * @param {string} data Current filterby value
   */
  render(data: string): void {
    this.data = data;
    (
      this.parentEl.querySelector(".custom-select__box-text") as HTMLElement
    ).textContent = data;
  }

  /**
   * Toggle Select Box Icon State(Active/Inactive)
   * @access private
   */
  private toggleSelectIconState(): void {
    const iconEl = this.parentEl.querySelector(
      ".custom-select__box-icon"
    ) as HTMLElement;
    iconEl.classList.toggle("toggle--active");
  }

  /**
   * Toggle Select Box Dropdown State(Active/Inactive)
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
