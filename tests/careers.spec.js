import { test, expect } from '@playwright/test';

test.describe('Careers Page', () => {

  test('Careers page loads', async ({ page }) => {
    await page.goto('/careers');

    await expect(page).toHaveURL(/careers/);

    await expect(
      page.getByRole('heading').first()
    ).toBeVisible();
  });

  test('Hero section visible', async ({ page }) => {
    await page.goto('/careers');

    await expect(
      page.getByText(/careers/i).first()
    ).toBeVisible();
  });

  test('Open roles statistics visible', async ({ page }) => {
    await page.goto('/careers');

    await expect(
      page.getByText(/Open Roles|Positions/i).first()
    ).toBeVisible();
  });

  test('Why Join AutoNxt section visible', async ({ page }) => {
    await page.goto('/careers');

    await expect(
      page.getByText(/Why Join/i).first()
    ).toBeVisible();
  });

  test('Perk cards displayed', async ({ page }) => {
    await page.goto('/careers');

    await expect(
      page.getByRole('heading').nth(1)
    ).toBeVisible();
  });

  test('Open Positions section visible', async ({ page }) => {
    await page.goto('/careers');

    await expect(
      page.getByText(/Open Positions/i).first()
    ).toBeVisible();
  });

  test('Role cards displayed', async ({ page }) => {
    await page.goto('/careers');

    await expect(
      page.locator('[class*="group"]').first()
    ).toBeVisible();
  });

  test('Apply via email link exists', async ({ page }) => {
    await page.goto('/careers');

    await expect(
      page.locator('a[href^="mailto:"]').first()
    ).toBeVisible();
  });

  test('Role card contains location information', async ({ page }) => {
    await page.goto('/careers');

    await expect(
      page.locator('[class*="lucide-map-pin"]').first()
    ).toBeVisible();
  });

  test('Role card contains employment type', async ({ page }) => {
    await page.goto('/careers');

    await expect(
      page.locator('[class*="lucide-clock"]').first()
    ).toBeVisible();
  });

  test('Open Application CTA visible', async ({ page }) => {
    await page.goto('/careers');

    await expect(
      page.locator('a[href*="Open Application"]').first()
    ).toBeVisible();
  });

  test('Open Application CTA works', async ({ page }) => {
    await page.goto('/careers');

    const openApp = page.locator(
      'a[href*="Open Application"]'
    );

    await expect(openApp).toBeVisible();
  });

  test('Page images load', async ({ page }) => {
    await page.goto('/careers');

    const images = page.locator('img');

    expect(await images.count()).toBeGreaterThan(0);
  });

  test('No JavaScript errors', async ({ page }) => {
    const errors = [];

    page.on('pageerror', error => {
      errors.push(error);
    });

    await page.goto('/careers');

    expect(errors.length).toBe(0);
  });

});
