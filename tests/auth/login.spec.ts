import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

const adminEmail = process.env.ADMIN_EMAIL!;
const adminPassword = process.env.ADMIN_PASSWORD!;

test.describe('Authentication', () => {
    test('admin can access login page', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await expect(page).toHaveURL(/\/admin\/login/);

        await expect(
            page.getByRole('heading', { name: /sign in/i })
        ).toBeVisible();
    });
});

test('admin can login successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(adminEmail, adminPassword);

    await expect(page).toHaveURL(/\/admin\/?$/);

    await expect(
        page.getByText('Active Products')
    ).toBeVisible();

    await expect(
        page.getByText('Active Warehouses')
    ).toBeVisible();
});

test('login fails with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('invalid@example.com', 'wrongpassword');

    await expect(page).toHaveURL(/\/admin\/login/);

    await expect(
        page.getByText(/credentials do not match/i)
    ).toBeVisible();
});

test('admin can logout successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(adminEmail, adminPassword);

    await expect(page).toHaveURL(/\/admin\/?$/);

    // Open user menu
    await page.getByRole('button', { name: /user menu/i }).click();

    // Logout
    await page.getByRole('menuitem', { name: /sign out/i }).click();

    // Should return to login page
    await expect(page).toHaveURL(/\/admin\/login/);
});