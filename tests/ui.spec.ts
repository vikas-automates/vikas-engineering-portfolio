import { test, expect } from '@playwright/test';

test.describe('Portfolio UI Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should have correct title and metadata', async ({ page }) => {
        await expect(page).toHaveTitle(/Vikas Kumar | Senior QA Automation Analyst/);
    });

    test('should display hero section with key elements', async ({ page }) => {
        await expect(page.locator('.hero-name')).toHaveText('Vikas Kumar');
        await expect(page.locator('.hero-title')).toHaveText('Senior QA Automation Analyst');
        await expect(page.locator('.btn-primary').first()).toBeVisible();
    });

    test('should navigate to sections via navbar', async ({ page }) => {
        await page.click('a[href="#about"]');
        await expect(page.locator('#about')).toBeInViewport();

        await page.click('a[href="#skills"]');
        await expect(page.locator('#skills')).toBeInViewport();
    });

    test('should navigate to blog page', async ({ page }) => {
        await page.click('a[href="blog.html"]');
        await expect(page).toHaveURL(/.*blog.html/);
        await expect(page.locator('.blog-header h1')).toHaveText('Engineering Blog');
    });
});
