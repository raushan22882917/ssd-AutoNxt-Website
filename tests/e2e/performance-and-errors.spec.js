/**
 * QA PYRAMID — LAYER 3: END-TO-END (E2E) TESTS
 * Target: Page performance baselines and JS error monitoring
 *
 * These tests act as "smoke + health checks" across all routes —
 * confirming no page crashes, no 404 assets, and acceptable
 * load-time indicators.
 */

import { test, expect } from '@playwright/test';

const ALL_ROUTES = [
  '/',
  '/product',
  '/product/x45h2',
  '/product/x25h2',
  '/product/attachment/bucket',
  '/product/attachment/catcher',
  '/product/attachment/loader',
  '/industry',
  '/industry/biomass',
  '/industry/cement',
  '/industry/construction',
  '/industry/defence',
  '/industry/airport',
  '/industry/metal',
  '/gallery',
  '/contribution',
  '/about',
  '/book',
  '/news',
  '/blog',
  '/ev-blog',
  '/careers',
  '/privacy',
  '/terms',
];

test.describe('E2E – Zero JS Errors Across All Pages', () => {

  for (const route of ALL_ROUTES) {
    test(`E2E-ERR-${ALL_ROUTES.indexOf(route).toString().padStart(3, '0')} No JS crash on ${route}`, async ({ page }) => {
      const errors = [];
      page.on('pageerror', err => errors.push(err));
      await page.goto(route);
      expect(errors, `JS errors on ${route}: ${errors.map(e => e.message).join(', ')}`).toHaveLength(0);
    });
  }
});

test.describe('E2E – No Broken Internal Links on Key Pages', () => {

  test('E2E-LINK-001 No 404 network responses on Home page', async ({ page }) => {
    const failed = [];
    page.on('response', resp => {
      if (resp.status() === 404 && !resp.url().includes('favicon')) {
        failed.push(resp.url());
      }
    });
    await page.goto('/');
    // Allow slight tolerance for non-critical assets (e.g., analytics)
    const criticalFailed = failed.filter(url =>
      !url.includes('analytics') && !url.includes('gtag') && !url.includes('google')
    );
    expect(criticalFailed.length).toBe(0);
  });

  test('E2E-LINK-002 No 404 network responses on Product page', async ({ page }) => {
    const failed = [];
    page.on('response', resp => {
      if (resp.status() === 404) failed.push(resp.url());
    });
    await page.goto('/product');
    const criticalFailed = failed.filter(url =>
      !url.includes('analytics') && !url.includes('gtag')
    );
    expect(criticalFailed.length).toBe(0);
  });

  test('E2E-LINK-003 No 404 network responses on Booking page', async ({ page }) => {
    const failed = [];
    page.on('response', resp => {
      if (resp.status() === 404) failed.push(resp.url());
    });
    await page.goto('/book');
    const criticalFailed = failed.filter(url =>
      !url.includes('analytics') && !url.includes('gtag')
    );
    expect(criticalFailed.length).toBe(0);
  });
});

test.describe('E2E – Page Load Performance Baselines', () => {

  test('E2E-PERF-001 Home page DOM content loaded within 5 seconds', async ({ page }) => {
    const start = Date.now();
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    const elapsed = Date.now() - start;
    expect(elapsed).toBeLessThan(5000);
  });

  test('E2E-PERF-002 Product page DOM content loaded within 5 seconds', async ({ page }) => {
    const start = Date.now();
    await page.goto('/product');
    await page.waitForLoadState('domcontentloaded');
    const elapsed = Date.now() - start;
    expect(elapsed).toBeLessThan(5000);
  });

  test('E2E-PERF-003 Booking page DOM content loaded within 5 seconds', async ({ page }) => {
    const start = Date.now();
    await page.goto('/book');
    await page.waitForLoadState('domcontentloaded');
    const elapsed = Date.now() - start;
    expect(elapsed).toBeLessThan(5000);
  });

  test('E2E-PERF-004 Blog page DOM content loaded within 5 seconds', async ({ page }) => {
    const start = Date.now();
    await page.goto('/blog');
    await page.waitForLoadState('domcontentloaded');
    const elapsed = Date.now() - start;
    expect(elapsed).toBeLessThan(5000);
  });

  test('E2E-PERF-005 Home page: 3D model does NOT block initial hero render', async ({ page }) => {
    await page.goto('/');
    // h1 should be visible before any 3D canvas loads
    await expect(page.locator('h1').first()).toBeVisible({ timeout: 3000 });
  });
});

test.describe('E2E – Console Error Monitoring', () => {

  test('E2E-CONSOLE-001 No console errors on Home page', async ({ page }) => {
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    await page.goto('/');
    // Filter known external noise (e.g., GA, etc.)
    const filtered = consoleErrors.filter(
      err => !err.includes('google') && !err.includes('analytics')
    );
    expect(filtered.length).toBe(0);
  });

  test('E2E-CONSOLE-002 No console errors on Product listing page', async ({ page }) => {
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    await page.goto('/product');
    const filtered = consoleErrors.filter(
      err => !err.includes('google') && !err.includes('analytics')
    );
    expect(filtered.length).toBe(0);
  });

  test('E2E-CONSOLE-003 No console errors on Booking page', async ({ page }) => {
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    await page.goto('/book');
    const filtered = consoleErrors.filter(
      err => !err.includes('google') && !err.includes('analytics')
    );
    expect(filtered.length).toBe(0);
  });
});
