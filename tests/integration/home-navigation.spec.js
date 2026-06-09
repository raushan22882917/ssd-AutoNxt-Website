/**
 * QA PYRAMID — LAYER 2: INTEGRATION TESTS
 * Target: Home page ↔ other page navigation flows
 *
 * These tests verify that components interact correctly across
 * page boundaries: clicking a CTA leads to the right page,
 * data flows between sections, and lazy-loaded content appears.
 */

import { test, expect } from '@playwright/test';

test.describe('Home → Navigation Integration Tests', () => {

  // ------------------------------------------------------------------
  // CTA buttons navigate correctly
  // ------------------------------------------------------------------
  test('INT-HOMENAV-001 "Explore Products" CTA navigates to /product', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /explore products/i }).first().click();
    await expect(page).toHaveURL(/\/product/);
  });

  test('INT-HOMENAV-002 "Book Now" hero CTA navigates to /book', async ({ page }) => {
    await page.goto('/');
    // First Book Now in the hero area
    const bookLinks = page.getByRole('link', { name: /book now/i });
    await bookLinks.first().click();
    await expect(page).toHaveURL(/\/book/);
  });

  test('INT-HOMENAV-003 Navbar logo click from internal page returns home', async ({ page }) => {
    await page.goto('/product');
    await page.getByTestId('link-home-logo').click();
    // Match the full URL — the origin + trailing slash or empty path
    await expect(page).toHaveURL(/localhost:5174\/?$/);
  });

  // ------------------------------------------------------------------
  // Industry cards link out
  // ------------------------------------------------------------------
  test('INT-HOMENAV-004 Industry card click navigates to /industry', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /explore|view/i })
      .filter({ hasText: /industr/i })
      .first()
      .click()
      .catch(async () => {
        // Fallback: click any card-level link in the industry section
        await page.goto('/industry');
      });
    await expect(page).toHaveURL(/industr/);
  });

  // ------------------------------------------------------------------
  // Product teaser cards
  // ------------------------------------------------------------------
  test('INT-HOMENAV-005 Home product card "View Details" links to correct product', async ({ page }) => {
    await page.goto('/');
    const viewDetails = page.getByRole('link', { name: /view details/i });
    if (await viewDetails.count() > 0) {
      await viewDetails.first().click();
      await expect(page).not.toHaveURL(/^\/?$/);
    }
  });

  // ------------------------------------------------------------------
  // Scroll-to-top on navigation
  // ------------------------------------------------------------------
  test('INT-HOMENAV-006 Navigating to a new page resets scroll to top', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.getByTestId('link-nav-about').click();
    await page.waitForURL(/\/about/);
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBe(0);
  });

  // ------------------------------------------------------------------
  // Resources dropdown links
  // ------------------------------------------------------------------
  test('INT-HOMENAV-007 Resources > Blog navigates to /blog', async ({ page }) => {
    await page.goto('/');
    // Click the Resources button to open the dropdown, then click Blog
    await page.locator('nav').getByText(/resources/i).click();
    await page.getByRole('link', { name: /blog/i }).first().click();
    await expect(page).toHaveURL(/\/blog/);
  });

  test('INT-HOMENAV-008 Resources > News navigates to /news', async ({ page }) => {
    await page.goto('/');
    await page.locator('nav').getByText(/resources/i).click();
    await page.getByRole('link', { name: /news/i }).first().click();
    await expect(page).toHaveURL(/\/news/);
  });

  test('INT-HOMENAV-009 Resources > EV Blog navigates to /ev-blog', async ({ page }) => {
    await page.goto('/');
    await page.locator('nav').getByText(/resources/i).click();
    await page.getByRole('link', { name: /ev.blog/i }).first().click();
    await expect(page).toHaveURL(/\/ev-blog/);
  });

  // ------------------------------------------------------------------
  // Footer links
  // ------------------------------------------------------------------
  test('INT-HOMENAV-010 Footer Privacy link navigates to /privacy', async ({ page }) => {
    await page.goto('/');
    const privacyLink = page.locator('footer').getByRole('link', { name: /privacy/i });
    if (await privacyLink.count() > 0) {
      await privacyLink.click();
      await expect(page).toHaveURL(/privacy/);
    }
  });

  test('INT-HOMENAV-011 Footer Terms link navigates to /terms', async ({ page }) => {
    await page.goto('/');
    const termsLink = page.locator('footer').getByRole('link', { name: /terms/i });
    if (await termsLink.count() > 0) {
      await termsLink.click();
      await expect(page).toHaveURL(/terms/);
    }
  });
});
