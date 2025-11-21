import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    readonly heroName: Locator;
    readonly heroTitle: Locator;
    readonly primaryButton: Locator;
    readonly heroGreeting: Locator;
    readonly aboutSection: Locator;
    readonly skillsSection: Locator;
    readonly blogLink: Locator;

    constructor(page: Page) {
        super(page);
        this.heroName = page.locator('.hero-name');
        this.heroTitle = page.locator('.hero-title');
        this.primaryButton = page.locator('.btn-primary').first();
        this.heroGreeting = page.locator('.hero-greeting');
        this.aboutSection = page.locator('#about');
        this.skillsSection = page.locator('#skills');
        this.blogLink = page.locator('a[href="blog.html"]');
    }

    async navigateToAbout() {
        await this.page.click('a[href="#about"]');
    }

    async navigateToSkills() {
        await this.page.click('a[href="#skills"]');
    }

    async navigateToBlog() {
        await this.blogLink.click();
    }
}
