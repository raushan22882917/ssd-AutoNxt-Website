import { test, expect } from '@playwright/test';

test('Industry page loads successfully', async ({ page }) => {
    await page.goto('/industry');

    await expect(
        page.getByRole('heading', { name: /Powering India's Most/i })
    ).toBeVisible();

    await expect(
        page.getByText('Industrial Solutions')
    ).toBeVisible();
});

test('Industry cards are visible', async ({ page }) => {
    await page.goto('/industry');

    await expect(page.getByRole('heading', { name: 'Biomass' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Defence' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Airport Operations' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Metal Manufacturing' })).toBeVisible();
});

test('Industry tractor section loads', async ({ page }) => {
    await page.goto('/industry');

    await expect(
        page.getByRole('heading', { name: /The Right Tractor/i })
    ).toBeVisible();

    await expect(
        page.getByRole('heading', { name: 'AutoNxt X45H2' })
    ).toBeVisible();

    await expect(
        page.getByRole('heading', { name: 'AutoNxt X25H2' })
    ).toBeVisible();
});

test('Industry page has no console errors', async ({ page }) => {
    const errors = [];

    page.on('console', msg => {
        if (msg.type() === 'error') {
            errors.push(msg.text());
        }
    });

    await page.goto('/industry');

    expect(errors).toEqual([]);
});