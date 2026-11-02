<template>
  <div style="height: 100%">
    <MouseGrid></MouseGrid>
    <div class="home-page">
      <!-- 顶部 Hero 区域 -->
      <div class="hero-section">
        <!-- 主标题 -->
        <h1 class="main-title">
          <!-- 装饰图标 - 标题左上角 -->
          <div class="decorative-stars">
            <span class="star star-1">✦</span>
            <span class="star star-2">✦</span>
            <span class="star star-3">✦</span>
          </div>
          <!-- 头像 - 标题右上角 -->
          <div class="avatar">
            <img :src="avatarPng" alt="周捷" />
          </div>
          <span class="title-text">Hi there!<br />I'm Jane...</span>
        </h1>

        <!-- 副标题 -->
        <div class="subtitle">
          <p class="subtitle-line">我是周捷，UI/UX设计师</p>
          <p class="subtitle-line">从业务问题出发制定解决方案，专注交互与界面细节优化</p>
          <p class="subtitle-line">
            擅长在ToB复杂流程与ToC用户心理之间构建清晰、高效的产品体验
          </p>
        </div>

        <!-- 按钮 -->
        <button class="cta-button" @click="goToAbout">
          更多关于我 <span class="arrow">→</span>
        </button>
      </div>

      <!-- 近期项目区域 -->
      <div class="projects-section">
        <h2 class="section-title">
          近期项目 <span class="section-title-en">/ Recent</span>
        </h2>
        <ProjectGrid :projects="projects || []" />
        <div style="text-align: center; margin-top: 40px">
          <button class="more-button" @click="goToProject">
            更多项目 <span class="arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import allProjects from "~/content/projects.json";
import avatarPng from "@/assets/images/avatar.png";
import ProjectGrid from "../project/components/ProjectGrid.vue";

const router = useRouter();

// 获取项目列表（只查询3条）
const projects = allProjects.slice(0, 3);

const goToAbout = () => {
  router.push("/about");
};

const goToProject = () => {
  router.push("/project");
};
</script>

<style scoped>
.home-page {
  position: relative;
  z-index: 1;
  height: 100%;
  overflow-y: auto;
}

/* Hero 区域 */
.hero-section {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 80px);
  padding: 40px 20px;
  text-align: center;
}

/* 主标题 */
.main-title {
  position: relative;
  font-size: 48px;
  font-weight: 500;
  color: #000;
  margin: 0 0 32px 0;
  letter-spacing: -1px;
}

/* 装饰星星 */
.decorative-stars {
  position: absolute;
  top: 0;
  left: -50px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.star {
  color: #000;
}

.star-1 {
  position: absolute;
  left: 8px;
  top: 0;
  font-size: 16px;
}

.star-2 {
  font-size: 30px;
  margin-left: 20px;
}

.star-3 {
  position: absolute;
  left: 16px;
  bottom: 0;
  font-size: 12px;
}

/* 头像 */
.avatar {
  position: absolute;
  top: -50px;
  right: -130px;
  width: 120px;
  height: 120px;
  transform: rotate(15deg);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 副标题 */
.subtitle {
  max-width: 500px;
  margin-bottom: 40px;
}

.subtitle-line {
  font-size: 14px;
  color: #666;
  line-height: 1.8;
  margin: 0 0 8px 0;
}

.subtitle-line:last-child {
  margin-bottom: 0;
}

/* 按钮 */
.cta-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  font-size: 14px;
  color: #333;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.cta-button:hover {
  border-color: #333;
  color: #000;
}

/* 近期项目区域 */
.projects-section {
  margin: 0 auto;
  padding: 60px 40px;
  max-width: 1200px;
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  color: #000;
  margin: 0 0 40px 0;
}

.section-title-en {
  font-size: 16px;
  font-weight: 400;
  color: #999;
}

.more-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  font-size: 14px;
  color: #333;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.more-button:hover {
  border-color: #333;
  color: #000;
}
</style>
