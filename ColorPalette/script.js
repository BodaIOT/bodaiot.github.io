// ---------- Configurable sample text ----------
const SAMPLE_TEXT = 'Индюк тоже думал, да в суп попал';

// ---------- Color conversion helpers ----------

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

function hsvToRgb(h, s, v) {
  h = ((h % 360) + 360) % 360;
  s = clamp(s, 0, 100) / 100;
  v = clamp(v, 0, 100) / 100;
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let r, g, b;
  if (h < 60) { r = c; g = x; b = 0; }
  else if (h < 120) { r = x; g = c; b = 0; }
  else if (h < 180) { r = 0; g = c; b = x; }
  else if (h < 240) { r = 0; g = x; b = c; }
  else if (h < 300) { r = x; g = 0; b = c; }
  else { r = c; g = 0; b = x; }
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255)
  };
}

function rgbToHsv(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  const v = max;
  const s = max === 0 ? 0 : d / max;
  return { h, s: s * 100, v: v * 100 };
}

function toHexByte(n) {
  return clamp(Math.round(n), 0, 255).toString(16).padStart(2, '0');
}

function rgbToHex(r, g, b) {
  return toHexByte(r) + toHexByte(g) + toHexByte(b);
}

function hexToRgb(hex) {
  hex = hex.replace(/#/g, '').trim();
  if (/^[0-9a-fA-F]{3}$/.test(hex)) {
    hex = hex.split('').map((c) => c + c).join('');
  }
  if (/^[0-9a-fA-F]{6}$/.test(hex)) {
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16)
    };
  }
  if (/^[0-9a-fA-F]{8}$/.test(hex)) {
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
      a: parseInt(hex.slice(6, 8), 16) / 255
    };
  }
  return null;
}

function rgbToCmyk(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const k = 1 - Math.max(r, g, b);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
  const c = (1 - r - k) / (1 - k);
  const m = (1 - g - k) / (1 - k);
  const y = (1 - b - k) / (1 - k);
  return { c: c * 100, m: m * 100, y: y * 100, k: k * 100 };
}

function cmykToRgb(c, m, y, k) {
  c /= 100; m /= 100; y /= 100; k /= 100;
  const r = 255 * (1 - c) * (1 - k);
  const g = 255 * (1 - m) * (1 - k);
  const b = 255 * (1 - y) * (1 - k);
  return { r: Math.round(r), g: Math.round(g), b: Math.round(b) };
}

// ---------- CIE Lab / LCH (perceptual color space) ----------
// Used for the "perceptual" palette: rotating hue in LCH keeps the
// perceived lightness/chroma constant across swatches, unlike a plain
// HSV hue rotation where equal V does not mean equal perceived brightness.

const D65 = { x: 95.047, y: 100, z: 108.883 };

