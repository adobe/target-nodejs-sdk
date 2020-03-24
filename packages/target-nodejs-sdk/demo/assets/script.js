var STORAGE_KEY = "tgtVisitorCookies";

function showResult(headingText, resultText) {
  var resultEl = document.getElementById("result");

  var preEl = document.createElement("pre");
  var h3El = document.createElement("h3");

  h3El.innerText = headingText;
  preEl.innerText = resultText;

  resultEl.appendChild(h3El);
  resultEl.appendChild(preEl);
}

function getCookie(name) {
  var v = document.cookie.match('(^|;) ?' + encodeURIComponent(name) + '=([^;]*)(;|$)');
  return v ? v[2] : null;
}


function persistVisitorCookies(organizationId, targetResponse) {
  if (!organizationId) throw new Error("organizationId is undefined");
  if (!targetResponse) throw new Error("targetResponse is undefined");

  var visitor = Visitor.getInstance(organizationId, {serverState: targetResponse.visitorState})

  visitor.getVisitorValues(function (ids) {
    var visitorCookie = getCookie(visitor.cookieName);
    var storageValue = {
      targetCookie: targetResponse.targetCookie.value,
      targetLocationHintCookie: typeof targetResponse.targetLocationHintCookie !== 'undefined' ? targetResponse.targetLocationHintCookie.value : undefined,
      visitorState: targetResponse.visitorState,
      visitorCookie: visitorCookie
    };

    window['localStorage'].setItem(STORAGE_KEY, JSON.stringify(storageValue));
  });
}

function getVisitorCookies() {
  return JSON.parse(window['localStorage'].getItem(STORAGE_KEY) || "{}");
}
