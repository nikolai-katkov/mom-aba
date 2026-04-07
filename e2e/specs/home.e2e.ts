import { expect, test } from '@playwright/test'

test('home page renders title', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Neuron')
})

test('unknown route shows 404', async ({ page }) => {
  await page.goto('/does-not-exist')
  await expect(page.getByText('404')).toBeVisible()
})
