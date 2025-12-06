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
        # -> Scroll down to reveal more UI components such as Buttons, Cards, Sections, MagneticButton, and GlassCard for inspection.
        await page.mouse.wheel(0, 1000)
        

        # -> Scroll down further to reveal more UI components including MagneticButton and GlassCard for inspection and check for hydration errors and Tailwind v4 compatibility.
        await page.mouse.wheel(0, 1000)
        

        # -> Manually check styling consistency and hydration errors for MagneticButton and GlassCard components by inspecting their visual styles and console logs.
        await page.mouse.wheel(0, -500)
        

        frame = context.pages[-1]
        # Focus on the 'Book a Tour Now Get Welcome Kit' button to test keyboard navigation and ARIA attributes
        elem = frame.locator('xpath=html/body/main/section[3]/div[2]/div/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Manually verify the visual styling consistency of all form elements and interactive components against design specifications and Tailwind v4 compatibility.
        await page.mouse.wheel(0, -300)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        await expect(frame.locator('text=Back to Home').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Book a Tour').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=투어를 신청하시면 담당자가 24시간 이내에 연락드립니다.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=방문 완료 시 웰컴 키트(3만원 상당) 증정').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=이름').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=연락처').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=회사명').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=이메일').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=입주 인원').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=선택해주세요').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=1 ~ 4인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=5 ~ 10인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=11 ~ 20인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=21 ~ 50인').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=50인 이상').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=희망 지역').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=강남/역삼/선릉').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=서초/교대').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=여의도').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=을지로/시청').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=성수').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=기타').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=방문 희망일').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=약관에 모두 동의합니다.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=상담을 위한 개인정보 수집과 이용 동의 (필수)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=혜택 안내를 위한 마케팅 활용 동의 (선택)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=상담과 투어는 모두 무료이며, 원하실 경우 언제든 취소가 가능합니다 😉').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=무료 상담 받기').first).to_be_visible(timeout=30000)
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    