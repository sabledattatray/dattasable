import asyncio
import os
from playwright.async_api import async_playwright

async def take_screenshots():
    if not os.path.exists('android/screenshots'):
        os.makedirs('android/screenshots')

    async with async_playwright() as p:
        # Launch browser
        browser = await p.chromium.launch(headless=True)
        # Create a mobile context (iPhone 13 dimensions)
        context = await browser.new_context(
            viewport={'width': 390, 'height': 844},
            user_agent='Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
            device_scale_factor=3,
            is_mobile=True,
            has_touch=True
        )
        page = await context.new_page()

        # 1. Home Page
        await page.goto('http://localhost:3001', wait_until='networkidle')
        await asyncio.sleep(2) # Give it a moment to render animations
        await page.screenshot(path='android/screenshots/mobile_home.png')

        # 2. Portfolio Page
        await page.goto('http://localhost:3001/portfolio', wait_until='networkidle')
        await asyncio.sleep(2)
        await page.screenshot(path='android/screenshots/mobile_portfolio.png')

        # 3. Blog Page
        await page.goto('http://localhost:3001/blog', wait_until='networkidle')
        await asyncio.sleep(2)
        await page.screenshot(path='android/screenshots/mobile_blog.png')

        # 4. About Page
        await page.goto('http://localhost:3001/about', wait_until='networkidle')
        await asyncio.sleep(2)
        await page.screenshot(path='android/screenshots/mobile_about.png')

        await browser.close()

asyncio.run(take_screenshots())
