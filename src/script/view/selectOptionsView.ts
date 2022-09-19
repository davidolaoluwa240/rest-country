// View
import View from "./View";

/**
 * @class
 */
class SelectOptionsView extends View<string[]> {
  constructor() {
    super(document.querySelector(".custom-select__dropdown") as HTMLElement);
  }

  /**
   * Publisher Function
   * @param {Function} handler Hhandler function to be called when the page is loaded
   */
  addHandlerLoad(handler: () => void): void {
    document.addEventListener("DOMContentLoaded", handler);
  }

  /**
   * Publisher Function
   * @param {Function} handler Handler function to be called when select item is clicked
   */
  addHandlerClick(
    handler: (filterTerm?: string, filterBy?: string) => Promise<void>
  ) {
    this.parentEl.addEventListener("click", function (e: Event): void {
      const target = e.target as HTMLElement;
      const selectOptionItem = target.closest(
        ".custom-select__dropdown-item"
      ) as HTMLElement;
      if (!selectOptionItem) return;
      const filterBy = selectOptionItem.dataset.filter;
      handler(undefined, filterBy);
    });
  }

  /**
   * Highlight The Current Active Select Option Item
   * @param {string} filterBy Current active filter by value
   */
  highlightActiveItem(filterBy: string): void {
    this.parentEl
      .querySelectorAll(".custom-select__dropdown-item")
      .forEach((el: Element): void => {
        const element = el as HTMLElement;
        const filter = element.dataset.filter;
        filter === filterBy &&
          el.classList.add("custom-select__dropdown-item--active");
        filter !== filterBy &&
          el.classList.remove("custom-select__dropdown-item--active");
      });
  }

  /**
   * Generate Markup
   */
  generateMarkup(): string {
    return this.data.map(this.generateDropdownItemMarkup).join("");
  }

  /**
   * Generate Dropdown Item Markup
   * @param {string} item Country region data
   * @access private
   */
  private generateDropdownItemMarkup(item: string): string {
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

export default SelectOptionsView;
