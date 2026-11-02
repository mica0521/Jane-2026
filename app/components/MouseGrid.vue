<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// Canvas 元素引用
const canvas = ref(null);
// 2D 渲染上下文
let ctx = null;
// 动画帧 ID，用于取消动画
let animationId = null;

// 网格点数组，存储所有圆点的位置和状态
const dots = [];
// 冲击波动画数组，存储点击产生的冲击波
const waves = [];

// 鼠标/指针状态对象
const pointer = {
  x: 0, // 当前 X 坐标（平滑后）
  y: 0, // 当前 Y 坐标（平滑后）
  targetX: 0, // 目标 X 坐标（鼠标实际位置）
  targetY: 0, // 目标 Y 坐标（鼠标实际位置）
  lastX: 0, // 上一帧 X 坐标
  lastY: 0, // 上一帧 Y 坐标
  lastTime: 0, // 上一帧时间戳
  vx: 0, // X 方向速度
  vy: 0, // Y 方向速度
  speed: 0, // 移动速度
  active: false, // 是否在画布内
};

// 动画参数配置
const motion = {
  dotSize: 4, // 圆点大小（像素）
  gap: 22, // 圆点间距（像素）
  proximity: 150, // 鼠标影响半径（像素）
  shockRadius: 140, // 点击冲击波半径（像素）
  maxOffset: 6, // 圆点最大偏移距离（像素）
  spring: 0.085, // 弹性系数（回弹力度）
  friction: 0.9, // 摩擦系数（速度衰减）
  pointerEase: 0.14, // 鼠标跟随平滑系数
  baseColor: [230, 230, 230], // 基础颜色（浅灰）
  activeColor: [68, 68, 68], // 激活颜色（深灰）
};

/**
 * 构建网格
 * 根据窗口大小计算行列数，生成均匀分布的圆点
 */
function buildGrid() {
  if (!canvas.value) return;

  // 处理设备像素比，保证在高分辨率屏幕上的清晰度
  const dpr = window.devicePixelRatio || 1;
  canvas.value.width = window.innerWidth * dpr;
  canvas.value.height = window.innerHeight * dpr;
  canvas.value.style.width = window.innerWidth + "px";
  canvas.value.style.height = window.innerHeight + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  // 清空现有圆点数组
  dots.length = 0;

  // 计算网格参数
  const cell = motion.dotSize + motion.gap; // 每个单元格大小
  const cols = Math.floor((window.innerWidth + motion.gap) / cell); // 列数
  const rows = Math.floor((window.innerHeight + motion.gap) / cell); // 行数
  const gridWidth = cols * cell - motion.gap; // 网格总宽度
  const gridHeight = rows * cell - motion.gap; // 网格总高度
  const startX = (window.innerWidth - gridWidth) * 0.5 + motion.dotSize * 0.5; // 起始 X（居中）
  const startY = (window.innerHeight - gridHeight) * 0.5 + motion.dotSize * 0.5; // 起始 Y（居中）

  // 生成所有圆点
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      dots.push({
        x: startX + col * cell, // 原始 X 坐标
        y: startY + row * cell, // 原始 Y 坐标
        ox: 0, // X 方向偏移量
        oy: 0, // Y 方向偏移量
        vx: 0, // X 方向速度
        vy: 0, // Y 方向速度
      });
    }
  }
}

/**
 * 颜色混合函数
 * 在两个颜色之间进行线性插值
 * @param {number[]} from - 起始颜色 [r, g, b]
 * @param {number[]} to - 目标颜色 [r, g, b]
 * @param {number} t - 插值系数 (0-1)
 * @returns {string} RGB 颜色字符串
 */
function mixColor(from, to, t) {
  const r = Math.round(from[0] + (to[0] - from[0]) * t);
  const g = Math.round(from[1] + (to[1] - from[1]) * t);
  const b = Math.round(from[2] + (to[2] - from[2]) * t);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}

/**
 * 动画循环
 * 每帧更新圆点位置和状态，并重新绘制
 */
