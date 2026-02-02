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

  test.describe('#006 Jail Break', () => {
    test('タイトル画面が表示される', async ({ page }) => {
      await page.goto(`${BASE_URL}/006-jail-break/`);
      await page.waitForTimeout(500);
      await expect(page.locator('#title-screen')).toBeVisible();
      await expect(page.getByRole('button', { name: '▶ START' })).toBeVisible();
    });

    test('ゲームが開始できる', async ({ page }) => {
      await page.goto(`${BASE_URL}/006-jail-break/`);
      await page.waitForTimeout(500);
      await page.click('.start-btn');
      await page.waitForTimeout(500);
      // HUD表示確認
      await expect(page.locator('#hud')).toBeVisible();
      await expect(page.locator('#score')).toBeVisible();
    });

    test('パドルが動く', async ({ page }) => {
      await page.goto(`${BASE_URL}/006-jail-break/`);
      await page.waitForTimeout(500);
      await page.click('.start-btn');
      await page.waitForTimeout(300);
      
      // 矢印キーでパドル移動
      await page.keyboard.press('ArrowLeft');
      await page.keyboard.press('ArrowRight');
      
      // ゲームがクラッシュしていないことを確認
      await expect(page.locator('#score')).toBeVisible();
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

  test.describe('#010 Wanted Pairs', () => {
    test('ゲームボードが表示される', async ({ page }) => {
      await page.goto(`${BASE_URL}/010-memory/`);
      await page.waitForTimeout(500);
      await expect(page.locator('h1')).toContainText('WANTED PAIRS');
      await expect(page.locator('#board')).toBeVisible();
    });

    test('カードがクリックできる', async ({ page }) => {
      await page.goto(`${BASE_URL}/010-memory/`);
      await page.waitForTimeout(500);
      // Click first card
      await page.click('.card:first-child');
      await expect(page.locator('.card:first-child')).toHaveClass(/flipped/);
    });

    test('難易度を変更できる', async ({ page }) => {
      await page.goto(`${BASE_URL}/010-memory/`);
      await page.waitForTimeout(500);
      await page.click('.diff-btn[data-size="6"]');
      await expect(page.locator('.diff-btn[data-size="6"]')).toHaveClass(/active/);
    });
  });

  test.describe('#009 Dusty Trails', () => {
    test('キャラクター作成画面が表示される', async ({ page }) => {
      await page.goto(`${BASE_URL}/009-trpg/`);
      await page.waitForTimeout(1000);
      await expect(page.locator('header h1')).toContainText('DUSTY TRAILS');
      await expect(page.locator('#char-name')).toBeVisible();
    });

    test('クラスを選択できる', async ({ page }) => {
      await page.goto(`${BASE_URL}/009-trpg/`);
      await page.waitForTimeout(500);
      // Click on gunslinger class
      await page.click('.class-card[data-class="gunslinger"]');
      await expect(page.locator('.class-card[data-class="gunslinger"]')).toHaveClass(/selected/);
    });

    test('ゲームを開始できる', async ({ page }) => {
      await page.goto(`${BASE_URL}/009-trpg/`);
      await page.waitForTimeout(500);
      await page.fill('#char-name', 'TestPlayer');
      await page.click('.class-card[data-class="sheriff"]');
      await page.click('.choice-btn');
      await page.waitForTimeout(500);
      // Stats bar should be visible
      await expect(page.locator('#stats-bar')).toHaveClass(/visible/);
    });
  });

  test.describe('#008 Quick Draw Showdown', () => {
    test('タイトル画面が表示される', async ({ page }) => {
      await page.goto(`${BASE_URL}/008-showdown/`);
      await page.waitForTimeout(500);
      await expect(page.locator('#title-screen')).toBeVisible();
      await expect(page.locator('#title-screen h1')).toContainText('QUICK DRAW');
    });

    test('ゲームが開始できる', async ({ page }) => {
      await page.goto(`${BASE_URL}/008-showdown/`);
      await page.waitForTimeout(500);
      await page.click('.start-btn');
      await page.waitForTimeout(500);
      // タイトル画面が消えることを確認
      await expect(page.locator('#title-screen')).toHaveClass(/hidden/);
      // HUDが表示されることを確認
      await expect(page.locator('#hud')).toBeVisible();
    });

    test('スペースキーで撃てる', async ({ page }) => {
      await page.goto(`${BASE_URL}/008-showdown/`);
      await page.waitForTimeout(500);
      await page.click('.start-btn');
      // Wait for "DRAW!" (max 5 seconds)
      await page.waitForTimeout(5000);
      await page.keyboard.press('Space');
      // ゲームがクラッシュしていないことを確認
      await expect(page.locator('#game-container')).toBeVisible();
    });
  });

  test.describe('#007 Dusty Trail Dash', () => {
    test('タイトル画面が表示される', async ({ page }) => {
      await page.goto(`${BASE_URL}/007-claude-game/`);
      await page.waitForTimeout(500);
      await expect(page.locator('#titleScreen')).toBeVisible();
      await expect(page.locator('h1')).toContainText('DUSTY TRAIL');
    });

    test('ゲームが開始できる', async ({ page }) => {
      await page.goto(`${BASE_URL}/007-claude-game/`);
      await page.waitForTimeout(500);
      await page.keyboard.press('Space');
      await page.waitForTimeout(500);
      // タイトル画面が消えることを確認
      await expect(page.locator('#titleScreen')).toHaveClass(/hidden/);
    });

    test('レーン移動ができる', async ({ page }) => {
      await page.goto(`${BASE_URL}/007-claude-game/`);
      await page.waitForTimeout(500);
      await page.keyboard.press('Space'); // ゲーム開始
      await page.waitForTimeout(300);
      
      // 左右移動
      await page.keyboard.press('ArrowLeft');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('Space'); // ジャンプ
      
      // ゲームがクラッシュしていないことを確認
      await expect(page.locator('#gameCanvas')).toBeVisible();
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

  test.describe('#011 Saddle Up!', () => {
    test('タイトル画面が表示される', async ({ page }) => {
      await page.goto(`${BASE_URL}/011-bronco/`);
      await expect(page.locator('#title-screen h1')).toContainText('SADDLE UP');
    });

    test('ゲームが開始できる', async ({ page }) => {
      await page.goto(`${BASE_URL}/011-bronco/`);
      await page.click('.btn');
      await expect(page.locator('#title-screen')).toHaveClass(/hidden/);
    });

    test('矢印ボタンが反応する', async ({ page }) => {
      await page.goto(`${BASE_URL}/011-bronco/`);
      await page.click('.btn');
      await page.waitForTimeout(500);
      // 矢印キーを押すとゲームが反応する（バランスメーターがある）
      await expect(page.locator('#balance-bar')).toBeVisible();
      await page.keyboard.press('ArrowLeft');
      await page.keyboard.press('ArrowRight');
    });
  });

  test.describe('#012 Horseshoe Toss', () => {
    test('タイトル画面が表示される', async ({ page }) => {
      await page.goto(`${BASE_URL}/012-horseshoe/`);
      await expect(page.locator('#title-screen h1')).toContainText('HORSESHOE');
    });

    test('ゲームが開始できる', async ({ page }) => {
      await page.goto(`${BASE_URL}/012-horseshoe/`);
      await page.click('.btn');
      await expect(page.locator('#title-screen')).toHaveClass(/hidden/);
    });

    test('蹄鉄と杭が表示される', async ({ page }) => {
      await page.goto(`${BASE_URL}/012-horseshoe/`);
      await page.click('.btn');
      await expect(page.locator('#stake')).toBeVisible();
      await expect(page.locator('.horseshoe')).toBeVisible();
    });
  });

  test.describe('#013 Pony Express', () => {
    test('タイトル画面が表示される', async ({ page }) => {
      await page.goto(`${BASE_URL}/013-pony-express/`);
      await expect(page.locator('#start-screen')).toBeVisible();
      await expect(page.locator('#start-screen .screen-title')).toContainText('PONY EXPRESS');
    });

    test('ゲームが開始できる', async ({ page }) => {
      await page.goto(`${BASE_URL}/013-pony-express/`);
      await page.click('#start-btn');
      await expect(page.locator('#start-screen')).toBeHidden();
    });

    test('UIが表示される', async ({ page }) => {
      await page.goto(`${BASE_URL}/013-pony-express/`);
      await page.click('#start-btn');
      await expect(page.locator('#mail')).toBeVisible();
      await expect(page.locator('#distance')).toBeVisible();
      await expect(page.locator('#score')).toBeVisible();
    });
  });

  test.describe('#014 Canyon Leap', () => {
    test('タイトル画面が表示される', async ({ page }) => {
      await page.goto(`${BASE_URL}/014-canyon-leap/`);
      await expect(page.locator('#start-screen')).toBeVisible();
      await expect(page.locator('#start-screen .screen-title')).toContainText('CANYON LEAP');
    });

    test('ゲームが開始できる', async ({ page }) => {
      await page.goto(`${BASE_URL}/014-canyon-leap/`);
      await page.click('#start-btn');
      await expect(page.locator('#start-screen')).toBeHidden();
    });

    test('パワーバーが表示される', async ({ page }) => {
      await page.goto(`${BASE_URL}/014-canyon-leap/`);
      await page.click('#start-btn');
      await expect(page.locator('#power-bar')).toBeVisible();
      await expect(page.locator('#level')).toBeVisible();
      await expect(page.locator('#lives')).toBeVisible();
    });
  });

  test.describe('#015 Lasso Roundup', () => {
    test('タイトル画面が表示される', async ({ page }) => {
      await page.goto(`${BASE_URL}/015-lasso/`);
      await expect(page.locator('#start-screen')).toBeVisible();
      await expect(page.locator('#start-screen .screen-title')).toContainText('LASSO ROUNDUP');
    });

    test('ゲームが開始できる', async ({ page }) => {
      await page.goto(`${BASE_URL}/015-lasso/`);
      await page.click('#start-btn');
      await expect(page.locator('#start-screen')).toBeHidden();
    });

    test('UIが表示される', async ({ page }) => {
      await page.goto(`${BASE_URL}/015-lasso/`);
      await page.click('#start-btn');
      await expect(page.locator('#caught')).toBeVisible();
      await expect(page.locator('#time')).toBeVisible();
      await expect(page.locator('#score')).toBeVisible();
    });
  });

});
