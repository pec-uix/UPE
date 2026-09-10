<template>
  <v-app>
    <v-main class="bg-white">
      <v-container v-if="article" style="max-width: 1200px">
        <nav class="d-flex flex-wrap ga-3 mb-8" aria-label="返回導航">
          <v-btn
            to="/"
            variant="outlined"
            color="secondary"
            rounded="pill"
            :prepend-icon="mdiArrowLeft"
          >
            首頁
          </v-btn>
          <v-btn
            to="/news"
            variant="outlined"
            color="secondary"
            rounded="pill"
            :prepend-icon="mdiArrowLeft"
          >
            所有最新消息
          </v-btn>
        </nav>

        <header class="mb-10">
          <div class="d-flex flex-column align-start ga-1 mb-5">
            <span class="text-subtitle-2 font-weight-bold text-grey-darken-1">{{
              article.date
            }}</span>
            <v-chip
              size="small"
              variant="outlined"
              color="primary"
              class="font-weight-bold"
            >
              {{ article.tag }}
            </v-chip>
          </div>
          <div
            class="text-title-large text-lg-headline-medium font-weight-black text-grey-darken-4"
          >
            {{ article.title }}
          </div>
        </header>

        <div
          class="border-t-md border-primary border-opacity-100 pt-8 text-body-1 text-grey-darken-3"
        >
          <p class="mb-6" v-html="processedBody"></p>
          <v-img
            v-if="article.image"
            :src="assetPath(article.image)"
            :alt="article.title"
            class="mb-6 rounded-lg"
            width="100%"
          />
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>
<script setup>
import { mdiArrowLeft } from "@mdi/js";

const assetPath = useAssetPath();

const newsList = [
  {
    id: "n1",
    date: "2026.05.27",
    tag: "園區動態",
    title: "統流物流園區接待企業與學術單位參訪交流",
    body: `為促進物流產業交流及智慧物流經驗分享，統流持續規劃物流園區參訪活動，接待企業夥伴、學術單位及相關機構進行交流參觀。
本次參訪內容包含園區整體規劃、多溫層物流配置、自動化物流設備應用及智慧化管理概念等，藉由實地導覽與交流，促進物流產業知識分享與合作機會。
統流物流園區以現代化、智慧化及整合型物流服務為核心方向，持續強化園區營運效能，打造兼具效率、安全與永續概念之物流基地。`,
  },
  {
    id: "n2",
    date: "2026.05.27",
    tag: "建教合作",
    title: "統流推動產學合作 培育物流專業人才",
    body: `為深化物流產業人才培育，統流持續推動與大專院校之建教合作及產學交流，期望結合理論與實務經驗，協助學生提前接軌產業發展趨勢。
合作內容包含企業參訪、實務交流、專題研究及未來實習合作規劃等，透過實際物流場域與智慧物流應用介紹，提升學生對現代物流產業之認識。
統流亦將持續配合集團物流發展策略，強化智慧物流、自動化設備及跨溫層物流管理等專業領域人才培育，打造產學共創之合作平台。`,
  },
  {
    id: "n3",
    date: "2026.05.27",
    tag: "園區動態",
    title: "統流持續推動大型複合式物流園區開發",
    body: `統流持續推動大型複合式物流園區開發計畫，以BOO模式進行園區投資、興建與營運管理，打造整合型物流服務平台。
目前園區規劃涵蓋常溫、低溫及EC物流等多元物流機能，並結合自動化倉儲設備、智慧管理系統及現代化建築設計，提升整體物流效率與服務品質。
統流將配合集團整體物流發展布局，持續於北、中、南等區域推動現代化物流園區建置，提供更穩定、高效率之物流服務能量。`,
  },
  {
    id: "n4",
    date: "2025.05.27",
    tag: "招租資訊",
    title: "統流物流園區開放合作夥伴洽詢進駐",
    body: `統流物流園區現正開放相關合作夥伴洽詢進駐，園區規劃結合常溫、低溫及電商物流需求，提供彈性物流空間與完善園區設施。
園區具備便利交通條件、多元物流機能及智慧化管理系統，可依不同產業需求提供客製化物流空間規劃，協助企業提升物流效率與營運彈性。
歡迎物流、零售、電商及相關產業夥伴與統流聯繫，共同打造高效率之智慧物流營運環境。`,
  },
  {
    id: "n5",
    date: "2026.07.02",
    tag: "集團優惠",
    title: "太子建設｜統一集團專屬限時早鳥優惠開跑！",
    image: "/images/taizi-yongyue-group-employee-discount.webp",
    link: "https://reurl.cc/r0eQ41",
    body: `善化指標建案「太子雍越」（42–46 坪）推出集團同仁專屬限時早鳥優惠，享優先選戶機會，把握優質自住與置產良機。
另推出**親友推薦方案**，活動期間推薦親友完成簽約，推薦人每戶可獲**推薦獎金**，推薦越多、回饋越多。
**名額有限，歡迎踴躍洽詢，把握專屬禮遇！**
**點擊下方連結網址或掃描QRcode填寫基本資料，由專人與您預約賞屋時間。**
**網址：**`,
  },
];

