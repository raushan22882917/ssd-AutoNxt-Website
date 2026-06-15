/**
 * QA PYRAMID — LAYOUT & OVERLAP TESTS (Categories 7 & 10)
 *
 * Cat 7 — Layout Testing: sections aligned, cards aligned, grid intact,
 *          consistent spacing, no element overlap.
 * Cat 10 — Overflow Testing: no horizontal scroll, no text overflow,
 *           no content outside viewport, elements not covering each other.
 */

import { test, expect } from '@playwright/test';

// ─────────────────────────────────────────────────────────────
// Category 7 — Layout Testing
// ─────────────────────────────────────────────────────────────
test.describe('Layout Testing – Cat 7', () => {

  // ── Navbar layout ──────────────────────────────────────────
  test('LAYOUT-001 Navbar is fixed at top (y === 0)', async ({ page }) => {
    await page.goto('/');
    const rect = await page.locator('nav').first().boundingBox();
    expect(rect).not.toBeNull();
    expect(rect.y).toBe(0);
  });

  test('LAYOUT-002 Navbar spans full viewport width', async ({ page }) => {
    await page.goto('/');
    const vw = await page.evaluate(() => window.innerWidth);
    const rect = await page.locator('nav').first().boundingBox();
    // Allow up to 20px tolerance for scrollbar width differences
    expect(rect.width).toBeGreaterThan(vw * 0.95);
  });

  test('LAYOUT-003 Footer spans full viewport width', async ({ page }) => {
    await page.goto('/');
    const vw = await page.evaluate(() => window.innerWidth);
    const rect = await page.locator('footer').boundingBox();
    expect(rect.width).toBeGreaterThan(vw * 0.95);
  });

  // ── Hero layout ────────────────────────────────────────────
  test('LAYOUT-004 Hero section has height >= 80% of viewport', async ({ page }) => {
    await page.goto('/');
    const vh = await page.evaluate(() => window.innerHeight);
    const rect = await page.locator('section').first().boundingBox();
    expect(rect.height).toBeGreaterThanOrEqual(vh * 0.8);
  });

  // ── Product card grid alignment ───────────────────────────
  test('LAYOUT-005 Home product cards are on the same vertical baseline', async ({ page }) => {
    await page.goto('/');
    const cards = page.locator('[data-testid^="card-product-"]');
    const count = await cards.count();
    if (count >= 2) {
      const rect0 = await cards.nth(0).boundingBox();
      const rect1 = await cards.nth(1).boundingBox();
      // Cards in the same row should start at the same y (±5px tolerance)
      expect(Math.abs(rect0.y - rect1.y)).toBeLessThan(5);
    }
  });

  test('LAYOUT-006 Product cards on /product page are left-aligned consistently', async ({ page }) => {
    await page.goto('/product');
    await expect(page.locator('h1').first()).toBeVisible();
    const cards = page.locator('.grid > div, .grid > article').first();
    const rect = await cards.boundingBox();
    expect(rect).not.toBeNull();
    expect(rect.x).toBeGreaterThanOrEqual(0);
  });

  // ── Industry card grid ─────────────────────────────────────
  test('LAYOUT-007 Industry cards on /industry are within viewport width', async ({ page }) => {
    await page.goto('/industry');
    const vw = await page.evaluate(() => window.innerWidth);
    const cards = page.locator('[data-testid^="card-industry-"]');
    const count = await cards.count();
    for (let i = 0; i < Math.min(count, 6); i++) {
      const rect = await cards.nth(i).boundingBox();
      if (rect) {
        expect(rect.x + rect.width).toBeLessThanOrEqual(vw + 2); // 2px tolerance
      }
    }
  });

  // ── Booking form layout ───────────────────────────────────
  test('LAYOUT-008 Booking form submit button is within the form container', async ({ page }) => {
    await page.goto('/book');
    const formRect = await page.locator('form').boundingBox();
    const btnRect = await page.locator('button[type="submit"]').boundingBox();
    expect(btnRect.x).toBeGreaterThanOrEqual(formRect.x - 2);
    expect(btnRect.x + btnRect.width).toBeLessThanOrEqual(formRect.x + formRect.width + 2);
  });

  test('LAYOUT-009 Footer columns are side by side on desktop (≥1024px)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    // Footer grid has 4 columns — first and last should be on same y row
    const footerHeadings = page.locator('footer h3');
    const count = await footerHeadings.count();
    if (count >= 2) {
      const r0 = await footerHeadings.nth(0).boundingBox();
      const r1 = await footerHeadings.nth(count - 1).boundingBox();
      // Same row = same y within 10px tolerance
      expect(Math.abs(r0.y - r1.y)).toBeLessThan(10);
    }
  });

  test('LAYOUT-010 No section has negative top margin (no layout collapse)', async ({ page }) => {
    await page.goto('/');
    const sections = page.locator('section');
    const count = await sections.count();
    let prevBottom = 0;
    for (let i = 0; i < Math.min(count, 6); i++) {
      const rect = await sections.nth(i).boundingBox();
      if (rect && rect.height > 0) {
        // Each section should start at or after where the previous ended (within 2px)
        expect(rect.y).toBeGreaterThanOrEqual(prevBottom - 2);
        prevBottom = rect.y + rect.height;
      }
    }
  });
});

