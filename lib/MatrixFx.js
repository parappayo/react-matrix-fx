"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/*
 *  Matrix Green Colours
 *  https://www.schemecolor.com/matrix-code-green.php
 *  0D0208, 003B00, 008F11, 00FF41
 *
 *  Color Blander:
 *  https://meyerweb.com/eric/tools/color-blend/#00FF41:003B00:1:hex
 *
 *  Half-width Japanese unicode range
 *  https://stackoverflow.com/questions/19899554/unicode-range-for-japanese
 *  [\xFF5F .. \xFF9F]
 *
 *  Forked from
 *  https://github.com/parappayo/parappayo.github.io/blob/master/canvas_matrix_fx.js
 */
function randomIntegerFromRange(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomJapaneseHalfWidthChar() {
  return String.fromCharCode(randomIntegerFromRange(0xFF9F, 0xFF5F));
}

function spawnMatrixString(canvasWidth, canvasHeight, length) {
  var marginX = 30;
  var marginY = 100;
  var result = {
    step: 0,
    x: Math.floor(Math.random() * (canvasWidth + marginX)) - marginX,
    y: Math.floor(Math.random() * (canvasHeight + marginY)) - marginY,
    text: ''
  };

  for (var i = 0; i < length; i++) {
    result.text += randomJapaneseHalfWidthChar();
  }

  matrixStrings.push(result);
  return result;
}

function fitToContainer(canvas) {
  canvas.style.width = '100%';
  canvas.style.height = '35em'; // '100%';

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

function drawBackground(ctx, width, height) {
  ctx.fillStyle = ctx.createLinearGradient(0, 0, width, height * 2);
  ctx.fillStyle.addColorStop(0, '#000000');
  ctx.fillStyle.addColorStop(1, '#003B00');
  ctx.fillRect(0, 0, width, height);
}

function drawMatrixString(ctx, matrixString) {
  ctx.font = "24px sans-serif";
  var charHeight = 30;

  for (var y = 0; y < matrixString.text.length; y++) {
    if (y > matrixString.step) {
      break;
    }

    var charAge = matrixString.step - y;
    var fontColor = '#0D0208';

    if (charAge < 1) {
      fontColor = '#00FF41';
    } else if (charAge < 5) {
      fontColor = '#00C729';
    } else if (charAge < 9) {
      fontColor = '#008F11';
    } else if (charAge < 10) {
      fontColor = '#003B00';
    } else if (charAge > 10) {
      continue;
    }

    ctx.strokeStyle = fontColor;
    ctx.fillStyle = fontColor;
    ctx.fillText(matrixString.text[y], matrixString.x, matrixString.y + y * charHeight);
  }
}

function updateMatrixStrings(matrixStrings, ctx, width, height) {
  var spawnCount = 3;

  for (var i = 0; i < spawnCount; i++) {
    spawnMatrixString(width, height, 12);
  }

  for (var _i in matrixStrings) {
    var matrixString = matrixStrings[_i];
    drawMatrixString(ctx, matrixString);
    matrixString.step += 1;
  }
}

function cleanupMatrixStrings(matrixStrings) {
  var stepsToLive = 30;

  for (var i in matrixStrings) {
    if (matrixStrings[i].step > stepsToLive) {
      matrixStrings.splice(i, 1);
      i--;
    }
  }
}

var matrixStrings = [];

function updateMatrixFx(canvasElement) {
  fitToContainer(canvasElement);
  var ctx = canvasElement.getContext('2d');
  var width = canvasElement.width;
  var height = canvasElement.height;
  drawBackground(ctx, width, height);
  updateMatrixStrings(matrixStrings, ctx, width, height);
  cleanupMatrixStrings(matrixStrings);
}

function startMatrixFx(duration) {
  var canvasElement = document.getElementById('matrix_fx');
  updateMatrixFx(canvasElement);
  setInterval(function () {
    updateMatrixFx(canvasElement);
  }, duration);
}

function MatrixFx() {
  (0, _react.useEffect)(function () {
    startMatrixFx(100);
  });
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("canvas", {
    id: "matrix_fx"
  }));
}

var _default = MatrixFx;
exports["default"] = _default;