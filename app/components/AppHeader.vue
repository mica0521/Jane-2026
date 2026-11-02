<template>
  <header class="header">
    <!-- 左侧：个人信息 -->
    <div class="profile">
      <div class="avatar"></div>
      <div class="info">
        <div class="name-row">
          <span class="name">周捷 Jane</span>
          <span class="badge">在看机会</span>
        </div>
        <div class="title">UX/UI Designer</div>
      </div>
    </div>

    <!-- 右侧：导航菜单 -->
    <nav class="nav">
      <a
        v-for="item in navItems"
        :key="item.name"
        :href="item.href"
        :class="['nav-item', { active: isActive(item.href) }]"
      >
        <span class="nav-icon">
          <svg
            v-if="item.icon === 'home'"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <svg
            v-else-if="item.icon === 'user'"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <svg
            v-else-if="item.icon === 'folder'"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"
            ></path>
          </svg>
          <svg
            v-else-if="item.icon === 'mail'"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
            ></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </span>
        <span class="nav-text">{{ item.name }}</span>
      </a>
    </nav>
  </header>
</template>

<script setup>
const route = useRoute();

const navItems = [
  { name: "Home", href: "/home", icon: "home" },
  { name: "About", href: "/about", icon: "user" },
  { name: "Project", href: "/project", icon: "folder" },
  { name: "Contact", href: "/contact", icon: "mail" },
];

const isActive = (href) =>
  route.path === href || route.path === href + "/index" || route.path.startsWith(href);
</script>

<style scoped>
.header {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 32px;
  height: 80px;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
}

/* 左侧个人信息 */
.profile {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 48px;
  height: 48px;
  background: #e0e0e0;
  border-radius: 8px;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.name-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.badge {
  font-size: 12px;
  color: #52c41a;
  background: #f6ffed;
  border: 1px solid #b7eb8f;
  padding: 2px 8px;
  border-radius: 4px;
}

.title {
  font-size: 13px;
  color: #999;
}

/* 右侧导航 */
.nav {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  text-decoration: none;
  color: #666;
  font-size: 14px;
  border-radius: 6px;
  transition: all 0.2s;
}

.nav-item:hover {
  background: #f5f5f5;
  color: #333;
}

.nav-item.active {
  background: #f5f5f5;
  color: #333;
}

.nav-icon {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-icon svg {
  width: 100%;
  height: 100%;
}
</style>
