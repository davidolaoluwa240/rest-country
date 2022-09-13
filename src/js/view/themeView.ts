// View
import View from "./View";

/**
 * @class
 */
class ThemeView extends View<string> {
  constructor() {
    super(document.querySelector(".navbar__item--btn") as HTMLElement);
    this.data = "dark";
  }

  /**
   * A publisher function that register an event and call the subscriber/handler when it happens
   * @param {Function} handler A subscriber function, called when click event happens on the parent element
   */
  addHandlerThemeClick(handler: () => void): void {
    this.parentEl.addEventListener("click", handler);
  }

  /**
   * Perform toggling of theme, replace icon, text, page theme color based on current theme
   */
  render(): void {
    this.data = this.toggleTheme();
    this.replaceIcon();
    this.replaceTextContent();
    this.changePageTheme();
  }

  /**
   * Perform toggling of theme value
   * @access private
   */
  private toggleTheme(): string {
    return this.data === "light" ? "dark" : "light";
  }

  /**
   * Perform replacing icon based on current theme value
   * @access private
   */
  private replaceIcon(): void {
    const iconEls = this.parentEl.querySelectorAll(".navbar__item-icon");
    iconEls.forEach((iconEl: Element): boolean =>
      iconEl.classList.toggle("d-none")
    );
  }

  /**
   * Perform replacing of theme button text content based on current theme value
   * @access private
   */
  private replaceTextContent(): void {
    const themeBtnText = this.parentEl.querySelector(
      ".navbar__item-text"
    ) as HTMLElement;
    themeBtnText.textContent = `${this.toggleTheme()} Mode`;
  }

  /**
   * Perform changing of page color based on current theme value
   * @access private
   */
  private changePageTheme(): void {
    const rootEl = this.parentEl.closest("html") as HTMLElement;
    rootEl.setAttribute("data-theme", this.data);
  }
}

export default new ThemeView();
