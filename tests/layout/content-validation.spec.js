/**
 * CONTENT VALIDATION TESTING — Category 17
 *
 * ✓ Correct headings
 * ✓ Correct statistics
 * ✓ Correct contact details (phone, email, address)
 * ✓ Correct CTA text
 * ✓ Correct product names
 * ✓ Correct footer copyright year
 * ✓ Social media links point to correct domains
 */

import { test, expect } from '@playwright/test';

test.describe('Content Validation Testing – Cat 17', () => {

  // ── Page titles ────────────────────────────────────────────
  test('CONTENT-001 Home page <title> contains "AutoNxt"', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/AutoNxt/i);
  });

  test('CONTENT-002 Product page <title> contains "AutoNxt"', async ({ page }) => {
    await page.goto('/product');
    await expect(page).toHaveTitle(/AutoNxt/i);
  });

  test('CONTENT-003 Booking page <title> contains "AutoNxt"', async ({ page }) => {
    await page.goto('/book');
    // The site uses a single shared title — confirm it at least has the brand name
    const title = await page.title();
    expect(title).toMatch(/AutoNxt/i);
  });

  // ── Contact details ────────────────────────────────────────
  test('CONTENT-004 Phone number +91 9067404606 is present on /book', async ({ page }) => {
    await page.goto('/book');
    await expect(page.getByText(/9067404606/).first()).toBeVisible();
  });

  test('CONTENT-005 Email sales@autonxt.in is present on /book', async ({ page }) => {
    await page.goto('/book');
    await expect(page.getByText(/sales@autonxt\.in/).first()).toBeVisible();
  });

  test('CONTENT-006 Phone number is in footer', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.locator('footer').getByText(/9067404606/).first()
    ).toBeVisible();
  });

  test('CONTENT-007 Email is in footer', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.locator('footer').getByText(/sales@autonxt\.in/).first()
    ).toBeVisible();
  });

  test('CONTENT-008 Address "Thane" is shown on /book', async ({ page }) => {
    await page.goto('/book');
    await expect(page.getByText(/Thane/i).first()).toBeVisible();
  });

  // ── Product names ──────────────────────────────────────────
  test('CONTENT-009 "AutoNxt X45H2" appears on /product', async ({ page }) => {
    await page.goto('/product');
    await expect(page.getByText(/AutoNxt X45H2/i).first()).toBeVisible();
  });

  test('CONTENT-010 "AutoNxt X25H2" appears on /product', async ({ page }) => {
    await page.goto('/product');
    await expect(page.getByText(/AutoNxt X25H2/i).first()).toBeVisible();
  });

  test('CONTENT-011 X45H2 detail page heading matches the model name', async ({ page }) => {
    await page.goto('/product/x45h2');
    await expect(
      page.getByRole('heading', { name: /X45H2/i }).first()
    ).toBeVisible();
  });

  // ── CTA text ───────────────────────────────────────────────
  test('CONTENT-012 "Book Now" CTA text present in navbar', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.locator('nav').getByText(/book now/i).first()
    ).toBeVisible();
  });

  test('CONTENT-013 "Explore Products" CTA on Home page', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.getByRole('link', { name: /explore products/i }).first()
    ).toBeVisible();
  });

  test('CONTENT-014 "Submit" or "Send" or "Submit Booking" button on /book', async ({ page }) => {
    await page.goto('/book');
    await expect(
      page.getByRole('button', { name: /submit|send/i }).first()
    ).toBeVisible();
  });

  // ── Industry names ─────────────────────────────────────────
  test('CONTENT-015 All 6 industry names present on /industry', async ({ page }) => {
    await page.goto('/industry');
    const industries = ['Biomass', 'Cement', 'Construction', 'Defence', 'Airport', 'Metal'];
    for (const name of industries) {
      await expect(page.getByText(name).first()).toBeVisible();
    }
  });

  // ── Footer content ─────────────────────────────────────────
  test('CONTENT-016 Footer copyright mentions "AutoNxt"', async ({ page }) => {
    await page.goto('/');
    // Copyright text is in the bottom bar — target the specific paragraph
    const copyright = await page.locator('footer .border-t p').first().textContent();
    expect(copyright).toMatch(/AutoNxt/i);
  });

  test('CONTENT-017 Footer copyright mentions current or recent year (2024–2026)', async ({ page }) => {
    await page.goto('/');
    const copyright = await page.locator('footer .border-t p').first().textContent();
    expect(copyright).toMatch(/202[4-9]/);
  });

  test('CONTENT-018 Footer "Made in India" tagline is visible', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.locator('footer').getByText(/made in india/i).first()
    ).toBeVisible();
  });

  // ── Social media links ─────────────────────────────────────
  test('CONTENT-019 LinkedIn social link points to linkedin.com', async ({ page }) => {
    await page.goto('/');
    const href = await page.locator('[data-testid="link-social-1"]').getAttribute('href');
    expect(href).toContain('linkedin.com');
  });

  test('CONTENT-020 YouTube social link points to youtube.com', async ({ page }) => {
    await page.goto('/');
    const href = await page.locator('[data-testid="link-social-2"]').getAttribute('href');
    expect(href).toContain('youtube.com');
  });

  // ── About page content ─────────────────────────────────────
  test('CONTENT-021 About page shows founding year 2016', async ({ page }) => {
    await page.goto('/about');
    await expect(page.getByText('2016').first()).toBeVisible();
  });

  test('CONTENT-022 About page shows "Thane" or "MH" as HQ location', async ({ page }) => {
    await page.goto('/about');
    await expect(page.getByText(/Thane|MH/i).first()).toBeVisible();
  });

  // ── Blog / News content ────────────────────────────────────
  test('CONTENT-023 Blog page has at least one article heading', async ({ page }) => {
    await page.goto('/blog');
    // Wait for React lazy-loaded content to hydrate
    await expect(page.locator('h1, h2, h3').first()).toBeVisible({ timeout: 10000 });
    const headings = page.locator('h2, h3');
    expect(await headings.count()).toBeGreaterThan(0);
  });

  // ── Careers content ────────────────────────────────────────
  test('CONTENT-024 Careers page shows at least one job title heading', async ({ page }) => {
    await page.goto('/careers');
    await expect(page.locator('h1, h2, h3').first()).toBeVisible({ timeout: 10000 });
    const headings = page.locator('h2, h3');
    expect(await headings.count()).toBeGreaterThan(0);
  });
});