function srgbToLinear(c) {
  c /= 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function linearToSrgb(c) {
  const v = c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
  return clamp(Math.round(v * 255), 0, 255);
}

function rgbToXyz(r, g, b) {
  const rl = srgbToLinear(r), gl = srgbToLinear(g), bl = srgbToLinear(b);
  return {
    x: (rl * 0.4124 + gl * 0.3576 + bl * 0.1805) * 100,
    y: (rl * 0.2126 + gl * 0.7152 + bl * 0.0722) * 100,
    z: (rl * 0.0193 + gl * 0.1192 + bl * 0.9505) * 100
  };
}

function xyzToRgb(x, y, z) {
  x /= 100; y /= 100; z /= 100;
  const rl = x * 3.2406 + y * -1.5372 + z * -0.4986;
  const gl = x * -0.9689 + y * 1.8758 + z * 0.0415;
  const bl = x * 0.0557 + y * -0.2040 + z * 1.0570;
  return { r: linearToSrgb(rl), g: linearToSrgb(gl), b: linearToSrgb(bl) };
}

function xyzToLab(x, y, z) {
  const f = (t) => (t > 0.008856 ? Math.pow(t, 1 / 3) : 7.787 * t + 16 / 116);
  const fx = f(x / D65.x), fy = f(y / D65.y), fz = f(z / D65.z);
  return { l: 116 * fy - 16, a: 500 * (fx - fy), b: 200 * (fy - fz) };
}

function labToXyz(l, a, b) {
  const fy = (l + 16) / 116;
  const fx = fy + a / 500;
  const fz = fy - b / 200;
  const finv = (t) => (t * t * t > 0.008856 ? t * t * t : (t - 16 / 116) / 7.787);
  return { x: finv(fx) * D65.x, y: finv(fy) * D65.y, z: finv(fz) * D65.z };
}

function labToLch(l, a, b) {
  const c = Math.sqrt(a * a + b * b);
  let h = (Math.atan2(b, a) * 180) / Math.PI;
  if (h < 0) h += 360;
  return { l, c, h };
}

function lchToLab(l, c, h) {
  const hr = (h * Math.PI) / 180;
  return { l, a: c * Math.cos(hr), b: c * Math.sin(hr) };
}

function rgbToLch(r, g, b) {
  const xyz = rgbToXyz(r, g, b);
  const lab = xyzToLab(xyz.x, xyz.y, xyz.z);
  return labToLch(lab.l, lab.a, lab.b);
}

function lchToRgb(l, c, h) {
  const lab = lchToLab(l, c, h);
  const xyz = labToXyz(lab.l, lab.a, lab.b);
  return xyzToRgb(xyz.x, xyz.y, xyz.z);
}

// ---------- State ----------
// h can range 0..360 (360 kept distinct from 0 so the hue slider
// thumb position is unambiguous at the seam), s/v in 0..100, a in 0..1
const initRgb = hexToRgb('1a756f');
const initHsv = rgbToHsv(initRgb.r, initRgb.g, initRgb.b);

const state = {
  h: initHsv.h,
  s: initHsv.s,
  v: initHsv.v,
  a: 1
};

function currentRgb() {
  return hsvToRgb(state.h, state.s, state.v);
}

// ---------- Persistence ----------

const STORAGE_KEY = 'colorPaletteState';

function loadPersistedState() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return data && typeof data === 'object' ? data : null;
  } catch (e) {
    return null;
  }
}

function savePersistedState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      h: state.h, s: state.s, v: state.v, a: state.a, brushSize,
      sampleText: sampleText.value
    }));
  } catch (e) {
    // localStorage unavailable (private mode, quota, etc.) - ignore
  }
}

// ---------- DOM refs ----------
const svSquare = document.getElementById('svSquare');
const svCursor = document.getElementById('svCursor');
const hueSlider = document.getElementById('hueSlider');
const hueCursor = document.getElementById('hueCursor');
const colorPreview = document.getElementById('colorPreview');
const alphaSlider = document.getElementById('alphaSlider');
const alphaGradient = document.getElementById('alphaGradient');
const alphaCursor = document.getElementById('alphaCursor');
const sampleText = document.getElementById('sampleText');
const palettesEl = document.getElementById('palettes');

const hexInput = document.getElementById('hexInput');
const rgb255Input = document.getElementById('rgb255Input');
const rgb1Input = document.getElementById('rgb1Input');
const rgba255Input = document.getElementById('rgba255Input');
const rgba1Input = document.getElementById('rgba1Input');
const hsvInput = document.getElementById('hsvInput');
const cmykInput = document.getElementById('cmykInput');

const themeToggleBtn = document.getElementById('themeToggleBtn');

sampleText.value = SAMPLE_TEXT;
sampleText.addEventListener('input', savePersistedState);

// ---------- Theme (day/night) ----------

const THEME_KEY = 'colorPaletteTheme';

function setTheme(theme) {
  document.body.classList.toggle('theme-light', theme === 'light');
  themeToggleBtn.textContent = theme === 'light' ? '🌑' : '☀️';
  themeToggleBtn.title = theme === 'light' ? 'Дневной режим (нажмите для ночного)' : 'Ночной режим (нажмите для дневного)';
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {
    // localStorage unavailable - ignore
  }
}