const processedBody = computed(() => {
  if (!article.value) return "";
  const escaped = article.value.body
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  const bolded = escaped.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  const withBreaks = bolded.replace(/\n/g, "<br>");
  if (article.value.link) {
    const safeLink = article.value.link.replace(/"/g, "&quot;");
    return (
      withBreaks +
      `<a href="${safeLink}" target="_blank" rel="noopener noreferrer" class="text-primary">${safeLink}</a>`
    );
  }
  return withBreaks;
});

const route = useRoute();
const article = computed(() => newsList.find((n) => n.id === route.params.id));
const runtimeConfig = useRuntimeConfig();
const siteUrl = runtimeConfig.public.siteUrl?.replace(/\/$/, "") || "";
const defaultOgImage = siteUrl
  ? `${siteUrl}/images/hero-aerial.webp`
  : "/images/hero-aerial.webp";
const articleDescription = computed(() => {
  if (!article.value) {
    return "掌握統流開發股份有限公司最新消息與物流園區發展動態。";
  }
  return article.value.body.replace(/\s+/g, " ").trim().slice(0, 120);
});

// 找不到文章時 404
if (import.meta.server && !newsList.find((n) => n.id === route.params.id)) {
  throw createError({ statusCode: 404, statusMessage: "Article not found" });
}

// 相關文章：排除目前這篇，最多 2 篇
const related = computed(() =>
  newsList.filter((n) => n.id !== route.params.id).slice(0, 2),
);

useSeoMeta({
  title: () =>
    article.value
      ? `${article.value.title} | 最新消息 | 統流開發股份有限公司`
      : "最新消息 | 統流開發股份有限公司",
  description: () => articleDescription.value,
  ogType: "article",
  ogSiteName: "統流開發股份有限公司",
  ogLocale: "zh_TW",
  ogTitle: () =>
    article.value
      ? `${article.value.title} | 最新消息 | 統流開發股份有限公司`
      : "最新消息 | 統流開發股份有限公司",
  ogDescription: () => articleDescription.value,
  ogImage: defaultOgImage,
  twitterCard: "summary_large_image",
  twitterTitle: () =>
    article.value
      ? `${article.value.title} | 最新消息 | 統流開發股份有限公司`
      : "最新消息 | 統流開發股份有限公司",
  twitterDescription: () => articleDescription.value,
  twitterImage: defaultOgImage,
});

useHead({
  link: [
    {
      rel: "canonical",
      href: () =>
        siteUrl
          ? `${siteUrl}/news/${route.params.id}`
          : `/news/${route.params.id}`,
    },
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: () =>
        JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: article.value?.title ?? "",
          description: articleDescription.value,
          datePublished: article.value?.date?.replace(/\./g, "-") ?? "",
          url: siteUrl
            ? `${siteUrl}/news/${route.params.id}`
            : `/news/${route.params.id}`,
          image: defaultOgImage,
          author: {
            "@type": "Organization",
            name: "統流開發股份有限公司",
          },
          publisher: {
            "@type": "Organization",
            name: "統流開發股份有限公司",
            url: siteUrl || "https://www.upe.com.tw/",
            logo: {
              "@type": "ImageObject",
              url: `${siteUrl || "https://www.upe.com.tw"}/images/logo.webp`,
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": siteUrl
              ? `${siteUrl}/news/${route.params.id}`
              : `/news/${route.params.id}`,
          },
        }),
    },
  ],
});
</script>
