<template>
  <div class="project-grid">
    <!-- 项目卡片 -->
    <div
      v-for="project in projects"
      :key="project.id"
      class="project-card"
      @click="goToDetail(project)"
    >
      <div class="project-image">
        <!-- 缺省图 -->
        <el-empty
          v-if="!project.images || project.images.length === 0"
          :image-size="80"
          style="height: 100%"
        ></el-empty>
        <img v-else :src="project.images[0].url" alt="" />
      </div>
      <div class="project-info">
        <div class="project-meta">
          <span class="project-category">{{ project.category }}</span>
          <span class="project-time">{{ project.time }}</span>
        </div>
        <h3 class="project-title">{{ project.title }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();

defineProps({
  projects: {
    type: Array,
    default: () => []
  }
});

const goToDetail = (project) => {
  router.push(`/projectDetail?id=${project.id}`);
};
</script>

<style scoped>
.project-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.project-card {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.project-image {
  display: flex;
  justify-content: center;
  width: 100%;
  aspect-ratio: 4 / 3;
  background-color: #e4e4e4;
  overflow: hidden;
}

.project-image img {
  height: 100%;
  object-fit: cover;
}

.project-info {
  padding: 20px;
}

.project-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.project-category {
  font-size: 14px;
  color: #666;
}

.project-time {
  font-size: 14px;
  color: #999;
}

.project-title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  line-height: 1.5;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 响应式布局 */
@media (max-width: 992px) {
  .project-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .project-grid {
    grid-template-columns: 1fr;
  }
}
</style>
