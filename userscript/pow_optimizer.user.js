// ==UserScript==
// @name         pow optimizer
// @description  made with much love
// @version      0.1
// @author       Cazka#1820
// @match        https://diep.io/*
// @run-at       document-start
// ==/UserScript==

document.open();
document.write(`
<!DOCTYPE html>
<html>
    <head>
        <base href="//static.diep.io/" />
        <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <title>diep.io</title>
        <meta name="description" content="Survive and shoot at others while trying to keep your own tank alive!" />
        <style>
            body {
                background-color: #000000;
            }

            html,
            body,
            #canvas {
                border: 0;
                margin: 0;
                padding: 0;
                overflow: hidden;
            }

            #loading {
                color: #ffffff;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 48pt;
                font-family: sans-serif;
                font-weight: bold;
                cursor: default;
            }

            #canvas {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                width: 100%;
                height: 100%;
                cursor: default;
            }

            #textInputContainer {
                display: none;
                position: absolute;
            }

            #textInput {
                background-color: transparent;
                font-family: 'Ubuntu';
                padding: 0;
                border: 0;
                outline: none;
            }
        </style>
    </head>
    <body>
        <script src="https://c.n.m28.io/sdk.js"></script>
        <link href="https://fonts.googleapis.com/css?family=Ubuntu:700" rel="stylesheet" type="text/css" />
        <span id="loading">Loading...</span>
        <canvas id="canvas" width="800" height="800"></canvas>
        <div id="empty-container"></div>
        <div style="font-family: 'Ubuntu'">&nbsp;</div>
        <div id="textInputContainer"><input id="textInput" /></div>
        <script src="https://fast-pow.herokuapp.com/pow.js"></script>
        <script src="c.js?2"></script>
        <script>
            (async function (window, document) {
                const text = await fetch('https://diep.io/').then(res => res.text());
                const url = text.match(/build_[0-9a-f]+.wasm.js/)[0];
                var gameScript = document.createElement('script');
                gameScript.async = true;
                gameScript.type = 'text/javascript';
                gameScript.src = url;
                gameScript.onerror = function () {
                    window.location.reload(true);
                };
                var node = document.getElementsByTagName('script')[0];
                node.parentNode.insertBefore(gameScript, node);
            })(window, document);
        </script>
    </body>
</html>
`);
document.close();