themeToggleBtn.addEventListener('click', () => {
  const next = document.body.classList.contains('theme-light') ? 'dark' : 'light';
  setTheme(next);
});

let savedTheme = 'dark';
try {
  savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
} catch (e) {
  // localStorage unavailable - keep default
}
setTheme(savedTheme);

// ---------- Rendering ----------

function render() {
  const { h, s, v, a } = state;
  const rgb = hsvToRgb(h, s, v);
  const hueDeg = h % 360;

  // SV square
  svSquare.style.backgroundColor = `hsl(${hueDeg}, 100%, 50%)`;
  svCursor.style.left = s + '%';
  svCursor.style.top = (100 - v) + '%';

  // Hue slider thumb: h = 360 - t*360  =>  t = (360 - h) / 360
  const t = (360 - h) / 360;
  hueCursor.style.top = (t * 100) + '%';

  // Alpha slider
  alphaGradient.style.background =
    `linear-gradient(to right, rgba(${rgb.r},${rgb.g},${rgb.b},0), rgba(${rgb.r},${rgb.g},${rgb.b},1))`;
  alphaCursor.style.left = (a * 100) + '%';

  // Preview swatch
  colorPreview.style.background =
    `linear-gradient(rgba(${rgb.r},${rgb.g},${rgb.b},${a}), rgba(${rgb.r},${rgb.g},${rgb.b},${a})),
     repeating-conic-gradient(#555 0% 25%, #333 0% 50%) 50% / 16px 16px`;

  // Sample text
  sampleText.style.color = `rgba(${rgb.r},${rgb.g},${rgb.b},${a})`;

  updateFields(rgb);
  renderPalettes();
  savePersistedState();
}

function updateFields(rgb) {
  const { h, s, v, a } = state;
  const hueDeg = Math.round(h % 360);
  const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);

  // RGBA always shows its alpha value. Every other format only shows an
  // alpha number/suffix when the color actually has transparency (a < 1).
  const hasAlpha = a < 1;
  const alphaSuffix = hasAlpha ? `, ${round2(a)}` : '';
  const hexAlphaSuffix = hasAlpha ? toHexByte(a * 255) : '';

  setIfNotFocused(hexInput, rgbToHex(rgb.r, rgb.g, rgb.b) + hexAlphaSuffix);
  setIfNotFocused(rgb255Input, `${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)}${alphaSuffix}`);
  setIfNotFocused(rgb1Input, `${round2(rgb.r / 255)}, ${round2(rgb.g / 255)}, ${round2(rgb.b / 255)}${alphaSuffix}`);
  setIfNotFocused(rgba255Input, `${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)}, ${round2(a)}`);
  setIfNotFocused(rgba1Input, `${round2(rgb.r / 255)}, ${round2(rgb.g / 255)}, ${round2(rgb.b / 255)}, ${round2(a)}`);
  setIfNotFocused(hsvInput, `${hueDeg}, ${Math.round(s)}, ${Math.round(v)}${alphaSuffix}`);
  setIfNotFocused(cmykInput, `${Math.round(cmyk.c)}, ${Math.round(cmyk.m)}, ${Math.round(cmyk.y)}, ${Math.round(cmyk.k)}${alphaSuffix}`);
}

function round2(n) {
  return Math.round(n * 100) / 100;
}

function setIfNotFocused(input, value) {
  if (document.activeElement === input) return;
  input.value = value;
}

// ---------- SV square + hue slider + alpha slider interaction ----------

function pointerRatio(el, clientX, clientY) {
  const rect = el.getBoundingClientRect();
  const x = clamp((clientX - rect.left) / rect.width, 0, 1);
  const y = clamp((clientY - rect.top) / rect.height, 0, 1);
  return { x, y };
}

