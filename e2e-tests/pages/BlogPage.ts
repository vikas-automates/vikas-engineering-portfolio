import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class BlogPage extends BasePage {
    readonly blogHeader: Locator;

    constructor(page: Page) {
        super(page);
        this.blogHeader = page.locator('.blog-header h1');
    }

    async goto() {
        await super.goto('/blog.html');
    }
}
