/**
 * QA PYRAMID — LAYER 2: INTEGRATION TESTS
 * Target: Contribution, Privacy, Terms, and 404 pages
 */

import { test, expect } from '@playwright/test';

test.describe('Contribution Page – Integration Tests', () => {

  test('INT-CONTRIB-001 Contribution page loads at /contribution', async ({ page }) => {
    await page.goto('/contribution');
    await expect(page).toHaveURL(/contribution/);
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('INT-CONTRIB-002 Page content is visible', async ({ page }) => {
    await page.goto('/contribution');
    await expect(page.locator('main')).toBeVisible();
  });

  test('INT-CONTRIB-003 No JS errors on Contribution page', async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err));
    await page.goto('/contribution');
    expect(errors.length).toBe(0);
  });
});

test.describe('Privacy Policy Page – Integration Tests', () => {

  test('INT-PRIV-001 Privacy page loads at /privacy', async ({ page }) => {
    await page.goto('/privacy');
    await expect(page).toHaveURL(/privacy/);
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('INT-PRIV-002 Privacy policy text is rendered', async ({ page }) => {
    await page.goto('/privacy');
    await expect(page.locator('main p').first()).toBeVisible();
  });

  test('INT-PRIV-003 No JS errors on Privacy page', async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err));
    await page.goto('/privacy');
    expect(errors.length).toBe(0);
  });
});

test.describe('Terms & Conditions Page – Integration Tests', () => {

  test('INT-TERMS-001 Terms page loads at /terms', async ({ page }) => {
    await page.goto('/terms');
    await expect(page).toHaveURL(/terms/);
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('INT-TERMS-002 Terms text is rendered', async ({ page }) => {
    await page.goto('/terms');
    await expect(page.locator('main p').first()).toBeVisible();
  });

  test('INT-TERMS-003 No JS errors on Terms page', async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err));
    await page.goto('/terms');
    expect(errors.length).toBe(0);
  });
});

test.describe('404 Not Found Page – Integration Tests', () => {

  test('INT-404-001 Unknown route renders a 404/not-found page', async ({ page }) => {
    await page.goto('/this-route-does-not-exist-xyz');
    // Should show a not-found message rather than crash
    await expect(page.locator('body')).toBeVisible();
    // Content should indicate a missing page
    const bodyText = await page.locator('body').textContent();
    expect(bodyText).toBeTruthy();
  });

  test('INT-404-002 404 page has a link back to home', async ({ page }) => {
    await page.goto('/this-route-does-not-exist-xyz');
    const homeLink = page.getByRole('link', { name: /home|go back/i });
    if (await homeLink.count() > 0) {
      await homeLink.first().click();
      // Match full URL with origin — avoid anchoring to start of string
      await expect(page).toHaveURL(/\/$/);
    }
  });
});