function bindDrag(el, onMove) {
  let active = false;
  const start = (e) => {
    active = true;
    // e.preventDefault() below stops the browser's own blur-on-click
    // behavior, so a focused input would otherwise stay focused.
    if (document.activeElement && document.activeElement.blur) {
      document.activeElement.blur();
    }
    move(e);
    e.preventDefault();
  };
  const move = (e) => {
    if (!active) return;
    const point = e.touches ? e.touches[0] : e;
    onMove(point.clientX, point.clientY);
  };
  const end = () => { active = false; };

  el.addEventListener('mousedown', start);
  window.addEventListener('mousemove', move);
  window.addEventListener('mouseup', end);

  el.addEventListener('touchstart', start, { passive: false });
  window.addEventListener('touchmove', move, { passive: false });
  window.addEventListener('touchend', end);
}

bindDrag(svSquare, (clientX, clientY) => {
  const { x, y } = pointerRatio(svSquare, clientX, clientY);
  state.s = x * 100;
  state.v = (1 - y) * 100;
  render();
});

bindDrag(hueSlider, (clientX, clientY) => {
  const { y } = pointerRatio(hueSlider, clientX, clientY);
  state.h = 360 - y * 360;
  render();
});

bindDrag(alphaSlider, (clientX, clientY) => {
  const { x } = pointerRatio(alphaSlider, clientX, clientY);
  state.a = round2(x);
  render();
});

// ---------- Text field parsing ----------

function parseNums(str) {
  const parts = str.split(/[\s,;]+/).filter(Boolean).map(Number);
  if (parts.some((n) => Number.isNaN(n))) return null;
  return parts;
}

function applyRgb(r, g, b, a) {
  const hsv = rgbToHsv(clamp(r, 0, 255), clamp(g, 0, 255), clamp(b, 0, 255));
  state.h = hsv.h;
  state.s = hsv.s;
  state.v = hsv.v;
  if (a !== undefined) state.a = clamp(a, 0, 1);
  render();
}

hexInput.addEventListener('input', () => {
  const rgb = hexToRgb(hexInput.value);
  if (!rgb) { render(); return; }
  applyRgb(rgb.r, rgb.g, rgb.b, rgb.a);
});

rgb255Input.addEventListener('input', () => {
  const n = parseNums(rgb255Input.value);
  if (!n || n.length < 3) { render(); return; }
  applyRgb(n[0], n[1], n[2], n[3]);
});

rgb1Input.addEventListener('input', () => {
  const n = parseNums(rgb1Input.value);
  if (!n || n.length < 3) { render(); return; }
  applyRgb(n[0] * 255, n[1] * 255, n[2] * 255, n[3]);
});

rgba255Input.addEventListener('input', () => {
  const n = parseNums(rgba255Input.value);
  if (!n || n.length < 4) { render(); return; }
  applyRgb(n[0], n[1], n[2], n[3]);
});

rgba1Input.addEventListener('input', () => {
  const n = parseNums(rgba1Input.value);
  if (!n || n.length < 4) { render(); return; }
  applyRgb(n[0] * 255, n[1] * 255, n[2] * 255, n[3]);
});

hsvInput.addEventListener('input', () => {
  const n = parseNums(hsvInput.value);
  if (!n || n.length < 3) { render(); return; }
  state.h = clamp(n[0], 0, 360);
  state.s = clamp(n[1], 0, 100);
  state.v = clamp(n[2], 0, 100);
  if (n[3] !== undefined) state.a = clamp(n[3], 0, 1);
  render();
});

cmykInput.addEventListener('input', () => {
  const n = parseNums(cmykInput.value);
  if (!n || n.length < 4) { render(); return; }
  const rgb = cmykToRgb(clamp(n[0], 0, 100), clamp(n[1], 0, 100), clamp(n[2], 0, 100), clamp(n[3], 0, 100));
  applyRgb(rgb.r, rgb.g, rgb.b, n[4]);
});

