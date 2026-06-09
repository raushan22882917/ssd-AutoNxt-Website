import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',

    // Pick up spec files in root tests/ and all subdirectories
    testMatch: '**/*.spec.{js,ts}',

    use: {
        baseURL: 'http://localhost:5173',
        headless: false,
        // Capture screenshots on failure
        screenshot: 'only-on-failure',
        // Record traces on first retry to help debug CI failures
        trace: 'on-first-retry',
    },

    // Retry flaky tests once before marking them as failed
    retries: 1,

    // Run test files in parallel (each file gets its own worker)
    fullyParallel: true,

    // Max workers — keeps the browser count sane on local machines
    workers: process.env.CI ? 2 : 4,

    reporter: [
        ['list'],
        ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ],

    // ── Cross-Browser Testing (Category 14) ─────────────────
    // Tests run on Chromium by default via `use` above.
    // To also run on Firefox and Edge, use the projects array:
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'msedge',
            use: { ...devices['Desktop Edge'], channel: 'msedge' },
        },
        // Mobile viewports for cross-browser responsive testing
        {
            name: 'mobile-chrome',
            use: { ...devices['Pixel 5'] },
        },
        {
            name: 'mobile-safari',
            use: { ...devices['iPhone 12'] },
        },
    ],
});