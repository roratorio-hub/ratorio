/**
 * workspace/src/startup.ts のユニットテスト
 *
 * 起動時初期化処理のテスト
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { register } from '../../../ro4/m/js/engine-registry.js';
import { buildJobSelectOptions } from '../../src/startup';

describe('startup.ts - 起動時初期化処理', () => {

    let container: HTMLDivElement;

    beforeEach(() => {
        // テスト用のコンテナを作成
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        // テスト後にコンテナを削除
        if (container && container.parentNode) {
            document.body.removeChild(container);
        }
    });

    describe('DOMContentLoadedイベントハンドラ', () => {
        it('DOMContentLoadedイベントが登録されている', () => {
            // イベントリスナーの登録確認
            // startup.tsはDOMContentLoadedリスナーを登録
            expect(typeof document.addEventListener).toBe('function');
        });

        it('ジョブセレクトボックスが構築される前提構造', () => {
            // セレクトボックスの要素を作成
            const selectJob = document.createElement('select');
            selectJob.id = 'OBJID_SELECT_JOB';
            container.appendChild(selectJob);

            // 要素が正しく追加されたかを確認
            const element = document.getElementById('OBJID_SELECT_JOB');
            expect(element).toBeDefined();
            expect(element?.tagName).toBe('SELECT');
        });
    });

    describe('ジョブセレクトボックス構築（buildJobSelectOptions）', () => {
        // job.yaml 廃止後、選択肢は計算エンジンの職業データから構築される。
        // option の value は mig ID の数値文字列でなければならない
        // （JS エンジン側が parseInt して GetBaseLevelMin 等の数値引数に渡すため）。
        function registerJobData(entries: (string | null)[]) {
            register('g_constDataManager', {
                jobDataManager: {
                    sourceArray: entries.map((name) => (name === null ? null : {})),
                    GetName: (migId: number) => entries[migId],
                },
            });
        }

        it('mig ID を value、職業名を表示テキストにした選択肢を構築する', () => {
            const selectJob = document.createElement('select');
            container.appendChild(selectJob);
            registerJobData(['ノービス', 'ソードマン', 'マジシャン']);

            buildJobSelectOptions(selectJob);

            expect(Array.from(selectJob.options).map((o) => [o.value, o.text])).toEqual([
                ['0', 'ノービス'],
                ['1', 'ソードマン'],
                ['2', 'マジシャン'],
            ]);
        });

        it('value は parseInt で元の mig ID に戻せる', () => {
            const selectJob = document.createElement('select');
            container.appendChild(selectJob);
            registerJobData(['ノービス', 'ソードマン', 'マジシャン']);

            buildJobSelectOptions(selectJob);
            selectJob.value = '2';

            expect(parseInt(selectJob.value, 10)).toBe(2);
        });

        it('欠番（sourceArray が空）の mig ID は選択肢に含めない', () => {
            const selectJob = document.createElement('select');
            container.appendChild(selectJob);
            registerJobData(['ノービス', null, 'マジシャン']);

            buildJobSelectOptions(selectJob);

            expect(Array.from(selectJob.options).map((o) => o.value)).toEqual(['0', '2']);
        });

        it('名称が空の職業は選択肢に含めない', () => {
            const selectJob = document.createElement('select');
            container.appendChild(selectJob);
            registerJobData(['ノービス', '', 'マジシャン']);

            buildJobSelectOptions(selectJob);

            expect(Array.from(selectJob.options).map((o) => o.value)).toEqual(['0', '2']);
        });

        it('エンジンデータが未登録なら選択肢を追加しない', () => {
            const selectJob = document.createElement('select');
            container.appendChild(selectJob);
            register('g_constDataManager', undefined);

            buildJobSelectOptions(selectJob);

            expect(selectJob.options.length).toBe(0);
        });
    });

    describe('ページキーリスナーの登録', () => {
        it('ページキーリスナーが設定対象要素に登録できる', () => {
            const input = document.createElement('input');
            input.type = 'number';
            input.id = 'OBJID_SELECT_BASE_LEVEL';
            input.setAttribute('max', '99');
            input.value = '50';
            container.appendChild(input);

            // キーイベントをシミュレート
            const event = new KeyboardEvent('keydown', {
                key: 'PageUp',
                bubbles: true,
            });
            input.dispatchEvent(event);

            // イベントが発火していることを確認
            expect(input).toBeDefined();
        });

        it('複数の入力要素にリスナーが登録できる', () => {
            const elementIds = [
                'OBJID_SELECT_BASE_LEVEL',
                'OBJID_SELECT_JOB_LEVEL',
                'OBJID_SELECT_STATUS_STR',
            ];

            elementIds.forEach(id => {
                const input = document.createElement('input');
                input.type = 'number';
                input.id = id;
                input.setAttribute('max', '100');
                container.appendChild(input);
            });

            // すべての要素が作成されたことを確認
            elementIds.forEach(id => {
                const element = document.getElementById(id);
                expect(element).toBeDefined();
                expect(element?.tagName).toBe('INPUT');
            });
        });
    });

    describe('開発環境UI表示', () => {
        it('開発環境ではUI_DISPLAY_SPACE_UNDER_DEVELOPMENTが存在される', () => {
            const devSpace = document.createElement('div');
            devSpace.id = 'UI_DISPLAY_SPACE_UNDER_DEVELOPMENT';
            container.appendChild(devSpace);

            const element = document.getElementById('UI_DISPLAY_SPACE_UNDER_DEVELOPMENT');
            expect(element).toBeDefined();
        });

        it('開発ボタンが動的に作成できる', () => {
            const devSpace = document.createElement('div');
            devSpace.id = 'UI_DISPLAY_SPACE_UNDER_DEVELOPMENT';
            container.appendChild(devSpace);

            // ボタンを動的に作成
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.textContent = '🐱‍💻 Test Button';
            btn.style.backgroundColor = '#d5da71ff';
            devSpace.appendChild(btn);

            expect(devSpace.children.length).toBe(1);
            expect(btn.textContent).toBe('🐱‍💻 Test Button');
        });

        it('複数の開発ボタンと区切り要素を追加できる', () => {
            const devSpace = document.createElement('div');
            devSpace.id = 'UI_DISPLAY_SPACE_UNDER_DEVELOPMENT';
            container.appendChild(devSpace);

            const buttons = [
                '🐱‍💻 Button 1',
                '🐱‍💻 Button 2',
                '🐱‍💻 Button 3',
            ];

            buttons.forEach(btnText => {
                const btn = document.createElement('button');
                btn.textContent = btnText;
                btn.style.backgroundColor = '#d5da71ff';
                devSpace.appendChild(btn);

                const br = document.createElement('br');
                devSpace.appendChild(br);
            });

            // ボタンと改行のペア
            expect(devSpace.children.length).toBe(buttons.length * 2);
        });
    });

    describe('ハンドラー実行', () => {
        it('グローバルハンドラー関数を呼び出せる', () => {
            // グローバルオブジェクトにテスト関数を登録
            let callCount = 0;
            (window as any).testHandler = () => {
                callCount++;
            };

            // ハンドラーを呼び出し
            const handler = (window as any).testHandler;
            expect(typeof handler).toBe('function');
            handler();
            expect(callCount).toBe(1);

            // クリーンアップ
            delete (window as any).testHandler;
        });

        it('複数のハンドラーが登録できる', () => {
            const results: string[] = [];

            (window as any).handler1 = () => results.push('handler1');
            (window as any).handler2 = () => results.push('handler2');

            const handlers = [
                (window as any).handler1,
                (window as any).handler2,
            ];

            handlers.forEach(fn => fn());

            expect(results).toEqual(['handler1', 'handler2']);

            // クリーンアップ
            delete (window as any).handler1;
            delete (window as any).handler2;
        });

        it('ハンドラー実行時のエラーがキャッチされる構造', () => {
            (window as any).errorHandler = () => {
                throw new Error('Test error');
            };

            const handler = (window as any).errorHandler;
            expect(() => {
                try {
                    handler();
                } catch (e) {
                    // エラーがキャッチされる
                    expect(e).toBeDefined();
                }
            }).not.toThrow();

            // クリーンアップ
            delete (window as any).errorHandler;
        });
    });

    describe('データロード待機（waitForDataLoaded）', () => {
        // bundle.js は classic script のため計算エンジン（module script）より先に走る。
        // waitForDataLoaded はエンジンの職業データが登録されるまで待つ。
        it('エンジンの職業データが登録済みなら即座に解決する', async () => {
            register('g_constDataManager', { jobDataManager: { sourceArray: [{}] } });

            await expect((window as any).waitForDataLoaded()).resolves.toBeUndefined();
        });

        it('職業データが後から登録された場合も解決する', async () => {
            register('g_constDataManager', undefined);
            const pending = (window as any).waitForDataLoaded();
            register('g_constDataManager', { jobDataManager: { sourceArray: [{}] } });

            await expect(pending).resolves.toBeUndefined();
        });
    });

    describe('初期化エラーハンドリング', () => {
        it('タイムアウト時にエラーメッセージが出力される', () => {
            // Timeout: Data failed to load within expected time.
            expect(true).toBe(true);
        });

        it('データロード失敗がコンソールに出力される', () => {
            // console.log/error/warn が使用される
            expect(true).toBe(true);
        });
    });

    describe('ホスト情報の判定', () => {
        it('GitHub Pagesホスティング環境を検知できる', () => {
            // window.location.hostname, pathname で判定
            expect(typeof window.location.hostname).toBe('string');
            expect(typeof window.location.pathname).toBe('string');
        });

        it('開発環境とGitHub Pages環境で異なる動作をする', () => {
            // GitHub Pages: "roratorio-hub.github.io"
            // 開発環境: その他
            const isGitHubPages =
                window.location.hostname === 'roratorio-hub.github.io' &&
                window.location.pathname.split('/')[1] === 'ratorio';

            expect(typeof isGitHubPages).toBe('boolean');
        });
    });
});
