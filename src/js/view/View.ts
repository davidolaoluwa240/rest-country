/**
 * @abstract
 */
abstract class View<T> {
  /**
   * Parent Element where content will be rendered
   * @access protected
   */
  protected parentEl: HTMLElement;
  /**
   * View Data
   * @access protected
   */
  protected data: T;

  constructor(parentEl: HTMLElement) {
    this.parentEl = parentEl;
  }

  /**
   * Clear Parent Element Content
   * @access private
   */
  private clear(): void {
    this.parentEl.innerHTML = "";
  }

  /**
   * Generate markup based on data value
   */
  public generateMarkup(): string {
    return "";
  }

  /**
   * Render Content to the DOM
   * @param {T} data View Data
   */
  public render(data: T): void {
    this.data = data;
    const markup = this.generateMarkup();
    this.clear();
    this.parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  /**
   * Render Loading Spinner
   */
  public renderSpinner(): void {
    const markup = `
      <div class="loader">
        <div class="loader__container"></div>
      </div>
    `;
    this.clear();
    this.parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  /**
   * Render Error
   * @param {string} message Error message
   */
  public renderError = (message: string): void => {
    const markup = `
      <p class="error-message">${message}💥💥💥</p>
    `;
    this.clear();
    this.parentEl.insertAdjacentHTML("afterbegin", markup);
  };
}

export default View;
