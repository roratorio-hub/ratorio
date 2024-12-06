class ModalWindow {
    static createModal({ title = "", message = "", buttons = [] }) {
        return new Promise((resolve) => {
            // モーダルの背景
            const modalOverlay = document.createElement("div");
            modalOverlay.style.position = "fixed";
            modalOverlay.style.top = "0";
            modalOverlay.style.left = "0";
            modalOverlay.style.width = "100%";
            modalOverlay.style.height = "100%";
            modalOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
            modalOverlay.style.display = "flex";
            modalOverlay.style.justifyContent = "center";
            modalOverlay.style.alignItems = "center";
            modalOverlay.style.zIndex = "1000";

            // モーダル本体
            const modalBox = document.createElement("div");
            modalBox.style.backgroundColor = "#fff";
            modalBox.style.padding = "20px";
            modalBox.style.borderRadius = "8px";
            modalBox.style.textAlign = "center";
            modalBox.style.width = "90%";
            modalBox.style.maxWidth = "600px";
            modalBox.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";

            // タイトル（任意）
            if (title) {
                const modalTitle = document.createElement("h2");
                modalTitle.textContent = title;
                modalTitle.style.marginBottom = "10px";
                modalTitle.style.fontSize = "1.5em";
                modalBox.appendChild(modalTitle);
            }

            // メッセージ
            const modalMessage = document.createElement("div");
            modalMessage.innerHTML = message.replace(/\n/g, "<br>");
            //modalMessage.textContent = message;
            modalMessage.style.marginBottom = "20px";
            modalMessage.style.fontSize = "1em";
            modalMessage.style.wordBreak = "break-word";
            modalMessage.style.overflowWrap = "break-word";
            modalBox.appendChild(modalMessage);

            // ボタンの生成
            const buttonContainer = document.createElement("div");
            buttons.forEach((btn) => {
                const button = document.createElement("button");
                button.textContent = btn.label;
                button.style.margin = "0 5px";
                button.style.padding = "10px 15px";
                button.style.border = "none";
                button.style.borderRadius = "4px";
                button.style.cursor = "pointer";
                button.style.fontSize = "1em";
                button.style.backgroundColor = btn.color || "#007BFF";
                button.style.color = "#fff";
                button.addEventListener("click", () => {
                    document.body.removeChild(modalOverlay); // モーダルを閉じる
                    resolve(btn.value); // ボタンの値を返す
                });
                buttonContainer.appendChild(button);
            });
            modalBox.appendChild(buttonContainer);

            // モーダルをドキュメントに追加
            modalOverlay.appendChild(modalBox);
            document.body.appendChild(modalOverlay);
        });
    }
}
