import { expect, test } from 'playwright/test'

const route = 'http://localhost:3000/proposal/nicovich'

const viewports = [
  [320, 568],
  [375, 667],
  [390, 844],
  [414, 896],
  [430, 932],
  [768, 1024],
  [820, 1180],
  [1024, 1366],
  [1280, 720],
  [1440, 900],
  [1536, 864],
  [1920, 1080],
  [2560, 1440],
] as const

const sectionScreenshots = new Set(['390x844', '820x1180', '1440x900'])

test.describe('NICOVICH proposal responsive audit', () => {
  for (const [width, height] of viewports) {
    test(`${width}x${height} has no overflow and usable gallery modal`, async ({ page }) => {
      const label = `${width}x${height}`
      await page.setViewportSize({ width, height })
      await page.goto(route)
      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(1200)

      await expect(page.getByRole('heading', { name: /NICOVICH/i })).toBeVisible()
      await expect(page.getByRole('link', { name: /Explore the vision/i })).toBeVisible()
      await expect(page.getByText('Automotive Content & Creative Direction')).toBeVisible()

      const visualSection = page.locator('#visual-impact')
      await visualSection.scrollIntoViewIfNeeded()
      await page.waitForTimeout(900)
      await expect(page.getByRole('heading', { name: /Fleet This Strong/i })).toBeVisible()
      await expect(
        page.getByRole('button', { name: /Open Ferrari 296 GTB gallery/i })
      ).toBeVisible()

      const hasHorizontalOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth + 2
      )
      expect(hasHorizontalOverflow).toBe(false)

      if (sectionScreenshots.has(label)) {
        await page.screenshot({ path: `.tmp/nicovich-checks/visual-${label}.png` })
      }

      await page.getByRole('button', { name: /Open Ferrari 296 GTB gallery/i }).click()
      await expect(page.getByRole('dialog', { name: /Ferrari 296 GTB/i })).toBeVisible()
      await page.keyboard.press('ArrowRight')
      await page.keyboard.press('ArrowLeft')
      await expect(page.getByRole('button', { name: /Close gallery/i }).first()).toBeFocused()

      if (sectionScreenshots.has(label)) {
        await page.screenshot({ path: `.tmp/nicovich-checks/modal-${label}.png` })
      }

      await page.keyboard.press('Escape')
      await expect(page.getByRole('dialog')).toHaveCount(0)

      await page
        .getByRole('heading', { name: /Content Built To Make The Customer Pause/i })
        .scrollIntoViewIfNeeded()
      await page.waitForTimeout(900)
      await expect(page.getByRole('link', { name: /Convoy Energy/i })).toBeVisible()

      await page.locator('#about').scrollIntoViewIfNeeded()
      await page.waitForTimeout(900)
      await expect(page.getByRole('heading', { name: /Premium Cars Need/i })).toBeVisible()

      await page.locator('#contact').scrollIntoViewIfNeeded()
      await page.waitForTimeout(900)
      await expect(
        page.getByRole('heading', { name: /NICOVICH already has the cars/i })
      ).toBeVisible()

      const finalHorizontalOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth + 2
      )
      expect(finalHorizontalOverflow).toBe(false)
    })
  }
})
