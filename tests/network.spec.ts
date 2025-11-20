import { test, expect } from '@playwright/test';

test.describe('Network & Sanity Tests', () => {
    test('should return 200 OK for homepage', async ({ request }) => {
        const response = await request.get('/');
        expect(response.status()).toBe(200);
    });

    test('should return 200 OK for blog page', async ({ request }) => {
        const response = await request.get('/blog.html');
        expect(response.status()).toBe(200);
    });

    test('should load main assets without errors', async ({ page }) => {
        const failedRequests: string[] = [];

        page.on('requestfailed', request => {
            failedRequests.push(request.url());
        });

        await page.goto('/');

        // Wait a bit for assets to load
        await page.waitForLoadState('networkidle');

        expect(failedRequests).toEqual([]);
    });
});