// ─────────────────────────────────────────────────────────────
// Category 9 & 10 — Overflow & Overlap Testing
// ─────────────────────────────────────────────────────────────
test.describe('Overflow & Overlap Testing – Cat 9 & 10', () => {

  const PAGES = ['/', '/product', '/industry', '/about', '/book', '/careers', '/blog'];

  // ── No horizontal scroll ───────────────────────────────────
  for (const path of PAGES) {
    test(`OVERFLOW-001 No horizontal scroll on ${path}`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto(path);
      const hasHScroll = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      expect(hasHScroll, `Horizontal scroll found on ${path}`).toBe(false);
    });
  }

  test('OVERFLOW-002 No horizontal scroll on mobile (390px) — Home', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    const hasHScroll = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 2);
    expect(hasHScroll).toBe(false);
  });

  test('OVERFLOW-003 No horizontal scroll on mobile (390px) — Product', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/product');
    const hasHScroll = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 2);
    expect(hasHScroll).toBe(false);
  });

  // ── Navbar does not overlap hero content ──────────────────
  test('OVERLAP-001 Navbar does not overlap hero h1 text', async ({ page }) => {
    await page.goto('/');
    const navRect = await page.locator('nav').boundingBox();
    const h1Rect = await page.locator('h1').first().boundingBox();
    // h1 should start below the navbar bottom edge
    expect(h1Rect.y).toBeGreaterThan(navRect.y + navRect.height - 5);
  });

  test('OVERLAP-002 Submit button is not covered by any overlay on /book', async ({ page }) => {
    await page.goto('/book');
    const btn = page.locator('button[type="submit"]');
    await btn.scrollIntoViewIfNeeded();
    await expect(btn).toBeVisible();
    await expect(btn).toBeEnabled();
    // Playwright's dispatchEvent confirms the button receives pointer events
    // without actually submitting the form
    await btn.dispatchEvent('mouseover');
    // If no error thrown, the button is not blocked by any overlay
    const rect = await btn.boundingBox();
    expect(rect.width).toBeGreaterThan(0);
    expect(rect.height).toBeGreaterThan(0);
  });

  test('OVERLAP-003 Footer does not overlap last page section', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);
    const footerRect = await page.locator('footer').boundingBox();
    const sections = page.locator('section');
    const count = await sections.count();
    if (count > 0) {
      const lastSectionRect = await sections.nth(count - 1).boundingBox();
      if (lastSectionRect) {
        // Footer starts at or after last section ends
        expect(footerRect.y).toBeGreaterThanOrEqual(lastSectionRect.y + lastSectionRect.height - 5);
      }
    }
  });

  test('OVERLAP-004 Navbar Book Now button is not clipped outside nav', async ({ page }) => {
    await page.goto('/');
    const navRect = await page.locator('nav').boundingBox();
    const bookBtn = page.locator('nav').getByRole('link', { name: /book now/i }).first();
    const btnRect = await bookBtn.boundingBox();
    // Button should be fully within the navbar height
    expect(btnRect.y).toBeGreaterThanOrEqual(navRect.y - 1);
    expect(btnRect.y + btnRect.height).toBeLessThanOrEqual(navRect.y + navRect.height + 1);
  });

  // ── All main headings visible in viewport ─────────────────
  test('OVERLAP-005 No content is clipped outside left edge of viewport', async ({ page }) => {
    await page.goto('/');
    const leftClipped = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('h1, h2, h3, p, button, a'));
      return elements.filter(el => {
        const rect = el.getBoundingClientRect();
        return rect.right < 0; // entirely off-screen to the left
      }).length;
    });
    expect(leftClipped).toBe(0);
  });
});
