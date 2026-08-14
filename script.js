const lightbox = document.querySelector('.lightbox');
const lightboxContent = document.querySelector('.lightbox-content');
const lightboxCaption = document.querySelector('.lightbox-caption');
const closeButton = document.querySelector('.lightbox-close');
const previousButton = document.querySelector('.lightbox-prev');
const nextButton = document.querySelector('.lightbox-next');
const lightboxStage = document.querySelector('.lightbox-stage');
const zoomOutButton = document.querySelector('.zoom-out');
const zoomInButton = document.querySelector('.zoom-in');
const zoomResetButton = document.querySelector('.zoom-reset');
const zoomLevel = document.querySelector('.zoom-level');
const spreadViewControls = document.querySelector('.spread-view-controls');
const spreadModeButtons = [...document.querySelectorAll('[data-spread-mode]')];

const views = [
  { project: '指北旅行', label: 'PAGE 01 / 10', src: 'assets/portfolio/01.jpg', mode: 'single', alt: '第 1 页，旅行应用视觉封面' },
  { project: '指北旅行', label: 'PAGE 02 / 10', src: 'assets/portfolio/02.jpg', mode: 'single', alt: '第 2 页，产品介绍与改版目标' },
  { project: '指北旅行', label: 'PAGES 03—04 / 10', src: 'assets/portfolio/03-04.jpg', mode: 'spread', edgeFix: 'edge-fix-03', alt: '第 3 至 4 页完整跨页，设计步骤、产品结构与界面总览' },
  { project: '指北旅行', label: 'PAGES 05—06 / 10', src: 'assets/portfolio/05-06.jpg', mode: 'spread', edgeFix: 'edge-fix-05', alt: '第 5 至 6 页完整跨页，首页框架与核心功能优化' },
  { project: '指北旅行', label: 'PAGES 07—08 / 10', src: 'assets/portfolio/07-08.jpg', mode: 'spread', alt: '第 7 至 8 页完整跨页，用户旅程与行程交互设计' },
  { project: '指北旅行', label: 'PAGE 09 / 10', src: 'assets/portfolio/09-10.jpg', mode: 'crop', crop: 'left', alt: '第 9 页，设计规范与交互界面' },
  { project: '指北旅行', label: 'PAGE 10 / 10', src: 'assets/portfolio/09-10.jpg', mode: 'crop', crop: 'right', alt: '第 10 页，最终界面效果展示' },
  { project: '科灵短剧', label: 'PAGES 01—02 / 10', src: 'assets/keling/01-02.jpg', mode: 'spread', alt: '第 1 至 2 页完整跨页，项目视觉封面与未来突袭角色展示' },
  { project: '科灵短剧', label: 'PAGE 03 / 10', src: 'assets/keling/03.jpg', mode: 'single', alt: '第 3 页，项目背景、市场洞察与产品方向' },
  { project: '科灵短剧', label: 'PAGE 04 / 10', src: 'assets/keling/04.jpg', mode: 'single', alt: '第 4 页，用户研究与产品体验分析' },
  { project: '科灵短剧', label: 'PAGE 05 / 10', src: 'assets/keling/05.jpg', mode: 'single', alt: '第 5 页，信息架构与视觉规范' },
  { project: '科灵短剧', label: 'PAGE 06 / 10', src: 'assets/keling/06.jpg', mode: 'single', alt: '第 6 页，核心界面与短剧交互设计' },
  { project: '科灵短剧', label: 'PAGES 07—08 / 10', src: 'assets/keling/07-08.jpg', mode: 'spread', alt: '第 7 至 8 页完整跨页，产品原型、AI 创作页面与积分体系' },
  { project: '科灵短剧', label: 'PAGES 09—10 / 10', src: 'assets/keling/09-10.jpg', mode: 'spread', alt: '第 9 至 10 页完整跨页，未来突袭角色设定与最终视觉展示' },
  { project: '祁连寻迹', label: 'PAGES 01—02 / 10', src: 'assets/qilian/01-02.jpg', mode: 'spread', alt: '第 1 至 2 页完整跨页，项目封面与核心界面展示' },
  { project: '祁连寻迹', label: 'PAGES 03—04 / 10', src: 'assets/qilian/03-04.jpg', mode: 'spread', alt: '第 3 至 4 页完整跨页，项目分析、产品结构与设计规范' },
  { project: '祁连寻迹', label: 'PAGES 05—06 / 10', src: 'assets/qilian/05-06.jpg', mode: 'spread', alt: '第 5 至 6 页完整跨页，用户体验与核心交互介绍' },
  { project: '祁连寻迹', label: 'PAGE 07 / 10', src: 'assets/qilian/07-08.jpg', mode: 'crop', crop: 'left', alt: '第 7 页，地图导览与紧急救援设计' },
  { project: '祁连寻迹', label: 'PAGE 08 / 10', src: 'assets/qilian/07-08.jpg', mode: 'crop', crop: 'right', alt: '第 8 页，特色功能与文创商城设计' },
  { project: '祁连寻迹', label: 'PAGES 09—10 / 10', src: 'assets/qilian/09-10.jpg', mode: 'spread', alt: '第 9 至 10 页完整跨页，弘化公主 IP 与文创衍生设计' },
  { project: '船厂社区', label: 'PAGE 01 / 08', src: 'assets/shipyard/01.jpg', mode: 'single', alt: '第 1 页，项目封面' },
  { project: '船厂社区', label: 'PAGE 02 / 08', src: 'assets/shipyard/02.jpg', mode: 'single', alt: '第 2 页，场地背景与现状分析' },
  { project: '船厂社区', label: 'PAGES 03—04 / 08', src: 'assets/shipyard/03-04.jpg', mode: 'spread', alt: '第 3 至 4 页完整跨页，历史分析、设计策略与整体规划' },
  { project: '船厂社区', label: 'PAGE 05 / 08', src: 'assets/shipyard/05.jpg', mode: 'single', alt: '第 5 页，总体设计平面图' },
  { project: '船厂社区', label: 'PAGE 06 / 08', src: 'assets/shipyard/06.jpg', mode: 'single', alt: '第 6 页，设计鸟瞰与节点分析' },
  { project: '船厂社区', label: 'PAGE 07 / 08', src: 'assets/shipyard/07.jpg', mode: 'single', alt: '第 7 页，植物布局、排水系统与生态链' },
  { project: '船厂社区', label: 'PAGE 08 / 08', src: 'assets/shipyard/08.jpg', mode: 'single', alt: '第 8 页，植物配置设计' },
  { project: '大连足球', label: 'PAGES 01—02 / 02', src: 'assets/football/01-02.jpg', mode: 'spread', alt: '第 1 至 2 页完整跨页，足球历史、俱乐部与城市体育文化信息可视化' },
  { project: '四时绒韵', label: 'PAGES 01—02 / 02', src: 'assets/velvet-flower/01-02.jpg', mode: 'spread', alt: '第 1 至 2 页完整跨页，扬州绒花与二十四节气 AIGC IP 及衍生品设计' },
  { project: '心渊日记', label: 'PAGES 01—02 / 04', src: 'assets/abyss-diary/01-02.jpg', mode: 'spread', alt: '第 1 至 2 页完整跨页，游戏封面、世界观与角色设定展示' },
  { project: '心渊日记', label: 'PAGES 03—04 / 04', src: 'assets/abyss-diary/03-04.jpg', mode: 'spread', alt: '第 3 至 4 页完整跨页，任务、背包、地图、建造与操作界面设计' },
  { project: '东农校园导视', label: 'PAGES 01—02 / 02', src: 'assets/campus-wayfinding/01-02.jpg', mode: 'spread', alt: '第 1 至 2 页完整跨页，校园导视牌、校园地图与字体意向座椅设计' },
  { project: '岸启新生 · 信义沟', label: 'PAGES 01—02 / 02', src: 'assets/waterfront-plaza/01-02.jpg', mode: 'spread', alt: '第 1 至 2 页完整跨页，总体规划、场地分析、生态策略与滨水节点效果展示' },
  { project: '人街梦坊 · 梦想小镇', label: 'PAGES 01—02 / 02', src: 'assets/dream-town/01-02.jpg', mode: 'spread', alt: '第 1 至 2 页完整跨页，校园街道游览动线、空间改造流程、建筑设计与青年社交需求分析' },
];

