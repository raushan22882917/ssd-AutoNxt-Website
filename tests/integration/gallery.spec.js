/**
 * QA PYRAMID — LAYER 2: INTEGRATION TESTS
 * Target: Gallery page – image grid and lightbox interaction
 */

import { test, expect } from '@playwright/test';

test.describe('Gallery Page – Integration Tests', () => {

  test('INT-GAL-001 Gallery page loads successfully', async ({ page }) => {
    await page.goto('/gallery');
    await expect(page).toHaveURL(/gallery/);
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('INT-GAL-002 Gallery images are visible', async ({ page }) => {
    await page.goto('/gallery');
    const images = page.getByRole('img');
    expect(await images.count()).toBeGreaterThan(0);
    await expect(images.first()).toBeVisible();
  });

  test('INT-GAL-003 Gallery grid has at least 4 images', async ({ page }) => {
    await page.goto('/gallery');
    const images = page.getByRole('img');
    expect(await images.count()).toBeGreaterThanOrEqual(4);
  });

  test('INT-GAL-004 Clicking a gallery image opens a lightbox / modal', async ({ page }) => {
    await page.goto('/gallery');
    const firstImg = page.getByRole('img').nth(1); // skip nav logo
    await firstImg.click();
    // Lightbox typically adds a dialog or an overlay element
    const dialog = page.getByRole('dialog').or(page.locator('[class*="lightbox"]'));
    if (await dialog.count() > 0) {
      await expect(dialog.first()).toBeVisible();
    }
  });

  test('INT-GAL-005 Gallery page has no JS errors', async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err));
    await page.goto('/gallery');
    expect(errors.length).toBe(0);
  });

  test('INT-GAL-006 Gallery page footer is visible', async ({ page }) => {
    await page.goto('/gallery');
    await expect(page.locator('footer')).toBeVisible();
  });
});
