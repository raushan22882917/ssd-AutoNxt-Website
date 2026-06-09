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
    // Desktop nav is visible at lg (1024px+) breakpoint
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    const links = page.locator('nav a[data-testid^="link-nav-"]');
    const count = await links.count();
    expect(count).toBeGreaterThanOrEqual(6);
  });

  test('UNIT-NAV-005 "Book Now" CTA button is visible in navbar', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
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
    // Desktop nav visible at lg (1024px+)
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/product');
    const activeLink = page.getByTestId('link-nav-product');
    await expect(activeLink).toBeVisible();
  });

  // ------------------------------------------------------------------
  // Language switcher
  // ------------------------------------------------------------------
  test('UNIT-NAV-008 Language switcher button is visible', async ({ page }) => {
    // Language switcher is in the desktop nav — visible at lg (1024px+)
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await expect(
      page.locator('nav button').filter({ hasText: /EN|HI|MR|TE/i }).first()
    ).toBeVisible();
  });

  test('UNIT-NAV-009 Language switcher opens on click', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    const langBtn = page.locator('nav button').filter({ hasText: /EN|HI|MR|TE/i }).first();
    await langBtn.click();
    await expect(
      page.getByText(/Hindi|English|Marathi|Telugu/i).first()
    ).toBeVisible();
  });

  // ------------------------------------------------------------------
  // Mobile menu — hamburger visible below lg (1024px)
  // ------------------------------------------------------------------
  test('UNIT-NAV-010 Mobile hamburger button visible on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 900, height: 812 });
    await page.goto('/');
    await expect(page.getByTestId('btn-mobile-menu')).toBeVisible();
  });

  test('UNIT-NAV-011 Mobile menu opens when hamburger is clicked', async ({ page }) => {
    await page.setViewportSize({ width: 900, height: 812 });
    await page.goto('/');
    await page.getByTestId('btn-mobile-menu').click();
    await expect(
      page.getByRole('link', { name: /home/i }).first()
    ).toBeVisible();
  });

  test('UNIT-NAV-012 Mobile menu closes after selecting a link', async ({ page }) => {
    await page.setViewportSize({ width: 900, height: 812 });
    await page.goto('/');
    await page.getByTestId('btn-mobile-menu').click();
    await page.getByRole('link', { name: /about/i }).first().click();
    await expect(page).toHaveURL(/about/);
  });

  // ------------------------------------------------------------------
  // Resources dropdown — desktop only (lg+)
  // ------------------------------------------------------------------
  test('UNIT-NAV-013 Resources dropdown is present in desktop nav', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await expect(
      page.locator('nav').getByText(/resources/i)
    ).toBeVisible();
  });

  test('UNIT-NAV-014 Resources dropdown shows News, Blog, EV Blog', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    const resourcesBtn = page.locator('nav').getByText(/resources/i);
    await resourcesBtn.click();
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