let currentViewIndex = 0;
let currentSpreadMode = 'full';
const MIN_SCALE = 1;
const MAX_SCALE = 2;
const ZOOM_STEP = .25;
let zoomScale = MIN_SCALE;
let panX = 0;
let panY = 0;
let dragStart = null;
let pinchStart = null;
const activePointers = new Map();

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function clampPan() {
  const maxPanX = Math.max(0, (lightboxContent.offsetWidth * zoomScale - lightboxStage.clientWidth) / 2);
  const maxPanY = Math.max(0, (lightboxContent.offsetHeight * zoomScale - lightboxStage.clientHeight) / 2);
  panX = clamp(panX, -maxPanX, maxPanX);
  panY = clamp(panY, -maxPanY, maxPanY);
}

function applyTransform() {
  lightboxContent.style.transform = `translate3d(${panX}px, ${panY}px, 0) scale(${zoomScale})`;
  lightboxContent.classList.toggle('is-zoomed', zoomScale > MIN_SCALE + .001);
  zoomLevel.value = `${Math.round(zoomScale * 100)}%`;
  zoomLevel.textContent = zoomLevel.value;
  zoomOutButton.disabled = zoomScale <= MIN_SCALE + .001;
  zoomInButton.disabled = zoomScale >= MAX_SCALE - .001;
}

