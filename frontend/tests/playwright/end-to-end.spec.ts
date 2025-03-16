import { test, expect } from '@playwright/test';

//not working timeout
test('should create a character with randomized traits but no description and delete the character in dashboard', async ({ page }) => {
    await page.goto('http://localhost:5174/');
    await page.getByRole('link', { name: 'Login' }).click();
    await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible();
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill('ttt@tt.com');
    await page.getByPlaceholder('Email').press('Tab');
    await page.getByPlaceholder('Password').fill('123456');
    await page.getByRole('button', { name: 'Log In' }).click();
    await page.waitForLoadState('networkidle');
    await page.waitForURL('**/');

    //console.log('Page URL after login:', page.url());
    //console.log('Page content:', await page.content());

    await expect(page.getByRole('link', { name: 'Create a new Character' })).toBeVisible();
    await page.getByRole('link', { name: 'Create a new Character' }).click();
    await page.getByRole('textbox', { name: 'Your name' }).fill('Jay');
    await page.getByRole('button', { name: 'Accept' }).click();
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('.trait-card .card-content');
    const traitBefore = await page.locator('.trait-card .card-content').textContent();
    await page.waitForSelector('.bond-card .card-content');
    const bondBefore = await page.locator('.bond-card .card-content').textContent();
    await page.waitForSelector('.flaw-card .card-content');
    const flawBefore = await page.locator('.flaw-card .card-content').textContent();
    await page.waitForSelector('.ideal-card .card-content');
    const idealBefore = await page.locator('.ideal-card .card-content').textContent();
    await page.getByRole('button', { name: 'Randomize All' }).click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator('.trait-card .card-content')).not.toHaveText(traitBefore || '');
    await expect(page.locator('.bond-card .card-content')).not.toHaveText(bondBefore || '');
    await expect(page.locator('.flaw-card .card-content')).not.toHaveText(flawBefore || '');
    await expect(page.locator('.ideal-card .card-content')).not.toHaveText(idealBefore || '');
    await page.getByRole('button', { name: 'Finish character' }).click();
    await page.waitForLoadState('networkidle');
    await page.waitForSelector("li:has-text('Jay')");
    await expect(page.getByRole('listitem').filter({ hasText: 'Jay' })).toBeVisible();
    await page.locator('li:nth-child(10) > .list-character-info > button:nth-child(3)').click();
    await page.getByRole('button', { name: 'Delete' }).click();
});

test('should create a character with randomized traits and a generated description and then delete the character in dashboard', async ({ page }) => {
    await page.goto('http://localhost:5174/');
    await page.getByRole('link', { name: 'Login' }).click();
    await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible();
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill('ttt@tt.com');
    await page.getByPlaceholder('Email').press('Tab');
    await page.getByPlaceholder('Password').fill('123456');
    await page.getByRole('button', { name: 'Log In' }).click();
    await page.waitForURL('**/');
    await expect(page.getByRole('link', { name: 'Create a new Character' })).toBeVisible();
    await page.getByRole('link', { name: 'Create a new Character' }).click();
    await page.getByRole('textbox', { name: 'Your name' }).click();
    await page.getByRole('textbox', { name: 'Your name' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Your name' }).fill('J');
    await page.getByRole('textbox', { name: 'Your name' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Your name' }).fill('Jay');
    await page.getByRole('button', { name: 'Accept' }).click();
    await page.getByRole('button', { name: 'Randomize All' }).click();
    await page.getByRole('button', { name: 'Interpret' }).click();
    await page.getByRole('button', { name: 'I like it' }).click();
    await page.getByRole('button', { name: 'Finish character' }).click();
    await page.waitForSelector("li:has-text('Jay')");
    await expect(page.getByRole('listitem').filter({ hasText: 'Jay' })).toBeVisible();
    const lastCharacterDeleteButton = page.locator('li:last-child > .list-character-info > button').last();
    await lastCharacterDeleteButton.click();
    await page.getByRole('button', { name: 'Delete' }).click();
});

test('should redirect to 404 when page doesnt exist', async ({ page }) => {
    await page.goto('http://localhost:5174/asdfg');
    await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();
});

test('should redirect to login when trying to access creation without login', async ({ page }) => {
    await page.goto('http://localhost:5174/creation');
    await expect(page).toHaveURL('http://localhost:5174/login');
});

//not working timeout
test('should create a character by clicking each card and delete the character in dashboard', async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('http://localhost:5174/');
    await page.getByRole('link', { name: 'Login' }).click();
    await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible();
    await page.locator('label').first().click();
    await page.getByPlaceholder('Email').fill('ttt@tt.com');
    await page.getByPlaceholder('Email').press('Tab');
    await page.getByPlaceholder('Password').fill('123456');
    await page.getByRole('button', { name: 'Log In' }).click();
    await page.waitForURL('**/');
    await expect(page.getByRole('link', { name: 'Create a new Character' })).toBeVisible();
    await page.getByRole('link', { name: 'Create a new Character' }).click();
    await page.getByRole('button', { name: 'Accept' }).click();
    await page.waitForSelector('[aria-label="Get random trait"]', { state: 'visible' });
    await page.getByLabel('Get random trait').click();
    await expect(page.locator('.trait-card .card-content')).not.toHaveText('???');
    await expect(page.locator('.trait-card .card-content')).toBeVisible();
    await page.waitForSelector('[aria-label="Get random bond"]', { state: 'visible' });
    await page.getByLabel('Get random bond').click();
    await expect(page.locator('.bond-card .card-content')).not.toHaveText('???');
    await expect(page.locator('.bond-card .card-content')).toBeVisible();
    await page.waitForSelector('[aria-label="Get random flaw"]', { state: 'visible' });
    await page.getByLabel('Get random flaw').click();
    await expect(page.locator('.flaw-card .card-content')).not.toHaveText('???');
    await expect(page.locator('.flaw-card .card-content')).toBeVisible();
    await page.waitForSelector('[aria-label="Get random ideal"]', { state: 'visible' });
    await page.getByLabel('Get random ideal').click();
    await expect(page.locator('.ideal-card .card-content')).not.toHaveText('???');
    await expect(page.locator('.ideal-card .card-content')).toBeVisible();
    await page.getByRole('button', { name: 'Finish character' }).click();
    await page.locator('li:nth-child(10) > .list-character-info > button:nth-child(3)').click();
    await page.getByRole('button', { name: 'Delete' }).click();
    await expect(page.getByRole('listitem').filter({ hasText: 'Jay' })).not.toBeVisible();
    await expect(page).toHaveURL(/\/dashboard/);
});