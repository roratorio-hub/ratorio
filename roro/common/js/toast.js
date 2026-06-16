// jquery-toast-plugin の代替。更新通知など単発のtoast表示に使う最小実装。
export function ShowToast({ heading, text, hideAfter = 5000, bgColor = "#00d1b2", textColor = "#000" } = {}) {
  const objToast = document.createElement("div");
  objToast.className = "native-toast";
  objToast.style.cssText = `
    position: fixed;
    bottom: 16px;
    left: 50%;
    transform: translate(-50%, 16px);
    z-index: 9999;
    min-width: 280px;
    max-width: 90vw;
    padding: 12px 16px;
    border-radius: 4px;
    background: ${bgColor};
    color: ${textColor};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
  `;

  const objHeading = document.createElement("div");
  objHeading.style.fontWeight = "bold";
  objHeading.textContent = heading ?? "";
  objToast.appendChild(objHeading);

  const objText = document.createElement("div");
  objText.innerHTML = text ?? "";
  objToast.appendChild(objText);

  document.body.appendChild(objToast);

  requestAnimationFrame(() => {
    objToast.style.opacity = "1";
    objToast.style.transform = "translate(-50%, 0)";
  });

  setTimeout(() => {
    objToast.style.opacity = "0";
    objToast.style.transform = "translate(-50%, 16px)";
    objToast.addEventListener("transitionend", () => objToast.remove(), { once: true });
  }, hideAfter);
}
