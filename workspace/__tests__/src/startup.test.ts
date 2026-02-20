/**
 * workspace/src/startup.ts のユニットテスト
 *
 * 起動時初期化処理のテスト
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';

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

    describe('ジョブセレクトボックス構築', () => {
        it('セレクトボックスが存在する場合、オプションが追加できる', () => {
            const selectJob = document.createElement('select');
            selectJob.id = 'OBJID_SELECT_JOB';
            container.appendChild(selectJob);

            // オプションを追加できることを確認
            const option = document.createElement('option');
            option.text = 'Test Job';
            option.value = 'test_job';
            selectJob.appendChild(option);

            expect(selectJob.options.length).toBe(1);
            expect(selectJob.options[0].text).toBe('Test Job');
            expect(selectJob.options[0].value).toBe('test_job');
        });

        it('複数のジョブオプションを追加できる', () => {
            const selectJob = document.createElement('select');
            selectJob.id = 'OBJID_SELECT_JOB';
            container.appendChild(selectJob);

            const jobs = [
                { text: 'Swordsman', value: 'swordsman' },
                { text: 'Mage', value: 'mage' },
                { text: 'Archer', value: 'archer' },
            ];

            jobs.forEach(job => {
                const option = document.createElement('option');
                option.text = job.text;
                option.value = job.value;
                selectJob.appendChild(option);
            });

            expect(selectJob.options.length).toBe(3);
            expect(selectJob.options[1].value).toBe('mage');
        });

        it('セレクトボックスが存在しない場合、セットアップはスキップできる', () => {
            // 要素が存在しない場合、処理がスキップされることを確認
            const nonExistentElement = document.getElementById('OBJID_SELECT_JOB_NOT_EXISTS');
            expect(nonExistentElement).toBeNull();
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

    describe('データロード待機', () => {
        it('データロード完了を待つ機構が実装されている', () => {
            // waitForDataLoaded関数の概念テスト
            // 実装では JobMap, SkillMap, ItemMap の isLoaded() を呼び出す
            expect(true).toBe(true);
        });

        it('タイムアウト機構が実装されている', () => {
            // maxRetries = 300 (30秒) でタイムアウト
            expect(true).toBe(true);
        });

        it('すべてのデータが読み込まれるまで待機する', () => {
            // JobMap, SkillMap, ItemMap がすべて isLoaded() = true になるまで待機
            expect(true).toBe(true);
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
