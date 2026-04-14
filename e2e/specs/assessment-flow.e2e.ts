import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => {
    localStorage.clear()
    localStorage.setItem('mom-aba-language', 'en')
    localStorage.setItem(
      'mom-aba-dictionary-state',
      JSON.stringify({
        version: 1,
        onboardingCompleted: true,
        onboardingLevel: 'intermediate',
        words: {},
      })
    )
  })
})

test('happy path: sections > intro > levels > assess Yes > completed', async ({ page }) => {
  await page.goto('/')

  // Click MAND card
  await page.getByText('Mand').click()
  await expect(page).toHaveURL(/\/mand$/)

  // Click Start
  await page.getByRole('button', { name: 'Start' }).click()
  await expect(page).toHaveURL(/\/mand\/levels$/)

  // Click first level
  await page.getByText('Uses 2 words or gestures').click()
  await expect(page).toHaveURL(/\/mand\/levels\/mand-1$/)

  // Click Yes
  await page.getByRole('button', { name: 'Yes' }).click()
  await expect(page).toHaveURL(/\/mand\/levels$/)

  // Verify status updated
  await expect(page.getByText('1/5 completed')).toBeVisible()
})

test('training path: assess No > training > retry > assess Yes', async ({ page }) => {
  await page.goto('/mand/levels')

  // Click first level
  await page.getByText('Uses 2 words or gestures').click()

  // Click No
  await page.getByRole('button', { name: 'No' }).click()
  await expect(page).toHaveURL(/\/mand\/levels\/mand-1\/train$/)

  // Verify training content
  await expect(page.getByText(/choose 2 items your child loves/iu)).toBeVisible()

  // Click Retry
  await page.getByRole('button', { name: 'Retry Assessment' }).click()
  await expect(page).toHaveURL(/\/mand\/levels\/mand-1$/)

  // Click Yes
  await page.getByRole('button', { name: 'Yes' }).click()
  await expect(page).toHaveURL(/\/mand\/levels$/)
  await expect(page.getByText('1/5 completed')).toBeVisible()
})

test('state persists across page reload', async ({ page }) => {
  await page.goto('/mand/levels/mand-1')

  // Mark first level as complete
  await page.getByRole('button', { name: 'Yes' }).click()
  await expect(page.getByText('1/5 completed')).toBeVisible()

  // Reload
  await page.reload()
  await expect(page.getByText('1/5 completed')).toBeVisible()
})

test('back button navigates correctly through flow', async ({ page }) => {
  await page.goto('/mand')

  // Start > levels list
  await page.getByRole('button', { name: 'Start' }).click()
  await expect(page).toHaveURL(/\/mand\/levels$/)

  // Back to intro
  await page.getByRole('button', { name: 'Go back' }).click()
  await expect(page).toHaveURL(/\/mand$/)

  // Back to sections list
  await page.getByRole('button', { name: 'Go back' }).click()
  await expect(page).toHaveURL(/\/$/)
})
