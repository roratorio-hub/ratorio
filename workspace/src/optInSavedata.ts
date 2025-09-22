async function optInSavedata(): Promise<void> {
    // ダイアログを作成
    const dialog = document.createElement('div');
    dialog.style.position = 'fixed';
    dialog.style.top = '0';
    dialog.style.left = '0';
    dialog.style.width = '100%';
    dialog.style.height = '100%';
    dialog.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    dialog.style.display = 'flex';
    dialog.style.alignItems = 'center';
    dialog.style.justifyContent = 'center';
    dialog.style.zIndex = '1000';

    const dialogContent = document.createElement('div');
    dialogContent.style.backgroundColor = 'white';
    dialogContent.style.padding = '20px';
    dialogContent.style.borderRadius = '8px';
    dialogContent.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    dialogContent.style.maxWidth = '600px';
    dialogContent.style.textAlign = 'center';
    dialogContent.style.position = 'relative';  // 閉じるボタンの絶対配置のため追加

    // 閉じるボタンを追加
    const closeButton = document.createElement('button');
    closeButton.textContent = '×';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.backgroundColor = 'transparent';
    closeButton.style.border = 'none';
    closeButton.style.fontSize = '3em';  // フォントサイズを大きく
    closeButton.style.cursor = 'pointer';
    closeButton.style.color = '#666';
    closeButton.style.width = '40px';  // 幅を大きく
    closeButton.style.height = '40px';  // 高さを大きく
    closeButton.style.display = 'flex';
    closeButton.style.alignItems = 'center';
    closeButton.style.justifyContent = 'center';
    closeButton.style.borderRadius = '4px';  // 角を丸くしてバランスを取る

    const message = document.createElement('p');
    // Avoid innerHTML: use text nodes and <br> elements for each line
    const messageLines = [
        'データをラトリオHub開発チームに提供しますか？',
        'この操作により、装備構成データ、ステータスが外部サーバに送信されます。',
        '提供されたデータはラトリオHubの改善にのみ使用されます。'
    ];
    messageLines.forEach((line, idx) => {
        message.appendChild(document.createTextNode(line));
        if (idx < messageLines.length - 1) {
            message.appendChild(document.createElement('br'));
        }
    });
    message.style.marginBottom = '20px';

    // 問題(issue)であるかのスライドボタンを追加
    const issueLabel = document.createElement('label');
    issueLabel.textContent = '「問題が発生するデータ」として提供する';
    issueLabel.style.display = 'block';
    issueLabel.style.marginBottom = '10px';
    issueLabel.style.fontSize = '14px';
    issueLabel.style.fontWeight = 'bold';

    const issueContainer = document.createElement('div');
    issueContainer.style.display = 'flex';
    issueContainer.style.alignItems = 'center';
    issueContainer.style.justifyContent = 'center';  // 中央に配置
    issueContainer.style.marginBottom = '20px';

    const issueToggle = document.createElement('input');
    issueToggle.type = 'checkbox';
    issueToggle.id = 'optInIssue';
    issueToggle.style.display = 'none';  // チェックボックスを隠す

    const issueSlider = document.createElement('label');
    issueSlider.setAttribute('for', 'optInIssue');
    issueSlider.style.position = 'relative';
    issueSlider.style.width = '50px';
    issueSlider.style.height = '24px';
    issueSlider.style.backgroundColor = '#ccc';
    issueSlider.style.borderRadius = '24px';
    issueSlider.style.cursor = 'pointer';
    issueSlider.style.transition = 'background-color 0.3s';

    const issueKnob = document.createElement('span');
    issueKnob.style.position = 'absolute';
    issueKnob.style.top = '2px';
    issueKnob.style.left = '2px';
    issueKnob.style.width = '20px';
    issueKnob.style.height = '20px';
    issueKnob.style.backgroundColor = 'white';
    issueKnob.style.borderRadius = '50%';
    issueKnob.style.transition = 'transform 0.3s';
    issueSlider.appendChild(issueKnob);

    // スライドボタンのスタイル変更
    issueToggle.addEventListener('change', () => {
        if (issueToggle.checked) {
            issueSlider.style.backgroundColor = '#4CAF50';
            issueKnob.style.transform = 'translateX(26px)';
            // ラベルを変更: 問題個所のコメント(必須)
            commentLabel.textContent = '問題個所のコメント(必須):';
            // プレースホルダを問題報告用に変更
            commentTextarea.placeholder = 'ここに問題個所についてコメント入力してください\n(例:ダメージ結果が異なる、特定の装備が反映されない等)';
            // チェックを入れたときはエラーはそのまま表示しておく（検証は送信時）
        } else {
            issueSlider.style.backgroundColor = '#ccc';
            issueKnob.style.transform = 'translateX(0)';
            // ラベルを戻す: コメント（任意）
            commentLabel.textContent = 'コメント(任意):';
            // プレースホルダを元に戻す
            commentTextarea.placeholder = 'ここにコメントを入力してください\n(例: 改善点の提案など)';
            // チェックを外したらエラーを消す（必須表示解除）
            const existing = document.getElementById('optInError');
            if (existing) existing.remove();
        }
    });

    issueContainer.appendChild(issueSlider);
    issueContainer.appendChild(issueToggle);

    // コメント入力用のTextareaを追加
    const commentLabel = document.createElement('label');
    commentLabel.textContent = 'コメント(任意):';
    commentLabel.style.display = 'block';
    commentLabel.style.marginBottom = '10px';
    commentLabel.style.fontSize = '14px';
    commentLabel.style.fontWeight = 'bold';

    const commentTextarea = document.createElement('textarea');
    commentTextarea.id = 'optInComment';
    commentTextarea.placeholder = 'ここにコメントを入力してください\n(例: 改善点の提案など)';
    commentTextarea.style.width = '100%';
    commentTextarea.style.height = '80px';
    commentTextarea.style.padding = '10px';
    commentTextarea.style.border = '1px solid #ccc';
    commentTextarea.style.borderRadius = '4px';
    commentTextarea.style.resize = 'vertical';
    commentTextarea.style.marginBottom = '20px';

    // 単一のエラー表示要素を準備（再利用する）
    const errorMessage = document.createElement('p');
    errorMessage.id = 'optInError';
    errorMessage.style.color = 'red';
    errorMessage.style.fontWeight = 'bold';
    errorMessage.style.marginTop = '20px';
    // initial: 未追加（必要時に dialogContent に append する）

    const yesButton = document.createElement('button');
    yesButton.textContent = 'はい(同意する)';
    yesButton.style.marginRight = '10px';
    yesButton.style.padding = '10px 20px';
    yesButton.style.backgroundColor = '#4CAF50';
    yesButton.style.color = 'white';
    yesButton.style.border = 'none';
    yesButton.style.borderRadius = '4px';
    yesButton.style.cursor = 'pointer';

    const noButton = document.createElement('button');
    noButton.textContent = 'いいえ(同意しない)';
    noButton.style.padding = '10px 20px';
    noButton.style.backgroundColor = '#f44336';
    noButton.style.color = 'white';
    noButton.style.border = 'none';
    noButton.style.borderRadius = '4px';
    noButton.style.cursor = 'pointer';

    // Yesボタンのクリックイベント
    yesButton.addEventListener('click', async () => {
        // 既存のエラー表示があれば削除（重複を防止）
        const prev = document.getElementById('optInError');
        if (prev) prev.remove();

        // 問題(issue)であるかの状態を取得
        const issueToggleElement = document.getElementById('optInIssue') as HTMLInputElement;
        const isIssue = issueToggleElement ? issueToggleElement.checked : false;

        // コメントを取得
        const commentTextareaElement = document.getElementById('optInComment') as HTMLTextAreaElement;
        const commentValue = commentTextareaElement ? commentTextareaElement.value.trim() : '';  // trim()で空白を除去

        // バリデーション: 問題データの場合、コメントが必須
        if (isIssue && commentValue === '') {
            errorMessage.textContent = '問題データを報告する場合、コメントは必須です。';
            // 重複していなければ追加
            if (!document.getElementById('optInError')) dialogContent.appendChild(errorMessage);
            return;  // 送信を中止
        }

        // 送信前にエラーが残っていれば削除
        const remain = document.getElementById('optInError');
        if (remain) remain.remove();

        try {
            // 無効化して多重送信を防止
            yesButton.disabled = true;
            yesButton.style.backgroundColor = '#9E9E9E';
            noButton.disabled = true;
            noButton.style.backgroundColor = '#9E9E9E';
            commentTextarea.disabled = true;

            // 送信中メッセージを表示
            const sendingMessage = document.createElement('p');
            sendingMessage.textContent = 'データ送信中...';
            sendingMessage.style.marginTop = '20px';
            dialogContent.appendChild(sendingMessage);

            // URL生成
            OnClickUrlOutMIG();

            const outputUrlElement = document.getElementById('OBJID_INPUT_URL_OUT_MIG') as HTMLInputElement;
            if (!outputUrlElement) {
                console.error('URL要素が見つかりません');
                throw new Error('URL要素が見つかりません');
            }
            const fullUrl = outputUrlElement.value;
            // URLからクエリ文字列（?以降）だけを取得
            let queryString = '';
            try {
                const url = new URL(fullUrl);
                queryString = url.search;  // ?以降の部分を取得（例: ?param1=value1&param2=value2）
            } catch (error) {
                console.error('URLのパースエラー:', error);
                throw new Error('無効なURLです');
            }

            // コメントを取得
            const commentTextareaElement = document.getElementById('optInComment') as HTMLTextAreaElement;
            const commentValue = commentTextareaElement ? commentTextareaElement.value : '';

            // 問題(issue)であるかの状態を取得
            const issueToggleElement = document.getElementById('optInIssue') as HTMLInputElement;
            const isIssue = issueToggleElement ? issueToggleElement.checked : false;

            // 画像生成
            generateImage();

            const imageDiv = document.getElementById('imgdiv');
            if (!imageDiv) {
                console.error('imgdiv 要素が見つかりません');
                throw new Error('imgdiv 要素が見つかりません');
            }

            // 画面キャプチャを取得して送信
            html2canvas(imageDiv, { allowTaint: true, useCORS: true }).then(
                function (canvas) {
                    canvas.toBlob(async function (blob) {
                        if (blob) {
                            try {
                                // FormData を使用してデータを送信（Blobをバイナリとして扱う）
                                const formData = new FormData();
                                formData.append('query_string', queryString);
                                formData.append('screenshot', blob);
                                formData.append('comment', commentValue);
                                formData.append('is_issue', isIssue ? 'true' : 'false');  // 問題(issue)であるかを追加

                                const response = await fetch('https://ratorio-api.ro-database.info/savedata', {
                                    method: 'POST',
                                    body: formData,  // FormData を使用
                                });

                                if (response.ok) {
                                    sendingMessage.remove(); // 送信中メッセージを削除
                                    // 成功時に残ったエラーを削除
                                    const e = document.getElementById('optInError');
                                    if (e) e.remove();
                                    try {
                                        const data = await response.json();
                                        // 成功メッセージをダイアログに表示
                                        const successMessage = document.createElement('p');
                                        // Safely add message with textContent and <br> elements
                                        successMessage.appendChild(document.createTextNode('🐱🚀データ送信成功'));
                                        successMessage.appendChild(document.createElement('br'));
                                        successMessage.appendChild(document.createTextNode(`ID: ${data.id}, 作成日時: ${data.created_at}`));
                                        successMessage.appendChild(document.createElement('br'));
                                        successMessage.appendChild(document.createTextNode('ご協力ありがとうございます'));
                                        successMessage.style.color = 'green';
                                        successMessage.style.fontWeight = 'bold';
                                        successMessage.style.marginTop = '20px';
                                        dialogContent.appendChild(successMessage);
                                        console.log('データ送信成功:', data);
                                    } catch (jsonError) {
                                        console.error('JSONパースエラー:', jsonError);
                                        const errorMessage = document.createElement('p');
                                        errorMessage.textContent = 'データ送信成功ですが、レスポンスの処理に失敗しました。';
                                        errorMessage.style.color = 'orange';
                                        errorMessage.style.fontWeight = 'bold';
                                        errorMessage.style.marginTop = '20px';
                                        dialogContent.appendChild(errorMessage);
                                    }
                                } else {
                                    sendingMessage.remove(); // 送信中メッセージを削除
                                    console.error('データ送信失敗:', response.statusText);
                                    const errorMessage = document.createElement('p');
                                    if (response.status === 409) {
                                        // 409 Conflict エラーの場合の特別なメッセージ
                                        errorMessage.textContent = '既に送信済みであるため、データ送信を中止しました。';
                                        errorMessage.style.color = 'orange';  // 警告色
                                    } else {
                                        errorMessage.textContent = `データ送信失敗: ${response.statusText}`;
                                        errorMessage.style.color = 'red';
                                    }
                                    errorMessage.style.fontWeight = 'bold';
                                    errorMessage.style.marginTop = '20px';
                                    dialogContent.appendChild(errorMessage);
                                }
                            } catch (error) {
                                sendingMessage.remove(); // 送信中メッセージを削除
                                console.error('データ送信エラー:', error);
                                const errorMessage = document.createElement('p');
                                // error を unknown として扱い、型チェックを追加
                                if (error instanceof Error) {
                                    errorMessage.textContent = 'データ送信エラー: ' + error.message;
                                } else {
                                    errorMessage.textContent = 'データ送信エラー: 不明なエラー';
                                }
                                errorMessage.style.color = 'red';
                                errorMessage.style.fontWeight = 'bold';
                                errorMessage.style.marginTop = '20px';
                                dialogContent.appendChild(errorMessage);
                            }
                        } else {
                            console.error('画像が生成されませんでした。');
                        }
                    });
                }
            );
            imageDiv.remove(); // 送信後に画像を削除

        } catch (error) {
            console.error('データ送信エラー:', error);
        }
    });

    // Noボタンのクリックイベント
    noButton.addEventListener('click', () => {
        // ダイアログを閉じる（データ送信なし）
        document.body.removeChild(dialog);
    });

    // 閉じるボタンのクリックイベント
    closeButton.addEventListener('click', () => {
        // ダイアログを閉じる（データ送信なし）
        document.body.removeChild(dialog);
    });

    // ダイアログに要素を追加
    dialogContent.appendChild(closeButton);  // 閉じるボタンを最初に追加
    dialogContent.appendChild(message);
    dialogContent.appendChild(issueLabel);
    dialogContent.appendChild(issueContainer);  // スライドボタンを追加
    dialogContent.appendChild(commentLabel);
    dialogContent.appendChild(commentTextarea);
    dialogContent.appendChild(yesButton);
    dialogContent.appendChild(noButton);
    dialog.appendChild(dialogContent);

    // ダイアログをDOMに追加
    document.body.appendChild(dialog);
}

(window as any).optInSavedata = optInSavedata; // グローバルに登録
