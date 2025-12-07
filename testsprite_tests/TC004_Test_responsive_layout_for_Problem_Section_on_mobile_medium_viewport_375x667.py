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
        # -> Scroll down to find the Problem Section 'The Reality' and review its titles, labels, and cards for text overlap or clipping.
        await page.mouse.wheel(0, 600)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        await expect(frame.locator('text=THE REALITY').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=보증금의 압박').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=₩ 100,000,000+').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=끝없는 인테리어').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2 Months+').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=관리 리소스 낭비').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=High Stress').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=경직된 계약 기간').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2 Years Fix').first).to_be_visible(timeout=30000)
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    