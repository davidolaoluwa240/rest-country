// Modules
import { expect, it, describe, beforeAll, beforeEach, vi } from "vitest";
import { Window } from "happy-dom";
import fs from "fs";
import path from "path";

// Views
import ThemeView from "../../src/script/view/ThemeView";
import View from "../../src/script/view/View";

// Virtual Dom Setup
const window = new Window();
const document = window.document;

const htmlPath = path.join(process.cwd(), "index.html");
const domContent = fs.readFileSync(htmlPath, "utf-8");

// Hooks
beforeAll(() => {
  document.write(domContent);
});

// Mocks
vi.stubGlobal("document", document);

describe("themeView", () => {
  let themeView: ThemeView;
  let parentEl: HTMLElement;
  beforeEach(() => {
    themeView = new ThemeView();
    parentEl = themeView["parentEl"];
  });

  it("should be an instance of View", () => {
    expect(themeView).toBeInstanceOf(View);
  });

  it("parentEl and data property must exist on the themeView", () => {
    expect(themeView).toHaveProperty("data");
    expect(themeView).toHaveProperty("parentEl");
  });

  it("the data property value must be dark initially", () => {
    expect(themeView["data"]).toBe("dark");
  });

  describe("toggleTheme()", () => {
    it("should return light when data property value is dark", () => {
      const newTheme = themeView["toggleTheme"]();
      expect(newTheme).toBe("light");
    });

    it("should return dark when data property value is light", () => {
      themeView["data"] = "light";
      const newTheme = themeView["toggleTheme"]();
      expect(newTheme).toBe("dark");
    });
  });

  describe("replaceIcon()", () => {
    it("should replaceIcon in the dom by toggling 'd-none' class", () => {
      const iconEl = parentEl.querySelector(".material-icons");
      const iconEl2 = parentEl.querySelector(".material-icons-outlined");

      themeView["replaceIcon"]();

      expect(iconEl?.classList.contains("d-none")).toBe(true);
      expect(iconEl2?.classList.contains("d-none")).toBe(false);
    });

    it("should return undefined when called", () => {
      const result = themeView["replaceIcon"]();
      expect(result).toBeUndefined();
    });
  });

  describe("replaceTextContent", () => {
    it("should replace text content in the button with 'light mode' when themeView data value is 'dark'", () => {
      const textEl = parentEl.querySelector(".navbar__item-text");
      themeView["replaceTextContent"]();
      expect(textEl?.textContent?.toLowerCase()).toBe("light mode");
    });

    it("should replace text content in the button with 'dark mode' when themeView data value is 'light'", () => {
      const textEl = parentEl.querySelector(".navbar__item-text");
      themeView["data"] = "light";
      themeView["replaceTextContent"]();
      expect(textEl?.textContent?.toLowerCase()).toBe("dark mode");
    });

    it("should return undefined when called", () => {
      const result = themeView["replaceTextContent"]();
      expect(result).toBeUndefined();
    });
  });

  describe("changePageTheme", () => {
    it("should replace the data-theme attribute value on the root element to 'dark' if the current themeView data value is 'dark'", () => {
      const rootEl = parentEl.closest("html");

      themeView["changePageTheme"]();

      expect(rootEl?.getAttribute("data-theme")).toBe("dark");
    });

    it("should replace the data-theme attribute value on the root element to 'light' if the current themeView data value is 'light'", () => {
      const rootEl = parentEl.closest("html");

      themeView["data"] = "light";
      themeView["changePageTheme"]();

      expect(rootEl?.getAttribute("data-theme")).toBe("light");
    });

    it("should return undefined when called", () => {
      const result = themeView["changePageTheme"]();
      expect(result).toBeUndefined();
    });
  });

  describe("render()", () => {
    beforeEach(() => {
      document.body.innerHTML = "";
      document.write(domContent);
      themeView = new ThemeView();
      parentEl = themeView["parentEl"];
    });

    it("should update data property value in the themeView", () => {
      themeView["render"]();
      expect(themeView["data"]).toBe("light");
    });

    it("should replaceIcon in the dom by toggling 'd-none' class", () => {
      const iconEl = parentEl.querySelector(".material-icons");
      const iconEl2 = parentEl.querySelector(".material-icons-outlined");
      themeView["render"]();
      expect(iconEl?.classList.contains("d-none")).toBe(true);
      expect(iconEl2?.classList.contains("d-none")).toBe(false);
    });

    it("should replace text content in the button with 'dark mode' when themeView data value is 'light'", () => {
      const textEl = parentEl.querySelector(".navbar__item-text");
      themeView["render"]();
      expect(textEl?.textContent?.toLowerCase()).toBe("dark mode");
    });

    it("should replace text content in the button with 'light mode' when themeView data value is 'dark'", () => {
      const textEl = parentEl.querySelector(".navbar__item-text");
      themeView["render"]();
      themeView["render"]();
      expect(textEl?.textContent?.toLowerCase()).toBe("light mode");
    });

    it("should replace the data-theme attribute value on the root element to 'dark' if the current themeView data value is 'dark'", () => {
      const rootEl = parentEl.closest("html");

      themeView["render"]();
      themeView["render"]();

      expect(rootEl?.getAttribute("data-theme")).toBe("dark");
    });

    it("should replace the data-theme attribute value on the root element to 'light' if the current themeView data value is 'light'", () => {
      const rootEl = parentEl.closest("html");

      themeView["render"]();

      expect(rootEl?.getAttribute("data-theme")).toBe("light");
    });

    it("should return undefined when called", () => {
      const result = themeView["render"]();
      expect(result).toBeUndefined();
    });
  });
});
