const { chromium } = require("playwright");

const sections = ["welcome", "eat", "drink", "team", "contact"];
const viewports = [
  { name: "iphone-13", width: 390, height: 844 },
  { name: "pixel-7", width: 412, height: 915 },
];

const intersects = (a, b) =>
  a &&
  b &&
  a.width > 0 &&
  a.height > 0 &&
  b.width > 0 &&
  b.height > 0 &&
  a.left < b.right &&
  a.right > b.left &&
  a.top < b.bottom &&
  a.bottom > b.top;

const run = async () => {
  const browser = await chromium.launch({ headless: true });
  const failures = [];

  for (const viewport of viewports) {
    const page = await browser.newPage({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });

    const consoleErrors = [];
    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(message.text());
      }
    });
    page.on("pageerror", (error) => consoleErrors.push(error.message));

    await page.goto("http://localhost:8081/", { waitUntil: "networkidle", timeout: 60000 });

    const baseMetrics = await page.evaluate(() => {
      const doc = document.documentElement;
      const images = [...document.images].map((image) => ({
        src: image.currentSrc || image.src,
        alt: image.alt,
        complete: image.complete,
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
      }));
      const buttons = [...document.querySelectorAll("button, a")]
        .map((node) => {
          const rect = node.getBoundingClientRect();
          return {
            text: node.textContent?.trim().replace(/\s+/g, " ") || node.getAttribute("aria-label") || node.tagName,
            width: rect.width,
            height: rect.height,
          };
        })
        .filter((item) => item.width > 0 && item.height > 0);

      return {
        scrollWidth: doc.scrollWidth,
        clientWidth: doc.clientWidth,
        images,
        buttons,
      };
    });

    if (baseMetrics.scrollWidth > baseMetrics.clientWidth + 2) {
      failures.push(`${viewport.name}: horizontal overflow ${baseMetrics.scrollWidth}px > ${baseMetrics.clientWidth}px`);
    }

    const badImages = baseMetrics.images.filter((image) => !image.complete || image.naturalWidth === 0 || image.naturalHeight === 0);
    if (badImages.length) {
      failures.push(`${viewport.name}: broken images ${badImages.map((image) => image.alt || image.src).join(", ")}`);
    }

    const smallTargets = baseMetrics.buttons.filter((button) => button.width < 40 || button.height < 40);
    if (smallTargets.length) {
      failures.push(`${viewport.name}: small touch targets ${smallTargets.map((button) => `${button.text} ${Math.round(button.width)}x${Math.round(button.height)}`).join(", ")}`);
    }

    for (const section of sections) {
      await page.locator(`#${section}`).scrollIntoViewIfNeeded();
      await page.waitForTimeout(250);
      await page.screenshot({
        path: `C:/tmp/rouin-mobile-${viewport.name}-${section}.png`,
        fullPage: false,
      });
    }

    const collisionResult = await page.evaluate((intersectsSource) => {
      const intersects = new Function(`return ${intersectsSource}`)();
      const visibleTextNodes = [...document.querySelectorAll("h1, h2, h3, p, button, a, span")]
        .map((node) => {
          const rect = node.getBoundingClientRect();
          const text = node.textContent?.trim().replace(/\s+/g, " ");
          return {
            text,
            rect: {
              left: rect.left,
              right: rect.right,
              top: rect.top,
              bottom: rect.bottom,
              width: rect.width,
              height: rect.height,
            },
          };
        })
        .filter((item) => item.text && item.rect.width > 0 && item.rect.height > 0);

      const collisions = [];
      for (let i = 0; i < visibleTextNodes.length; i += 1) {
        for (let j = i + 1; j < visibleTextNodes.length; j += 1) {
          const first = visibleTextNodes[i];
          const second = visibleTextNodes[j];
          if (first.text === second.text || first.text.includes(second.text) || second.text.includes(first.text)) {
            continue;
          }
          if (intersects(first.rect, second.rect)) {
            collisions.push(`${first.text.slice(0, 32)} <> ${second.text.slice(0, 32)}`);
            if (collisions.length >= 8) return collisions;
          }
        }
      }
      return collisions;
    }, intersects.toString());

    if (collisionResult.length) {
      failures.push(`${viewport.name}: possible text overlaps ${collisionResult.join("; ")}`);
    }

    if (consoleErrors.length) {
      failures.push(`${viewport.name}: console errors ${consoleErrors.slice(0, 4).join(" | ")}`);
    }

    await page.close();
  }

  await browser.close();

  if (failures.length) {
    console.error(failures.join("\n"));
    process.exit(1);
  }

  console.log("Mobile checks passed for iPhone 13 and Pixel 7 viewports.");
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
