<script setup>
defineProps({
  role: {
    type: String,
    required: true
  },
  project: {
    type: String,
    required: true
  },
  period: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="work-item">
    <div class="work-main">
      <div class="work-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/>
          <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
          <path d="M12 12v4"/>
          <path d="M8 12v4"/>
          <path d="M16 12v4"/>
        </svg>
      </div>
      <div class="work-info">
        <div class="work-role">{{ role }}</div>
        <div class="work-project">{{ project }}</div>
        <div class="work-meta">
          <span class="work-period">{{ period }}</span>
          <span class="work-company">{{ company }}</span>
        </div>
      </div>
    </div>
    <div class="work-desc">
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<style scoped>
.work-item {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 48px;
  padding: 24px 0;
  border-bottom: 1px solid var(--border);
}

.work-item:last-child {
  border-bottom: none;
}

.work-main {
  display: flex;
  gap: 16px;
}

.work-icon {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  color: var(--muted);
}

.work-icon svg {
  width: 100%;
  height: 100%;
}

.work-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.work-role {
  font-size: var(--size-body-base);
  color: var(--muted);
  line-height: 1.5;
}

.work-project {
  font-size: var(--size-body-lg);
  font-weight: 500;
  color: var(--text);
  line-height: 1.5;
}

.work-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 4px;
}

.work-period {
  font-size: 13px;
  color: var(--muted);
  line-height: 1.5;
}

.work-company {
  font-size: 13px;
  color: var(--muted);
  line-height: 1.5;
}

.work-desc {
  font-size: var(--size-body-base);
  color: var(--muted);
  line-height: 1.8;
}

.work-desc p {
  margin: 0;
}

</style>