function resetZoom() {
  zoomScale = MIN_SCALE;
  panX = 0;
  panY = 0;
  dragStart = null;
  pinchStart = null;
  activePointers.clear();
  lightboxContent.classList.remove('is-dragging');
  applyTransform();
}

function zoomAt(nextScale, clientX, clientY) {
  const newScale = clamp(nextScale, MIN_SCALE, MAX_SCALE);
  if (Math.abs(newScale - zoomScale) < .001) return;

  const stageRect = lightboxStage.getBoundingClientRect();
  const stageCenterX = stageRect.left + stageRect.width / 2;
  const stageCenterY = stageRect.top + stageRect.height / 2;
  const anchorX = clientX - (stageCenterX + panX);
  const anchorY = clientY - (stageCenterY + panY);
  const ratio = newScale / zoomScale;

  panX -= anchorX * (ratio - 1);
  panY -= anchorY * (ratio - 1);
  zoomScale = newScale;

  if (zoomScale === MIN_SCALE) {
    panX = 0;
    panY = 0;
  }

  clampPan();
  applyTransform();
}

function zoomFromCenter(nextScale) {
  const stageRect = lightboxStage.getBoundingClientRect();
  zoomAt(nextScale, stageRect.left + stageRect.width / 2, stageRect.top + stageRect.height / 2);
}

function updateSpreadModeButtons() {
  spreadModeButtons.forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.spreadMode === currentSpreadMode));
  });
}

function setSpreadMode(mode) {
  const view = views[currentViewIndex];
  if (view.mode !== 'spread') return;

  currentSpreadMode = mode;
  const preview = lightboxContent.querySelector('.zoom-page');
  const image = preview.querySelector('.zoom-image');
  const shouldFixEdge = Boolean(view.edgeFix) && mode !== 'left';

  lightboxContent.classList.toggle('is-spread', mode === 'full');
  preview.className = `zoom-page${shouldFixEdge ? ` edge-fix ${view.edgeFix}` : ''}`;

  if (mode === 'full') {
    image.className = 'zoom-image full-spread-page';
    image.alt = `${view.project}作品集${view.alt}`;
    lightboxCaption.textContent = `${view.project} · ${view.label}`;
  } else {
    image.className = `zoom-image combined-page crop-${mode}`;
    image.alt = `${view.project}作品集${mode === 'left' ? '左页' : '右页'}阅读视图`;
    lightboxCaption.textContent = `${view.project} · ${view.label} · ${mode === 'left' ? '左页阅读' : '右页阅读'}`;
  }

  updateSpreadModeButtons();
  resetZoom();
}

