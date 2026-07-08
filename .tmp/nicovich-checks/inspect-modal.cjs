const { chromium } = require('playwright')

async function main() {
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
  await page.goto('http://localhost:3000/proposal/nicovich')
  await page.waitForLoadState('networkidle')
  await page.locator('#visual-impact').scrollIntoViewIfNeeded()
  await page.waitForTimeout(900)
  await page.getByRole('button', { name: /Open Ferrari 296 GTB gallery/i }).click()
  await page.waitForTimeout(300)
  const buttons = await page.evaluate(() =>
    Array.from(document.querySelectorAll('[role="dialog"] button')).map((button) => {
      const rect = button.getBoundingClientRect()
      const styles = getComputedStyle(button)
      return {
        label: button.getAttribute('aria-label'),
        text: button.textContent?.trim(),
        className: button.className,
        rect: {
          x: Math.round(rect.x),
          y: Math.round(rect.y),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        },
        color: styles.color,
        display: styles.display,
        opacity: styles.opacity,
        zIndex: styles.zIndex,
        background: styles.backgroundColor,
      }
    })
  )
  console.log(JSON.stringify(buttons, null, 2))
  await browser.close()
}

main()
