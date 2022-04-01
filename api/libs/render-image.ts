import type { Browser } from 'puppeteer'
import type { Options } from './params-to-options'

let browser: Browser

export async function renderImage(html: string, options: Options) {
  if (!browser) {
    browser = await launch()
  }

  const page = await browser.newPage()

  await page.setViewport({ width: 1200, height: 630 })

  // Render HTML
  await page.setContent(html, { waitUntil: 'domcontentloaded' })
  await page.evaluateHandle('document.fonts.ready')

  // Wait until all images and fonts have loaded
  // Reference:  https://github.blog/2021-06-22-framework-building-open-graph-images/
  await page.evaluate(async () => {
    const selectors = Array.from(document.querySelectorAll("img"));
    await Promise.all([
      document.fonts.ready,
      ...selectors.map((img) => {
        // Image has already finished loading, let’s see if it worked
        if (img.complete) {
          if (img.naturalHeight !== 0) return;

          throw new Error("Image failed to load");
        }
        // Image hasn’t loaded yet, added an event listener to know when it does
        return new Promise((resolve, reject) => {
          img.addEventListener("load", resolve);
          img.addEventListener("error", reject);
        });
      }),
    ])
  }).catch(() => {})

  const screenShot = await page.screenshot({
    type: options.format as 'jpeg' | 'png' | 'webp',
    fullPage: false
  })

  await page.close()

  return screenShot
}

/**
 * 서버리스 함수에서 사용하는 puppeteer 옵션을 반환한다.
 */
async function launch(): Promise<Browser> {
  // 개발환경일 때
  if (!process.env.AWS_REGION) {
    const puppeteer = (await import('puppeteer')).default

    return puppeteer.launch()
  }

  const core = (await import('puppeteer-core')).default
  const chrome = (await import('chrome-aws-lambda')).default

  // add korean font
  await chrome.font('https://rawcdn.githack.com/orioncactus/pretendard/f0a88392163400ce678039b909fb0a483c7fbc02/dist/public/static/Pretendard-Regular.otf')
  await chrome.font('https://rawcdn.githack.com/orioncactus/pretendard/f0a88392163400ce678039b909fb0a483c7fbc02/dist/public/static/Pretendard-Bold.otf')

  // add emoji
  await chrome.font('https://rawcdn.githack.com/googlefonts/noto-emoji/9a5261d871451f9b5183c93483cbd68ed916b1e9/fonts/NotoColorEmoji.ttf')

  return core.launch({
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless,
  }) as unknown as Browser
}
