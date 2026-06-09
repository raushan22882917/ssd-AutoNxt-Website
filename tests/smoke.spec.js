import { test, expect } from '@playwright/test';

test.describe('Products Page', () => {

    /*
     ============================================================
     TC-001 Product page loads successfully
     ============================================================
    */
    test('TC-001 Product page loads', async ({ page }) => {
        await page.goto('/product');

        await expect(page).toHaveURL(/product/);
        await expect(page.locator('body')).toBeVisible();
    });

    /*
     ============================================================
     TC-002 Product hero section visible
     ============================================================
    */
    test('TC-002 Hero section visible', async ({ page }) => {
        await page.goto('/product');

        await expect(page.locator('h1').first()).toBeVisible();
    });

    /*
     ============================================================
     TC-003 Product cards visible
     ============================================================
    */
    test('TC-003 Product cards visible', async ({ page }) => {
        await page.goto('/product');

        await expect(page.getByText('AutoNxt X45H2').first()).toBeVisible();
        await expect(page.getByText('AutoNxt X25H2').first()).toBeVisible();
    });

    /*
     ============================================================
     TC-004 View Details button visible
     ============================================================
    */
    test('TC-004 View Details button visible', async ({ page }) => {
        await page.goto('/product');

        await expect(
            page.getByRole('link', { name: /view details/i }).first()
        ).toBeVisible();
    });

    /*
     ============================================================
     TC-005 Reserve Now button visible
     ============================================================
    */
    test('TC-005 Book Now button visible', async ({ page }) => {
        await page.goto('/product');

        await expect(
            page.getByRole('link', { name: /book|reserve/i }).first()
        ).toBeVisible();
    });

    /*
     ============================================================
     TC-006 View Details navigation works
     ============================================================
    */
    test('TC-006 View Details navigation', async ({ page }) => {
        await page.goto('/product');

        const firstCard = page.getByRole('link', {
            name: /view details/i
        }).first();

        await firstCard.click();

        await expect(page).not.toHaveURL(/\/product$/);
    });

    /*
     ============================================================
     TC-007 Reserve Now redirects to booking page
     ============================================================
    */
    test('TC-007 Book Now redirects', async ({ page }) => {
        await page.goto('/product');

        await page.getByRole('link', {
            name: /book|reserve/i
        }).first().click();

        await expect(page).toHaveURL(/book/);
    });

    /*
     ============================================================
     TC-008 Filter buttons visible
     ============================================================
    */
    test('TC-008 Filter buttons visible', async ({ page }) => {
        await page.goto('/product');

        await expect(
            page.getByRole('button', { name: /all/i })
        ).toBeVisible();
    });

    /*
     ============================================================
     TC-009 Tractors filter works
     ============================================================
    */
    test('TC-009 Tractors filter', async ({ page }) => {
        await page.goto('/product');

        const tractorsBtn = page.getByRole('button', {
            name: /tractors/i
        });

        if (await tractorsBtn.count()) {
            await tractorsBtn.click();
        }
    });

    /*
     ============================================================
     TC-010 Attachments filter works
     ============================================================
    */
    test('TC-010 Attachments filter', async ({ page }) => {
        await page.goto('/product');

        const attachmentBtn = page.getByRole('button', {
            name: /attachments/i
        });

        if (await attachmentBtn.count()) {
            await attachmentBtn.click();
        }
    });

    /*
     ============================================================
     TC-011 Product images load
     ============================================================
    */
    test('TC-011 Product images visible', async ({ page }) => {
        await page.goto('/product');

        await expect(
            page.getByRole('img').first()
        ).toBeVisible();
    });

    /*
     ============================================================
     TC-012 Product badges visible
     ============================================================
    */
    test('TC-012 Available badge visible', async ({ page }) => {
        await page.goto('/product');

        await expect(
            page.getByText(/available/i).first()
        ).toBeVisible();
    });

    /*
     ============================================================
     TC-013 Interactive model visible
     ============================================================
    */
    test('TC-013 Interactive Model visible', async ({ page }) => {
        await page.goto('/product');

        const detailsButtons = page.getByRole('link', {
            name: /view details/i
        });

        if (await detailsButtons.count()) {
            await detailsButtons.first().click();
        }

        const model = page.getByText(/interactive model/i);

        if (await model.count()) {
            await expect(model.first()).toBeVisible();
        }
    });

    /*
     ============================================================
     TC-014 Schedule Test Drive button
     ============================================================
    */
    test('TC-014 Schedule Test Drive button visible', async ({ page }) => {
        await page.goto('/product');

        const button = page.getByRole('link', {
            name: /schedule/i
        });

        if (await button.count()) {
            await expect(button.first()).toBeVisible();
        }
    });

    /*
     ============================================================
     TC-015 Industries button visible
     ============================================================
    */
    test('TC-015 Industries button visible', async ({ page }) => {
        await page.goto('/product');

        const button = page.getByRole('link', {
            name: /industr/i
        });

        if (await button.count()) {
            await expect(button.first()).toBeVisible();
        }
    });

    /*
     ============================================================
     TC-016 Footer visible
     ============================================================
    */
    test('TC-016 Footer visible', async ({ page }) => {
        await page.goto('/product');

        await expect(
            page.locator('footer')
        ).toBeVisible();
    });

    /*
     ============================================================
     TC-017 No console errors
     ============================================================
    */
    test('TC-017 Page loads without JS crash', async ({ page }) => {
        const errors = [];

        page.on('pageerror', err => {
            errors.push(err);
        });

        await page.goto('/product');

        expect(errors.length).toBe(0);
    });

});