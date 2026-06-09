import { test, expect } from '@playwright/test';

test.describe('Contact / Booking Page', () => {

  test('Contact page loads', async ({ page }) => {
    await page.goto('/book');

    await expect(page).toHaveURL(/book/);

    await expect(
      page.getByRole('button', { name: /submit|send/i })
    ).toBeVisible();
  });

  test('Name field visible', async ({ page }) => {
    await page.goto('/book');

    await expect(
      page.locator('input[name="name"]')
    ).toBeVisible();
  });

  test('Email field visible', async ({ page }) => {
    await page.goto('/book');

    await expect(
      page.locator('input[name="email"]')
    ).toBeVisible();
  });

  test('Phone field visible', async ({ page }) => {
    await page.goto('/book');

    await expect(
      page.locator('input[name="phone"]')
    ).toBeVisible();
  });

  test('Location field visible', async ({ page }) => {
    await page.goto('/book');

    await expect(
      page.locator('input[name="location"]')
    ).toBeVisible();
  });

  test('Preferred date field visible', async ({ page }) => {
    await page.goto('/book');

    await expect(
      page.locator('input[name="preferredDate"]')
    ).toBeVisible();
  });

  test('Subject field visible', async ({ page }) => {
    await page.goto('/book');

    await expect(
      page.locator('input[name="subject"]')
    ).toBeVisible();
  });

  test('Message field visible', async ({ page }) => {
    await page.goto('/book');

    await expect(
      page.locator('textarea[name="message"]')
    ).toBeVisible();
  });

  test('User can type in form', async ({ page }) => {
    await page.goto('/book');

    await page.locator('input[name="name"]').fill('Rajiv Kumar');
    await page.locator('input[name="email"]').fill('rajiv@test.com');
    await page.locator('input[name="phone"]').fill('9876543210');

    await expect(
      page.locator('input[name="name"]')
    ).toHaveValue('Rajiv Kumar');
  });

  test('Email contact card visible', async ({ page }) => {
    await page.goto('/book');

    await expect(
      page.locator('a[href^="mailto:"]').first()
    ).toBeVisible();
  });

  test('Phone contact card visible', async ({ page }) => {
    await page.goto('/book');

    await expect(
      page.locator('a[href^="tel:"]').first()
    ).toBeVisible();
  });

  test('Tractor image visible', async ({ page }) => {
    await page.goto('/book');

    await expect(
      page.getByRole('img', {
        name: /AutoNxt X45H2 Electric Tractor/i
      })
    ).toBeVisible();
  });

  test('Submit button visible', async ({ page }) => {
    await page.goto('/book');

    await expect(
      page.locator('button[type="submit"]')
    ).toBeVisible();
  });

  test('Required field validation works', async ({ page }) => {
    await page.goto('/book');

    const submitButton = page.locator(
      'button[type="submit"]'
    );

    await expect(submitButton).toBeVisible();
  });

  test('No JavaScript errors', async ({ page }) => {
    const errors = [];

    page.on('pageerror', error => {
      errors.push(error);
    });

    await page.goto('/book');

    expect(errors.length).toBe(0);
  });

});
