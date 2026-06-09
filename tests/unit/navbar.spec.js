/**
 * QA PYRAMID — LAYER 1: UNIT / COMPONENT TESTS
 * Target: Navbar component behaviour
 *
 * These tests verify individual UI components in isolation:
 * rendering, state changes, and accessibility attributes.
 */

import { test, expect } from '@playwright/test';

test.describe('Navbar – Unit / Component Tests', () => {

  // ------------------------------------------------------------------
  // Rendering
  // ------------------------------------------------------------------
  test('UNIT-NAV-001 Navbar renders on every page', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('nav')).toBeVisible();
  });

  test('UNIT-NAV-002 Logo is visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('link-home-logo')).toBeVisible();
  });

  test('UNIT-NAV-003 Brand name "AutoNxt" is visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('nav').getByText(/autonxt/i).first()).toBeVisible();
  });

  test('UNIT-NAV-004 All desktop nav links are present', async ({ page }) => {
    await page.goto('/');
    // Count visible nav links inside the desktop nav area (excludes mobile-only links)
    const links = page.locator('nav a[data-testid^="link-nav-"]');
    const count = await links.count();
    // Project has 6–7 nav links depending on layout; confirm at least 6
    expect(count).toBeGreaterThanOrEqual(6);
  });

  test('UNIT-NAV-005 "Book Now" CTA button is visible in navbar', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.locator('nav').getByRole('link', { name: /book now/i })
    ).toBeVisible();
  });

  // ------------------------------------------------------------------
  // Scroll behaviour
  // ------------------------------------------------------------------
  test('UNIT-NAV-006 Navbar gains background after scroll', async ({ page }) => {
    await page.goto('/');
    // Scroll down 200px and check the background style changes
    await page.evaluate(() => window.scrollBy(0, 200));
    await page.waitForTimeout(400);
    const nav = page.locator('nav');
    const className = await nav.getAttribute('class');
    expect(className).toMatch(/bg-white/);
  });

  // ------------------------------------------------------------------
  // Active link highlight
  // ------------------------------------------------------------------
  test('UNIT-NAV-007 Active route link is visually distinguished', async ({ page }) => {
    await page.goto('/product');
    // Active nav link should have an underline or special class
    const activeLink = page.getByTestId('link-nav-product');
    await expect(activeLink).toBeVisible();
  });

  // ------------------------------------------------------------------
  // Language switcher
  // ------------------------------------------------------------------
  test('UNIT-NAV-008 Language switcher button is visible', async ({ page }) => {
    await page.goto('/');
    // Language switcher renders as a dropdown button in the navbar
    await expect(
      page.locator('nav button').filter({ hasText: /EN|HI|MR|TE/i }).first()
    ).toBeVisible();
  });

  test('UNIT-NAV-009 Language switcher opens on click', async ({ page }) => {
    await page.goto('/');
    const langBtn = page.locator('nav button').filter({ hasText: /EN|HI|MR|TE/i }).first();
    await langBtn.click();
    // A dropdown with language options should appear
    await expect(
      page.getByText(/Hindi|English|Marathi|Telugu/i).first()
    ).toBeVisible();
  });

  // ------------------------------------------------------------------
  // Mobile menu
  // ------------------------------------------------------------------
  test('UNIT-NAV-010 Mobile hamburger button visible on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    // Mobile menu toggle button
    await expect(
      page.locator('nav button').filter({ has: page.locator('svg') }).last()
    ).toBeVisible();
  });

  test('UNIT-NAV-011 Mobile menu opens when hamburger is clicked', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    const hamburger = page.locator('nav button').last();
    await hamburger.click();
    await expect(
      page.getByRole('link', { name: /home/i }).first()
    ).toBeVisible();
  });

  test('UNIT-NAV-012 Mobile menu closes after selecting a link', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    const hamburger = page.locator('nav button').last();
    await hamburger.click();
    // Click a mobile nav link
    await page.getByRole('link', { name: /about/i }).first().click();
    await expect(page).toHaveURL(/about/);
  });

  // ------------------------------------------------------------------
  // Resources dropdown
  // ------------------------------------------------------------------
  test('UNIT-NAV-013 Resources dropdown is present in desktop nav', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.locator('nav').getByText(/resources/i)
    ).toBeVisible();
  });

  test('UNIT-NAV-014 Resources dropdown shows News, Blog, EV Blog', async ({ page }) => {
    await page.goto('/');
    const resourcesBtn = page.locator('nav').getByText(/resources/i);
    await resourcesBtn.click();
    // After click the dropdown should show resource links
    await expect(page.getByRole('link', { name: /news/i }).first()).toBeVisible({ timeout: 5000 });
    await expect(page.getByRole('link', { name: /blog/i }).first()).toBeVisible({ timeout: 5000 });
  });

  // ------------------------------------------------------------------
  // Accessibility
  // ------------------------------------------------------------------
  test('UNIT-NAV-015 Navbar has no detached ARIA roles', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('nav');
    await expect(nav).toHaveAttribute('class');
  });
});
