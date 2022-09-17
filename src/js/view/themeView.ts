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
   * Publisher Function
   * @param {Function} handler Handler to called when click event happen on the parent element
   */
  addHandlerThemeClick(handler: () => void): void {
    this.parentEl.addEventListener("click", handler);
  }

  /**
   * Perform Toggling Of Theme, Replace Icon, Text, Page Theme Color Based On Current Theme
   */
  render(): void {
    this.data = this.toggleTheme();
    this.replaceIcon();
    this.replaceTextContent();
    this.changePageTheme();
  }

  /**
   * Perform Toggling Of Theme Value
   * @access private
   */
  private toggleTheme(): string {
    return this.data === "light" ? "dark" : "light";
  }

  /**
   * Perform Replacing Icon Based On Current Theme Value
   * @access private
   */
  private replaceIcon(): void {
    const iconEls = this.parentEl.querySelectorAll(".navbar__item-icon");
    iconEls.forEach((iconEl: Element): boolean =>
      iconEl.classList.toggle("d-none")
    );
  }

  /**
   * Perform Replacing Of Theme Button Text Content Based On Current Theme Value
   * @access private
   */
  private replaceTextContent(): void {
    const themeBtnText = this.parentEl.querySelector(
      ".navbar__item-text"
    ) as HTMLElement;
    themeBtnText.textContent = `${this.toggleTheme()} Mode`;
  }

  /**
   * Perform Changing Of Page Color Based On Current Theme Value
   * @access private
   */
  private changePageTheme(): void {
    const rootEl = this.parentEl.closest("html") as HTMLElement;
    rootEl.setAttribute("data-theme", this.data);
  }
}

export default new ThemeView();
