import { expect, test } from '@nuxt/test-utils/playwright'
import type { Page, Response } from 'playwright-core'

const apiMock = process.env.TEST_E2E_MOCK === 'true'

test('Home page', async ({ page, goto }) => {
  await goto('/')
  await expect(page.getByText('Application')).toBeVisible()
  await expect(page.getByRole('list').locator('i')).toBeVisible()
  await expect(
    page.getByRole('list').getByRole('link', { name: 'Home' }),
  ).toBeVisible()
  await expect(page.getByText('Demo sandbox')).toBeVisible()
  await expect(page.getByText('Choose a demo in the')).toBeVisible()
  const navigationDrawer = page.getByTestId('navigation-drawer')
  await expect(navigationDrawer).toBeVisible()
  await navigationDrawer.click()
  await expect(
    page.getByRole('listbox').getByRole('link', { name: 'Home' }),
  ).toBeVisible()
  await expect(page.getByText('demos')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Hello' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Counter' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Login' })).toBeVisible()
})

test('Hello page', async ({ goto, page }) => {
  const expectedResult = apiMock ? 'hacked!' : 'world!'
  if (apiMock) {
    await page.route('/api/hello', async (route) => {
      const json = {
        hello: expectedResult,
      }
      await route.fulfill({ json })
    })
  }
  await goto('/demos/hello')
  await expect(page.getByText('Home/demos/Hello')).toBeVisible()
  await expect(
    page.getByRole('list').getByRole('link', { name: 'Hello' }),
  ).toBeVisible()
  await expect(page.getByText('Hello demo')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Hello' })).toBeVisible()
  await page.getByRole('button', { name: 'Hello' }).click()
  await expect(page.getByText(`${expectedResult}`)).toBeVisible()
})

test.describe('Protected routes', () => {
  const signIn = async (
    page: Page,
    goto: (
      url: string,
      options?: { waitUntil: 'hydration' },
    ) => Promise<Response | null>,
  ) => {
    await goto('/demos/login', { waitUntil: 'hydration' })
    await page.evaluate(() => {
      const key =
        'firebase:authUser:AIzaSyDeA83Srhd4Ku5M135FWnZfE3nU1frHW9E:[DEFAULT]'
      const value = {
        uid: 'TPo9eCptvod9z8K3FzpIHnwPahJ3',
        email: 'openhoat@gmail.com',
        emailVerified: true,
        displayName: 'Olivier Penhoat',
        isAnonymous: false,
        photoURL:
          'https://lh3.googleusercontent.com/a/ACg8ocLj8ZajnuuO4FNjN5F3cPf0f3qY8XsGO9J59UKUZPnXMo1gtxQtxg=s96-c',
        providerData: [
          {
            providerId: 'google.com',
            uid: '113865170590660751782',
            displayName: 'Olivier Penhoat',
            email: 'openhoat@gmail.com',
            phoneNumber: null,
            photoURL:
              'https://lh3.googleusercontent.com/a/ACg8ocLj8ZajnuuO4FNjN5F3cPf0f3qY8XsGO9J59UKUZPnXMo1gtxQtxg=s96-c',
          },
        ],
        stsTokenManager: {
          refreshToken:
            'AMf-vBw0rNaovsZ4KF8J7We5dp5TnU6ZrPLJ5xoAQ4NDN4JI6kS0rQgbehUnhu0bu9lPjpPQMez3DtRoN2gaNvjyCj3VrC4Y2vznQrYF4paBkG6g9em8zeaGB20_zflgCqEFeEkwtZgXnjdiKc3gsAzm0g6vR8148wqf04vrkk85mVgqAc4NcS9s8BGki6kjdX4HWh22VDG5gos7kg1Vt3y5qOT57hZ5iKdHbgSSoSpoCqwHlXvSC5RFBRFodgSRW-E_oyXwYzLydFULTO98ca1BumsfX6ma0G2pbvN7x0OPUp5M6a2VFwlTMHVHiKogZLD0XBimF_YrN--r1rcnvwxFtxqLrWQTwccc8HOEWQtUajcOh-Ggcl-z7ESFMrLqLGiYWrN_E7pHG4ZmfuEKHpWHoD__TQWpQM7vlqTAQDruGVIbnEkx2BAlsiAOrkULTNdpvlfzQLSK',
          accessToken:
            'eyJhbGciOiJSUzI1NiIsImtpZCI6IjNmZDA3MmRmYTM4MDU2NzlmMTZmZTQxNzM4YzJhM2FkM2Y5MGIyMTQiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiT2xpdmllciBQZW5ob2F0IiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0xqOFpham51dU80Rk5qTjVGM2NQZjBmM3FZOFhzR085SjU5VUtVWlBuWE1vMWd0eFF0eGc9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaGVhZHdvb2QtMWNkZmIiLCJhdWQiOiJoZWFkd29vZC0xY2RmYiIsImF1dGhfdGltZSI6MTczMjYwNjQwMCwidXNlcl9pZCI6IlRQbzllQ3B0dm9kOXo4SzNGenBJSG53UGFoSjMiLCJzdWIiOiJUUG85ZUNwdHZvZDl6OEszRnpwSUhud1BhaEozIiwiaWF0IjoxNzMyNjA2NDAwLCJleHAiOjE3MzI2MTAwMDAsImVtYWlsIjoib3BlbmhvYXRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTM4NjUxNzA1OTA2NjA3NTE3ODIiXSwiZW1haWwiOlsib3BlbmhvYXRAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.r9xyLpNDzZvMuznDMvR-7JYGHRVoGU5rZgmrOI-din8uB23dEO1U6lrto7S3A2s32ptoi-Ev2Asj2hC-IO1zg66caXPbN3JRN3G9LQFHg-zBcRiItTIpRSCxme9KgmBwxd01qDrfyxGuJRdoHMWZG3kaAvUgsl8xtIE15_jyWHdnEV6EUfHz37XGkPYL2G48zePv6fL_zG7AG43z-Bema0mtDapQrOIdnKamfBt_kPNxH7DGscbXxeMfRXKupWLyrxMI16i_zrkjIOs0GPNvz4OY72eZyhEgZsvS8xAO8URsSjVBzC0hUHnbtZr-kFBvsUr6f5hso6Ka-PzicXed3Q',
          expirationTime: 1732610000402,
        },
        createdAt: '1732178020087',
        lastLoginAt: '1732606353447',
        apiKey: 'AIzaSyDeA83Srhd4Ku5M135FWnZfE3nU1frHW9E',
        appName: '[DEFAULT]',
      }
      localStorage.setItem(key, JSON.stringify(value))
    })
  }
  test('Counter page', async ({ goto, page }) => {
    if (apiMock) {
      let apiCounterValue = 0
      await page.route('/api/counter', async (route) => {
        await route.fulfill({ json: { value: apiCounterValue++ } })
      })
    }
    await signIn(page, goto)
    await goto('/demos/counter', { waitUntil: 'hydration' })
    await expect(page.getByText('Home/demos/Counter')).toBeVisible()
    await expect(
      page.getByRole('list').getByRole('link', { name: 'Counter' }),
    ).toBeVisible()
    await expect(page.getByText('Counter demo')).toBeVisible()
    await expect(page.getByTestId('counterButton')).toBeVisible()
    const clickCounter = async () => {
      await page.getByTestId('counterButton').click()
      await page.waitForResponse(
        (res) => res.url().includes('/api/counter') && res.status() === 200,
      )
      const content = (
        await page.getByTestId('counterText').allTextContents()
      )[0]
      const value = Number(content)
      expect(Number.isNaN(value)).toBe(false)
      return value
    }
    const initialValue = await clickCounter()
    const value = await clickCounter()
    expect(value).toBe(initialValue + 1)
  })
})
