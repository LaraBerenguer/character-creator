import { test, expect } from '@playwright/test';

test('should create a character with randomized traits', async ({ page }) => {
    await page.goto('http://localhost:5174/');
    await page.getByRole('link', { name: 'Login' }).click();
    await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible();
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill('ttt@tt.com');
    await page.getByPlaceholder('Email').press('Tab');
    await page.getByPlaceholder('Password').fill('123456');
    await page.getByRole('button', { name: 'Log In' }).click();
    await expect(page.getByRole('link', { name: 'Create New Character' })).toBeVisible();
    await page.getByRole('link', { name: 'Create New Character' }).click();
    await page.getByRole('button', { name: 'Randomize All' }).click();
    await expect(page.getByText('???')).not.toBeVisible();
    await page.getByRole('button', { name: 'Finish character' }).click();
    await page.getByRole('textbox', { name: 'Your name' }).fill('Jay');
    await page.getByRole('button', { name: 'Accept' }).click();
    await expect(page.getByRole('listitem').filter({ hasText: 'Jay' })).toBeVisible();
});

test('should redirect to 404 when page doesnt exist', async ({ page }) => {
    await page.goto('http://localhost:5174/asdfg');
    await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();
});

test('should redirect to login when trying to access creation without login', async ({ page }) => {
    await page.goto('http://localhost:5174/creation');
    await expect(page).toHaveURL('http://localhost:5174/login');
});

test('should create a character by clicking each card and delete the character in dashboard', async ({ page }) => {
    await page.goto('http://localhost:5174/');
    await page.getByRole('link', { name: 'Login' }).click();
    await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible();
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill('test@test.com');
    await page.getByPlaceholder('Email').press('Tab');
    await page.getByPlaceholder('Password').fill('123456789');
    await page.getByRole('button', { name: 'Log In' }).click();
    await expect(page.getByRole('link', { name: 'Create New Character' })).toBeVisible();
    await page.getByRole('link', { name: 'Create New Character' }).click();
    await expect(page.locator('a').nth(1)).toBeVisible();
    await page.locator('a').nth(1).click();
    await expect(page.locator('a').nth(2)).toBeVisible();
    await page.locator('a').nth(2).click();
    await expect(page.locator('a').nth(3)).toBeVisible();
    await page.locator('a').nth(3).click();
    await expect(page.locator('a').nth(4)).toBeVisible();
    await page.locator('a').nth(4).click();
    await expect(page.getByRole('button', { name: 'Finish character' })).toBeEnabled();
    await page.getByRole('button', { name: 'Finish character' }).click();
    await page.getByRole('textbox', { name: 'Your name' }).fill('Ruby');
    await page.getByRole('button', { name: 'Accept' }).click();
    await page.getByRole('list').getByRole('button').filter({ hasText: /^$/ }).click();
    await page.getByRole('button', { name: 'Delete' }).click();
    await expect(page.getByRole('listitem').filter({ hasText: 'Ruby' })).not.toBeVisible();
    await expect(page).toHaveURL(/\/dashboard/);
});