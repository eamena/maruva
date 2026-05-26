const MODAL_HTML = `
  <div class="product-catalog-card" id="test-product" tabindex="0"
    data-name="Jabón Test"
    data-price="$100.00"
    data-presentation="100g"
    data-description="Descripción test"
    data-ingredients="Ingrediente A, Ingrediente B"
    data-usage="Modo de uso test"
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
        <p id="modalDescription"></p>
        <div id="modalUsage" style="display: none">
          <span id="modalUsageText"></span>
        </div>
        <div id="modalIngredients" style="display: none">
          <span id="modalIngredientsText"></span>
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
    // jsdom doesn't support real hash navigation, so we set location.hash and re-init
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
