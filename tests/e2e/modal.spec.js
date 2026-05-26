const { test, expect } = require("@playwright/test");

test.describe("Product modal", () => {
  test("opens when clicking a product card", async ({ page }) => {
    await page.goto("/jabones.html");
    await page.click("#jabon-mango-jojoba");
    await expect(page.locator("#productModal")).toHaveClass(/active/);
  });

  test("displays correct product name", async ({ page }) => {
    await page.goto("/jabones.html");
    await page.click("#jabon-mango-jojoba");
    await expect(page.locator("#modalName")).toHaveText(
      "Jabón de Mango con Jojoba",
    );
  });

  test("displays correct price", async ({ page }) => {
    await page.goto("/jabones.html");
    await page.click("#jabon-mango-jojoba");
    await expect(page.locator("#modalPrice")).toHaveText("$78.00");
  });

  test("displays description", async ({ page }) => {
    await page.goto("/jabones.html");
    await page.click("#jabon-mango-jojoba");
    const desc = await page.locator("#modalDescription").textContent();
    expect(desc.length).toBeGreaterThan(10);
  });

  test("shows ingredients section", async ({ page }) => {
    await page.goto("/jabones.html");
    await page.click("#jabon-mango-jojoba");
    await expect(page.locator("#modalIngredients")).toBeVisible();
    const text = await page.locator("#modalIngredientsText").textContent();
    expect(text.length).toBeGreaterThan(5);
  });

  test("shows usage section", async ({ page }) => {
    await page.goto("/jabones.html");
    await page.click("#jabon-mango-jojoba");
    await expect(page.locator("#modalUsage")).toBeVisible();
  });

  test("shows product image", async ({ page }) => {
    await page.goto("/jabones.html");
    await page.click("#jabon-mango-jojoba");
    await expect(page.locator("#modalImage")).toBeVisible();
    await expect(page.locator("#modalNoImage")).toBeHidden();
  });

  test("closes with X button", async ({ page }) => {
    await page.goto("/jabones.html");
    await page.click("#jabon-mango-jojoba");
    await page.click(".modal-close");
    await expect(page.locator("#productModal")).not.toHaveClass(/active/);
  });

  test("closes with Escape key", async ({ page }) => {
    await page.goto("/jabones.html");
    await page.click("#jabon-mango-jojoba");
    await page.keyboard.press("Escape");
    await expect(page.locator("#productModal")).not.toHaveClass(/active/);
  });

  test("closes when clicking backdrop", async ({ page }) => {
    await page.goto("/jabones.html");
    await page.click("#jabon-mango-jojoba");
    // Click top-left corner of overlay (outside the modal card)
    await page.locator("#productModal").click({ position: { x: 5, y: 5 } });
    await expect(page.locator("#productModal")).not.toHaveClass(/active/);
  });

  test("opens via URL hash on page load", async ({ page }) => {
    await page.goto("/jabones.html#jabon-mango-jojoba");
    await expect(page.locator("#productModal")).toHaveClass(/active/, {
      timeout: 2000,
    });
    await expect(page.locator("#modalName")).toHaveText(
      "Jabón de Mango con Jojoba",
    );
  });
});

test.describe("No-image product (hogar)", () => {
  test("shows no-image placeholder when product has no image", async ({
    page,
  }) => {
    await page.goto("/hogar.html");
    await page.click("#limpiador-multiusos");
    await expect(page.locator("#modalNoImage")).toBeVisible();
    await expect(page.locator("#modalImage")).toBeHidden();
  });
});

test.describe("Home page — favorite product links", () => {
  test("Jabón de Avena card navigates to product and opens modal", async ({
    page,
  }) => {
    await page.goto("/index.html");
    await page.click(
      'a.product-card[href="jabones.html#jabon-avena-vainilla"]',
    );
    await expect(page).toHaveURL(/jabones\.html#jabon-avena-vainilla/);
    await expect(page.locator("#productModal")).toHaveClass(/active/, {
      timeout: 2000,
    });
  });

  test("Jabón de Lavanda card navigates to product and opens modal", async ({
    page,
  }) => {
    await page.goto("/index.html");
    await page.click(
      'a.product-card[href="jabones.html#jabon-lavanda-karite"]',
    );
    await expect(page).toHaveURL(/jabones\.html#jabon-lavanda-karite/);
    await expect(page.locator("#productModal")).toHaveClass(/active/, {
      timeout: 2000,
    });
  });

  test("Jabón de Eucalipto card navigates to product and opens modal", async ({
    page,
  }) => {
    await page.goto("/index.html");
    await page.click(
      'a.product-card[href="jabones.html#jabon-eucalipto-aloe"]',
    );
    await expect(page).toHaveURL(/jabones\.html#jabon-eucalipto-aloe/);
    await expect(page.locator("#productModal")).toHaveClass(/active/, {
      timeout: 2000,
    });
  });
});

test.describe("Modal across pages", () => {
  const pages = [
    { path: "/jabones.html", card: "#jabon-mango-jojoba" },
    { path: "/hogar.html", card: "#lava-grande" },
    { path: "/cuidado-capilar.html", card: ".product-catalog-card" },
    { path: "/cuidado-corporal.html", card: ".product-catalog-card" },
    { path: "/cuidado-facial.html", card: ".product-catalog-card" },
    { path: "/mascotas.html", card: ".product-catalog-card" },
    { path: "/kits.html", card: ".product-catalog-card" },
  ];

  for (const { path, card } of pages) {
    test(`modal works on ${path}`, async ({ page }) => {
      await page.goto(path);
      await page.locator(card).first().click();
      await expect(page.locator("#productModal")).toHaveClass(/active/);
      const name = await page.locator("#modalName").textContent();
      expect(name.length).toBeGreaterThan(0);
      await page.click(".modal-close");
      await expect(page.locator("#productModal")).not.toHaveClass(/active/);
    });
  }
});
