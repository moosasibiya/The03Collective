import { chromium } from 'playwright'

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
]

const screenshotLabels = new Set(['390x844', '820x1180', '1440x900'])
const failures = []

async function assertVisible(locator, label) {
  if (!(await locator.isVisible())) {
    throw new Error(`${label} is not visible`)
  }
}

async function assertNoHorizontalOverflow(page, label) {
  const overflow = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }))

  if (overflow.scrollWidth > overflow.innerWidth + 2) {
    throw new Error(
      `${label} has horizontal overflow: ${overflow.scrollWidth}px > ${overflow.innerWidth}px`
    )
  }
}

const browser = await chromium.launch()

for (const [width, height] of viewports) {
  const label = `${width}x${height}`
  const page = await browser.newPage({ viewport: { width, height } })

  try {
    await page.goto(route)
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1200)

    await assertVisible(
      page.getByRole('heading', { name: /NICOVICH\.\s*Unmissable/i }),
      `${label} hero heading`
    )
    await assertVisible(
      page.getByRole('link', { name: /Explore the vision/i }),
      `${label} hero CTA`
    )
    await assertVisible(
      page.getByText('Automotive Content & Creative Direction'),
      `${label} header`
    )
    await assertNoHorizontalOverflow(page, `${label} hero`)

    await page.locator('#visual-impact').scrollIntoViewIfNeeded()
    await page.waitForTimeout(900)
    await assertVisible(
      page.getByRole('heading', { name: /Fleet This Strong/i }),
      `${label} gallery heading`
    )
    await assertVisible(
      page.getByRole('button', { name: /Open Ferrari 296 GTB gallery/i }),
      `${label} Ferrari gallery card`
    )
    await assertNoHorizontalOverflow(page, `${label} gallery`)

    if (screenshotLabels.has(label)) {
      await page.screenshot({ path: `.tmp/nicovich-checks/visual-${label}.png` })
    }

    await page.getByRole('button', { name: /Open Ferrari 296 GTB gallery/i }).click()
    await assertVisible(page.getByRole('dialog', { name: /Ferrari 296 GTB/i }), `${label} modal`)
    await page.keyboard.press('ArrowRight')
    await page.keyboard.press('ArrowLeft')

    const activeLabel = await page.evaluate(() =>
      document.activeElement?.getAttribute('aria-label')
    )
    if (activeLabel !== 'Close gallery') {
      throw new Error(`${label} modal did not focus the close button`)
    }

    if (screenshotLabels.has(label)) {
      await page.screenshot({ path: `.tmp/nicovich-checks/modal-${label}.png` })
    }

    await page.keyboard.press('Escape')
    if ((await page.getByRole('dialog').count()) !== 0) {
      throw new Error(`${label} modal did not close with Escape`)
    }

    await page
      .getByRole('heading', { name: /Content Built To Make The Customer Pause/i })
      .scrollIntoViewIfNeeded()
    await page.waitForTimeout(900)
    await assertVisible(page.getByRole('link', { name: /Convoy Energy/i }), `${label} work card`)

    await page.locator('#about').scrollIntoViewIfNeeded()
    await page.waitForTimeout(900)
    await assertVisible(
      page.getByRole('heading', { name: /Premium Cars Need/i }),
      `${label} about heading`
    )

    await page.locator('#contact').scrollIntoViewIfNeeded()
    await page.waitForTimeout(900)
    await assertVisible(
      page.getByRole('heading', { name: /NICOVICH already has the cars/i }),
      `${label} final CTA`
    )
    await assertNoHorizontalOverflow(page, `${label} final`)
  } catch (error) {
    failures.push(`${label}: ${error.message}`)
  } finally {
    await page.close()
  }
}

await browser.close()

if (failures.length > 0) {
  console.error(failures.join('\n'))
  process.exit(1)
}

console.log(`Responsive audit passed for ${viewports.length} viewport sizes.`)
