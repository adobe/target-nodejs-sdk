const STORAGE_KEY = "tgtVisitorCookies";

function showResult(headingText, resultText) {
  const resultEl = document.getElementById("result");

  const preEl = document.createElement("pre");
  const h3El = document.createElement("h3");

  h3El.innerText = headingText;
  preEl.innerText = resultText;

  resultEl.appendChild(h3El);
  resultEl.appendChild(preEl);
}

function getCookie(name) {
  const v = document.cookie.match(
    `(^|;) ?${encodeURIComponent(name)}=([^;]*)(;|$)`
  );
  return v ? v[2] : null;
}

function persistVisitorCookies(visitor, targetResponse) {
  if (!visitor) throw new Error("visitor is undefined");
  if (!targetResponse) throw new Error("targetResponse is undefined");

  visitor.getVisitorValues(function(ids) {
    const visitorCookie = getCookie(visitor.cookieName);
    const storageValue = {
      targetCookie: targetResponse.targetCookie.value,
      targetLocationHintCookie:
        typeof targetResponse.targetLocationHintCookie !== "undefined"
          ? targetResponse.targetLocationHintCookie.value
          : undefined,
      visitorState: targetResponse.visitorState,
      visitorCookie
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storageValue));
  });
}

function getVisitorCookies() {
  return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}");
}
