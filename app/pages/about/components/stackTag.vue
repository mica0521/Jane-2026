<script setup>
import icon1 from "@/assets/images/stackTagIcon/1-figma.png";
import icon2 from "@/assets/images/stackTagIcon/2-sketch.png";
import icon3 from "@/assets/images/stackTagIcon/3-illustrator.png";
import icon4 from "@/assets/images/stackTagIcon/4-photoshop.png";
import icon5 from "@/assets/images/stackTagIcon/5-aftereffects.png";
import icon6 from "@/assets/images/stackTagIcon/6-chatgpt.png";
import icon7 from "@/assets/images/stackTagIcon/7-codex.png";
import icon8 from "@/assets/images/stackTagIcon/8-gemini.png";

const tagList = [
  { icon: icon1, label: "Figma" },
  { icon: icon2, label: "Sketch" },
  { icon: icon3, label: "Adobe Illustrator" },
  { icon: icon4, label: "Photoshop" },
  { icon: icon5, label: "Adobe Effect" },
  { icon: icon6, label: "Chatgpt" },
  { icon: icon7, label: "CodeX" },
  { icon: icon8, label: "Gemini" },
];
</script>

<template>
  <div class="marquee-container">
    <div class="marquee-track">
      <!-- 第一组标签 -->
      <span v-for="(tag, index) in tagList" :key="`a-${index}`" class="stack-tag">
        <img class="stack-icon" :src="tag.icon" :alt="tag.label" />
        <span class="stack-label">{{ tag.label }}</span>
      </span>
      <!-- 第二组标签（复制，用于无缝循环） -->
      <span v-for="(tag, index) in tagList" :key="`b-${index}`" class="stack-tag">
        <img class="stack-icon" :src="tag.icon" :alt="tag.label" />
        <span class="stack-label">{{ tag.label }}</span>
      </span>
    </div>
  </div>
</template>

<style scoped>
/* 走马灯容器 - 隐藏溢出内容 */
.marquee-container {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
}

/* 走马灯轨道 - 包含所有标签并动画 */
.marquee-track {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  animation: marquee 20s linear infinite;
}

/* 鼠标悬停时暂停动画 */
.marquee-container:hover .marquee-track {
  animation-play-state: paused;
}

/* 走马灯动画 - 从右向左滚动 */
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* 标签样式 */
.stack-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  border: 1px solid #000;
  border-radius: 9999px;
  background: #fff;
  flex-shrink: 0;
}

.stack-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
  flex-shrink: 0;
}

.stack-label {
  font-size: 24px;
  font-weight: 500;
  color: #000;
  line-height: 1;
  white-space: nowrap;
}
</style>
