import { test, expect } from '@playwright/test';

test.describe('Navbar Navigation', () => {

  test('Home navigation works', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('link-nav-home').click();

    await expect(page).toHaveURL(/\/$/);
  });

  test('Product navigation works', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('link-nav-product').click();

    await expect(page).toHaveURL(/product/);
  });

  test('Industry navigation works', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('link-nav-industry').click();

    await expect(page).toHaveURL(/industry/);
  });

  test('Gallery navigation works', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('link-nav-gallery').click();

    await expect(page).toHaveURL(/gallery/);
  });

  test('Contribution navigation works', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('link-nav-contribution').click();

    await expect(page).toHaveURL(/contribution/);
  });

  test('About navigation works', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('link-nav-about').click();

    await expect(page).toHaveURL(/about/);
  });

  test('Logo redirects to homepage', async ({ page }) => {
    await page.goto('/about');

    await page.getByTestId('link-home-logo').click();

    await expect(page).toHaveURL(/\/$/);
  });

});