function renderView(index) {
  currentViewIndex = index;
  currentSpreadMode = 'full';
  const view = views[index];
  const preview = document.createElement('div');
  const image = document.createElement('img');

  preview.className = `zoom-page${view.edgeFix ? ` edge-fix ${view.edgeFix}` : ''}`;
  image.src = view.src;
  image.alt = `${view.project}作品集${view.alt}`;

  if (view.mode === 'spread') {
    image.className = 'zoom-image full-spread-page';
  } else if (view.mode === 'single') {
    image.className = 'zoom-image single-page';
  } else {
    image.className = `zoom-image combined-page crop-${view.crop}`;
  }

  lightboxContent.classList.toggle('is-spread', view.mode === 'spread');
  spreadViewControls.hidden = view.mode !== 'spread';
  lightbox.classList.toggle('has-spread-controls', view.mode === 'spread');
  updateSpreadModeButtons();
  preview.appendChild(image);
  lightboxContent.replaceChildren(preview);
  resetZoom();
  lightboxCaption.textContent = `${view.project} · ${view.label}`;
  previousButton.disabled = index === 0;
  nextButton.disabled = index === views.length - 1;
}

function openView(viewNumber) {
  renderView(viewNumber - 1);
  if (!lightbox.open) lightbox.showModal();
}

document.querySelectorAll('[data-view]').forEach((trigger) => {
  trigger.addEventListener('click', () => openView(Number(trigger.dataset.view)));
});

previousButton.addEventListener('click', () => {
  if (currentViewIndex > 0) renderView(currentViewIndex - 1);
});

nextButton.addEventListener('click', () => {
  if (currentViewIndex < views.length - 1) renderView(currentViewIndex + 1);
});

zoomOutButton.addEventListener('click', () => zoomFromCenter(zoomScale - ZOOM_STEP));
zoomInButton.addEventListener('click', () => zoomFromCenter(zoomScale + ZOOM_STEP));
zoomResetButton.addEventListener('click', resetZoom);
spreadModeButtons.forEach((button) => {
  button.addEventListener('click', () => setSpreadMode(button.dataset.spreadMode));
});

lightboxContent.addEventListener('wheel', (event) => {
  event.preventDefault();
  const factor = Math.exp(-event.deltaY * .0015);
  zoomAt(zoomScale * factor, event.clientX, event.clientY);
}, { passive: false });

lightboxContent.addEventListener('dblclick', (event) => {
  event.preventDefault();
  zoomAt(zoomScale > 1.05 ? MIN_SCALE : 2, event.clientX, event.clientY);
});

function beginPinch() {
  const pointers = [...activePointers.values()].slice(0, 2);
  const center = {
    x: (pointers[0].x + pointers[1].x) / 2,
    y: (pointers[0].y + pointers[1].y) / 2,
  };
  const stageRect = lightboxStage.getBoundingClientRect();
  pinchStart = {
    distance: Math.hypot(pointers[1].x - pointers[0].x, pointers[1].y - pointers[0].y),
    scale: zoomScale,
    anchorX: center.x - (stageRect.left + stageRect.width / 2 + panX),
    anchorY: center.y - (stageRect.top + stageRect.height / 2 + panY),
  };
}