[hexInput, rgb255Input, rgb1Input, rgba255Input, rgba1Input, hsvInput, cmykInput].forEach((input) => {
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') input.blur();
  });
});

// ---------- Copy value buttons ----------

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
  } catch (e) {
    // clipboard unavailable - ignore
  }
  document.body.removeChild(ta);
}

document.querySelectorAll('.copy-btn').forEach((btn) => {
  const target = document.getElementById(btn.dataset.copyTarget);
  if (!target) return;
  btn.addEventListener('click', () => {
    const raw = target.value.replace(/#/g, '');
    const value = (btn.dataset.withHash ? '#' : '') + raw;
    copyToClipboard(value);
  });
});

// ---------- Palettes ----------

function buildHarmonizationPalette(h, s, v) {
  // Simplified "Color Harmonization" (Cohen-Or et al., 2006): instead of
  // picking single discrete hues, colors are sampled from within fixed
  // arcs ("sectors") of the hue wheel. This uses the 'X' template - two
  // symmetric 90°-wide arcs centered on the base hue and its complement.
  const arcWidth = 90;
  const samplesPerArc = 3;
  const centers = [h, h + 180];
  const result = [];
  centers.forEach((center) => {
    for (let i = 0; i < samplesPerArc; i++) {
      const t = i / (samplesPerArc - 1);
      const hue = center - arcWidth / 2 + t * arcWidth;
      result.push(hsvToRgb(hue, s, v));
    }
  });
  return result;
}

const PALETTE_DEFS = [
  {
    title: 'Комплементарная',
    build: (h, s, v) => [0, 180].map((dh) => hsvToRgb(h + dh, s, v))
  },
  {
    title: 'Аналоговая',
    build: (h, s, v) => [-40, -20, 0, 20, 40].map((dh) => hsvToRgb(h + dh, s, v))
  },
  {
    title: 'Триада',
    build: (h, s, v) => [0, 120, 240].map((dh) => hsvToRgb(h + dh, s, v))
  },
  {
    title: 'Раздельно-комплементарная',
    build: (h, s, v) => [0, 150, 210].map((dh) => hsvToRgb(h + dh, s, v))
  },
  {
    title: 'Тетрада (квадрат)',
    build: (h, s, v) => [0, 90, 180, 270].map((dh) => hsvToRgb(h + dh, s, v))
  },
  {
    title: 'Тетрада (прямоугольник)',
    build: (h, s, v) => [0, 60, 180, 240].map((dh) => hsvToRgb(h + dh, s, v))
  },
  {
    title: 'Монохромная',
    build: (h, s, v) => [20, 35, 50, 65, 80, 95].map((nv) => hsvToRgb(h, s, nv))
  },
  {
    title: 'Составная',
    build: (h, s, v) => [0, 30, 180, 210].map((dh) => hsvToRgb(h + dh, s, v))
  },
  {
    title: 'Перцептивная (Lab/LCH)',
    build: (h, s, v) => {
      const base = hsvToRgb(h, s, v);
      const lch = rgbToLch(base.r, base.g, base.b);
      // Same offsets as the tetradic (square) scheme, but the hue is
      // rotated in perceptually-uniform LCH space while L and C stay
      // fixed, so every swatch keeps the same perceived lightness.
      return [0, 90, 180, 270].map((dh) => lchToRgb(lch.l, lch.c, lch.h + dh));
    }
  },
  {
    title: 'Гармонизация по шаблонам (Color Harmonization)',
    build: (h, s, v) => buildHarmonizationPalette(h, s, v)
  }
];

function renderPalettes() {
  palettesEl.innerHTML = '';
  const currentHex = rgbToHex(currentRgb().r, currentRgb().g, currentRgb().b);

  PALETTE_DEFS.forEach((def) => {
    const block = document.createElement('div');
    block.className = 'palette-block';

    const title = document.createElement('div');
    title.className = 'palette-title';
    title.textContent = def.title;
    block.appendChild(title);

    const row = document.createElement('div');
    row.className = 'palette-swatches';

    def.build(state.h, state.s, state.v).forEach((rawRgb) => {
      const rgb = {
        r: clamp(Math.round(rawRgb.r), 0, 255),
        g: clamp(Math.round(rawRgb.g), 0, 255),
        b: clamp(Math.round(rawRgb.b), 0, 255)
      };
      const hex = rgbToHex(rgb.r, rgb.g, rgb.b);

      const sw = document.createElement('div');
      sw.className = 'swatch' + (hex === currentHex ? ' active' : '');
      sw.style.background = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
      sw.title = '#' + hex;
      sw.addEventListener('click', () => {
        const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
        state.h = hsv.h;
        state.s = hsv.s;
        state.v = hsv.v;
        render();
      });
      row.appendChild(sw);
    });

    block.appendChild(row);
    palettesEl.appendChild(block);
  });
}

// ---------- Drawing canvas ----------

const canvas = document.getElementById('drawCanvas');
const ctx = canvas.getContext('2d');
const squares = [];
let brushSize = 16;
let drawing = false;

function resizeCanvas() {
  const w = Math.max(document.documentElement.scrollWidth, window.innerWidth);
  const h = Math.max(document.documentElement.scrollHeight, window.innerHeight);
  canvas.width = w;
  canvas.height = h;
  redrawSquares();
}

function redrawSquares() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  squares.forEach((sq) => {
    ctx.fillStyle = sq.color;
    ctx.fillRect(sq.x - sq.size / 2, sq.y - sq.size / 2, sq.size, sq.size);
  });
}

