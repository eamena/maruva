const MODAL_HTML = `
  <div class="product-catalog-card" id="test-product" tabindex="0"
    data-name="Jabón Test"
    data-price="$100.00"
    data-presentation="100g"
    data-description="Descripción test"
    data-ingredients="Ingrediente A, Ingrediente B"
    data-usage="Modo de uso test"
    data-care-tips="- Secar bien.||- Guardar en jabonera."
    data-image="test.jpg">
  </div>
  <div class="product-catalog-card" id="no-extras-product" tabindex="0"
    data-name="Producto Mínimo"
    data-price="$50.00"
    data-presentation="50g"
    data-description="Solo descripción">
  </div>
  <div class="modal-overlay" id="productModal">
    <div class="modal-card">
      <button class="modal-close">&times;</button>
      <div class="modal-image-col">
        <img id="modalImage" src="" alt="" />
        <div id="modalNoImage" class="modal-no-image" style="display: none"></div>
      </div>
      <div class="modal-info">
        <h2 id="modalName"></h2>
        <div class="modal-meta">
          <span id="modalPrice"></span>
          <span id="modalPresentation"></span>
        </div>
        <div id="modalDescription"></div>
        <div id="modalUsage" style="display: none">
          <div id="modalUsageText"></div>
        </div>
        <div id="modalCare" style="display: none">
          <div id="modalCareText"></div>
        </div>
        <div id="modalIngredients" style="display: none">
          <div id="modalIngredientsText"></div>
        </div>
      </div>
    </div>
  </div>
`;

function setup() {
  document.body.innerHTML = MODAL_HTML;
  jest.resetModules();
  require("../../productos.js");
  document.dispatchEvent(new Event("DOMContentLoaded"));
}

