// @ts-check
const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://127.0.0.1:8888';

test.describe('Sheriff Jim\'s Retro Arcade', () => {
  
  test('ポータルページが読み込める', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('h1')).toContainText('RETRO ARCADE');
  });

  test.describe('#002 Space Cowboy', () => {
    test('タイトル画面が表示される', async ({ page }) => {
      await page.goto(`${BASE_URL}/002-space-cowboy/`);
      // アニメーション待機
      await page.waitForTimeout(1500);
      await expect(page.locator('#start-screen')).toBeVisible();
      await expect(page.getByRole('button', { name: '▶ START' })).toBeVisible();
    });

    test('ゲームが開始できる', async ({ page }) => {
      await page.goto(`${BASE_URL}/002-space-cowboy/`);
      await page.click('.start-btn');
      // プレイヤーが表示されることを確認（canvas内）
      await page.waitForTimeout(500);
      // スコア表示があることを確認
      await expect(page.locator('#score')).toBeVisible();
    });

    test('キーボード操作ができる', async ({ page }) => {
      await page.goto(`${BASE_URL}/002-space-cowboy/`);
      await page.click('.start-btn');
      await page.waitForTimeout(300);
      
      // 左右移動テスト
      await page.keyboard.press('ArrowLeft');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('Space'); // 射撃
      
      // ゲームがクラッシュしていないことを確認
      await expect(page.locator('#score')).toBeVisible();
    });
  });

  test.describe('#003 Gold Rush Express', () => {
    test('タイトル画面が表示される', async ({ page }) => {
      await page.goto(`${BASE_URL}/003-gold-rush/`);
      await expect(page.locator('h1')).toContainText('GOLD RUSH EXPRESS');
    });

    test('ゲームボードが表示される', async ({ page }) => {
      await page.goto(`${BASE_URL}/003-gold-rush/`);
      // スコア表示
      await expect(page.locator('#score')).toBeVisible();
      await expect(page.locator('#length')).toBeVisible();
    });

    test('キーボード操作ができる', async ({ page }) => {
      await page.goto(`${BASE_URL}/003-gold-rush/`);
      await page.waitForTimeout(500);
      
      // 方向キーテスト
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowLeft');
      await page.keyboard.press('ArrowRight');
      
      // ゲームがクラッシュしていないことを確認
      await expect(page.locator('#score')).toBeVisible();
    });
  });

  test.describe('#004 Wanted!', () => {
    test('タイトル画面が表示される', async ({ page }) => {
      await page.goto(`${BASE_URL}/004-wanted/`);
      await expect(page.locator('text=WANTED!')).toBeVisible();
    });

    test('ゲーム要素が表示される', async ({ page }) => {
      await page.goto(`${BASE_URL}/004-wanted/`);
      await expect(page.locator('text=SCORE')).toBeVisible();
      await expect(page.locator('text=TIME')).toBeVisible();
      await expect(page.locator('text=COMBO')).toBeVisible();
    });

    test('穴（ホール）がクリックできる', async ({ page }) => {
      await page.goto(`${BASE_URL}/004-wanted/`);
      await page.waitForTimeout(500);
      
      // 穴をクリック（div.hole要素）
      const holes = page.locator('.hole');
      const count = await holes.count();
      expect(count).toBeGreaterThan(0);
      
      // 最初の穴をクリック
      await holes.first().click();
    });
  });

  test.describe('#005 Cactus Jack', () => {
    test('タイトル画面が表示される', async ({ page }) => {
      await page.goto(`${BASE_URL}/005-cactus-jack/`);
      await page.waitForTimeout(1000);
      await expect(page.locator('#title-screen')).toBeVisible();
      await expect(page.getByRole('button', { name: '▶ START' })).toBeVisible();
    });

    test('ゲームが開始できる', async ({ page }) => {
      await page.goto(`${BASE_URL}/005-cactus-jack/`);
      await page.waitForTimeout(500);
      await page.click('.start-btn');
      await page.waitForTimeout(300);
      // HUDが表示されることを確認
      await expect(page.locator('#hud')).toBeVisible();
      await expect(page.locator('#score')).toBeVisible();
    });

    test('スペースキーで飛べる', async ({ page }) => {
      await page.goto(`${BASE_URL}/005-cactus-jack/`);
      await page.waitForTimeout(500);
      await page.click('.start-btn');
      await page.waitForTimeout(300);
      
      // スペースキーで飛ぶ
      await page.keyboard.press('Space');
      await page.keyboard.press('Space');
      
      // ゲームがクラッシュしていないことを確認
      await expect(page.locator('#score')).toBeVisible();
    });
  });

  test.describe('#001 Hawkins 1984', () => {
    test('タイトル画面が表示される', async ({ page }) => {
      await page.goto(`${BASE_URL}/001-hawkins/`);
      await expect(page.locator('.title')).toContainText('HAWKINS');
    });

    test('ゲーム選択メニューがある', async ({ page }) => {
      await page.goto(`${BASE_URL}/001-hawkins/`);
      // アニメーション待機（ロケーションボタンのフェードイン）
      await page.waitForTimeout(2000);
      // 6つのミニゲームがあることを確認（DOMに存在するか）
      const arcadeBtn = page.locator('.location-btn', { hasText: 'PALACE ARCADE' });
      const forestBtn = page.locator('.location-btn', { hasText: 'MIRKWOOD FOREST' });
      await expect(arcadeBtn).toBeAttached();
      await expect(forestBtn).toBeAttached();
    });
  });

});
