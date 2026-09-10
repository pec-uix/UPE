<template>
  <v-container style="max-width: 1200px">
    <div class="mb-6 mb-md-8">
      <div class="font-weight-bold text-primary mb-2">LATEST NEWS</div>
      <div class="text-display-small text-md-display-large font-weight-black">
        最新消息
      </div>
    </div>
    <v-chip-group
      v-model="activeFilter"
      mandatory
      selected-class="bg-primary text-white"
      class="mb-8"
    >
      <v-chip
        v-for="cat in categories"
        :key="cat"
        :value="cat"
        variant="outlined"
        class="px-6 font-weight-bold"
      >
        {{ cat }}
      </v-chip>
    </v-chip-group>

    <v-list class="pa-0">
      <v-list-item
        v-for="(item, i) in filteredNews"
        :key="item.id"
        :to="`/news/${item.id}`"
        class="news-row px-2 py-6"
      >
        <div
          class="d-flex align-start align-md-center ga-2 ga-md-6 w-100 flex-column flex-md-row"
        >
          <div class="d-flex align-center ga-4">
            <div class="font-weight-bold text-body-large text-grey-darken-1">
              {{ item.date }}
            </div>
            <v-chip variant="outlined" color="primary">{{ item.tag }}</v-chip>
          </div>

          <span class="text-body-large">{{ item.title }}</span>

          <v-spacer class="d-none d-md-flex"></v-spacer>
          <div
            class="d-flex align-center text-title-small text-secondary text-no-wrap align-self-end align-self-md-center"
          >
            READ MORE
            <v-icon :icon="mdiArrowRight" size="16" class="ml-1"></v-icon>
          </div>
        </div>
      </v-list-item>

      <div v-if="filteredNews.length === 0" class="py-16 text-center text-grey">
        目前無相關消息
      </div>
    </v-list>
  </v-container>
</template>

<script setup>
import { mdiArrowRight } from "@mdi/js";

const runtimeConfig = useRuntimeConfig();
const siteUrl = runtimeConfig.public.siteUrl?.replace(/\/$/, "") || "";
const defaultOgImage = siteUrl
  ? `${siteUrl}/images/hero-aerial.webp`
  : "/images/hero-aerial.webp";

useSeoMeta({
  title: "最新消息 | 統流開發股份有限公司",
  description:
    "掌握統流開發股份有限公司的最新消息，包含園區動態、企業公告、技術導入與合作資訊。",
  ogType: "website",
  ogSiteName: "統流開發股份有限公司",
  ogLocale: "zh_TW",
  ogTitle: "最新消息 | 統流開發股份有限公司",
  ogDescription:
    "掌握統流開發股份有限公司的最新消息，包含園區動態、企業公告、技術導入與合作資訊。",
  ogImage: defaultOgImage,
  twitterCard: "summary_large_image",
  twitterTitle: "最新消息 | 統流開發股份有限公司",
  twitterDescription:
    "掌握統流開發股份有限公司的最新消息，包含園區動態、企業公告、技術導入與合作資訊。",
  twitterImage: defaultOgImage,
});

useHead({
  link: [
    {
      rel: "canonical",
      href: siteUrl ? `${siteUrl}/news` : "/news",
    },
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "最新消息 | 統流開發股份有限公司",
        description:
          "掌握統流開發股份有限公司的最新消息，包含園區動態、企業公告、技術導入與合作資訊。",
        url: siteUrl ? `${siteUrl}/news` : "https://www.upe.com.tw/news",
        publisher: {
          "@type": "Organization",
          name: "統流開發股份有限公司",
          url: siteUrl || "https://www.upe.com.tw/",
          logo: {
            "@type": "ImageObject",
            url: `${siteUrl || "https://www.upe.com.tw"}/images/logo.webp`,
          },
        },
      }),
    },
  ],
});

const newsList = [
  {
    id: "n5",
    date: "2026.07.02",
    tag: "集團優惠",
    title: "太子建設｜統一集團專屬限時早鳥優惠開跑！",
    excerpt:
      "善化指標建案「太子雍越」（42–46 坪）推出集團同仁專屬限時早鳥優惠，享優先選戶機會，把握優質自住與置產良機。",
  },
  {
    id: "n1",
    date: "2026.05.27",
    tag: "園區動態",
    title: "統流物流園區接待企業與學術單位參訪交流",
    excerpt:
      "為促進物流產業交流及智慧物流經驗分享，統流持續規劃物流園區參訪活動，接待企業夥伴、學術單位及相關機構進行交流參觀。",
  },
  {
    id: "n2",
    date: "2026.05.27",
    tag: "建教合作",
    title: "統流推動產學合作 培育物流專業人才",
    excerpt:
      "為深化物流產業人才培育，統流持續推動與大專院校之建教合作及產學交流，期望結合理論與實務經驗，協助學生提前接軌產業發展趨勢。",
  },
  {
    id: "n3",
    date: "2026.05.27",
    tag: "園區動態",
    title: "統流持續推動大型複合式物流園區開發",
    excerpt:
      "統流持續推動大型複合式物流園區開發計畫，以BOO模式進行園區投資、興建與營運管理，打造整合型物流服務平台。",
  },
  {
    id: "n4",
    date: "2026.05.27",
    tag: "招租資訊",
    title: "統流物流園區開放合作夥伴洽詢進駐",
    excerpt:
      "統流物流園區現正開放相關合作夥伴洽詢進駐，園區規劃結合常溫、低溫及電商物流需求，提供彈性物流空間與完善園區設施。",
  },
];

const categories = ["全部", "園區動態", "企業消息", "建教合作", "招租資訊"];
const activeFilter = ref("全部");

const filteredNews = computed(() =>
  activeFilter.value === "全部"
    ? newsList
    : newsList.filter((n) => n.tag === activeFilter.value),
);
</script>
<style scoped>
.news-row {
  border-bottom: 1px solid rgb(229, 231, 235);
  text-decoration: none;
}

.news-row:first-child {
  border-top: 1px solid rgb(229, 231, 235);
}
</style>
