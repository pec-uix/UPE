<template>
  <div class="bg-white">
    <section class="careers-hero">
      <v-container style="max-width: 1200px">
        <div class="border-s-lg border-primary border-opacity-100 pl-4">
          <div class="text-primary text-title-small mb-4">RECRUITMENT</div>
          <h1 class="text-display-small text-md-display-medium font-weight-black mb-2">
            招募專區
          </h1>
          <div class="text-secondary text-display-small font-weight-black">
            Recruitment
          </div>
        </div>
        <p class="text-body-large text-neutral mt-8 careers-intro">
          歡迎了解統流開發的實習機會、福利制度與最新職缺資訊。
        </p>
      </v-container>
    </section>

    <section class="py-8 py-md-12">
      <v-container style="max-width: 1200px">
        <v-row class="ga-8 ga-md-0">
          <v-col cols="12" md="4">
            <div class="section-index text-primary font-weight-bold mb-2">01</div>
            <h2 class="text-headline-small font-weight-black mb-4">
              實習生專區
            </h2>
            <div class="text-subtitle-1 text-secondary font-weight-bold mb-6">
              產學合作
            </div>
          </v-col>
          <v-col cols="12" md="8">
            <div class="career-panel">
              <p class="text-body-large text-neutral mb-6">
                統流開發持續推動產學合作，提供學生接觸物流園區開發與營運實務的機會。
              </p>
              <ul class="career-list">
                <li>歡迎工程、物流、商管、運籌管理等相關科系學生洽詢</li>
                <li>
                  實習洽詢：
                  <a href="mailto:joanwang91414@upe.com.tw" class="text-primary font-weight-bold">
                    joanwang91414@upe.com.tw
                  </a>
                </li>
              </ul>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section class="py-8 py-md-12 bg-grey-lighten-4">
      <v-container style="max-width: 1200px">
        <v-row class="ga-8 ga-md-0">
          <v-col cols="12" md="4">
            <div class="section-index text-primary font-weight-bold mb-2">02</div>
            <h2 class="text-headline-small font-weight-black mb-4">
              福利制度
            </h2>
            <div class="text-subtitle-1 text-secondary font-weight-bold mb-6">
              員工福利
            </div>
          </v-col>
          <v-col cols="12" md="8">
            <div class="benefit-grid">
              <div
                v-for="benefit in benefits"
                :key="benefit"
                class="benefit-item text-body-large font-weight-medium"
              >
                {{ benefit }}
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section class="py-8 py-md-12">
      <v-container style="max-width: 1200px">
        <v-row class="align-center ga-8 ga-md-0">
          <v-col cols="12" md="4">
            <div class="section-index text-primary font-weight-bold mb-2">03</div>
            <h2 class="text-headline-small font-weight-black mb-4">
              職缺訊息
            </h2>
            <div class="text-subtitle-1 text-secondary font-weight-bold">
              104 人力銀行
            </div>
          </v-col>
          <v-col cols="12" md="8">
            <div class="career-panel d-flex flex-column flex-md-row align-start align-md-center justify-space-between ga-6">
              <div class="text-body-large text-neutral">
                想加入統流開發，歡迎前往 104 人力銀行查看最新職缺。
              </div>
              <v-btn
                color="primary"
                size="large"
                class="font-weight-bold text-white px-8"
                href="https://www.104.com.tw/company/1a2x6blmr6"
                target="_blank"
                rel="noopener noreferrer"
              >
                查看最新職缺
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig();
const siteUrl = runtimeConfig.public.siteUrl?.replace(/\/$/, "") || "";

const benefits = [
  "三節／年節／年終獎金",
  "勞健保、團體保險、勞工退休金",
  "免費員工健康檢查",
  "結婚禮金、生育津貼",
  "子女教育補助／獎學金",
];

useSeoMeta({
  title: "招募專區 | 統流開發股份有限公司",
  description:
    "歡迎了解統流開發股份有限公司的實習機會、福利制度與最新職缺資訊。",
  ogType: "website",
  ogSiteName: "統流開發股份有限公司",
  ogLocale: "zh_TW",
  ogTitle: "招募專區 | 統流開發股份有限公司",
  ogDescription:
    "歡迎了解統流開發股份有限公司的實習機會、福利制度與最新職缺資訊。",
  twitterCard: "summary_large_image",
  twitterTitle: "招募專區 | 統流開發股份有限公司",
  twitterDescription:
    "歡迎了解統流開發股份有限公司的實習機會、福利制度與最新職缺資訊。",
});

useHead({
  link: [
    {
      rel: "canonical",
      href: siteUrl ? `${siteUrl}/careers` : "/careers",
    },
  ],
});
</script>

<style scoped>
.careers-hero {
  padding: 88px 0 64px;
  background: #edf2f7;
}

.careers-intro {
  max-width: 760px;
  line-height: 2;
}

.section-index {
  letter-spacing: 0.08em;
}

.career-panel {
  border-top: 2px solid rgb(226, 232, 240);
  border-bottom: 2px solid rgb(226, 232, 240);
  padding: 28px 0;
}

.career-list {
  display: grid;
  gap: 16px;
  margin: 0;
  padding-left: 1.25rem;
  color: rgb(75, 85, 99);
  line-height: 1.9;
  font-size: 1.125rem;
}

.benefit-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.benefit-item {
  min-height: 72px;
  display: flex;
  align-items: center;
  border-top: 1px solid rgb(226, 232, 240);
  border-bottom: 1px solid rgb(226, 232, 240);
  color: rgb(75, 85, 99);
}

@media (max-width: 839px) {
  .careers-hero {
    padding: 48px 0 32px;
  }

  .benefit-grid {
    grid-template-columns: 1fr;
  }
}
</style>
