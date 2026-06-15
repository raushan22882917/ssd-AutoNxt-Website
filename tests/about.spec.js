import { test, expect } from '@playwright/test';

test.describe('About Page', () => {

    test('About page loads successfully', async ({ page }) => {
        await page.goto('/about');

        await expect(
            page.getByRole('heading', {
                name: /We believe technology can/i
            })
        ).toBeVisible();
    });

    test('Company information is displayed', async ({ page }) => {
        await page.goto('/about');

        await expect(
            page.getByText('Founded', { exact: true })
        ).toBeVisible();

        await expect(
            page.getByText('2016').first()
        ).toBeVisible();

        await expect(
            page.getByText('Headquartered', { exact: true })
        ).toBeVisible();

        await expect(
            page.getByText('Thane, MH', { exact: true })
        ).toBeVisible();

        await expect(
            page.getByText('150+')
        ).toBeVisible();
    });

    test('Mission section is visible', async ({ page }) => {
        await page.goto('/about');

        await expect(
            page.getByRole('heading', {
                name: /Empowering farmers/i
            })
        ).toBeVisible();
    });

    test('Core values are displayed', async ({ page }) => {
        await page.goto('/about');

        await expect(
            page.getByRole('heading', {
                name: 'Customer First',
                exact: true
            })
        ).toBeVisible();

        await expect(
            page.getByRole('heading', {
                name: 'Innovation',
                exact: true
            })
        ).toBeVisible();

        await expect(
            page.getByRole('heading', {
                name: 'Excellence',
                exact: true
            })
        ).toBeVisible();

        await expect(
            page.getByRole('heading', {
                name: 'Sustainability',
                exact: true
            })
        ).toBeVisible();
    });

    test('Journey timeline is visible', async ({ page }) => {
        await page.goto('/about');

        await expect(
            page.getByRole('heading', {
                name: 'Our Journey',
                exact: true
            })
        ).toBeVisible();

        await expect(
            page.getByText('2016').first()
        ).toBeVisible();

        await expect(
            page.getByText('2024').first()
        ).toBeVisible();
    });

    test('Engineering process section is visible', async ({ page }) => {
        await page.goto('/about');

        await expect(
            page.getByRole('heading', {
                name: /Built to the Highest/i
            })
        ).toBeVisible();

        await expect(
            page.getByRole('heading', {
                name: 'Define',
                exact: true
            })
        ).toBeVisible();

        await expect(
            page.getByRole('heading', {
                name: 'Design',
                exact: true
            })
        ).toBeVisible();

        await expect(
            page.getByRole('heading', {
                name: 'Develop',
                exact: true
            })
        ).toBeVisible();
    });

    test('Leadership team is displayed', async ({ page }) => {
        await page.goto('/about');

        await expect(
            page.getByRole('heading', {
                name: 'Meet Our Team'
            })
        ).toBeVisible();

        await expect(
            page.getByRole('heading', {
                name: 'Kaustubh Dhonde'
            })
        ).toBeVisible();

        await expect(
            page.getByRole('heading', {
                name: 'Pankaj Goyal'
            })
        ).toBeVisible();
    });

    test('Advisor section is displayed', async ({ page }) => {
        await page.goto('/about');

        await expect(
            page.getByRole('heading', {
                name: /Industry Veterans Guiding Our/i
            })
        ).toBeVisible();

        await expect(
            page.getByRole('heading', {
                name: 'IV-Rao'
            })
        ).toBeVisible();
    });

    test('Footer contact information is visible', async ({ page }) => {
        await page.goto('/about');

        await expect(
            page.getByRole('heading', {
                name: 'Get in Touch'
            })
        ).toBeVisible();

        await expect(
            page.getByRole('link', {
                name: /sales@autonxt/i
            })
        ).toBeVisible();
    });

});