<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <title>MCID (Visitor API) with Analytics and at.js Integration Sample</title>
  <script src="VisitorAPI.js"></script>
  <script>
    Visitor.getInstance("${organizationId}", {serverState: ${visitorState}});
  </script>
  <script>
  window.targetGlobalSettings = {
    overrideMboxEdgeServer: true,
    clientCode: "${clientCode}",
    imsOrgId: "${organizationId}",
    serverDomain: "${serverDomain}",
    serverState: ${serverState} || {}
  }
  </script>
  <script src="at.js"></script>
</head>
<body>
  <div id="contents">Default Content</div>
  <pre>${content}</pre>
  <script src="AppMeasurement.js"></script>
  <script>var s_code=s.t();if(s_code)document.write(s_code);</script>
</body>
</html>
