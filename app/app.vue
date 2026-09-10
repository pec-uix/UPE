<template>
  <NuxtLayout>
    <v-app>
      <v-app-bar
        class="border-b-md border-primary border-opacity-100"
        color="secondary"
        height="90"
        flat
      >
        <div
          class="d-flex justify-space-between align-center w-100 h-100 px-0 px-md-8 py-2"
        >
          <div
            class="d-flex align-center cursor-pointer"
            @click="handleLogoClick"
          >
            <img
              :src="assetPath('/images/logo.webp')"
              alt="統流開發 UPE"
              class="logo-img mr-2"
            />
            <div class="d-flex flex-column">
              <span
                class="text-title-large text-xl-headline-large font-weight-bold"
                style="text-align-last: justify"
              >
                統流開發
              </span>
              <span class="text-label-medium">Uni-President Express Corp.</span>
            </div>
          </div>
          <div class="ga-8 d-none d-lg-flex">
            <div
              v-for="item in navItems"
              :key="item.en"
              class="nav-item text-decoration-none text-center cursor-pointer"
              @click="handleNavClick(item)"
            >
              <div class="text-white text-headline-small font-weight-black">
                {{ item.zh }}
              </div>
              <div
                class="text-white font-weight-black text-title-small opacity-60"
              >
                {{ item.en }}
              </div>
            </div>
          </div>
        </div>
        <v-app-bar-nav-icon
          class="d-lg-none mr-2"
          size="x-large"
          @click="drawer = !drawer"
        />
      </v-app-bar>
      <v-dialog v-model="drawer" transition="fade-transition" fullscreen>
        <v-card color="secondary" class="d-flex flex-column">
          <v-toolbar class="pt-4" color="secondary" flat>
            <v-spacer></v-spacer>
            <v-btn
              :icon="mdiClose"
              color="white"
              size="large"
              class="mr-3"
              @click="drawer = false"
            ></v-btn>
          </v-toolbar>
          <div
            class="pa-0 flex-grow-1 d-flex flex-column align-center justify-center mb-6"
          >
            <div
              v-for="item in navItems"
              :key="item.en"
              class="nav-item text-decoration-none text-center cursor-pointer mb-8"
              @click="handleNavClick(item)"
            >
              <div class="text-white text-headline-small font-weight-black">
                {{ item.zh }}
              </div>
              <div
                class="text-white font-weight-black text-title-small opacity-60"
              >
                {{ item.en }}
              </div>
            </div>
          </div>
        </v-card>
      </v-dialog>
      <v-main>
        <NuxtPage />
      </v-main>
    </v-app>
  </NuxtLayout>
</template>

<script setup>
import { mdiClose } from "@mdi/js";
const router = useRouter();
const route = useRoute();
const assetPath = useAssetPath();

const drawer = ref(false);
const pendingAnchor = useState("pendingAnchor", () => "");

const navItems = [
  { zh: "首頁", en: "Home", route: "/", anchor: "" },
  { zh: "公司簡介", en: "About Us", route: "/", anchor: "about" },
  { zh: "物流據點介紹", en: "Locations", route: "/", anchor: "locations" },
  { zh: "最新消息", en: "News", route: "/", anchor: "news" },
  { zh: "服務項目", en: "Services", route: "/", anchor: "tech" },
  { zh: "聯絡我們", en: "Contacts Us", route: "/", anchor: "contact" },
];

async function handleLogoClick() {
  if (route.path === "/") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    await router.push("/");
  }
}

async function handleNavClick(item) {
  if (drawer.value) {
    drawer.value = false;
    // 等待 dialog-bottom-transition 動畫結束
    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  if (!item.anchor) {
    // 純路由跳轉，無錨點
    await router.push(item.route);
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else if (route.path === "/") {
    // 已在首頁，直接捲動
    const el = document.getElementById(item.anchor);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top, behavior: "smooth" });
    }
  } else {
    // 跨頁：先記錄錨點，再跳轉；由 index.vue 在 onMounted 中處理捲動
    pendingAnchor.value = item.anchor;
    await router.push(item.route);
  }
}
</script>
<style scoped>
/* ── Nav item hover underline ── */
.nav-item {
  position: relative;
  padding-bottom: 6px;
}
.nav-item::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #e8622a;
  transition: width 0.3s ease;
}
.nav-item:hover::after {
  width: 100%;
}

/* ── Logo ── */
.logo-img {
  height: 40px;
  display: block;
}

@media (min-width: 1545px) {
  .logo-img {
    height: 64px;
  }
}
</style>
