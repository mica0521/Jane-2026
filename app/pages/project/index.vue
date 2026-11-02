<template>
  <div class="project-page">
    <ProjectGrid :projects="projects || []"></ProjectGrid>
  </div>
</template>

<script setup>
import ProjectGrid from "./components/ProjectGrid.vue";

import projects from "~/content/projects.json";
</script>

<style scoped>
.project-page {
  padding: 40px;
  height: 100%;
  overflow-y: auto;
  background-color: #f5f5f5;
}

@media (max-width: 576px) {
  .project-page {
    padding: 20px;
  }
}
</style>