function animateGrid() {
  // 平滑跟随鼠标位置
  pointer.x += (pointer.targetX - pointer.x) * motion.pointerEase;
  pointer.y += (pointer.targetY - pointer.y) * motion.pointerEase;

  // 清空画布
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  // 更新冲击波生命周期，移除已消失的冲击波
  for (let i = waves.length - 1; i >= 0; i -= 1) {
    waves[i].life -= 1;
    if (waves[i].life <= 0) {
      waves.splice(i, 1);
    }
  }

  // 遍历所有圆点，计算位置和颜色
  for (let i = 0; i < dots.length; i += 1) {
    const dot = dots[i];

    // 计算圆点到鼠标的距离
    const dx = dot.x - pointer.x;
    const dy = dot.y - pointer.y;
    const distance = Math.hypot(dx, dy);

    // 计算接近度（0-1，越近越大）
    const proximity = Math.max(0, 1 - distance / motion.proximity);

    // 鼠标交互：根据鼠标速度和距离产生推力
    if (pointer.active && proximity > 0) {
      const angle = Math.atan2(dot.y - pointer.y, dot.x - pointer.x);
      const force = Math.min(pointer.speed / 28, motion.maxOffset) * proximity;
      dot.vx += Math.cos(angle) * force * 0.065 + pointer.vx * 0.00028 * proximity;
      dot.vy += Math.sin(angle) * force * 0.065 + pointer.vy * 0.00028 * proximity;
    }

    // 冲击波交互：计算冲击波对圆点的影响
    for (let j = 0; j < waves.length; j += 1) {
      const wave = waves[j];
      const wx = dot.x - wave.x;
      const wy = dot.y - wave.y;
      const waveDistance = Math.hypot(wx, wy);
      if (waveDistance < wave.radius) {
        // 根据距离和冲击波生命周期计算力度
        const falloff = (1 - waveDistance / wave.radius) * (wave.life / wave.maxLife);
        const angle = Math.atan2(wy, wx);
        dot.vx += Math.cos(angle) * wave.power * falloff;
        dot.vy += Math.sin(angle) * wave.power * falloff;
      }
    }

    // 弹性回弹：圆点趋向回到原始位置
    dot.vx += (0 - dot.ox) * motion.spring;
    dot.vy += (0 - dot.oy) * motion.spring;

    // 应用摩擦力，衰减速度
    dot.vx *= motion.friction;
    dot.vy *= motion.friction;

    // 更新偏移量
    dot.ox += dot.vx;
    dot.oy += dot.vy;

    // 限制最大偏移距离
    const offsetDistance = Math.hypot(dot.ox, dot.oy);
    if (offsetDistance > motion.maxOffset) {
      const scale = motion.maxOffset / offsetDistance;
      dot.ox *= scale;
      dot.oy *= scale;
    }

    // 绘制圆点
    ctx.beginPath();
    // 根据接近度混合颜色
    ctx.fillStyle = mixColor(motion.baseColor, motion.activeColor, proximity);
    // 绘制圆形（位置 + 偏移）
    ctx.arc(dot.x + dot.ox, dot.y + dot.oy, motion.dotSize * 0.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // 请求下一帧动画
  animationId = requestAnimationFrame(animateGrid);
}

/**
 * 鼠标移动事件处理
 * 计算鼠标速度和位置
 */
function handlePointerMove(event) {
  const now = performance.now();
  const dt = Math.max(16, now - pointer.lastTime); // 时间差（最小 16ms）
  const dx = event.clientX - pointer.lastX; // X 位移
  const dy = event.clientY - pointer.lastY; // Y 位移

  // 计算速度（像素/秒）
  pointer.vx = (dx / dt) * 1000;
  pointer.vy = (dy / dt) * 1000;
  pointer.speed = Math.min(2200, Math.hypot(pointer.vx, pointer.vy));

  // 更新状态
  pointer.lastTime = now;
  pointer.lastX = event.clientX;
  pointer.lastY = event.clientY;
  pointer.targetX = event.clientX;
  pointer.targetY = event.clientY;
  pointer.active = true;
}

/**
 * 鼠标离开画布事件处理
 */
function handlePointerLeave() {
  pointer.active = false;
  pointer.speed *= 0.6; // 减速
}

/**
 * 鼠标点击事件处理
 * 创建冲击波效果
 */
function handlePointerDown(event) {
  waves.push({
    x: event.clientX, // 冲击波中心 X
    y: event.clientY, // 冲击波中心 Y
    radius: motion.shockRadius, // 冲击波半径
    power: 0.85, // 冲击力度
    life: 14, // 当前生命周期
    maxLife: 14, // 最大生命周期
  });
}

// 组件挂载时初始化
onMounted(() => {
  // 获取 2D 渲染上下文
  ctx = canvas.value.getContext("2d");

  // 初始化指针位置为屏幕中心
  pointer.x = window.innerWidth * 0.5;
  pointer.y = window.innerHeight * 0.5;
  pointer.targetX = window.innerWidth * 0.5;
  pointer.targetY = window.innerHeight * 0.5;
  pointer.lastX = window.innerWidth * 0.5;
  pointer.lastY = window.innerHeight * 0.5;
  pointer.lastTime = performance.now();

  // 构建网格并启动动画
  buildGrid();
  animateGrid();

  // 绑定事件监听
  window.addEventListener("resize", buildGrid);
  window.addEventListener("mousemove", handlePointerMove, { passive: true });
  document.addEventListener("mouseleave", handlePointerLeave);
  window.addEventListener("mousedown", handlePointerDown);
});

// 组件卸载时清理
onUnmounted(() => {
  // 取消动画帧
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  // 移除事件监听
  window.removeEventListener("resize", buildGrid);
  window.removeEventListener("mousemove", handlePointerMove);
  document.removeEventListener("mouseleave", handlePointerLeave);
  window.removeEventListener("mousedown", handlePointerDown);
});
</script>

<template>
  <!-- 鼠标网格背景容器 -->
  <div class="mouse-grid" aria-hidden="true">
    <!-- Canvas 画布 -->
    <canvas class="mouse-grid__canvas" ref="canvas"></canvas>
  </div>
</template>

<style scoped>
/* 网格背景容器 - 固定定位覆盖全屏 */
.mouse-grid {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none; /* 不拦截鼠标事件 */
  opacity: 0.9;
}

/* Canvas 画布 */
.mouse-grid__canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
