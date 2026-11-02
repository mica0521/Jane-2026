<template>
  <div class="carousel">
    <div class="carousel-container" ref="containerRef">
      <div class="carousel-track" ref="trackRef">
        <div
          :ref="(el) => setCardRef(el, index)"
          v-for="(note, index) in notes"
          :key="note.id"
          class="card"
          :class="{ 'card-center': index === currentIndex }"
          @click="scrollToIndex(index)"
        >
          <div class="card-image">
            <img v-if="note.images && note.images.length > 0" :src="note.images[0].url" />
            <div v-else class="card-image-placeholder"></div>
          </div>
          <div class="card-info">
            <p class="card-title">{{ note.name }}</p>
            <div class="card-stats">
              <span class="stat">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                {{ note.views || 0 }}
              </span>
              <span class="stat">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
                  />
                </svg>
                {{ note.likes || 0 }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 导航按钮 -->
    <div class="carousel-nav">
      <button class="nav-btn" @click="scrollPrev">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
      <button class="nav-btn" @click="scrollNext">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import noteContent from "~/content/notes.json";

// 获取笔记数据
const notes = ref(noteContent);

// DOM 引用
const containerRef = ref(null); // 轮播容器
const trackRef = ref(null); // 轮播轨道（包含所有卡片）
const cardRefs = ref([]); // 所有卡片的 DOM 引用数组
const currentIndex = ref(0); // 当前选中的卡片索引

/**
 * 设置卡片 DOM 引用
 * @param {HTMLElement} el - 卡片元素
 * @param {number} index - 卡片索引
 */
const setCardRef = (el, index) => {
  if (el) {
    cardRefs.value[index] = el;
  }
};

/**
 * 滚动到指定索引的卡片，使其中间对齐
 * @param {number} index - 目标卡片索引
 */
const scrollToIndex = (index) => {
  if (cardRefs.value[index]) {
    cardRefs.value[index].scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
    currentIndex.value = index;
  }
};

/**
 * 滚动到上一个卡片
 */
const scrollPrev = () => {
  scrollToIndex(currentIndex.value - 1);
};

/**
 * 滚动到下一个卡片
 * - 如果当前是最后一个卡片，滚动到容器最右边
 */
const scrollNext = () => {
  if (notes.value && currentIndex.value === notes.value.length - 2) {
    currentIndex.value += 1;
    setTimeout(() => {
      containerRef.value?.scrollTo({
        left: trackRef.value.scrollWidth + 1000,
        behavior: "smooth",
      });
    }, 200);
  } else {
    scrollToIndex(currentIndex.value + 1);
  }
};
</script>

<style scoped>
.carousel {
  width: 100%;
}

.carousel-container {
  width: 100%;
  overflow: hidden;
}

.carousel-track {
  display: inline-flex;
  gap: 16px;
  padding: 10px;
  scroll-behavior: smooth;
}

.carousel-track::-webkit-scrollbar {
  display: none;
}

.card {
  flex: 0 0 360px;
  width: 360px;
  background: #fafafa;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
  transform: scale(0.9);
  opacity: 0.6;
}

.card-center {
  transform: scale(1);
  opacity: 1;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
}

.card-image {
  width: 100%;
  height: 140px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.card-image-placeholder {
  width: 100%;
  height: 100%;
  background: #e0e0e0;
}

.card-info {
  padding: 12px;
}

.card-title {
  font-size: 12px;
  color: #333;
  margin: 0 0 8px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-stats {
  display: flex;
  gap: 16px;
}

.stat {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #999;
}

.carousel-nav {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
}

.nav-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #e0e0e0;
  background: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  transition: all 0.2s;
}

.nav-btn:hover {
  border-color: #333;
  color: #333;
}
</style>