lightboxContent.addEventListener('pointerdown', (event) => {
  if (event.pointerType === 'mouse' && event.button !== 0) return;
  activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
  lightboxContent.setPointerCapture(event.pointerId);

  if (activePointers.size === 1) {
    dragStart = { x: event.clientX, y: event.clientY, panX, panY };
    if (zoomScale > MIN_SCALE) lightboxContent.classList.add('is-dragging');
  } else if (activePointers.size === 2) {
    beginPinch();
    lightboxContent.classList.add('is-dragging');
  }
});

lightboxContent.addEventListener('pointermove', (event) => {
  if (!activePointers.has(event.pointerId)) return;
  activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

  if (activePointers.size >= 2 && pinchStart) {
    event.preventDefault();
    const pointers = [...activePointers.values()].slice(0, 2);
    const distance = Math.hypot(pointers[1].x - pointers[0].x, pointers[1].y - pointers[0].y);
    const center = {
      x: (pointers[0].x + pointers[1].x) / 2,
      y: (pointers[0].y + pointers[1].y) / 2,
    };
    const stageRect = lightboxStage.getBoundingClientRect();
    const nextScale = clamp(pinchStart.scale * distance / Math.max(pinchStart.distance, 1), MIN_SCALE, MAX_SCALE);
    const ratio = nextScale / pinchStart.scale;

    zoomScale = nextScale;
    panX = center.x - (stageRect.left + stageRect.width / 2) - pinchStart.anchorX * ratio;
    panY = center.y - (stageRect.top + stageRect.height / 2) - pinchStart.anchorY * ratio;
    if (zoomScale === MIN_SCALE) {
      panX = 0;
      panY = 0;
    }
    clampPan();
    applyTransform();
  } else if (activePointers.size === 1 && dragStart && zoomScale > MIN_SCALE) {
    event.preventDefault();
    panX = dragStart.panX + event.clientX - dragStart.x;
    panY = dragStart.panY + event.clientY - dragStart.y;
    clampPan();
    applyTransform();
  }
});

function endPointer(event) {
  activePointers.delete(event.pointerId);
  if (lightboxContent.hasPointerCapture(event.pointerId)) {
    lightboxContent.releasePointerCapture(event.pointerId);
  }

  pinchStart = null;
  if (activePointers.size === 1) {
    const remaining = [...activePointers.values()][0];
    dragStart = { x: remaining.x, y: remaining.y, panX, panY };
  } else {
    dragStart = null;
    lightboxContent.classList.remove('is-dragging');
  }
}

lightboxContent.addEventListener('pointerup', endPointer);
lightboxContent.addEventListener('pointercancel', endPointer);

closeButton.addEventListener('click', () => {
  resetZoom();
  lightbox.close();
});

lightboxStage.addEventListener('click', (event) => {
  if (event.target === lightboxStage) {
    resetZoom();
    lightbox.close();
  }
});

lightbox.addEventListener('close', resetZoom);

window.addEventListener('resize', () => {
  if (!lightbox.open) return;
  clampPan();
  applyTransform();
});

document.addEventListener('keydown', (event) => {
  if (!lightbox.open) return;
  if (event.key === 'ArrowLeft' && currentViewIndex > 0) renderView(currentViewIndex - 1);
  if (event.key === 'ArrowRight' && currentViewIndex < views.length - 1) renderView(currentViewIndex + 1);
  if (event.key === '+' || event.key === '=') {
    event.preventDefault();
    zoomFromCenter(zoomScale + ZOOM_STEP);
  }
  if (event.key === '-' || event.key === '_') {
    event.preventDefault();
    zoomFromCenter(zoomScale - ZOOM_STEP);
  }
  if (event.key === '0') {
    event.preventDefault();
    resetZoom();
  }
  if (views[currentViewIndex].mode === 'spread' && event.key === '[') {
    event.preventDefault();
    setSpreadMode('left');
  }
  if (views[currentViewIndex].mode === 'spread' && event.key === ']') {
    event.preventDefault();
    setSpreadMode('right');
  }
  if (views[currentViewIndex].mode === 'spread' && event.key === '\\') {
    event.preventDefault();
    setSpreadMode('full');
  }
});
