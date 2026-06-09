/**
 * QA PYRAMID — LAYER 2: INTEGRATION TESTS
 * Target: Multi-language switcher integration
 *
 * Verifies that switching languages updates UI text
 * across the whole app consistently.
 */

import { test, expect } from '@playwright/test';

const LANGUAGES = ['EN', 'HI', 'MR', 'TE'];

test.describe('Language Switcher – Integration Tests', () => {

  // ------------------------------------------------------------------
  // Switcher availability
  // ------------------------------------------------------------------
  test('INT-LANG-001 Language switcher renders in the navbar', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.locator('nav button').filter({ hasText: /EN|HI|MR|TE/i }).first()
    ).toBeVisible();
  });

  test('INT-LANG-002 Language dropdown lists all 4 languages', async ({ page }) => {
    await page.goto('/');
    const langBtn = page.locator('nav button').filter({ hasText: /EN|HI|MR|TE/i }).first();
    await langBtn.click();
    await expect(page.getByText(/Hindi/i).first()).toBeVisible();
    await expect(page.getByText(/Marathi/i).first()).toBeVisible();
    await expect(page.getByText(/Telugu/i).first()).toBeVisible();
    await expect(page.getByText(/English/i).first()).toBeVisible();
  });

  // ------------------------------------------------------------------
  // Switching languages
  // ------------------------------------------------------------------
  test('INT-LANG-003 Switching to Hindi (HI) updates the UI', async ({ page }) => {
    await page.goto('/');
    const langBtn = page.locator('nav button').filter({ hasText: /EN|HI|MR|TE/i }).first();
    await langBtn.click();
    await page.getByText(/Hindi/i).first().click();
    // Navbar button should now show "HI" or "हिंदी"
    const updatedBtn = page.locator('nav button').filter({ hasText: /HI|हिंदी/i }).first();
    await expect(updatedBtn).toBeVisible();
  });

  test('INT-LANG-004 Switching to Marathi (MR) updates the UI', async ({ page }) => {
    await page.goto('/');
    const langBtn = page.locator('nav button').filter({ hasText: /EN|HI|MR|TE/i }).first();
    await langBtn.click();
    await page.getByText(/Marathi/i).first().click();
    const updatedBtn = page.locator('nav button').filter({ hasText: /MR|मराठी/i }).first();
    await expect(updatedBtn).toBeVisible();
  });

  test('INT-LANG-005 Switching to Telugu (TE) updates the UI', async ({ page }) => {
    await page.goto('/');
    const langBtn = page.locator('nav button').filter({ hasText: /EN|HI|MR|TE/i }).first();
    await langBtn.click();
    await page.getByText(/Telugu/i).first().click();
    const updatedBtn = page.locator('nav button').filter({ hasText: /TE|తెలుగు/i }).first();
    await expect(updatedBtn).toBeVisible();
  });

  test('INT-LANG-006 Switching back to English (EN) restores English text', async ({ page }) => {
    await page.goto('/');
    // Switch to Hindi first
    const langBtn = page.locator('nav button').filter({ hasText: /EN|HI|MR|TE/i }).first();
    await langBtn.click();
    await page.getByText(/Hindi/i).first().click();
    // Switch back
    const langBtn2 = page.locator('nav button').filter({ hasText: /HI|EN|MR|TE/i }).first();
    await langBtn2.click();
    await page.getByText(/English/i).first().click();
    // Confirm a known English string is back
    await expect(page.locator('nav').getByText(/EN/i).first()).toBeVisible();
  });

  // ------------------------------------------------------------------
  // Language persists across navigation
  // ------------------------------------------------------------------
  test('INT-LANG-007 Selected language persists after navigating to another page', async ({ page }) => {
    await page.goto('/');
    const langBtn = page.locator('nav button').filter({ hasText: /EN|HI|MR|TE/i }).first();
    await langBtn.click();
    await page.getByText(/Hindi/i).first().click();
    // Navigate to product page
    await page.getByTestId('link-nav-product').click();
    await expect(page).toHaveURL(/product/);
    // HI should still be active
    const updatedBtn = page.locator('nav button').filter({ hasText: /HI|हिंदी/i }).first();
    await expect(updatedBtn).toBeVisible();
  });
});
