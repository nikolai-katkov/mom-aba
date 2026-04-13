import type { Page } from '@playwright/test'
import { expect, test } from '@playwright/test'

/** Pre-seed localStorage so the onboarding gate doesn't block. */
async function seedOnboarding(page: Page) {
  await page.evaluate(() => {
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
}

test.describe('dictionary flow', () => {
  test('onboarding gate appears on first visit and completes', async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => {
      localStorage.setItem('mom-aba-language', 'en')
      localStorage.removeItem('mom-aba-dictionary-state')
    })
    await page.goto('/')

    // Onboarding should appear
    await expect(page.getByText('Where are we starting?')).toBeVisible()
    await expect(page.getByText('Just starting')).toBeVisible()

    // Select intermediate level
    const intermediateButton = page.locator('button[data-level="intermediate"]')
    await intermediateButton.click()

    // Should transition to the main page after animation
    await expect(page.getByText('Mom ABA')).toBeVisible({ timeout: 2000 })
  })

  test('dictionary card on home page navigates to categories', async ({ page }) => {
    await page.goto('/')
    await seedOnboarding(page)
    await page.goto('/')

    await expect(page.getByText("My Child's Words")).toBeVisible()
    await page.getByText("My Child's Words").click()

    await expect(page).toHaveURL(/\/dictionary$/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText("My Child's Words")
  })

  test('categories page shows 27 category cards', async ({ page }) => {
    await page.goto('/')
    await seedOnboarding(page)
    await page.goto('/dictionary')

    const buttons = page.getByRole('button')
    await expect(buttons).toHaveCount(27)
    await expect(page.getByText('Toys')).toBeVisible()
    await expect(page.getByText('Body Parts')).toBeVisible()
  })

  test('category detail page shows words and supports toggling', async ({ page }) => {
    await page.goto('/')
    await seedOnboarding(page)
    await page.goto('/dictionary/toys')

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Toys')

    const ballButton = page.getByRole('button', { name: 'ball', exact: true }).first()
    await expect(ballButton).toHaveAttribute('aria-pressed', 'true')

    await ballButton.click()
    await expect(ballButton).toHaveAttribute('aria-pressed', 'false')

    await ballButton.click()
    await expect(ballButton).toHaveAttribute('aria-pressed', 'true')
  })

  test('training page shows practice words from dictionary', async ({ page }) => {
    await page.goto('/')
    await seedOnboarding(page)
    await page.goto('/tact/levels/tact-1/train')

    await expect(page.getByText('Practice words')).toBeVisible()
    await expect(page.getByText("From your child's dictionary")).toBeVisible()
    await expect(page.getByText('ball')).toBeVisible()
  })
})
