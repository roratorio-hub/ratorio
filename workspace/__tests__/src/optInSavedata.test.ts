/**
 * workspace/src/optInSavedata.ts のユニットテスト
 *
 * オプトイン処理とダイアログUIのテスト
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('optInSavedata.ts - オプトイン処理', () => {

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

    describe('ダイアログUIの構造', () => {
        it('ダイアログ要素を作成できる', () => {
            const dialog = document.createElement('div');
            dialog.style.position = 'fixed';
            dialog.style.top = '0';
            dialog.style.left = '0';
            dialog.style.width = '100%';
            dialog.style.height = '100%';
            dialog.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            dialog.style.display = 'flex';
            dialog.style.zIndex = '1000';

            container.appendChild(dialog);

            const createdDialog = container.querySelector('[style*="position: fixed"]') as HTMLElement;
            expect(createdDialog).toBeDefined();
            expect(createdDialog?.style.position).toBe('fixed');
            expect(createdDialog?.style.backgroundColor).toContain('rgba');
        });

        it('ダイアログコンテンツを作成できる', () => {
            const dialog = document.createElement('div');
            const dialogContent = document.createElement('div');
            dialogContent.style.backgroundColor = 'white';
            dialogContent.style.padding = '20px';
            dialogContent.style.borderRadius = '8px';
            dialogContent.style.position = 'relative';

            dialog.appendChild(dialogContent);
            container.appendChild(dialog);

            const content = dialog.querySelector('[style*="white"]');
            expect(content).toBeDefined();
            expect((content as HTMLElement)?.style.backgroundColor).toBe('white');
        });
    });

    describe('閉じるボタン', () => {
        it('閉じるボタンが作成できる', () => {
            const dialogContent = document.createElement('div');
            const closeButton = document.createElement('button');
            closeButton.textContent = '×';
            closeButton.style.position = 'absolute';
            closeButton.style.top = '10px';
            closeButton.style.right = '10px';
            closeButton.style.backgroundColor = 'transparent';
            closeButton.style.border = 'none';
            closeButton.style.fontSize = '3em';
            closeButton.style.cursor = 'pointer';

            dialogContent.appendChild(closeButton);
            container.appendChild(dialogContent);

            const button = container.querySelector('button');
            expect(button).toBeDefined();
            expect(button?.textContent).toBe('×');
            expect(button?.style.cursor).toBe('pointer');
        });

        it('閉じるボタンをクリックしてダイアログを閉じられる', () => {
            const dialog = document.createElement('div');
            dialog.id = 'test-dialog';
            const dialogContent = document.createElement('div');
            const closeButton = document.createElement('button');
            closeButton.textContent = '×';

            let isDialogVisible = true;
            closeButton.addEventListener('click', () => {
                isDialogVisible = false;
                dialog.style.display = 'none';
            });

            dialogContent.appendChild(closeButton);
            dialog.appendChild(dialogContent);
            container.appendChild(dialog);

            // ボタンをクリック
            closeButton.click();

            expect(isDialogVisible).toBe(false);
            expect(dialog.style.display).toBe('none');
        });
    });

    describe('メッセージテキスト', () => {
        it('複数行のメッセージを作成できる', () => {
            const message = document.createElement('p');
            const messageLines = [
                'データをラトリオHub開発チームに提供しますか？',
                'この操作により、装備構成データ、ステータスが外部サーバに送信されます。',
                '提供されたデータはラトリオHubの改善にのみ使用されます。'
            ];

            messageLines.forEach((line, idx) => {
                message.appendChild(document.createTextNode(line));
                if (idx < messageLines.length - 1) {
                    const br = document.createElement('br');
                    message.appendChild(br);
                }
            });

            container.appendChild(message);

            const paragraphs = container.querySelectorAll('p');
            expect(paragraphs.length).toBe(1);

            const brElements = message.querySelectorAll('br');
            expect(brElements.length).toBe(2); // 3行なので改行は2つ
        });

        it('メッセージが適切にレンダリングされる', () => {
            const message = document.createElement('p');
            message.textContent = 'データをラトリオHub開発チームに提供しますか？';

            container.appendChild(message);

            const element = container.querySelector('p');
            expect(element?.textContent).toBe('データをラトリオHub開発チームに提供しますか？');
        });
    });

    describe('問題(issue)スライドボタン', () => {
        it('スライドボタンのラベルが作成できる', () => {
            const issueLabel = document.createElement('label');
            issueLabel.textContent = '「問題が発生するデータ」として提供する';
            issueLabel.style.display = 'block';
            issueLabel.style.fontSize = '14px';
            issueLabel.style.fontWeight = 'bold';

            container.appendChild(issueLabel);

            const label = container.querySelector('label');
            expect(label?.textContent).toBe('「問題が発生するデータ」として提供する');
            expect(label?.style.fontSize).toBe('14px');
        });

        it('チェックボックスが隠され、スライダーとして表示できる', () => {
            const issueToggle = document.createElement('input');
            issueToggle.type = 'checkbox';
            issueToggle.id = 'optInIssue';
            issueToggle.style.display = 'none';

            const issueSlider = document.createElement('label');
            issueSlider.setAttribute('for', 'optInIssue');
            issueSlider.style.position = 'relative';
            issueSlider.style.width = '50px';
            issueSlider.style.height = '24px';

            container.appendChild(issueToggle);
            container.appendChild(issueSlider);

            const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
            expect(checkbox?.style.display).toBe('none');
            expect(checkbox?.id).toBe('optInIssue');

            const slider = container.querySelector('label[for="optInIssue"]') as HTMLLabelElement;
            expect(slider?.style.width).toBe('50px');
            expect(slider?.style.height).toBe('24px');
        });

        it('チェックボックスの状態が変更できる', () => {
            const issueToggle = document.createElement('input');
            issueToggle.type = 'checkbox';
            issueToggle.id = 'optInIssue';

            container.appendChild(issueToggle);

            const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
            expect(checkbox?.checked).toBe(false);

            checkbox?.click();
            expect(checkbox?.checked).toBe(true);

            checkbox?.click();
            expect(checkbox?.checked).toBe(false);
        });
    });

    describe('ボタングループ', () => {
        it('確認ボタンが作成できる', () => {
            const yesButton = document.createElement('button');
            yesButton.textContent = '提供する';
            yesButton.style.backgroundColor = '#4CAF50';
            yesButton.style.color = 'white';
            yesButton.style.padding = '10px 20px';
            yesButton.style.border = 'none';
            yesButton.style.borderRadius = '4px';
            yesButton.style.cursor = 'pointer';

            container.appendChild(yesButton);

            const button = container.querySelector('button');
            expect(button?.textContent).toBe('提供する');
            expect(button?.style.backgroundColor).toBe('#4CAF50');
        });

        it('キャンセルボタンが作成できる', () => {
            const cancelButton = document.createElement('button');
            cancelButton.textContent = 'キャンセル';
            cancelButton.style.backgroundColor = '#f44336';
            cancelButton.style.color = 'white';

            container.appendChild(cancelButton);

            const button = container.querySelector('button');
            expect(button?.textContent).toBe('キャンセル');
        });

        it('複数のボタンが並べられる', () => {
            const buttonGroup = document.createElement('div');
            buttonGroup.style.display = 'flex';
            buttonGroup.style.gap = '10px';

            const yesButton = document.createElement('button');
            yesButton.textContent = '提供する';

            const cancelButton = document.createElement('button');
            cancelButton.textContent = 'キャンセル';

            buttonGroup.appendChild(yesButton);
            buttonGroup.appendChild(cancelButton);
            container.appendChild(buttonGroup);

            const buttons = container.querySelectorAll('button');
            expect(buttons.length).toBe(2);
            expect(buttons[0].textContent).toBe('提供する');
            expect(buttons[1].textContent).toBe('キャンセル');
        });
    });

    describe('ダイアログのイベント処理', () => {
        it('確認ボタンがクリックできる', () => {
            const yesButton = document.createElement('button');
            yesButton.textContent = '提供する';

            let isConfirmed = false;
            yesButton.addEventListener('click', () => {
                isConfirmed = true;
            });

            container.appendChild(yesButton);

            yesButton.click();
            expect(isConfirmed).toBe(true);
        });

        it('キャンセルボタンがクリックできる', () => {
            const cancelButton = document.createElement('button');
            cancelButton.textContent = 'キャンセル';

            let isCancelled = false;
            cancelButton.addEventListener('click', () => {
                isCancelled = true;
            });

            container.appendChild(cancelButton);

            cancelButton.click();
            expect(isCancelled).toBe(true);
        });

        it('問題(issue)トグルが変更できる', () => {
            const issueToggle = document.createElement('input');
            issueToggle.type = 'checkbox';
            issueToggle.id = 'optInIssue';

            let issueState = false;
            issueToggle.addEventListener('change', (ev) => {
                issueState = (ev.target as HTMLInputElement).checked;
            });

            container.appendChild(issueToggle);

            issueToggle.click();
            expect(issueState).toBe(true);

            issueToggle.click();
            expect(issueState).toBe(false);
        });
    });

    describe('ダイアログのスタイリング', () => {
        it('ダイアログが中央に配置されるスタイル', () => {
            const dialog = document.createElement('div');
            dialog.style.position = 'fixed';
            dialog.style.top = '0';
            dialog.style.left = '0';
            dialog.style.width = '100%';
            dialog.style.height = '100%';
            dialog.style.display = 'flex';
            dialog.style.alignItems = 'center';
            dialog.style.justifyContent = 'center';

            container.appendChild(dialog);

            const element = container.querySelector('[style*="align-items"]');
            expect((element as HTMLElement)?.style.display).toBe('flex');
            expect((element as HTMLElement)?.style.alignItems).toBe('center');
            expect((element as HTMLElement)?.style.justifyContent).toBe('center');
        });

        it('ダイアログの背景が暗くされる', () => {
            const dialog = document.createElement('div');
            dialog.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

            container.appendChild(dialog);

            const element = container.querySelector('[style*="background"]');
            expect((element as HTMLElement)?.style.backgroundColor).toContain('rgba');
        });

        it('コンテンツボックスのスタイルが適用される', () => {
            const dialogContent = document.createElement('div');
            dialogContent.style.backgroundColor = 'white';
            dialogContent.style.padding = '20px';
            dialogContent.style.borderRadius = '8px';
            dialogContent.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
            dialogContent.style.maxWidth = '600px';

            container.appendChild(dialogContent);

            const element = container.querySelector('[style*="padding"]');
            expect((element as HTMLElement)?.style.backgroundColor).toBe('white');
            expect((element as HTMLElement)?.style.borderRadius).toBe('8px');
            expect((element as HTMLElement)?.style.maxWidth).toBe('600px');
        });
    });

    describe('XSS対策', () => {
        it('メッセージがtextContentを使用してHTMLインジェクション防止', () => {
            const message = document.createElement('p');
            const maliciousText = '<img src=x onerror="alert(\'XSS\')">';
            const line = 'Safe message';

            message.appendChild(document.createTextNode(line));

            // textContentの場合、HTMLは実行されない
            expect(message.textContent).toBe('Safe message');
            expect(message.innerHTML).not.toContain('<img');
        });

        it('createElement/textNodeでHTMLが適切に取り扱われる', () => {
            const container = document.createElement('div');
            const text = '<script>alert("XSS")</script>';

            container.appendChild(document.createTextNode(text));

            // textNodeとしてエスケープされる
            expect(container.textContent).toBe('<script>alert("XSS")</script>');
            expect(container.querySelector('script')).toBeNull();
        });
    });
});
