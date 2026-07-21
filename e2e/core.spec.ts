import { expect, test } from "@playwright/test";

test("home search finds penguin and shows result", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Search for an animal").fill("penguin");
  await page.getByRole("button", { name: "Check the zoo" }).click();
  await expect(page.getByRole("heading", { name: "Penguin" })).toBeVisible();
  await expect(page.locator(".score-number")).toContainText("occupied");
});

test("hebrew alias finds penguin", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Search for an animal").fill("פינגווין");
  await page.getByRole("button", { name: "Check the zoo" }).click();
  await expect(page.getByRole("heading", { name: "Penguin" })).toBeVisible();
});

test("zoo page groups animals", async ({ page }) => {
  await page.goto("/zoo");
  await expect(page.getByRole("heading", { name: /Wander through the enclosures/i })).toBeVisible();
  await page.getByRole("button", { name: "By tech habitat" }).click();
  await expect(page.getByRole("heading", { name: /Code & open source|Data enclosure|Available for adoption/ }).first()).toBeVisible();
});

test("animal page is shareable", async ({ page }) => {
  await page.goto("/animal/elephant");
  await expect(page.getByRole("heading", { name: "Elephant" })).toBeVisible();
  await expect(page.getByText(/not lawyers/i)).toBeVisible();
});

test("about page carries disclaimer", async ({ page }) => {
  await page.goto("/about");
  await expect(page.getByRole("heading", { name: "About the zoo" })).toBeVisible();
  await expect(page.getByText(/barely zoologists/i)).toBeVisible();
});
