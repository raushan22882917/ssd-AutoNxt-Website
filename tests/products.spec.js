import { test, expect } from '@playwright/test';

test.describe('Products Module', () => {

  test('Product page loads', async ({ page }) => {
    await page.goto('/product');

    await expect(page).toHaveURL(/product/);

    await expect(
      page.getByRole('heading', {
        name: /Explore/i
      }).first()
    ).toBeVisible();
  });

  test('Tractor cards are visible', async ({ page }) => {
    await page.goto('/product');

    await expect(
      page.getByRole('heading', {
        name: 'AutoNxt X45H2'
      })
    ).toBeVisible();

    await expect(
      page.getByRole('heading', {
        name: 'AutoNxt X25H2'
      })
    ).toBeVisible();

    await expect(
      page.getByRole('link', {
        name: /View Details/i
      }).first()
    ).toBeVisible();
  });

  test('Open X45H2 details page', async ({ page }) => {
    await page.goto('/product');

    await page
      .getByRole('link', { name: /View Details/i })
      .first()
      .click();

    await expect(page).toHaveURL(/product\/x45h2/);

    await expect(
      page.getByRole('heading', {
        name: 'AutoNxt X45H2',
        exact: true
      })
    ).toBeVisible();
  });

  test('Back to products works', async ({ page }) => {
    await page.goto('/product/x45h2');

    await page.locator('a[href="/product"]').first().click();

    await expect(page).toHaveURL(/product$/);
  });
  test('Booking page link exists', async ({ page }) => {
    await page.goto('/product');

    await expect(
      page.locator('a[href="/book"]').first()
    ).toBeVisible();
  });

  test('Booking page opens', async ({ page }) => {
    await page.goto('/product');

    await page.locator('a[href="/book"]').first().click();

    await expect(page).toHaveURL(/book/);
  });

  test('Technical section visible on tractor detail page', async ({ page }) => {
    await page.goto('/product/x45h2');

    await expect(
      page.getByText(/Technical/i)
    ).toBeVisible();
  });

  test('Features section visible on tractor detail page', async ({ page }) => {
    await page.goto('/product/x45h2');

    await expect(
      page.getByText(/Features/i).first()
    ).toBeVisible();
  });

  test('Applications section visible', async ({ page }) => {
    await page.goto('/product/x45h2');

    await expect(
      page.getByText(/Applications/i)
    ).toBeVisible();
  });

  test('Attachment details page loads', async ({ page }) => {
    await page.goto('/product/attachment/bucket');

    await expect(page).toHaveURL(/bucket/);

    await expect(
      page.getByRole('button').first()
    ).toBeVisible();
  });

  test('Attachment specifications section visible', async ({ page }) => {
    await page.goto('/product/attachment/bucket');

    await expect(
      page.getByText(/Technical Details/i)
    ).toBeVisible();
  });

  test('Attachment features section visible', async ({ page }) => {
    await page.goto('/product/attachment/bucket');

    await expect(
      page.getByText(/Why Choose/i)
    ).toBeVisible();
  });

});
