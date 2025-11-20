import { test, expect } from '@playwright/test';

test.describe('Responsive Layout Tests', () => {

    test('Mobile: should show hamburger menu and hide nav links', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
        await page.goto('/');

        await expect(page.locator('.hamburger')).toBeVisible();
        await expect(page.locator('.nav-links')).not.toBeVisible();

        // Open menu
        await page.click('.hamburger');
        await expect(page.locator('.nav-links')).toBeVisible();
    });

    test('Tablet: should display hero content correctly', async ({ page }) => {
        await page.setViewportSize({ width: 768, height: 1024 }); // iPad Mini
        await page.goto('/');

        // Check if "Hello, I'm" is visible (z-index fix verification)
        await expect(page.locator('.hero-greeting')).toBeVisible();

        // Ensure no horizontal scroll
        const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
        const viewportWidth = await page.evaluate(() => window.innerWidth);
        expect(scrollWidth).toBeLessThanOrEqual(viewportWidth);
    });

    test('Desktop: should show full navbar', async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 720 });
        await page.goto('/');

        await expect(page.locator('.hamburger')).not.toBeVisible();
        await expect(page.locator('.nav-links')).toBeVisible();
    });
});
