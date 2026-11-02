<script setup>
import workExperienceItem from "./components/workExperienceItem.vue";
import stackTag from "./components/stackTag.vue";

const workExperiences = [
  {
    role: "UI&UX设计师",
    project: "理疗预约小程序 & 管理后台设计",
    period: "2025.11 - 至今",
    company: "上海树家医学科技有限公司",
    description:
      "通过走访工厂，观察用户使用场景和行为习惯对移动端页面进行优化，以提升信息可读性、提高操作效率和降低认知负担作为设计目标，制定了更契合一线工人的视觉语言、交互逻辑与信息表达方式，并最终产出系统化的设计规范（触控区域规范、业务组件规范、色彩规范），让产品体验持续迭代并可复用。",
  },
  {
    role: "UI&UX设计师",
    project: "MES系统执行端设计 & 管理后台设计",
    period: "2023.02 - 2025.2",
    company: "上海黑湖科技有限公司",
    description:
      "通过走访工厂，观察用户使用场景和行为习惯对移动端页面进行优化，以提升信息可读性、提高操作效率和降低认知负担作为设计目标，制定了更契合一线工人的视觉语言、交互逻辑与信息表达方式，并最终产出系统化的设计规范（触控区域规范、业务组件规范、色彩规范），让产品体验持续迭代并可复用。",
  },
  {
    role: "UI 设计师",
    project: "二手奢侈品电商小程序界面设计",
    period: "2022.07 - 2022.12",
    company: "湖南海程奢品科技有限公司",
    description:
      "通过观察线上数据洞察用户行为与转化路径，制定相应的提升 GMV 与转化率的设计策略。在视觉设计上，结合用户画像输出差异化的设计风格与界面方案，以更好地匹配目标用户的审美与使用习惯。",
  },
];
</script>

<template>
  <main class="page">
    <!-- 关于我 -->
    <section class="about-hero">
      <div class="container">
        <div class="about-layout">
          <div class="about-image">
            <div class="image-placeholder"></div>
          </div>
          <div class="about-content">
            <h1 class="about-title">
              <span class="title-label">关于我：</span>
              <span class="title-main">成长中的UI/UX设计师</span>
            </h1>
            <p class="about-quote">「享受努力的过程，不被结果绑架」</p>
            <div class="about-intro">
              <p>
                拥有约3年 UI/UX
                设计经验，参与企业级平台与互联网产品的体验设计，项目涵盖工业系统、电商购物与医疗服务等场景。
              </p>
              <p>
                我习惯从业务目标和用户行为出发，通过信息结构、交互策略与界面细节，让复杂产品变得清晰、顺手、也更有温度
                :）
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 工作经历 -->
    <section class="content-section">
      <div class="container">
        <h2 class="section-title">
          工作经历
          <span class="section-subtitle">/ Work Experience</span>
        </h2>
        <workExperienceItem
          v-for="(item, index) in workExperiences"
          :key="index"
          :role="item.role"
          :project="item.project"
          :period="item.period"
          :company="item.company"
          :description="item.description"
        ></workExperienceItem>
      </div>
    </section>

    <!-- 教育经历 -->
    <section class="content-section">
      <div class="container">
        <h2 class="section-title">
          教育经历
          <span class="section-subtitle">/ Education</span>
        </h2>
        <div class="section-body">
          <p class="body-text">湖南理工大学 | 环境艺术设计 | 本科 | 2014—2018</p>
        </div>
      </div>
    </section>

    <!-- 技术栈 -->
    <section class="content-section">
      <div class="container">
        <h2 class="section-title">
          技术栈
          <span class="section-subtitle">/ Stack</span>
        </h2>
        <div class="section-body">
          <stackTag></stackTag>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped lang="less">
.page {
  height: 100%;
  overflow-y: auto;
}
// 容器
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

// 关于我部分
.about-hero {
  padding-top: 80px;

  .about-layout {
    display: grid;
    grid-template-columns: 400px 1fr;
    gap: 64px;
    align-items: start;

    .about-image {
      .image-placeholder {
        width: 100%;
        aspect-ratio: 4/3;
        background: #d1d5db;
        border-radius: 12px;
      }
    }

    .about-content {
      padding-top: 8px;

      .about-title {
        margin: 0 0 16px 0;
        font-size: 28px;
        font-weight: 600;
        color: #111827;
        line-height: 1.3;

        .title-label,
        .title-main {
          display: block;
        }
      }

      .about-quote {
        margin: 0 0 24px 0;
        font-size: 16px;
        color: #6b7280;
        line-height: 1.5;
      }

      .about-intro {
        display: flex;
        flex-direction: column;
        gap: 12px;

        p {
          margin: 0;
          font-size: 16px;
          line-height: 1.8;
          color: #000;
          position: relative;
          padding-left: 16px;

          &::before {
            content: ">";
            position: absolute;
            left: 0;
            color: #6b7280;
          }
        }
      }
    }
  }
}

// 内容区块通用样式
.content-section {
  &:last-child {
    padding-bottom: 80px;
  }

  padding-top: 30px;

  .section-title {
    font-size: 20px;
    font-weight: 600;
    color: #111827;
    // margin: 0 0 32px 0;
    display: flex;
    align-items: baseline;
    gap: 8px;

    .section-subtitle {
      font-size: 16px;
      font-weight: 400;
      color: #6b7280;
    }
  }

  .section-body {
    padding: 16px 0;

    .body-text {
      margin: 0;
      font-size: 16px;
      line-height: 1.8;
      color: #6b7280;
    }
  }
}
</style>
