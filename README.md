npm init playwright@latest

Getting started with writing end-to-end tests with Playwright:
Initializing project in '.'
? Do you want to use TypeScript or JavaScript? ... 
  TypeScript
> JavaScript select javascript

? Where to put your end-to-end tests? » tests - press enter

? Add a GitHub Actions workflow? (Y/n) » true - press enter

? Install Playwright browsers (can be done manually via 'npx playwright install')? (Y/n) » true - press - enter

npx playwright test --project=chromium - without browser openning

npx playwright test --project=chromium --headed with browser openning

npx playwright show-report - run this to view thr report

click on each test case - explan stdout log , you can see the expected output and reveived output