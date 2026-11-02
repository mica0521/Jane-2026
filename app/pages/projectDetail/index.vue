<template>
  <div class="projectDetail-page">
    <!-- 返回上页按钮 - 独占一行 -->
    <button class="back-btn" @click="goBack">
      <span class="arrow">←</span>
      <span>返回上页</span>
    </button>
    <div class="bottom-box">
      <div class="left-box hide-scrollbar">
        <!-- 有项目数据时显示 -->
        <template v-if="project">
          <!-- 项目标题 -->
          <h1 class="project-title">{{ project.title }}</h1>

          <!-- 项目信息卡片 -->
          <div class="info-card">
            <div class="info-row">
              <div class="info-label">
                <span class="icon">📋</span>
                <span>服务于</span>
              </div>
              <div class="info-value">{{ project.company }}</div>
            </div>
            <div class="info-row">
              <div class="info-label">
                <span class="icon">🕐</span>
                <span>时间</span>
              </div>
              <div class="info-value">{{ project.time }}</div>
            </div>
            <div class="info-row">
              <div class="info-label">
                <span class="icon">🏷️</span>
                <span>分类</span>
              </div>
              <div class="info-value">{{ project.category }}</div>
            </div>
          </div>

          <a v-if="projectUrl" :href="projectUrl" target="_blank" rel="noopener noreferrer" class="project-link">访问项目网站 ↗</a>
          <!-- 我负责的内容 -->
          <div class="content-section">
            <h2 class="section-title">我负责的内容</h2>
            <p class="section-desc">{{ project.responsibilities }}</p>
          </div>
        </template>

        <!-- 无项目数据时显示缺省图 -->
        <div v-else class="empty-state">
          <el-empty description="暂无项目数据" />
        </div>
      </div>
      <!-- 项目图片 -->
      <div v-if="project?.images?.length" class="right-box">
        <img
          v-for="(img, index) in project.images"
          :key="index"
          :src="img.url"
          :alt="img.alt || `${project.title} · ${index + 1}`"
          class="project-image"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import projects from "~/content/projects.json";
const router = useRouter();
const route = useRoute();

const projectId = computed(() => route.query.id);

const project = computed(() => projects.find(item => String(item.id) === String(projectId.value)));
const projectUrl = computed(() => {
  try {
    const url = new URL(project.value?.url);
    return ['http:', 'https:'].includes(url.protocol) ? url.href : null;
  } catch { return null; }
});

const goBack = () => {
  router.push("/project");
};
</script>

<style scoped>
.projectDetail-page {
  padding: 24px;
  height: 100%;
  overflow: hidden;
  background-color: #fff;
}

.bottom-box {
  display: flex;
  height: calc(100% - 40px);
}

.left-box {
  position: relative;
  flex-shrink: 0;
  padding-right: 10px;
  width: 500px;
  height: 100%;
  overflow-y: auto;
  flex-shrink: 0;
}

.right-box {
  flex: 1;
  overflow-y: auto;
  padding-left: 10px;
}

.project-image {
  width: 100%;
  display: block;
  margin-bottom: 16px;
}

/* 返回按钮 */
.back-btn {
  height: 40px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.2s;
}

.back-btn:hover {
  color: #333;
}

.arrow {
  font-size: 16px;
}

/* 项目标题 */
.project-title {
  position: sticky;
  top: 0;
  padding-bottom: 20px;
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.4;
  background-color: #fff;
}

/* 信息卡片 */
.info-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 12px 24px;
  margin-bottom: 20px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #e8e8e8;
}

.info-row:last-child {
  border-bottom: none;
}

.info-label {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #999;
  font-size: 14px;
}

.icon {
  font-size: 16px;
}

.info-value {
  color: #333;
  font-size: 14px;
  font-weight: 500;
}

.tag {
  color: #333;
}

.separator {
  color: #999;
}

/* 内容区域 */
.content-section {
  margin-top: 40px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 16px;
}

.section-desc {
  font-size: 14px;
  line-height: 1.8;
  color: #666;
  text-align: justify;
}

/* 缺省状态 */
.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}
</style>

<style scoped>
.project-link { display: inline-block; margin-top: 16px; color: #333; }
@media (max-width: 768px) {
  .projectDetail-page { overflow-y: auto; }
  .bottom-box { display: block; height: auto; }
  .left-box { width: 100%; height: auto; padding-right: 0; overflow: visible; }
  .right-box { overflow: visible; padding: 24px 0 0; }
}
</style>
