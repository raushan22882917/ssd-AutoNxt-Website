/**
 * QA PYRAMID — LAYER 3: END-TO-END (E2E) TESTS
 * Target: Full-site smoke test — every page loads without crashing
 *
 * Run this as the first gate in any CI pipeline.
 * It is intentionally fast: just confirms each route renders.
 */

import { test, expect } from '@playwright/test';

const PAGES = [
  { name: 'Home',                     path: '/' },
  { name: 'Product Listing',          path: '/product' },
  { name: 'Product X45H2 Detail',     path: '/product/x45h2' },
  { name: 'Product X25H2 Detail',     path: '/product/x25h2' },
  { name: 'Attachment Bucket',        path: '/product/attachment/bucket' },
  { name: 'Attachment Catcher',       path: '/product/attachment/catcher' },
  { name: 'Attachment Loader',        path: '/product/attachment/loader' },
  { name: 'Industry Listing',         path: '/industry' },
  { name: 'Industry Biomass',         path: '/industry/biomass' },
  { name: 'Industry Cement',          path: '/industry/cement' },
  { name: 'Industry Construction',    path: '/industry/construction' },
  { name: 'Industry Defence',         path: '/industry/defence' },
  { name: 'Industry Airport',         path: '/industry/airport' },
  { name: 'Industry Metal',           path: '/industry/metal' },
  { name: 'Gallery',                  path: '/gallery' },
  { name: 'Contribution',             path: '/contribution' },
  { name: 'About',                    path: '/about' },
  { name: 'Book / Contact',           path: '/book' },
  { name: 'News',                     path: '/news' },
  { name: 'Blog',                     path: '/blog' },
  { name: 'EV Blog',                  path: '/ev-blog' },
  { name: 'Careers',                  path: '/careers' },
  { name: 'Privacy Policy',           path: '/privacy' },
  { name: 'Terms & Conditions',       path: '/terms' },
];

test.describe('E2E – Full-Site Smoke Tests', () => {

  for (const pg of PAGES) {
    test(`SMOKE-${PAGES.indexOf(pg).toString().padStart(3, '0')} ${pg.name} (${pg.path}) renders without crashing`, async ({ page }) => {
      // Monitor JS errors
      const errors = [];
      page.on('pageerror', err => errors.push(err));

      await page.goto(pg.path);

      // Body must be visible
      await expect(page.locator('body')).toBeVisible();

      // Wait for React to hydrate — at least one heading must appear
      await expect(page.locator('h1, h2').first()).toBeVisible({ timeout: 10000 });

      // Navbar must be present on every page
      await expect(page.locator('nav')).toBeVisible();

      // Zero unhandled JS exceptions
      expect(errors, `Unhandled errors on ${pg.path}: ${errors.map(e => e.message).join('\n')}`).toHaveLength(0);
    });
  }
});
