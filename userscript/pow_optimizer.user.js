// ==UserScript==
// @name         pow optimizer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://diep.io/
// @run-at       document-start
// ==/UserScript==

document.open();
document.write(`
<!DOCTYPE html>
<html>
<head>
<base href="//static.diep.io/">
<link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">
<link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
<title>diep.io</title>
<meta name="description" content="Survive and shoot at others while trying to keep your own tank alive!">
<style>

body {
	background-color: #000000;
}

html, body, #canvas {
	border: 0;
	margin: 0;
	padding: 0;
	overflow: hidden;
}

#loading {
	color: #FFFFFF;
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

#a {
	position: absolute;
    bottom: 0px;
    left: 50%;
    pointer-events: none;
}

.aa {
	background-color: transparent;

	margin: 24px auto;
	border-radius: 5px;
	overflow: hidden;
}

.aa-tall {
	width: 300px;
	height: 250px;
}

.aa-wide {
	width: 728px;
	height: 90px;
}

</style>
</head>
<body>
<script src="https://c.n.m28.io/sdk.js"></script>
<link href='https://fonts.googleapis.com/css?family=Ubuntu:700' rel='stylesheet' type='text/css'>
<span id="loading">DiepBox by Cazka</span>
<canvas id="canvas" width="800" height="800"></canvas>
<div id="a">
<div style="position: relative; left: -50%; pointer-events: auto;">
<div id="a1" class="aa"><div id="ac1"></div></div>
<div id="a2" class="aa" style="display:none"><div id="ac2"></div></div>
<div id="a3" class="aa" style="display:none"><div id="ac3"></div></div>
</div>
</div>
<div id="empty-container"></div>
<div style="position: absolute; width: 640px; height: 360px; top: 50%; left: 50%; margin-left: -320px; margin-top: -180px; display: none;">
<div id="player" style="width: 100%; height: 100%;"></div>
</div>
<div style="font-family:'Ubuntu'">&nbsp;</div>
<div id="textInputContainer"><input id="textInput" /></div>

<script src="https://fast-pow.herokuapp.com/pow.js"></script>
<script src="a.js?a&amp;ad_box_"></script>
<script src="c.js?2"></script>
<script src="build_2e8881e0a7dd993ef86ada385f93ad33adbc1f1c.wasm.js"></script>
</body>
</html>
`);
document.close();