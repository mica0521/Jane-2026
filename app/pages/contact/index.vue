<template>
  <div class="contact-page">
    <!-- 顶部标题区域 -->
    <div class="header">
      <h1 class="main-title">欢迎联系 <span class="subtitle-en">Let's connect!</span></h1>
      <p class="sub-title">欢迎随时联系我，让我们一起探索更多的可能。</p>
    </div>

    <div class="content">
      <!-- 左侧：联系信息 -->
      <div class="left-section">
        <h2 class="section-title">
          联系我 <span class="section-title-en">/ Contact me</span>
        </h2>

        <div class="contact-list">
          <div class="contact-item">
            <div class="contact-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <span class="contact-text">1041526505@qq.com</span>
          </div>

          <div class="contact-item">
            <div class="contact-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                <path d="M12 18h.01" />
              </svg>
            </div>
            <span class="contact-text">186-8494-7543</span>
          </div>

          <div class="contact-item">
            <div class="contact-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
              </svg>
            </div>
            <span class="contact-text">ZJane0826</span>
          </div>
        </div>

        <!-- 二维码 -->
        <div class="qrcode">二维码</div>
      </div>

      <!-- 右侧：社媒账号 -->
      <div class="right-section">
        <h2 class="section-title">
          社媒账号 <span class="section-title-en">/ Social media</span>
        </h2>

        <p class="social-desc">此人很懒，偶尔在社媒更新一些自己的设计案例与界面设计~</p>

        <!-- 卡片轮播 -->
        <SocialMediaCarousel />
      </div>
    </div>
  </div>
</template>

<script setup>
import SocialMediaCarousel from './components/SocialMediaCarousel.vue';
</script>

<style scoped>
.contact-page {
  padding: 40px 20px;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  row-gap: 30px;
}

/* 顶部标题 */
.header {
  flex-shrink: 0;
  padding-bottom: 20px;
  border-bottom: 1px solid #f2f2f2;
}

.main-title {
  font-size: 32px;
  font-weight: 700;
  color: #000;
  margin: 0 0 12px 0;
}

.subtitle-en {
  margin-left: 12px;
  color: #757575;
  font-size: 22px;
  font-weight: 600;
}

.sub-title {
  margin: 0;
  color: #999;
  font-size: 14px;
}

/* 内容区域 */
.content {
  flex: 1;
  display: flex;
  gap: 80px;
}

/* 左侧 */
.left-section {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #000;
  margin: 0 0 24px 0;
}

.section-title-en {
  font-size: 14px;
  font-weight: 400;
  color: #999;
}

.contact-list {
  margin-bottom: auto;
}

.contact-item {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.contact-icon {
  color: #666;
}

.contact-text {
  font-size: 14px;
  color: #333;
}

/* 二维码 */
.qrcode {
  width: 160px;
  height: 160px;
  background: #f5f5f5;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 右侧 */
.right-section {
  overflow: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.social-desc {
  color: #757575;
  font-size: 12px;
}
</style>
