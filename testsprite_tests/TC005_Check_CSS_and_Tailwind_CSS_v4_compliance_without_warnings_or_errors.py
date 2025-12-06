import asyncio
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None
    
    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()
        
        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",         # Set the browser window size
                "--disable-dev-shm-usage",        # Avoid using /dev/shm which can cause issues in containers
                "--ipc=host",                     # Use host-level IPC for better stability
                "--single-process"                # Run the browser in a single process mode
            ],
        )
        
        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        context.set_default_timeout(5000)
        
        # Open a new page in the browser context
        page = await context.new_page()
        
        # Navigate to your target URL and wait until the network request is committed
        await page.goto("http://localhost:3000", wait_until="commit", timeout=10000)
        
        # Wait for the main page to reach DOMContentLoaded state (optional for stability)
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=3000)
        except async_api.Error:
            pass
        
        # Iterate through all iframes and wait for them to load as well
        for frame in page.frames:
            try:
                await frame.wait_for_load_state("domcontentloaded", timeout=3000)
            except async_api.Error:
                pass
        
        # Interact with the page elements to simulate user flow
        # -> Run the build process and monitor console output for any CSS errors or warnings
        await page.goto('http://localhost:3000/build', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Check for alternative ways to access build logs or console output for Tailwind CSS warnings, or check project configuration files for Tailwind v4 compatibility issues.
        await page.goto('http://localhost:3000', timeout=10000)
        await asyncio.sleep(3)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        await expect(frame.locator('text=Work where Success Finds You.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Everything Is Ready.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Unlimited Lounge').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Hi-Tech Meeting Rooms').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=24/7 Networking').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Zero Management').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Google').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Samsung').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Naver').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Kakao').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Toss').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Woowa Bros').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Coupang').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=HyperConnect').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Dunamu').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Krafton').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=지금 무료 투어를 신청하고, 30,000원 상당의 웰컴 키트를 받아보세요.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=© 2024 FASTFIVE. All rights reserved.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Privacy Policy').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Terms of Service').first).to_be_visible(timeout=30000)
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    