export default (data, dispatchEvent) => {
  const win = window.open(
    '',
    "Rabet interaction page",
    `
    width=380,
    height=620,
    top=100,
    left=${screen.width - 360 - 100},
    `
  );

  win.document.write(`
    <html>
      <head>
        <title>Rabet interaction page</title>
      </head>
      <body>
        <div id="root"></div>

        <script src="${chrome.runtime.getURL('interaction/bundle.js')}"></script>
        <script>sessionStorage.setItem('data', ${JSON.stringify(data)})</script>
        <script>window.dispatchEvent = ${dispatchEvent}</script>
      </body>
    </html>
  `);
}
