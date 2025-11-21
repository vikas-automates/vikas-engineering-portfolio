import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Portfolio UI Tests', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.goto();
    });

    test('should have correct title and metadata', async ({ page }) => {
        await expect(page).toHaveTitle(/Vikas Kumar | Senior QA Automation Analyst | QA Automation Analyst/);
    });

    test('should display hero section with key elements', async () => {
        await expect(homePage.heroName).toHaveText('Vikas Kumar');
        await expect(homePage.heroTitle).toHaveText('Senior QA Automation Analyst');
        await expect(homePage.primaryButton).toBeVisible();
    });

    test('should navigate to sections via navbar', async () => {
        await homePage.navigateToAbout();
        await expect(homePage.aboutSection).toBeInViewport();

        await homePage.navigateToSkills();
        await expect(homePage.skillsSection).toBeInViewport();
    });

    test('should navigate to blog page', async ({ page }) => {
        await homePage.navigateToBlog();
        await expect(page).toHaveURL(/.*blog.html/);
        await expect(page.locator('.blog-header h1')).toHaveText('Insights & Experiments');
    });
});