describe("Modal — opening", () => {
  beforeEach(setup);

  test("adds active class on card click", () => {
    document.getElementById("test-product").click();
    expect(
      document.getElementById("productModal").classList.contains("active"),
    ).toBe(true);
  });

  test("populates product name", () => {
    document.getElementById("test-product").click();
    expect(document.getElementById("modalName").textContent).toBe("Jabón Test");
  });

  test("populates price", () => {
    document.getElementById("test-product").click();
    expect(document.getElementById("modalPrice").textContent).toBe("$100.00");
  });

  test("populates presentation", () => {
    document.getElementById("test-product").click();
    expect(document.getElementById("modalPresentation").textContent).toBe(
      "100g",
    );
  });

  test("populates description", () => {
    document.getElementById("test-product").click();
    expect(document.getElementById("modalDescription").textContent).toBe(
      "Descripción test",
    );
  });

  test("renders ordered lists in description and usage", () => {
    document.body.innerHTML = `
      <div class="product-catalog-card" id="list-product" tabindex="0"
        data-name="Producto con lista"
        data-price="$75.00"
        data-presentation="50g"
        data-description="Intro||1. Primer paso||2. Segundo paso"
        data-usage="1. Paso uno.||2. Paso dos.||Tip: nota"
      ></div>
      ${MODAL_HTML}
    `;
    jest.resetModules();
    require("../../productos.js");
    document.dispatchEvent(new Event("DOMContentLoaded"));
    document.getElementById("list-product").click();
    expect(document.querySelector("#modalDescription ol")).not.toBeNull();
    expect(document.querySelectorAll("#modalDescription li")).toHaveLength(2);
    expect(document.querySelector("#modalUsage ol")).not.toBeNull();
    expect(document.querySelectorAll("#modalUsage li")).toHaveLength(2);
  });

  test("renders bullet lists in description", () => {
    document.body.innerHTML = `
      <div class="product-catalog-card" id="bullet-product" tabindex="0"
        data-name="Producto con viñetas"
        data-price="$60.00"
        data-presentation="40g"
        data-description="Intro||Libre de:||- Ftalatos||- Parabenos||- Fenoles"
      ></div>
      ${MODAL_HTML}
    `;
    jest.resetModules();
    require("../../productos.js");
    document.dispatchEvent(new Event("DOMContentLoaded"));
    document.getElementById("bullet-product").click();
    expect(document.querySelector("#modalDescription ul")).not.toBeNull();
    expect(document.querySelectorAll("#modalDescription li")).toHaveLength(3);
  });

  test("shows ingredients when data-ingredients is set", () => {
    document.getElementById("test-product").click();
    expect(document.getElementById("modalIngredients").style.display).toBe(
      "block",
    );
    expect(document.getElementById("modalIngredientsText").textContent).toBe(
      "Ingrediente A, Ingrediente B",
    );
  });

  test("hides ingredients when data-ingredients is absent", () => {
    document.getElementById("no-extras-product").click();
    expect(document.getElementById("modalIngredients").style.display).toBe(
      "none",
    );
  });

  test("shows usage when data-usage is set", () => {
    document.getElementById("test-product").click();
    expect(document.getElementById("modalUsage").style.display).toBe("block");
    expect(document.getElementById("modalUsageText").textContent).toBe(
      "Modo de uso test",
    );
  });

  test("shows care tips when data-care-tips is set", () => {
    document.getElementById("test-product").click();
    expect(document.getElementById("modalCare").style.display).toBe("block");
    expect(document.querySelector("#modalCare ul")).not.toBeNull();
    expect(document.querySelectorAll("#modalCare li")).toHaveLength(2);
  });

  test("hides care tips when data-care-tips is absent", () => {
    document.getElementById("no-extras-product").click();
    expect(document.getElementById("modalCare").style.display).toBe("none");
  });

  test("hides usage when data-usage is absent", () => {
    document.getElementById("no-extras-product").click();
    expect(document.getElementById("modalUsage").style.display).toBe("none");
  });

  test("shows image when data-image is set", () => {
    document.getElementById("test-product").click();
    expect(document.getElementById("modalImage").style.display).toBe("block");
    expect(document.getElementById("modalNoImage").style.display).toBe("none");
  });

  test("shows no-image placeholder when data-image is absent", () => {
    document.getElementById("no-extras-product").click();
    expect(document.getElementById("modalImage").style.display).toBe("none");
    expect(document.getElementById("modalNoImage").style.display).toBe("flex");
  });

  test("locks body scroll when modal opens", () => {
    document.getElementById("test-product").click();
    expect(document.body.style.overflow).toBe("hidden");
  });

  test("opens via Enter key", () => {
    const card = document.getElementById("test-product");
    card.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Enter", bubbles: true }),
    );
    expect(
      document.getElementById("productModal").classList.contains("active"),
    ).toBe(true);
  });

  test("opens via Space key", () => {
    const card = document.getElementById("test-product");
    card.dispatchEvent(
      new KeyboardEvent("keydown", { key: " ", bubbles: true }),
    );
    expect(
      document.getElementById("productModal").classList.contains("active"),
    ).toBe(true);
  });
});

describe("Modal — closing", () => {
  beforeEach(() => {
    setup();
    document.getElementById("test-product").click();
  });

  test("closes on close button click", () => {
    document.querySelector(".modal-close").click();
    expect(
      document.getElementById("productModal").classList.contains("active"),
    ).toBe(false);
  });

  test("closes on Escape key", () => {
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
    );
    expect(
      document.getElementById("productModal").classList.contains("active"),
    ).toBe(false);
  });

  test("closes when clicking the backdrop", () => {
    // Simulate a click directly on the overlay (not on modal-card)
    const event = new MouseEvent("click", { bubbles: true });
    Object.defineProperty(event, "target", {
      value: document.getElementById("productModal"),
    });
    document.getElementById("productModal").dispatchEvent(event);
    expect(
      document.getElementById("productModal").classList.contains("active"),
    ).toBe(false);
  });

  test("restores body scroll on close", () => {
    document.querySelector(".modal-close").click();
    expect(document.body.style.overflow).toBe("");
  });
});

describe("Modal — hash navigation", () => {
  test("opens modal for matching hash on page load", () => {
    document.body.innerHTML = MODAL_HTML;
    // jsdom doesn't implement scrollIntoView — stub it
    document.getElementById("test-product").scrollIntoView = jest.fn();
    Object.defineProperty(window, "location", {
      value: { hash: "#test-product" },
      writable: true,
    });
    jest.resetModules();
    jest.useFakeTimers();
    require("../../productos.js");
    document.dispatchEvent(new Event("DOMContentLoaded"));
    jest.runAllTimers();
    expect(
      document.getElementById("productModal").classList.contains("active"),
    ).toBe(true);
    jest.useRealTimers();
  });
});
