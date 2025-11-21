import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
    readonly page: Page;
    readonly hamburgerMenu: Locator;
    readonly navLinks: Locator;
    readonly header: Locator;

    constructor(page: Page) {
        this.page = page;
        this.hamburgerMenu = page.locator('.hamburger');
        this.navLinks = page.locator('.nav-links');
        this.header = page.locator('header');
    }

    async goto(url: string = 'https://vikas-automates.github.io/vikas-engineering-portfolio/') {
        await this.page.goto(url);
    }

    async openMobileMenu() {
        if (await this.hamburgerMenu.isVisible()) {
            await this.hamburgerMenu.click();
        }
    }

    async getTitle() {
        return await this.page.title();
    }
}
