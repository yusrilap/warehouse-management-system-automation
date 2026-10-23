import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

const viewerEmail = process.env.VIEWER_EMAIL!;
const viewerPassword = process.env.VIEWER_PASSWORD!;

const warehouseEmail = process.env.WAREHOUSE_EMAIL!;
const warehousePassword = process.env.WAREHOUSE_PASSWORD!;

test.describe('Role-Based Access Control', () => {
    test('viewer can login successfully', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(viewerEmail, viewerPassword);

        await expect(page).toHaveURL(/\/admin\/?$/);
    });

    test('viewer cannot see system management menus', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(viewerEmail, viewerPassword);

        await expect(page).toHaveURL(/\/admin\/?$/);

        await expect(
            page.getByRole('link', { name: 'Users' })
        ).not.toBeVisible();

        await expect(
            page.getByRole('link', { name: 'Roles' })
        ).not.toBeVisible();

        await expect(
            page.getByRole('link', { name: 'Activity Logs' })
        ).not.toBeVisible();
    });

    test('viewer cannot access users page directly', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(viewerEmail, viewerPassword);

        await expect(page).toHaveURL(/\/admin\/?$/);

        // Try to bypass RBAC by accessing Users directly
        const response = await page.goto('/admin/users');

        expect(response?.status()).toBe(403);
    });

    test('viewer cannot access roles page directly', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(viewerEmail, viewerPassword);

        await expect(page).toHaveURL(/\/admin\/?$/);

        // Try to bypass RBAC by accessing Roles directly
        const response = await page.goto('/admin/roles');

        expect(response?.status()).toBe(403);
    });

    test('viewer cannot access activity logs page directly', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(viewerEmail, viewerPassword);

        await expect(page).toHaveURL(/\/admin\/?$/);

        // Try to bypass RBAC by accessing Activity Logs directly
        const response = await page.goto('/admin/activity-logs');

        expect(response?.status()).toBe(403);
    });

    test('warehouse staff can login successfully', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(warehouseEmail, warehousePassword);

        await expect(page).toHaveURL(/\/admin\/?$/);
    });

    test('warehouse staff cannot see system management menus', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(warehouseEmail, warehousePassword);

        await expect(page).toHaveURL(/\/admin\/?$/);

        await expect(
            page.getByRole('link', { name: 'Users' })
        ).not.toBeVisible();

        await expect(
            page.getByRole('link', { name: 'Roles' })
        ).not.toBeVisible();

        await expect(
            page.getByRole('link', { name: 'Activity Logs' })
        ).not.toBeVisible();
    });

    test('warehouse staff cannot access users page directly', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(warehouseEmail, warehousePassword);

        await expect(page).toHaveURL(/\/admin\/?$/);

        // Try to bypass RBAC by accessing Users directly
        const response = await page.goto('/admin/users');

        expect(response?.status()).toBe(403);
    });
});