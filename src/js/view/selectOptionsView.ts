// View
import View from "./View";

/**
 * @class
 */
class SelectOptionsView extends View<Array<string>> {
  constructor() {
    super(document.querySelector(".custom-select__dropdown") as HTMLElement);
  }

  /**
   * Publisher function that register an event, call the subscriber when the event happens
   * @param {Function} handler Subscriber/handler function, called when page is loaded
   */
  addHandlerLoad(handler: () => void): void {
    document.addEventListener("DOMContentLoaded", handler);
  }

  /**
   * Publisher function that register an event, call the subscriber when the event happens
   * @param {Function} handler Subscriber/handler function, called when select item is clicked
   */
  addHandlerClick(
    handler: (filterTerm?: string, filterBy?: string) => Promise<void>
  ) {
    this.parentEl.addEventListener("click", function (e) {
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
   */
  highlightActiveItem(filterBy: string): void {
    this.parentEl
      .querySelectorAll(".custom-select__dropdown-item")
      .forEach((el: Element): void => {
        const filter = el.dataset.filter;
        filter === filterBy &&
          el.classList.add("custom-select__dropdown-item--active");
        filter !== filterBy &&
          el.classList.remove("custom-select__dropdown-item--active");
      });
  }

  /**
   * Generate markup
   */
  generateMarkup(): string {
    return this.data.map(this.generateDropdownItemMarkup).join("");
  }

  /**
   * Generate dropdown item markup
   * @param {string} item country region data
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

export default new SelectOptionsView();
