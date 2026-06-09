import { test, expect } from '@playwright/test';

test.describe('Blog Page', () => {

  test('Blog page loads successfully', async ({ page }) => {
    await page.goto('http://localhost:5174/blog');

    await expect(page).toHaveURL(/blog/);

    await expect(
      page.getByRole('heading').first()
    ).toBeVisible();
  });

  test('Hero section is visible', async ({ page }) => {
    await page.goto('http://localhost:5174/blog');

    await expect(
      page.getByText(/blog/i).first()
    ).toBeVisible();
  });

  test('Search box is visible', async ({ page }) => {
    await page.goto('http://localhost:5174/blog');

    await expect(
      page.locator('input[type="search"]')
    ).toBeVisible();
  });

  test('Search input accepts text', async ({ page }) => {
    await page.goto('http://localhost:5174/blog');

    const search = page.locator('input[type="search"]');

    await search.fill('tractor');

    await expect(search).toHaveValue('tractor');
  });

  test('Category dropdown is visible', async ({ page }) => {
    await page.goto('http://localhost:5174/blog');

    await expect(
      page.locator('button').filter({ hasText: /\(/ }).first()
    ).toBeVisible();
  });



  test('Article cards are displayed', async ({ page }) => {
    await page.goto('http://localhost:5174/blog');

    await expect(
      page.locator('img').first()
    ).toBeVisible();
  });

  test('Read Article buttons exist', async ({ page }) => {
    await page.goto('http://localhost:5174/blog');

    await expect(
      page.getByText(/Read Article/i).first()
    ).toBeVisible();
  });

  test('Blog images load', async ({ page }) => {
    await page.goto('http://localhost:5174/blog');

    const images = page.locator('img');

    expect(await images.count()).toBeGreaterThan(0);
  });

  test('Author information is visible', async ({ page }) => {
    await page.goto('http://localhost:5174/blog');

    await expect(
      page.locator('[class*="rounded-full"]').first()
    ).toBeVisible();
  });

  test('Article slider section is visible', async ({ page }) => {
    await page.goto('http://localhost:5174/blog');

    await expect(
      page.locator('section').nth(2)
    ).toBeVisible();
  });

  test('CTA section visible', async ({ page }) => {
    await page.goto('http://localhost:5174/blog');

    await expect(
      page.getByRole('button').last()
    ).toBeVisible();
  });

  test('Contact button exists', async ({ page }) => {
    await page.goto('http://localhost:5174/blog');

    await expect(
      page.getByRole('link', {
        name: /Get in Touch/i
      })
    ).toBeVisible();
  });

  test('No JavaScript errors', async ({ page }) => {
    const errors = [];

    page.on('pageerror', error => {
      errors.push(error);
    });

    await page.goto('http://localhost:5174/blog');

    expect(errors.length).toBe(0);
  });

});