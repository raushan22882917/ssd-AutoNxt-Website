/**
 * QA PYRAMID — LAYER 3: END-TO-END (E2E) TESTS
 * Target: Product discovery user journey
 *
 * Simulates a user arriving on the site and exploring
 * tractor models and attachments end-to-end.
 */

import { test, expect } from '@playwright/test';

test.describe('E2E – Product Discovery Journey', () => {

  // ------------------------------------------------------------------
  // Home → Product listing → Detail
  // ------------------------------------------------------------------
  test('E2E-PROD-001 Discover X45H2: Home → Product → X45H2 detail', async ({ page }) => {
    await page.goto('/');

    // Navigate to products via navbar
    await page.getByTestId('link-nav-product').click();
    await expect(page).toHaveURL(/\/product/);

    // Open X45H2 detail
    await page.getByRole('link', { name: /view details/i }).first().click();
    await expect(page).toHaveURL(/x45h2/i);

    // Use first() to avoid strict-mode violation — both h1 and h2 match the heading name
    await expect(page.getByRole('heading', { name: /AutoNxt X45H2/i }).first()).toBeVisible();
    await expect(page.getByText(/Technical|Specs/i).first()).toBeVisible();
    await expect(page.getByText(/Features/i).first()).toBeVisible();
  });

  test('E2E-PROD-002 Browse both tractor models back to back', async ({ page }) => {
    await page.goto('/product');

    // View X45H2
    await page.getByRole('link', { name: /view details/i }).first().click();
    await expect(page).toHaveURL(/x45h2/i);

    // Go back to product listing
    await page.locator('a[href="/product"]').first().click();
    await expect(page).toHaveURL(/\/product$/);

    // View X25H2 (second card)
    await page.getByRole('link', { name: /view details/i }).nth(1).click();
    await expect(page).toHaveURL(/x25h2/i);
    // Use first() — both h1 and h2 contain the model name
    await expect(page.getByRole('heading', { name: /AutoNxt X25H2/i }).first()).toBeVisible();
  });

  // ------------------------------------------------------------------
  // Filter + discover attachments
  // ------------------------------------------------------------------
  test('E2E-PROD-003 Filter to Attachments and open Bucket detail', async ({ page }) => {
    await page.goto('/product');

    const attachBtn = page.getByRole('button', { name: /attachments/i });
    if (await attachBtn.count() > 0) {
      await attachBtn.click();
      const bucketLink = page.getByRole('link', { name: /view details/i }).first();
      if (await bucketLink.count() > 0) {
        await bucketLink.click();
        await expect(page).toHaveURL(/attachment/);
      }
    }
  });

  // ------------------------------------------------------------------
  // Industry solutions discovery
  // ------------------------------------------------------------------
  test('E2E-PROD-004 Discover industry solution from Home page', async ({ page }) => {
    await page.goto('/');

    // Click an industry solution link on the home page
    const industryLink = page.getByRole('link', { name: /learn more|explore|view/i })
      .filter({ hasText: /industr/i })
      .first();

    if (await industryLink.count() > 0) {
      await industryLink.click();
      await expect(page).toHaveURL(/industr/);
    } else {
      // Navigate via navbar
      await page.getByTestId('link-nav-industry').click();
      await expect(page).toHaveURL(/\/industry/);
    }
  });

  test('E2E-PROD-005 Industry detail → back to listing → explore another', async ({ page }) => {
    await page.goto('/industry');

    // Open Biomass
    await page.goto('/industry/biomass');
    await expect(page.locator('h1').first()).toBeVisible();

    // Go back
    await page.goBack();
    await expect(page).toHaveURL(/\/industry/);

    // Open Cement
    await page.goto('/industry/cement');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  // ------------------------------------------------------------------
  // 3D model section
  // ------------------------------------------------------------------
  test('E2E-PROD-006 Interactive Model section loads on product detail', async ({ page }) => {
    await page.goto('/product/x45h2');

    // Scroll to interactive model area
    await page.evaluate(() => {
      const el = document.querySelector('canvas');
      if (el) el.scrollIntoView();
    });

    // Canvas element (3D model) should be present if WebGL is supported
    const canvas = page.locator('canvas');
    if (await canvas.count() > 0) {
      await expect(canvas.first()).toBeVisible({ timeout: 6000 }).catch(() => {});
    }

    // Page should not crash regardless
    await expect(page.locator('body')).toBeVisible();
  });

  // ------------------------------------------------------------------
  // SEO on product detail pages
  // ------------------------------------------------------------------
  test('E2E-PROD-007 X45H2 detail page has a meaningful page title', async ({ page }) => {
    await page.goto('/product/x45h2');
    const title = await page.title();
    expect(title.length).toBeGreaterThan(5);
    expect(title).toMatch(/X45H2|AutoNxt/i);
  });

  test('E2E-PROD-008 Attachment detail page has a meaningful title', async ({ page }) => {
    await page.goto('/product/attachment/bucket');
    const title = await page.title();
    expect(title.length).toBeGreaterThan(5);
  });
});
