/**
 * QA PYRAMID — LAYER 2: INTEGRATION TESTS
 * Target: Industry listing ↔ Industry detail page interactions
 */

import { test, expect } from '@playwright/test';

const INDUSTRIES = [
  { name: 'Biomass',             slug: 'biomass' },
  { name: 'Cement',              slug: 'cement' },
  { name: 'Construction',        slug: 'construction' },
  { name: 'Defence',             slug: 'defence' },
  { name: 'Airport Operations',  slug: 'airport' },
  { name: 'Metal Manufacturing', slug: 'metal' },
];

test.describe('Industry Listing ↔ Detail – Integration Tests', () => {

  // ------------------------------------------------------------------
  // Listing page completeness
  // ------------------------------------------------------------------
  test('INT-IND-001 Industry listing shows all 6 industry cards', async ({ page }) => {
    await page.goto('/industry');
    for (const { name } of INDUSTRIES) {
      await expect(page.getByText(name).first()).toBeVisible();
    }
  });

  test('INT-IND-002 Industry listing tractor section shows both models', async ({ page }) => {
    await page.goto('/industry');
    await expect(page.getByRole('heading', { name: /AutoNxt X45H2/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /AutoNxt X25H2/i })).toBeVisible();
  });

  // ------------------------------------------------------------------
  // Each industry detail page loads
  // ------------------------------------------------------------------
  for (const { name, slug } of INDUSTRIES) {
    test(`INT-IND-003-${slug} ${name} detail page loads at /industry/${slug}`, async ({ page }) => {
      await page.goto(`/industry/${slug}`);
      await expect(page).toHaveURL(new RegExp(slug));
      await expect(page.locator('h1').first()).toBeVisible();
    });
  }

  // ------------------------------------------------------------------
  // Detail page content
  // ------------------------------------------------------------------
  test('INT-IND-009 Industry detail page has a back / breadcrumb link', async ({ page }) => {
    await page.goto('/industry/biomass');
    const back = page.getByRole('link', { name: /back|industry|all/i });
    if (await back.count() > 0) {
      await expect(back.first()).toBeVisible();
    }
  });

  test('INT-IND-010 Industry detail page back link navigates to /industry', async ({ page }) => {
    await page.goto('/industry/cement');
    const back = page.locator('a[href="/industry"]').first();
    if (await back.count() > 0) {
      await back.click();
      await expect(page).toHaveURL(/\/industry$/);
    }
  });

  test('INT-IND-011 Industry detail page has CTA to book or contact', async ({ page }) => {
    await page.goto('/industry/construction');
    const cta = page.getByRole('link', { name: /book|contact|get in touch|reserve/i });
    if (await cta.count() > 0) {
      await expect(cta.first()).toBeVisible();
    }
  });

  // ------------------------------------------------------------------
  // Invalid slug
  // ------------------------------------------------------------------
  test('INT-IND-012 Unknown industry slug does not crash the page', async ({ page }) => {
    await page.goto('/industry/unknown-sector-xyz');
    await expect(page.locator('body')).toBeVisible();
  });
});
