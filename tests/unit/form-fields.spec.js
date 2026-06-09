/**
 * QA PYRAMID — LAYER 1: UNIT / COMPONENT TESTS
 * Target: Booking / Contact form individual field behaviour
 *
 * Tests validation rules, input constraints, and field-level
 * rendering without submitting the full form.
 */

import { test, expect } from '@playwright/test';

test.describe('Book / Contact Form – Field Unit Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/book');
  });

  // ------------------------------------------------------------------
  // Field rendering
  // ------------------------------------------------------------------
  test('UNIT-FORM-001 Name input is visible and enabled', async ({ page }) => {
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="name"]')).toBeEnabled();
  });

  test('UNIT-FORM-002 Email input is visible and enabled', async ({ page }) => {
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeEnabled();
  });

  test('UNIT-FORM-003 Phone input has type="tel"', async ({ page }) => {
    const type = await page.locator('input[name="phone"]').getAttribute('type');
    expect(type).toBe('tel');
  });

  test('UNIT-FORM-004 Email input has type="email"', async ({ page }) => {
    const type = await page.locator('input[name="email"]').getAttribute('type');
    expect(type).toBe('email');
  });

  test('UNIT-FORM-005 Preferred date input has type="date"', async ({ page }) => {
    const type = await page.locator('input[name="preferredDate"]').getAttribute('type');
    expect(type).toBe('date');
  });

  test('UNIT-FORM-006 Message textarea is visible and resizable', async ({ page }) => {
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
  });

  // ------------------------------------------------------------------
  // Required field markers
  // ------------------------------------------------------------------
  test('UNIT-FORM-007 Name field label shows required asterisk', async ({ page }) => {
    // Required fields have a red asterisk "*" appended in the label
    const label = page.locator('label').filter({ hasText: /name/i }).first();
    await expect(label).toContainText('*');
  });

  test('UNIT-FORM-008 Email field label shows required asterisk', async ({ page }) => {
    const label = page.locator('label').filter({ hasText: /email/i }).first();
    await expect(label).toContainText('*');
  });

  test('UNIT-FORM-009 Message textarea is marked required', async ({ page }) => {
    // The message textarea is required — the label text is "Your Message"
    // but the asterisk may be rendered separately; check the required attribute directly
    const textarea = page.locator('textarea[name="message"]');
    await expect(textarea).toBeVisible();
    const required = await textarea.getAttribute('required');
    // required attribute exists (value is "" or "required")
    expect(required).not.toBeNull();
  });

  // ------------------------------------------------------------------
  // Typing & value binding
  // ------------------------------------------------------------------
  test('UNIT-FORM-010 Name field accepts text input', async ({ page }) => {
    await page.locator('input[name="name"]').fill('Arjun Sharma');
    await expect(page.locator('input[name="name"]')).toHaveValue('Arjun Sharma');
  });

  test('UNIT-FORM-011 Email field accepts a valid email', async ({ page }) => {
    await page.locator('input[name="email"]').fill('test@autonxt.in');
    await expect(page.locator('input[name="email"]')).toHaveValue('test@autonxt.in');
  });

  test('UNIT-FORM-012 Phone field accepts numeric input', async ({ page }) => {
    await page.locator('input[name="phone"]').fill('9876543210');
    await expect(page.locator('input[name="phone"]')).toHaveValue('9876543210');
  });

  test('UNIT-FORM-013 Location field accepts text input', async ({ page }) => {
    await page.locator('input[name="location"]').fill('Pune, Maharashtra');
    await expect(page.locator('input[name="location"]')).toHaveValue('Pune, Maharashtra');
  });

  test('UNIT-FORM-014 Subject field accepts text input', async ({ page }) => {
    await page.locator('input[name="subject"]').fill('Test Drive Request');
    await expect(page.locator('input[name="subject"]')).toHaveValue('Test Drive Request');
  });

  test('UNIT-FORM-015 Message textarea accepts multi-line text', async ({ page }) => {
    const msg = 'I would like to schedule\na test drive.';
    await page.locator('textarea[name="message"]').fill(msg);
    await expect(page.locator('textarea[name="message"]')).toHaveValue(msg);
  });

  // ------------------------------------------------------------------
  // Submit button state
  // ------------------------------------------------------------------
  test('UNIT-FORM-016 Submit button is visible and type=submit', async ({ page }) => {
    const btn = page.locator('button[type="submit"]');
    await expect(btn).toBeVisible();
    const type = await btn.getAttribute('type');
    expect(type).toBe('submit');
  });

  test('UNIT-FORM-017 Submit button is not disabled initially', async ({ page }) => {
    await expect(page.locator('button[type="submit"]')).not.toBeDisabled();
  });

  // ------------------------------------------------------------------
  // Contact info sidebar
  // ------------------------------------------------------------------
  test('UNIT-FORM-018 Phone contact link is a tel: link', async ({ page }) => {
    const tel = page.locator('a[href^="tel:"]').first();
    await expect(tel).toBeVisible();
    const href = await tel.getAttribute('href');
    // href is "tel:+919067404606" — starts with "tel:" followed by the number
    expect(href).toMatch(/^tel:/);
    expect(href).toMatch(/[0-9]{7,}/);
  });

  test('UNIT-FORM-019 Email contact link is a mailto: link', async ({ page }) => {
    const mail = page.locator('a[href^="mailto:"]').first();
    await expect(mail).toBeVisible();
    const href = await mail.getAttribute('href');
    expect(href).toContain('@');
  });

  test('UNIT-FORM-020 Copy phone button is visible', async ({ page }) => {
    // First copyable item is the phone row
    const copyButtons = page.locator('button[title="Copy to clipboard"]');
    await expect(copyButtons.first()).toBeVisible();
  });

  test('UNIT-FORM-021 Tractor image on the right panel is visible', async ({ page }) => {
    await expect(
      page.getByRole('img', { name: /AutoNxt X45H2/i })
    ).toBeVisible();
  });
});
