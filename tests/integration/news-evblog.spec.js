/**
 * QA PYRAMID — LAYER 2: INTEGRATION TESTS
 * Target: News page and EV Blog page
 */

import { test, expect } from '@playwright/test';

test.describe('News Page – Integration Tests', () => {

  test('INT-NEWS-001 News page loads at /news', async ({ page }) => {
    await page.goto('/news');
    await expect(page).toHaveURL(/news/);
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('INT-NEWS-002 At least one news article card is visible', async ({ page }) => {
    await page.goto('/news');
    const imgs = page.getByRole('img');
    expect(await imgs.count()).toBeGreaterThan(0);
  });

  test('INT-NEWS-003 News page has no JS errors', async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err));
    await page.goto('/news');
    expect(errors.length).toBe(0);
  });

  test('INT-NEWS-004 News page footer is visible', async ({ page }) => {
    await page.goto('/news');
    await expect(page.locator('footer')).toBeVisible();
  });
});

test.describe('EV Blog Page – Integration Tests', () => {

  test('INT-EVBLOG-001 EV Blog page loads at /ev-blog', async ({ page }) => {
    await page.goto('/ev-blog');
    await expect(page).toHaveURL(/ev-blog/);
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('INT-EVBLOG-002 EV Blog animated stats section is visible', async ({ page }) => {
    await page.goto('/ev-blog');
    // Stats section renders numbers with % or + suffixes
    await expect(page.getByText(/%|\+/).first()).toBeVisible();
  });

  test('INT-EVBLOG-003 EV Blog article cards are visible', async ({ page }) => {
    await page.goto('/ev-blog');
    const imgs = page.getByRole('img');
    expect(await imgs.count()).toBeGreaterThan(0);
  });

  test('INT-EVBLOG-004 EV Blog has no JS errors', async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err));
    await page.goto('/ev-blog');
    expect(errors.length).toBe(0);
  });
});
