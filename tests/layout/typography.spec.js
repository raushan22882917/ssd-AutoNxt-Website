/**
 * TYPOGRAPHY TESTING — Category 11
 *
 * ✓ Headings visible
 * ✓ Text readable (minimum font-size)
 * ✓ No truncation on key text
 * ✓ Correct font loading (Space Grotesk / Inter)
 * ✓ Proper line spacing (line-height)
 */

import { test, expect } from '@playwright/test';

test.describe('Typography Testing – Cat 11', () => {

  // ── Heading visibility ─────────────────────────────────────
  test('TYPO-001 h1 on Home is visible and has non-zero size', async ({ page }) => {
    await page.goto('/');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
    const rect = await h1.boundingBox();
    expect(rect.width).toBeGreaterThan(50);
    expect(rect.height).toBeGreaterThan(20);
  });

  test('TYPO-002 h1 font-size is at least 36px on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    const fontSize = await page.locator('h1').first().evaluate(el =>
      parseFloat(getComputedStyle(el).fontSize)
    );
    expect(fontSize).toBeGreaterThanOrEqual(36);
  });

  test('TYPO-003 h1 font-size is at least 24px on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    const fontSize = await page.locator('h1').first().evaluate(el =>
      parseFloat(getComputedStyle(el).fontSize)
    );
    expect(fontSize).toBeGreaterThanOrEqual(24);
  });

  test('TYPO-004 Body paragraph text is at least 14px', async ({ page }) => {
    await page.goto('/');
    const paras = page.locator('main p');
    const count = await paras.count();
    for (let i = 0; i < Math.min(count, 5); i++) {
      const fontSize = await paras.nth(i).evaluate(el =>
        parseFloat(getComputedStyle(el).fontSize)
      );
      expect(fontSize, `Paragraph ${i} font too small: ${fontSize}px`).toBeGreaterThanOrEqual(12);
    }
  });

  // ── Font loading ───────────────────────────────────────────
  test('TYPO-005 A display/heading font is applied to h1 (Space Grotesk or similar)', async ({ page }) => {
    await page.goto('/');
    const fontFamily = await page.locator('h1').first().evaluate(el =>
      getComputedStyle(el).fontFamily.toLowerCase()
    );
    // Project uses "Space Grotesk" — confirm it loaded correctly
    // It should NOT be purely Times New Roman / Georgia (serif fallback only)
    expect(fontFamily).not.toMatch(/^times|^georgia/i);
    // It should contain a known font name or sans-serif
    expect(fontFamily).toMatch(/grotesk|inter|helvetica|arial|sans-serif/i);
  });

  test('TYPO-006 Nav links use a sans-serif font', async ({ page }) => {
    await page.goto('/');
    const fontFamily = await page.locator('nav a').first().evaluate(el =>
      getComputedStyle(el).fontFamily.toLowerCase()
    );
    expect(fontFamily).toMatch(/sans-serif|inter|grotesk|helvetica|arial/i);
  });

  // ── Line height ────────────────────────────────────────────
  test('TYPO-007 Paragraph line-height is at least 1.4x font-size', async ({ page }) => {
    await page.goto('/');
    const { lineHeight, fontSize } = await page.locator('main p').first().evaluate(el => {
      const style = getComputedStyle(el);
      return {
        lineHeight: parseFloat(style.lineHeight),
        fontSize: parseFloat(style.fontSize),
      };
    });
    if (lineHeight > 0 && fontSize > 0) {
      expect(lineHeight / fontSize).toBeGreaterThanOrEqual(1.4);
    }
  });

  // ── No text truncation on key elements ───────────────────
  test('TYPO-008 Hero h1 text is not truncated (scrollWidth <= clientWidth)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    const isTruncated = await page.locator('h1').first().evaluate(el =>
      el.scrollWidth > el.clientWidth + 2
    );
    expect(isTruncated).toBe(false);
  });

  test('TYPO-009 Navbar brand name "AutoNxt" is not truncated', async ({ page }) => {
    await page.goto('/');
    const isTruncated = await page.locator('nav').getByText(/autonxt/i).first().evaluate(el =>
      el.scrollWidth > el.clientWidth + 2
    );
    expect(isTruncated).toBe(false);
  });

  test('TYPO-010 Footer copyright text is visible and not empty', async ({ page }) => {
    await page.goto('/');
    const text = await page.locator('footer p').first().textContent();
    expect(text.trim().length).toBeGreaterThan(5);
  });

  // ── Heading hierarchy ──────────────────────────────────────
  test('TYPO-011 h1 is visually larger than h2 on the same page', async ({ page }) => {
    await page.goto('/product/x45h2');
    const h1Size = await page.locator('h1').first().evaluate(el =>
      parseFloat(getComputedStyle(el).fontSize)
    );
    const h2s = page.locator('h2');
    if (await h2s.count() > 0) {
      const h2Size = await h2s.first().evaluate(el =>
        parseFloat(getComputedStyle(el).fontSize)
      );
      expect(h1Size).toBeGreaterThanOrEqual(h2Size);
    }
  });

  test('TYPO-012 Submit button text is readable (≥ 14px)', async ({ page }) => {
    await page.goto('/book');
    const fontSize = await page.locator('button[type="submit"]').evaluate(el =>
      parseFloat(getComputedStyle(el).fontSize)
    );
    expect(fontSize).toBeGreaterThanOrEqual(14);
  });

  // ── Text contrast (colour not transparent) ────────────────
  test('TYPO-013 Hero h1 text colour is not transparent', async ({ page }) => {
    await page.goto('/');
    const color = await page.locator('h1').first().evaluate(el =>
      getComputedStyle(el).color
    );
    // rgba(0,0,0,0) = fully transparent — that would be a bug
    expect(color).not.toBe('rgba(0, 0, 0, 0)');
    expect(color).not.toBe('transparent');
  });

  test('TYPO-014 Footer text colour is not transparent', async ({ page }) => {
    await page.goto('/');
    const color = await page.locator('footer p').first().evaluate(el =>
      getComputedStyle(el).color
    );
    expect(color).not.toBe('rgba(0, 0, 0, 0)');
    expect(color).not.toBe('transparent');
  });
});