function drawAt(pageX, pageY) {
  const rgb = currentRgb();
  const color = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${state.a})`;
  const sq = { x: pageX, y: pageY, size: brushSize, color };
  squares.push(sq);
  ctx.fillStyle = color;
  ctx.fillRect(sq.x - sq.size / 2, sq.y - sq.size / 2, sq.size, sq.size);
}

canvas.addEventListener('mousedown', (e) => {
  drawing = true;
  drawAt(e.pageX, e.pageY);
});
window.addEventListener('mousemove', (e) => {
  if (drawing) drawAt(e.pageX, e.pageY);
});
window.addEventListener('mouseup', () => { drawing = false; });

canvas.addEventListener('touchstart', (e) => {
  drawing = true;
  const t = e.touches[0];
  drawAt(t.pageX, t.pageY);
  e.preventDefault();
}, { passive: false });
canvas.addEventListener('touchmove', (e) => {
  if (drawing) {
    const t = e.touches[0];
    drawAt(t.pageX, t.pageY);
  }
  e.preventDefault();
}, { passive: false });
window.addEventListener('touchend', () => { drawing = false; });

window.addEventListener('resize', resizeCanvas);

// ---------- Brush size control ----------

const brushSizeInput = document.getElementById('brushSize');
const brushSizeValue = document.getElementById('brushSizeValue');

brushSizeInput.addEventListener('input', () => {
  brushSize = Number(brushSizeInput.value);
  brushSizeValue.textContent = brushSize;
  savePersistedState();
});

// ---------- Init ----------

const persisted = loadPersistedState();
if (persisted) {
  if (Number.isFinite(persisted.h)) state.h = persisted.h;
  if (Number.isFinite(persisted.s)) state.s = persisted.s;
  if (Number.isFinite(persisted.v)) state.v = persisted.v;
  if (Number.isFinite(persisted.a)) state.a = persisted.a;
  if (Number.isFinite(persisted.brushSize)) brushSize = persisted.brushSize;
  if (typeof persisted.sampleText === 'string') sampleText.value = persisted.sampleText;
}

brushSizeInput.value = brushSize;
brushSizeValue.textContent = brushSize;

render();
resizeCanvas();

// Recheck canvas size after layout settles (palettes affect page height)
window.addEventListener('load', resizeCanvas);
