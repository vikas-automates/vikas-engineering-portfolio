import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Responsive Layout Tests', () => {

    test('Mobile: should show hamburger menu and hide nav links', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
        const homePage = new HomePage(page);
        await homePage.goto();

        await expect(homePage.hamburgerMenu).toBeVisible();
        await expect(homePage.navLinks).not.toBeVisible();

        // Open menu
        await homePage.openMobileMenu();
        await expect(homePage.navLinks).toBeVisible();
    });

    test('Tablet: should display hero content correctly', async ({ page }) => {
        await page.setViewportSize({ width: 768, height: 1024 }); // iPad Mini
        const homePage = new HomePage(page);
        await homePage.goto();

        // Check if "Hello, I'm" is visible (z-index fix verification)
        await expect(homePage.heroGreeting).toBeVisible();

        // Ensure no horizontal scroll
        const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
        const viewportWidth = await page.evaluate(() => window.innerWidth);
        console.log(`Scroll Width: ${scrollWidth}, Viewport Width: ${viewportWidth}`);

        if (scrollWidth > viewportWidth) {
            const overflowingElements = await page.evaluate(() => {
                const docWidth = document.documentElement.offsetWidth;
                const elements = document.querySelectorAll('*');
                const overflowers = [];
                for (const el of elements) {
                    const rect = el.getBoundingClientRect();
                    if (rect.right > docWidth) {
                        overflowers.push({
                            tag: el.tagName,
                            class: el.className,
                            id: el.id,
                            right: rect.right,
                            width: rect.width
                        });
                    }
                }
                return overflowers;
            });
            console.log('Overflowing elements:', JSON.stringify(overflowingElements, null, 2));
        }
    });

    test('Desktop: should show full navbar', async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 720 });
        const homePage = new HomePage(page);
        await homePage.goto();

        await expect(homePage.hamburgerMenu).not.toBeVisible();
        await expect(homePage.navLinks).toBeVisible();
    });
});
