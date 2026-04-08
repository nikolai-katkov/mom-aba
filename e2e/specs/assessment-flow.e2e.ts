import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => {
    localStorage.clear()
  })
})

test('happy path: sections > intro > criteria > assess Yes > completed', async ({ page }) => {
  await page.goto('/')

  // Click MAND card
  await page.getByText('MAND').click()
  await expect(page).toHaveURL(/\/sections\/mand\/intro/)

  // Click Start
  await page.getByRole('button', { name: 'Start' }).click()
  await expect(page).toHaveURL(/\/sections\/mand\/criteria/)

  // Click first criterion
  await page.getByText('Uses 2 words or gestures').click()
  await expect(page).toHaveURL(/\/criteria\/mand-1\/assess/)

  // Click Yes
  await page.getByRole('button', { name: 'Yes' }).click()
  await expect(page).toHaveURL(/\/sections\/mand\/criteria/)

  // Verify status updated
  await expect(page.getByText('1/5 completed')).toBeVisible()
})

test('training path: assess No > training > retry > assess Yes', async ({ page }) => {
  await page.goto('/sections/mand/criteria')

  // Click first criterion
  await page.getByText('Uses 2 words or gestures').click()

  // Click No
  await page.getByRole('button', { name: 'No' }).click()
  await expect(page).toHaveURL(/\/criteria\/mand-1\/train/)

  // Verify training content
  await expect(page.getByText(/choose 2 items your child loves/iu)).toBeVisible()

  // Click Retry
  await page.getByRole('button', { name: 'Retry Assessment' }).click()
  await expect(page).toHaveURL(/\/criteria\/mand-1\/assess/)

  // Click Yes
  await page.getByRole('button', { name: 'Yes' }).click()
  await expect(page).toHaveURL(/\/sections\/mand\/criteria/)
  await expect(page.getByText('1/5 completed')).toBeVisible()
})

test('state persists across page reload', async ({ page }) => {
  await page.goto('/sections/mand/criteria/mand-1/assess')

  // Mark first criterion as complete
  await page.getByRole('button', { name: 'Yes' }).click()
  await expect(page.getByText('1/5 completed')).toBeVisible()

  // Reload
  await page.reload()
  await expect(page.getByText('1/5 completed')).toBeVisible()
})

test('back button navigates correctly through flow', async ({ page }) => {
  await page.goto('/sections/mand/intro')

  // Start > criteria list
  await page.getByRole('button', { name: 'Start' }).click()
  await expect(page).toHaveURL(/\/sections\/mand\/criteria/)

  // Back to intro
  await page.getByRole('button', { name: 'Go back' }).click()
  await expect(page).toHaveURL(/\/sections\/mand\/intro/)

  // Back to sections list
  await page.getByRole('button', { name: 'Go back' }).click()
  await expect(page).toHaveURL(/\/$/)
})
