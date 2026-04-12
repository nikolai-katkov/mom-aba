import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => {
    localStorage.setItem('mom-aba-language', 'en')
  })
  await page.goto('/')
})

test('sections list page renders MAND and TACT cards', async ({ page }) => {
  await expect(page.getByText('Mand')).toBeVisible()
  await expect(page.getByText('Tact')).toBeVisible()
  await expect(page.getByText('Requests')).toBeVisible()
  await expect(page.getByText('Coming soon')).toBeVisible()
})

test('unknown route shows 404', async ({ page }) => {
  await page.goto('/does-not-exist')
  await expect(page.getByText('404')).toBeVisible()
})

test('language switcher toggles between RU and EN', async ({ page }) => {
  await expect(page.getByText('Requests')).toBeVisible()

  await page.getByRole('button', { name: 'RU' }).click()
  await expect(page.getByText('Просьбы и запросы')).toBeVisible()
  await expect(page.getByText('Скоро доступно')).toBeVisible()

  await page.getByRole('button', { name: 'EN' }).click()
  await expect(page.getByText('Requests')).toBeVisible()
  await expect(page.getByText('Coming soon')).toBeVisible()
})

test('language preference persists across reload', async ({ page }) => {
  await page.getByRole('button', { name: 'RU' }).click()
  await expect(page.getByText('Просьбы и запросы')).toBeVisible()

  await page.reload()
  await expect(page.getByText('Просьбы и запросы')).toBeVisible()
})
