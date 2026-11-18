import { expect, test } from "@playwright/test";

// Démo du cas passant, de bout en bout. Chaque itération ajoute ses étapes (test.step).
test("Démo : le cas passant", async ({ page }) => {
  await test.step("J'ouvre l'application", async () => {
    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();
  });

  await test.step("Je vois les 4 cards par public", async () => {
    await expect(page.getByText("Entreprise mécène")).toBeVisible();
    await expect(page.getByText("Particulier", { exact: true })).toBeVisible();
    await expect(page.getByText("Testateur · Legs")).toBeVisible();
    await expect(page.getByText("Organisateur", { exact: true })).toBeVisible();
  });
});
