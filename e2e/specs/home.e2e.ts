import { expect, test } from '@playwright/test'

test('sections list page renders MAND and TACT cards', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('MAND')).toBeVisible()
  await expect(page.getByText('TACT')).toBeVisible()
  await expect(page.getByText('Requests')).toBeVisible()
  await expect(page.getByText('Coming soon')).toBeVisible()
})

test('unknown route shows 404', async ({ page }) => {
  await page.goto('/does-not-exist')
  await expect(page.getByText('404')).toBeVisible()
})
