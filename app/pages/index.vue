<template>
  <!-- <v-btn
    href="https://forms.gle/your-google-sheet-link"
    target="_blank"
    color="primary"
    elevation="8"
    
    class="position-fixed bottom-0 right-0 rounded-pill font-weight-bold text-white z-1000 floating-btn ma-4 ma-md-8 px-4 py-2 px-md-8 py-md-6 text-caption text-md-body-1"
  >
    合作諮詢
  </v-btn> -->
  <v-fab
    app
    color="primary"
    size="x-large"
    rounded="pill"
    text="合作諮詢"
    style="bottom: 32px"
    @click="openContactForm"
  ></v-fab>
  <section fluid>
    <v-responsive
      :aspect-ratio="4400 / 2480"
      class="position-relative pa-0 overflow-hidden"
      ><img
        class="position-absolute w-100 h-100 object-cover"
        src="/images/hero-aerial.webp"
        alt="統流開發物流園區空拍圖"
      />

      <!-- <div
        v-intersect="{
          handler: heroReveal.onIntersect,
          options: { threshold: 0 },
        }"
        class="position-absolute bottom-0 right-0 ma-0 ma-sm-4 ma-lg-10 text-right hero-brand reveal-up"
        :class="{ 'is-visible': heroReveal.isVisible.value }"
      >
        <span
          class="d-block font-weight-black text-blue-lighten-1 text-headline-small text-md-headline-large text-lg-display-medium"
          style="text-shadow: 0 2px 12px rgba(0, 0, 0, 0.9)"
        >
          Uni-President
        </span>
        <span
          class="d-block font-weight-black text-orange-darken-1 text-headline-small text-md-headline-large text-lg-display-medium"
          style="text-shadow: 0 2px 12px rgba(0, 0, 0, 0.9)"
        >
          Express Corp.
        </span>
      </div> -->
    </v-responsive>
  </section>
  <section id="about" class="py-8 py-lg-16">
    <v-container fluid>
      <v-row
        class="align-center mb-16 reveal-up"
        :class="{ 'is-visible': aboutRow1Reveal.isVisible.value }"
        v-intersect="{
          handler: aboutRow1Reveal.onIntersect,
          options: { threshold: 0.15 },
        }"
      >
        <v-col cols="12" md="6" class="order-last order-md-first">
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              v-bind="props"
              :elevation="isHovering ? 4 : 0"
              rounded="xl"
              class="overflow-hidden rounded-lg w-100 w-lg-75 mx-auto"
            >
              <v-img
                class="rounded-lg transition-swing"
                src="/images/about-us.webp"
                :aspect-ratio="16 / 9"
                cover
                :style="{ transform: isHovering ? 'scale(1.05)' : 'scale(1)' }"
              >
              </v-img
            ></v-card>
          </v-hover>
        </v-col>
        <v-col cols="12" md="6">
          <div class="border-s-lg border-primary border-opacity-100 pl-4">
            <div class="text-primary text-title-small mb-4">
              01 — WHO WE ARE
            </div>
            <div class="text-display-small font-weight-black">關於我們</div>
            <div class="text-secondary text-display-small font-weight-black">
              Who we are
            </div>
          </div>
          <div class="mt-8 text-body-large text-neutral">
            統流開發股份有限公司為統一企業集團旗下專責物流園區開發、建設與營運管理之核心平台，致力打造結合智慧科技、自動化系統與多溫層整合之現代物流園區。公司以「園區即平台」為發展核心，串聯物流、產業與基礎設施，提供企業穩定且具擴展性的營運環境。
          </div>
        </v-col>
      </v-row>
      <v-row
        class="align-center mb-16 reveal-up"
        :class="{ 'is-visible': aboutRow2Reveal.isVisible.value }"
        v-intersect="{
          handler: aboutRow2Reveal.onIntersect,
          options: { threshold: 0.15 },
        }"
        style="transition-delay: 0.3s"
      >
        <v-col cols="12" md="6">
          <div class="border-s-lg border-black border-opacity-100 pl-4">
            <div class="text-primary text-title-small mb-4">
              02 — WHAT WE DO
            </div>
            <div class="text-display-small font-weight-black">核心能力</div>
            <div class="text-secondary text-display-small font-weight-black">
              What we do
            </div>
          </div>
          <div class="mt-8 text-body-large text-neutral">
            <p>
              統流開發具備從規劃、開發到營運的一體化能力，整合以下關鍵面向：
            </p>
            <ul>
              <li>
                <strong>物流園區開發：</strong
                >大型複合式物流基地規劃、多樓層碼頭與高規格物流建築設計
              </li>
              <li>
                <strong>智慧科技應用：</strong
                >導入物聯網、人工智慧等先進技術，提升園區運營效率與安全性。
              </li>
              <li>
                <strong>多溫層整合：</strong
                >涵蓋常溫、冷藏、冷凍之全溫層物流環境，支援多元產業需求
              </li>
              <li>
                <strong>營運管理能力：</strong
                >導入智慧車流調度與數位管理系統，提升整體物流效率
              </li>
            </ul>
            <p>透過整合統一集團內外資源，提供企業一站式物流解決方案。</p>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              v-bind="props"
              :elevation="isHovering ? 4 : 0"
              rounded="xl"
              class="overflow-hidden rounded-lg w-100 w-lg-75 mx-auto"
            >
              <v-img
                class="rounded-lg transition-swing"
                src="/images/core-capabilities.webp"
                :aspect-ratio="16 / 9"
                cover
                :style="{ transform: isHovering ? 'scale(1.05)' : 'scale(1)' }"
              >
              </v-img
            ></v-card>
          </v-hover>
        </v-col>
      </v-row>
      <v-row
        class="align-center mb-16 reveal-up"
        :class="{ 'is-visible': aboutRow3Reveal.isVisible.value }"
        v-intersect="{
          handler: aboutRow3Reveal.onIntersect,
          options: { threshold: 0.15 },
        }"
        style="transition-delay: 0.3s"
      >
        <!-- <v-col cols="12" md="6"> </v-col>
      <v-col cols="12" md="6">
        <div class="border-s-lg border-primary border-opacity-100 pl-4">
          <div class="text-primary text-title-small mb-4">03 — TECHNOLOGY</div>
          <div class="text-display-small font-weight-black">智慧物流</div>
          <div class="text-secondary text-display-small font-weight-black">
            科技應用
          </div>
        </div>
        <div class="mt-8 text-body-large text-neutral">
          <p>
            園區導入智慧化管理系統與自動化倉儲設備，整合AI影像辨識、車輛進出管理系統及自動倉儲（AS/RS）技術，提升作業效率與安全標準。透過數位化管理平台，即時掌握庫存、配送與車流資訊，打造高效透明的智慧供應鏈環境。
          </p>
          <ul>
            <li>AS/RS 自動倉儲系統</li>
            <li>智慧車輛動線與進出管制系統</li>
            <li>數位化庫存與即時物流監控平台</li>
          </ul>
        </div>
      </v-col> -->

        <v-col cols="12" md="6" class="order-last order-md-first">
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              v-bind="props"
              :elevation="isHovering ? 4 : 0"
              rounded="xl"
              class="overflow-hidden rounded-lg w-100 w-lg-75 mx-auto"
            >
              <v-img
                class="rounded-lg transition-swing"
                src="/images/future-development.webp"
                :aspect-ratio="16 / 9"
                cover
                :style="{ transform: isHovering ? 'scale(1.05)' : 'scale(1)' }"
              >
              </v-img
            ></v-card>
          </v-hover>
        </v-col>
        <v-col cols="12" md="6">
          <div class="border-s-lg border-primary border-opacity-100 pl-4">
            <div class="text-primary text-title-small mb-4">
              03 — WHERE WE GO
            </div>
            <div class="text-display-small font-weight-black">未來發展</div>
            <div class="text-secondary text-display-small font-weight-black">
              Where we go
            </div>
          </div>
          <div class="mt-8 text-body-large text-neutral">
            <p>
              統流開發將持續配合集團策略，推動北、中、南多座大型物流園區建設，逐步建構全台物流網絡。
            </p>
            <p>
              未來將以智慧化、低碳化與規模化為發展方向，深化物流與產業整合，提升整體供應鏈效率，並朝向國際級智慧物流平台邁進，強化台灣在全球物流體系中的競爭力。
            </p>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12"> </v-col>
      </v-row>
    </v-container>
  </section>
  <section id="locations" style="background: #edf2f7; padding: 60px 0">
    <v-container fluid>
      <v-row density="comfortable" class="align-center">
        <v-col cols="12">
          <div
            class="border-s-lg border-black border-opacity-100 pl-4 mb-12 reveal-up"
            :class="{ 'is-visible': locHeadingReveal.isVisible.value }"
            v-intersect="{
              handler: locHeadingReveal.onIntersect,
              options: { threshold: 0.2 },
            }"
          >
            <div class="text-primary text-title-small mb-4">
              Regional Network
            </div>
            <div
              class="text-headline-medium text-lg-display-small font-weight-black"
            >
              佈局全台關鍵物流節點
            </div>
          </div>
        </v-col>
        <v-col
          cols="6"
          lg="4"
          class="reveal-up"
          :class="{ 'is-visible': locListReveal.isVisible.value }"
          v-intersect="{
            handler: locListReveal.onIntersect,
            options: { threshold: 0.1 },
          }"
        >
          <v-sheet
            v-for="park in parks"
            :border="true"
            :key="park.name"
            class="pa-5 mb-2 cursor-pointer rounded-lg"
            :class="
              selectedParkIndex ===
              parks.findIndex((item) => item.name === park.name)
                ? ['border-primary', 'border-opacity-100']
                : []
            "
            @click="
              selectedParkIndex = parks.findIndex(
                (item) => item.name === park.name,
              )
            "
          >
            <div class="text-title-medium">{{ park.name }}</div>
            <div class="text-title-medium text-body-small text-neutral">
              {{ park.en }}
            </div>
            <v-chip class="mt-2" color="primary" variant="flat" size="small">
              介紹
            </v-chip>
          </v-sheet>
        </v-col>
        <v-col
          cols="6"
          lg="3"
          class="reveal-up"
          :class="{ 'is-visible': mapReveal.isVisible.value }"
          v-intersect="{
            handler: mapReveal.onIntersect,
            options: { threshold: 0.1 },
          }"
          style="transition-delay: 0.2s"
        >
          <div class="map-wrapper">
            <svg
              id="taiwan-svg"
              viewBox="460 260 400 710"
              xmlns="http://www.w3.org/2000/svg"
            >
              <!-- 桃園市 -->
              <path
                :class="[
                  'region-path',
                  'north',
                  { 'active-city': isCityActive('taoyuan') },
                  { 'no-transition': replayingCity === 'taoyuan' },
                ]"
                data-region="north"
                data-city="taoyuan"
                d="M657.2 325.1l6.4-10.3 5-5.9 5.2-4.4 13.2-4.4 3.1-1.9 2.7-2.4 3.3-1.8 6.4-2.3 14.5-2.6 3 3.3 4.6 2.2 3.4 2.2 2.3 2.1 2.9 0.7 3.1 1.6 3.7 5.4 0.3 2.9-0.7 3-2.4 2.5-9.4 2.8-2.7 2.9 0.2 4.5-0.8 4.1 0.8 3.7 3.8 3.7 0.8 3.7-1 4.8 3.7 2.1 5.3-0.3 3.7 1.4 6 8.9-1 3.8-2.3 2.7 0.6 3.7 1 4.1 6.4 6 1.8 4-2.2 0.6-3.9 2.8 2.3 9-1.6 2.7-2.5 1-2.3-0.5-2.9 1.1-0.3 1.1-3.5-1.5-5.2-3-2.9-2.1-4-0.7-4.5-2.6-3.7-2.9-0.4-3.1 3.3-4.7 1.4-5.6-1.2-5.2-0.2-3.6-2.5-1.9-3.1-1.6-1.9-3.3-2.4-2.5-2.8 0.2-2.8-0.5-2.2-2.2-3-2.2-4.8-1.5-2.4-2.7 0.8-4.2-2.6-3-4.9-1.6-3-1.4-3.1-0.9-3.6-1.4-2.9-6.3-3.3-2.2-9.8 0.7-2.3-0.8z"
                @click="getFirstParkByCity('taoyuan')"
                @mouseenter="getFirstParkByCity('taoyuan')"
              />
              <!-- 台中市 -->
              <path
                :class="[
                  'region-path',
                  'central',
                  { 'active-city': isCityActive('taichun') },
                  { 'no-transition': replayingCity === 'taichun' },
                ]"
                data-region="central"
                data-city="taichun"
                d="M712.3 433.2l0.5-0.4 7.7-0.7 2 0.5 2.6 0.8-0.5 4 1.1 2.6 3.5 0.8 3.2 1.9 2.7 1.8 2.8-0.4 3.4-1.7 3.6 0 4.2 3.4-3.4 3.5-0.3 3-1.7 4.5-5.4 3.4-2.2 3.6-0.9 3.7-2.2 2.7-2.5 1.3-0.9 1.4-2 1.5-9.6-0.9-3.4-0.8-3.4 0.2-8 3.2-4.5 0.7-4.4 0.2-6.4 3.3-3.2 0.6-3.6 2.1-5.7 5.5-3.6 1.4-4.8-0.1-3.4 2.8-1.9 3.9-2.5 0.7-6.4-4.8-2.2 1.4-4.2 5.5-4.3 0.2-7.3-1.1-4.6 2.2-2.7 6.1-5.4 10.4-3.6 3.4-3 0.5-13-1.8-3-0.1-0.1-1-3.9-2.6-3.1-0.5-0.9-2.5 0-2.8-1.4-2.9-2.3-3.6-3.2-2.6-8.5-2.5-3.3-3.9-0.7-5.5-1.9-4.6-2.9-2.5-4.2-1.3 0.5-0.6 0.5-2.4 2.4-1.9 1.6-4.7 1.9-8.8 6.7-11.7 2.1-7.1 2.4-4 9.6-10.6 6.6 10.3 3.4 3.6 4.5 3.9 10.9 8 5.3 2.6 4.7 0.9 8.4 4.8 8.8-0.5 3.7-2 0.6-5.3 4-2.4 7.1 0.6 4.4 1.7 3.6 4 3.9 1.6 6.4-3.5 4.9-2 8.4-6.6 4.2-2.4 3.3-3.1 3-2.2 3.9 0.1 3.5-1.5 1.3-4 2.7-1.9z"
                @click="getFirstParkByCity('taichun')"
                @mouseenter="getFirstParkByCity('taichun')"
              />
              <!-- 台南市 -->
              <path
                :class="[
                  'region-path',
                  'south',
                  { 'active-city': isCityActive('tainan') },
                  { 'no-transition': replayingCity === 'tainan' },
                ]"
                data-region="south"
                data-city="tainan"
                d="M495.1 664.4l3.8 1.4 6.3 1 5.3 1.3 4.5-2 1.8-3.6 4.1-2.6 4.8-3.7 3.4-3.4 4.4-3.3 5.6-2.5 11-2.1 6.1-0.3 5.1 1.7 2.9 1.7 1.5 3.1 1.3 3.6 7.1 7.3 0.7 5.4-1.2 10.3 1.1 3.3 3.3 2.5 2.7 0 3.8-1.7 3.6-0.5 2.7 0.8 6 0.7-1.6 4.8-7.5 10.9-7.2 12.2-4.7 6-5.4 5.3-4.6 3.9-4.5 4.6-3.8 5.1-2.1 3.7-1.7 4-4.6 3.2-4.6 1.9-2.6 1.8-3 1.1-6.1-0.7-5.9 0.6-11.3-1.6-3.5-1.8-2.8-6.2-0.1-0.3-4.5 2.6-0.7-4.5-1.3-2.6-2.8-2.8 3.5-2.5 1.9-4.3-0.8-3.8-4.6-0.7-0.8 1.4-0.8 2.4-1.3 1.9-2.4-0.1-0.9-1.6 0.3-5-0.5-1.8-3-1.3-1.6 1.5-1.4 2.1-1.9 0.5-2.1-1.8-0.6-2.5 0.5-2.4 0.9-1.7 2.1-1.1 2.7-0.4 2.2-0.7 0.7-2.2-1-1.1-6.7-1.7 0-1.4 5.6 0-0.5-1.9-3.1-2.7-2-2.3 0.5-2.9 1.8-1 1.9-0.7 1-1.8-0.6-2.8-1-2.3 0.7-2.2 1-2.6 1.6-1.9-0.3-1.7 0.3-1.6 2.4-6.5 1.2-1.2 1.8-0.5-2.7-1.8 1.2-2.9z"
                @click="getFirstParkByCity('tainan')"
                @mouseenter="getFirstParkByCity('tainan')"
              />
              <!-- 其他地區（無互動，只作背景） -->
              <path
                class="region-path north"
                data-region="north"
                d="M657.2 325.1l2.3 0.8 9.8-0.7 3.3 2.2 2.9 6.3 3.6 1.4 3.1 0.9 3 1.4 4.9 1.6 2.6 3-0.8 4.2 2.4 2.7 4.8 1.5 3 2.2 2.2 2.2 2.8 0.5 2.8-0.2 2.4 2.5 1.9 3.3 3.1 1.6 2.5 1.9 0.2 3.6 1.2 5.2-1.4 5.6-3.3 4.7 0.4 3.1 3.7 2.9 4.5 2.6 4 0.7 2.9 2.1 5.2 3 3.5 1.5-1.7 4.7-1 3.4 0.4 3.2-2.7 4.2-10.1 10.2-3.1 7.5-2-0.5-7.7 0.7-0.5 0.4-0.5-3.5-3.3-5.6-2.3-2.4-1-3.1-3.6-2.9-9.1 2.3-3.4-0.4-4.9 0.4-5.5 1.5-3-0.7 0.7-3.7 0.9-3.3-0.7-2.9-0.7-2.1 0.7-2.3 0.5-2.4 0.3-2.8-0.6-3.8-2.7-2.4-8.8-4.2-4.3-3.2-2.8-3.2-3.2-8 1.8-2.2 1.6-4.1 2.5-3.1 4.2-1.7 3.7-0.6 1.7-1 0.7-2.7-1.3-2.6-2.8-2.8-3.9-2-10.9-3.5-6-2.6 0.1-0.1 1.1-1.6 0.4-2.7 0.6-2.1 1.5-2.1 1.9-1.6 1.8-0.6-0.1-0.9 0.5-2.1 1.6-4.4 1.5-2.3z"
              />
              <path
                class="region-path north"
                data-region="north"
                d="M646.3 345.6l6 2.6 10.9 3.5 3.9 2 2.8 2.8 1.3 2.6-0.7 2.7-1.7 1-3.7 0.6-4.2 1.7-2.5 3.1-1.6 4.1-1.8 2.2-0.2 0.2-3.3 0.8-3.1-1.3-2-2.7-3-1.9-5-1.9 0.8-3 4-8.2 1.6-2.1 0.5-1.2 0-1.2-0.5-1.3-0.8-1.6 1.1-2.2 1.2-1.3z"
              />
              <path
                class="region-path central"
                data-region="central"
                d="M655 374.5l3.2 8 2.8 3.2 4.3 3.2 8.8 4.2 2.7 2.4 0.6 3.8-0.3 2.8-0.5 2.4-0.7 2.3 0.7 2.1 0.7 2.9-0.9 3.3-0.7 3.7 3 0.7 5.5-1.5 4.9-0.4 3.4 0.4 9.1-2.3 3.6 2.9 1 3.1 2.3 2.4 3.3 5.6 0.5 3.5-2.7 1.9-1.3 4-3.5 1.5-3.9-0.1-3 2.2-3.3 3.1-4.2 2.4-8.4 6.6-4.9 2-6.4 3.5-3.9-1.6-3.6-4-4.4-1.7-7.1-0.6-4 2.4-0.6 5.3-3.7 2-8.8 0.5-8.4-4.8-4.7-0.9-5.3-2.6-10.9-8-4.5-3.9-3.4-3.6-6.6-10.3 5.2-5.8 1.3-2.9 0.7-4.8 1.5-4 4.3-7.5 1.2-4.5 1.1-2 4.8-1.4 1.4-1.5 0.8-1.9 1-1.8 3-3.2 3.4-2.4 4-1.1 5.2 1-0.7-3.9 1.9-2.7 2.7-2.7 1.3-4.2 0.6-1.3 2.6-1.3 0.3-0.9 5 1.9 3 1.9 2 2.7 3.1 1.3 3.3-0.8 0.2-0.2z"
              />
              <path
                class="region-path central"
                data-region="central"
                d="M563.1 480.3l4.2 1.3 2.9 2.5 1.9 4.6 0.7 5.5 3.3 3.9 8.5 2.5 3.2 2.6 2.3 3.6 1.4 2.9 0 2.8 0.9 2.5 3.1 0.5 3.9 2.6 0.1 1 0 2.6-3.1 1.1-0.9 2.1 0.4 2.9-1.4 3.3-1.2 3.9-0.1 4.1-0.8 4.7-0.7 9.7 1.5 4.5 2.6 2.4 2.8 1 4.1 2.1-0.7 2.5-2.8 1.1-1.8 1.7-1.7 1.1-0.7 0.5-8.7-1.7-4.2 0.1-8.7-4.4-14.2-1.6-8.4-3.2-4.8-1.3-5.4-0.3-15.9 1.9-5.5-3.2 0.6-1 1.1-5.1 0.9-2.1 5.1-4.9 1.5-2.1 1.9-5.6 3-5.6 4.2-11.6 1.9-3.3 2.2-2.2 1.8-1.2 1.5-0.8 1.2-1 0.4-2.2 0.9-2 3.7-2.9 0.8-2.2 0.4-7.2 0.7-2 1.9-1.9 8.2-9.5z"
              />
              <path
                class="region-path central"
                data-region="central"
                d="M519.2 556.7l5.5 3.2 15.9-1.9 5.4 0.3 4.8 1.3 8.4 3.2 14.2 1.6 8.7 4.4 4.2-0.1 8.7 1.7 0.7-0.5 1.4 5.2-1.5 3.4-0.7 5.2 0.7 5.5-1.3 3.7-0.7 4.2 2.8 3.4 4.2 1.8 4.9-1.5 6-0.6 1.9 2.5-0.4 0-0.3 3.6 0 2.5-2.8 0.9-8.4 1.7-4.6 0.5-1.7-2.9-3.4-2.4-6 1.7-2.7 0.4-9.1-3.3-3.6-4.2-3.8-3.4-4.9 0.3-9.1 1.7-5.2 1.4-11.8 6.8-2.7 2.7-3.2 1.7-5 4.1-3.9 0.6-1.4 2.2-1.3 3.5-2.8 2.3-4.4-0.1-6-3.3-7.6 0.8-0.1 0.1-0.7 0 3.4-3.7-0.2-11.8 0.5-8.9 2-7 3.2-5.6 0.9-7.2 1.7-6.3 0.9-2.2 4.4-5.8 0.7-2 0.6-1.1 4-3.1 0.6-1.2z"
              />
              <path
                class="region-path south"
                data-region="south"
                d="M496.5 622.6l0.7 0 0.1-0.1 7.6-0.8 6 3.3 4.4 0.1 2.8-2.3 1.3-3.5 1.4-2.2 3.9-0.6 5-4.1 3.2-1.7 2.7-2.7 11.8-6.8 5.2-1.4 9.1-1.7 4.9-0.3 3.8 3.4 3.6 4.2 9.1 3.3 2.7-0.4 6-1.7 3.4 2.4 1.7 2.9 4.6-0.5 8.4-1.7 2.8-0.9 0-2.5 0.3-3.6 0.4 0 4.4 0.5 4.8 1.9 3 0.8 3.7 2.1-0.3 3.8-2.1 3.7 0.9 3.4 1.9 4.7 0.3 4.2 0.8 2.8 5.5 1 18.4 0.1 0.6 0.2-13.3 6.8-6.1 4.8-2.5 4.9-3.1 3.7-5.5 3.1-5.8 4.4-3.2 3.8-8.9 5.3-4.2 0.4-4.9-0.5-2.6 2.6-0.1 3.5 1 3.3 0.7 4.8-6-0.7-2.7-0.8-3.6 0.5-3.8 1.7-2.7 0-3.3-2.5-1.1-3.3 1.2-10.3-0.7-5.4-7.1-7.3-1.3-3.6-1.5-3.1-2.9-1.7-5.1-1.7-6.1 0.3-11 2.1-5.6 2.5-4.4 3.3-3.4 3.4-4.8 3.7-4.1 2.6-1.8 3.6-4.5 2-5.3-1.3-6.3-1-3.8-1.4 2.8-0.2 2.3-1 1 0.3-0.6-2.3-1.6 1.2-1.3-0.4-1.8-0.1 0-2.3 1.8-4.1 2.6-0.2 3.9 0-2.6-7.5-3.1-5.8 1.4-2.6 0-1.4-2.2-1.1 0.3-1.2 1.3-1.5 0.6-1.9 3-3.8-6.2 0.4-0.2-6.3z"
              />
              <path
                class="region-path south"
                data-region="south"
                d="M596.8 682.8l-0.7-4.8-1-3.3 0.1-3.5 2.6-2.6 4.9 0.5 4.2-0.4 8.9-5.3 3.2-3.8 5.8-4.4 5.5-3.1 3.1-3.7 2.5-4.9 6.1-4.8 13.3-6.8 3.2 0.7 4.2 1.6 3 4.2 0.5 1.5 1.4 4.2-2.2 3.5-4 1.8-1 2.3 0.7 2.9 4 2.6 4.6 3.7 2 5.5 0.2 1.8-11.2 2.8-4.7 2.9-2.9 2.8-5.6 3.7-0.6 4.1 1.6 4.3-1.9 3.5-5.3 2.9-0.7 5 1.6 7.1-2.2 9.5 0 8.1-3.1 4.2-6.2 5.3-1.7 7 1 5.9 2.2 3.3 4.4 4.6 0.9 3.5-2.8 0.4-3.8-0.7-3.1 0.2-6.1 4.8-4.3-4-5.4-6.4-5.2 1.3-4.8 4.3-9.4-4.8-6.8 3.2-4.6 5.1-5.7 2.1-12.9-0.8-1.3 3.5-0.9 5.2-1.9 5.7 0.4 5-0.1 6.9-4 15.3-0.2 5.1 2 5.4 0.3 5.9-5.8 14.8-1.9-0.8-1.1 0-1.4 0.5-1.5 0.1-9.4-7.4-8.8-12.4 9.2 11.1-1-5.2-1.6-2.9-1.2-2.3-3.8-4.4-6.5-6-2.5-3.1-1.2-3.4 1.6-3.3 0.8-3-1.1-4.1-1.9-4.1-3.6-5.5-3.3-7.4-0.7-3.3 0-2.1 1.1-2.6 0.3-1.7-0.4-0.9-1-0.7-0.9-0.9-0.4-1.7-2.1-3.5-0.5-1.4-1.6-9.9 4.5-2.6 0.1 0.3 2.8 6.2 3.5 1.8 11.3 1.6 5.9-0.6 6.1 0.7 3-1.1 2.6-1.8 4.6-1.9 4.6-3.2 1.7-4 2.1-3.7 3.8-5.1 4.5-4.6 4.6-3.9 5.4-5.3 4.7-6 7.2-12.2 7.5-10.9 1.6-4.8z"
              />
              <path
                class="region-path east"
                data-region="east"
                d="M727.6 474.4l2-1.5 0.9-1.4 2.5-1.3 2.2-2.7 0.9-3.7 2.2-3.6 5.4-3.4 1.7-4.5 0.3-3 3.4-3.5 1.8 1.5 4.7 2.2 10.8 2.8 6 2.3 4.7 0 3.5-3.3 1.7-4.3 2.7-0.6 13.4 7.9 8 1.3 0.8 0 0.5 0.5 0.6 1.1 0.5 1.1 0.2 0.7-1 1.7-4.2 4.1-4.6 6.3-3.3 2.7-1 1.4 0.5 1.5-0.6 1.1-4.9 3.6-1.8 1.8-2 4.3-2 8.8-5.4 7.8-1.1 3.2 0.2 3.4 1.3 3.8 1.1 1.6 0.9 0.7 0.6 1 0.1 2.3-0.8 2.7-2.7 4.1-0.5 2.5-0.3 4.6-2.3 11.7-4.6 12.4-5.8 28.8-3.4 7.1-8 46.2-2.5-0.8-7.8 3.8-2.8 3.9 1.3 5 0.4 4.9-2.6 5-2.5 3.7-1.9 4.8-1.8 6.1-2.6 5.5-3.5 9.6-2.2 4.3 0 4.9-0.6 4.4-4.7 2.7-5.9-0.8-8.5-7-6.6-11.5-4.1-1.1-4.5-0.7-3.6-3.4-4.4-2.1-5.6-2-3.7-5.9-0.8-5.3-0.2-1.8-2-5.5-4.6-3.7-4-2.6-0.7-2.9 1-2.3 4-1.8 2.2-3.5-1.4-4.2 4.3-2.5 2.2-2.1-1.2-4.4 1.1-1.9 1.1-3 3.7-2.7 5.4-1.2 5.3-0.2 3.8-3.4 1-6.2 2.8-3.7 5.5-2 3.3-2.3 1.1-3.6 2.3-9.1 0.9-6-0.7-5.2-0.8-3.9-2.3-2.9-1.5-2.9 4.1-6.8 0.1-2.7 1.8-5.1 2.8-6.1 2.2-6.3 1.1-7.2 0.5-5.4-1.3-3.2-1.5-2.4 1.7-5.5 3.7-7.7 5.8-7.6 0.1-2.7-1-3.3-3.8-2.4-2-2.2-0.2-7.2 2.7-2.1 4.7-1.6 3.8-1.7-0.2-2.6-1-4.5z"
              />
              <path
                class="region-path north"
                data-region="north"
                d="M740.7 399.4l0.3-1.1 2.9-1.1 2.3 0.5 2.5-1 1.6-2.7-2.3-9 3.9-2.8 2.2-0.6 4.2-1.2 3.5-1.3 2.7-2.4 3.6-2.5 4.8-2.3 2.8-2-0.3-1.4-0.7-2.3-0.1-3 1.4-3.6 3.4-2.9 2.7-1.6 9.4-3.8 9.7-5.9 4.5-1.3 3.6-2.6 2.3-3.7 2.3-2.9 2.7-1.4 2.5-0.9 3.3-2.1 1.2-2.8-1.8-2.5 1-2.2 8.1-1.6 2.6-1.8 6-3.2 4.3-0.9 2.4 1.4 0.6 0.8-8.6 4.3-4 3.4-13.5 16.4-2.1 3.5-1.7 4.8-1.1 5.6-0.4 5.5 0.2 5.3 2.4 11.2-0.2 2.9-1 2.8 0.2 5.8 2.4 4.5 4.7 2.9 5.5 1.1 0 1.2-2.3-0.2-2.2 0.2-1.9 0.6-1.3 1 1.9 3.6 0.9 4.7-0.6 4.1-4.3 2.4-0.3 1.8 0.6 2.1 1.2 2 0.4 2-1.8 1.7-4.5 2.6-5 5.8-0.2 2.3 0.3 5-0.8 2-1 1.6-0.6 2.3-0.3 4.6-0.4 1.2-0.7 0.9-0.4 1 0.7 1.2 0.2 0.2-0.8 0-8-1.3-13.4-7.9-2.7 0.6-1.7 4.3-3.5 3.3-4.7 0-6-2.3-10.8-2.8-4.7-2.2-1.8-1.5-4.2-3.4-3.6 0-3.4 1.7-2.8 0.4-2.7-1.8-3.2-1.9-3.5-0.8-1.1-2.6 0.5-4-2.6-0.8 3.1-7.5 10.1-10.2 2.7-4.2-0.4-3.2 1-3.4 1.7-4.7z"
              />
              <path
                class="region-path north"
                data-region="north"
                d="M754.1 381.6l-1.8-4-6.4-6-1-4.1-0.6-3.7 2.3-2.7 1-3.8-6-8.9-3.7-1.4-5.3 0.3-3.7-2.1 1-4.8-0.8-3.7-3.8-3.7-0.8-3.7 0.8-4.1-0.2-4.5 2.7-2.9 9.4-2.8 2.4-2.5 0.7-3-0.3-2.9-3.7-5.4-3.1-1.6-2.9-0.7-2.3-2.1-3.4-2.2-4.6-2.2-3-3.3 8.1-1.5 3.4-1.3 4.5-3.7 1.3-0.7 1.6-0.3 2.2 0 2.6 0.8 1.3 1.9 0.9 2 1.1 1.1 2.5-1-2.6-4.1-4.2-4.2-2.2-1.4 0.7-1.9 1.3-1.1 1.3-0.7 0.6-0.6 1.5-3.8 2.3-4.2 4.7-4.3 7-3.5 7.9-1.8 7.8 0.9 3.2 2.5 7.3 10.1 2.5 5.4 0.9-0.3 1.9-0.6 2.3-0.2 1.5 0.4-0.1 0.7-0.7 0.9-0.7 1.3 0 1.5 0.8 0.9 1.6 1.2-3.1 2.1-5.2 2.3-2.3 1.5 0.4 2.1 2.1 2.7 1.2 2.5 2.1 2.5 2.6 2.5 2.2 1.6 7.6 3.1 3.7 0.5 2.9-1.1 1.8-1.3 0.3-1.8-2.7-2.8-0.1-2.2 0.2-8.6 24.9 6.1 2.4 1.5-1.2 2.6-0.3 2.1 0.5 3.8 1.7 6.2 1.9 3 1.6 0.7 5-0.8 2.6 0.3 3 0.8 2.7 1.3 1.5 1.9-6.3 3.1-0.6-0.8-2.4-1.4-4.3 0.9-6 3.2-2.6 1.8-8.1 1.6-1 2.2 1.8 2.5-1.2 2.8-3.3 2.1-2.5 0.9-2.7 1.4-2.3 2.9-2.3 3.7-3.6 2.6-4.5 1.3-9.7 5.9-9.4 3.8-2.7 1.6-3.4 2.9-1.4 3.6 0.1 3 0.7 2.3 0.3 1.4-2.8 2-4.8 2.3-3.6 2.5-2.7 2.4-3.5 1.3-4.2 1.2z"
              />
              <path
                class="region-path south"
                data-region="south"
                d="M551.1 836.2l5.8-14.8-0.3-5.9-2-5.4 0.2-5.1 4-15.3 0.1-6.9-0.4-5 1.9-5.7 0.9-5.2 1.3-3.5 12.9 0.8 5.7-2.1 4.6-5.1 6.8-3.2 9.4 4.8 4.8-4.3 5.2-1.3 5.4 6.4 4.3 4 6.1-4.8 3.1-0.2 3.8 0.7 2.5 4.7 0.5 3.5 3.9 1 4 2.6-2 9.9-0.1 3.8-1.5 3.5-7 3-3.5 2-5.5 1.2-3.9 3.2-1.7 4.7-2.6 4.8-2.2 5.4-0.6 10.6 0.9 4.7 1.4 4.4 0.8 5.1 0 3.8 1.9 3.7 3.3 4-1.8 2.7-3.8 2.3-1.5 2.8-0.4 3.3 2 2.8 2.4 1.2 2.3 3.2-0.1 4.1 0.4 4.4 2.3 4.3 3.3 3.5 7.4 3.4 3.2-0.3 0.6 37.2-1.1 5.3-1.8 4.3-2.4 1.8-2.9 2.7 0.1 6 1 6.6-0.2 4.2-3.3-4.9-4.9-3.7-5.7-2.5-5.7-1.4-0.2 4.7-1.7 1.7-2.4-0.6-2.7-2.2-0.1-1.7 0.9-5-4-6.7-0.3-1.8 0-1.4 0.3-2.4 0-7.7 0.4-2.3 1.8-2.5 0.4-2.2-14.4-37.2-1.1-2.1-4-4.9-3.2-7.1-1.4-2.1-5.9-4.6-2.3-1.3-0.8-0.3-0.8-0.6-0.7-2.6-0.5-1-3.1-2.1-7.3-3.4-3.2-2.3-3.5-3-1.6-1-0.2-0.1z"
              />
              <path
                class="region-path east"
                data-region="east"
                d="M634.7 759.1l2.8-0.4-0.9-3.5-4.4-4.6-2.2-3.3-1-5.9 1.7-7 6.2-5.3 3.1-4.2 0-8.1 2.2-9.5-1.6-7.1 0.7-5 5.3-2.9 1.9-3.5-1.6-4.3 0.6-4.1 5.6-3.7 2.9-2.8 4.7-2.9 11.2-2.8 0.8 5.3 3.7 5.9 5.6 2 4.4 2.1 3.6 3.4 4.5 0.7 4.1 1.1 6.6 11.5 8.5 7 5.9 0.8 4.7-2.7 0.6-4.4 0-4.9 2.2-4.3 3.5-9.6 2.6-5.5 1.8-6.1 1.9-4.8 2.5-3.7 2.6-5-0.4-4.9-1.3-5 2.8-3.9 7.8-3.8 2.5 0.8-3.3 19-1.6 3.5-5.1 6.8-1.9 3.5-1.5 4.4-1 8.3 0.1 7.3-0.8 6.9-3.5 7.2-1.5 1.6-3.4 2.5-1.5 1.6-0.8 1.6-1.2 4.2-3.5 6.1-2.1 9.4-1.5 4.2-7.4 10.7-0.9 2-10 8.4-2.4 2.8-0.4 1.9 0.5 4.5-0.1 2-0.9 2.3-1.6 2.6-3.4 4.3-3.4 3.2-11.6 7.8-7.8 8.5-1.9 1-1.5 2-3.8 9.7-1.8 3.6-5.8 7.3-2.4 4.3-1.3 8.8-3.5 12.1-6.9 12.1-1 4.1-1.2 11.6 0.2 10.5-3.2 0.3-7.4-3.4-3.3-3.5-2.3-4.3-0.4-4.4 0.1-4.1-2.3-3.2-2.4-1.2-2-2.8 0.4-3.3 1.5-2.8 3.8-2.3 1.8-2.7-3.3-4-1.9-3.7 0-3.8-0.8-5.1-1.4-4.4-0.9-4.7 0.6-10.6 2.2-5.4 2.6-4.8 1.7-4.7 3.9-3.2 5.5-1.2 3.5-2 7-3 1.5-3.5 0.1-3.8 2-9.9-4-2.6-3.9-1-0.5-3.5-2.5-4.7z"
              />
              <path
                class="region-path central"
                data-region="central"
                d="M599.5 519.1l3 0.1 13 1.8 3-0.5 3.6-3.4 5.4-10.4 2.7-6.1 4.6-2.2 7.3 1.1 4.3-0.2 4.2-5.5 2.2-1.4 6.4 4.8 2.5-0.7 1.9-3.9 3.4-2.8 4.8 0.1 3.6-1.4 5.7-5.5 3.6-2.1 3.2-0.6 6.4-3.3 4.4-0.2 4.5-0.7 8-3.2 3.4-0.2 3.4 0.8 9.6 0.9 1 4.5 0.2 2.6-3.8 1.7-4.7 1.6-2.7 2.1 0.2 7.2 2 2.2 3.8 2.4 1 3.3-0.1 2.7-5.8 7.6-3.7 7.7-1.7 5.5 1.5 2.4 1.3 3.2-0.5 5.4-1.1 7.2-2.2 6.3-2.8 6.1-1.8 5.1-0.1 2.7-4.1 6.8 1.5 2.9 2.3 2.9 0.8 3.9 0.7 5.2-0.9 6-2.3 9.1-1.1 3.6-3.3 2.3-5.5 2-2.8 3.7-1 6.2-3.8 3.4-5.3 0.2-5.4 1.2-3.7 2.7-1.1 3-1.1 1.9 1.2 4.4-2.2 2.1-4.3 2.5-0.5-1.5-3-4.2-4.2-1.6-3.2-0.7-0.6-0.2-18.4-0.1-5.5-1-0.8-2.8-0.3-4.2-1.9-4.7-0.9-3.4 2.1-3.7 0.3-3.8-3.7-2.1-3-0.8-4.8-1.9-4.4-0.5-1.9-2.5-6 0.6-4.9 1.5-4.2-1.8-2.8-3.4 0.7-4.2 1.3-3.7-0.7-5.5 0.7-5.2 1.5-3.4-1.4-5.2 1.7-1.1 1.8-1.7 2.8-1.1 0.7-2.5-4.1-2.1-2.8-1-2.6-2.4-1.5-4.5 0.7-9.7 0.8-4.7 0.1-4.1 1.2-3.9 1.4-3.3-0.4-2.9 0.9-2.1 3.1-1.1 0-2.6z"
              />
              <path
                class="region-path south"
                data-region="south"
                d="M559.2 638.1l-5.3-1.2-5.1-3.3-4.4-1.7-0.6-4.1 2.7-2.9 6.7-1.2 5.7-0.5 4 1.5 3 1.6 1.7 2.9 1.9 4.9-2.2 1.6-3.2 0.4-4.9 2z"
              />
            </svg>
          </div>
        </v-col>
        <v-col
          cols="12"
          lg="5"
          class="fade-in"
          :class="{ 'is-visible': parkDetailReveal.isVisible.value }"
          v-intersect="{
            handler: parkDetailReveal.onIntersect,
            options: { threshold: 0.1 },
          }"
        >
          <v-carousel
            v-model="selectedParkIndex"
            hide-delimiters
            :show-arrows="false"
            height="auto"
          >
            <v-carousel-item v-for="(park, index) in parks" :key="park.name">
              <v-sheet color="#edf2f7">
                <v-img
                  class="rounded-lg"
                  :src="park.images[0]"
                  :alt="park.name"
                  :aspect-ratio="16 / 9"
                  cover
                />

                <v-card-text class="pa-0 pt-6">
                  <div class="d-flex align-center justify-space-between mb-4">
                    <v-btn
                      variant="flat"
                      :icon="mdiChevronLeft"
                      @click="
                        selectedParkIndex =
                          (selectedParkIndex - 1 + parks.length) % parks.length
                      "
                    >
                    </v-btn>

                    <div class="text-center flex-grow-1 px-4">
                      <div
                        class="text-headline-medium font-weight-black text-secondary mb-2"
                      >
                        {{ park.name }}
                      </div>
                      <div class="text-body-medium text-neutral">
                        {{ park.en }}
                      </div>
                    </div>
                    <v-btn
                      variant="flat"
                      :icon="mdiChevronRight"
                      @click="
                        selectedParkIndex =
                          (selectedParkIndex + 1) % parks.length
                      "
                    >
                    </v-btn>
                  </div>

                  <v-divider class="mb-6" />

                  <v-row class="mb-2 text-center" no-gutters>
                    <v-col cols="6">
                      <div class="text-label-medium text-neutral">
                        土地面積 (坪)
                      </div>
                      <div class="text-display-small font-weight-black mt-2">
                        {{ park.land }}
                      </div>
                    </v-col>
                    <v-col cols="6">
                      <div class="text-label-medium text-neutral">
                        建物面積 (坪)
                      </div>
                      <div
                        class="text-display-small font-weight-black text-primary mt-2"
                      >
                        {{ park.build }}
                      </div>
                    </v-col>
                  </v-row>

                  <div
                    class="text-body-large text-neutral mt-4 mb-0"
                    style="height: 120px"
                  >
                    {{ park.desc }}
                  </div>
                </v-card-text>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
    </v-container>
  </section>

  <section id="news" style="padding: 60px 0">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <div
            class="border-s-lg border-primary border-opacity-100 pl-4 mb-12 reveal-up"
            :class="{ 'is-visible': newsHeadingReveal.isVisible.value }"
            v-intersect="{
              handler: newsHeadingReveal.onIntersect,
              options: { threshold: 0.2 },
            }"
          >
            <div class="text-primary text-title-small mb-4">LATEST NEWS</div>
            <div
              class="text-headline-medium text-lg-display-small font-weight-black"
            >
              最新消息
            </div>
          </div>
          <v-list class="pa-0">
            <v-list-item
              v-for="(news, index) in newsItems"
              :key="news.to"
              :to="news.to"
              class="news-row px-2 py-6 reveal-up"
              :class="{ 'is-visible': newsItemsVisible[index] }"
              :style="{ transitionDelay: `${index * 0.05}s` }"
              v-intersect="{
                handler: (isIntersecting) =>
                  onNewsIntersect(isIntersecting, index),
                options: { threshold: 0.1 },
              }"
            >
              <div
                class="d-flex align-start align-md-center ga-2 ga-md-6 w-100 flex-column flex-md-row"
              >
                <div class="d-flex align-center ga-4">
                  <div
                    class="font-weight-bold text-body-large text-grey-darken-1"
                  >
                    {{ news.date }}
                  </div>

                  <v-chip variant="outlined" color="primary">{{
                    news.tag
                  }}</v-chip>
                </div>

                <span class="text-body-large">
                  {{ news.title }}
                </span>

                <v-spacer class="d-none d-md-flex"></v-spacer>
                <div
                  class="d-flex align-center text-title-small text-secondary text-no-wrap align-self-end align-self-md-center"
                >
                  READ MORE
                  <v-icon :icon="mdiArrowRight" size="16" class="ml-1"></v-icon>
                </div>
              </div>
            </v-list-item>
          </v-list>
          <div class="text-end">
            <v-btn
              color="secondary"
              variant="outlined"
              size="large"
              class="mt-8"
              :append-icon="mdiArrowRight"
              to="/news"
            >
              查看更多消息
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
  <section
    id="tech"
    style="background: #edf2f7; padding: 60px 0"
    v-intersect="{
      handler: techReveal.onIntersect,
      options: { threshold: 0.1 },
    }"
    class="reveal-up"
    :class="{ 'is-visible': techReveal.isVisible.value }"
  >
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <div
            class="text-title-small text-primary border-s-md border-primary border-opacity-100 pl-5 mb-8"
          >
            SPECIFICATIONS & SERVICES
          </div>
          <v-expansion-panels
            class="services-panels"
            flat
            bg-color="#edf2f7"
            variant="accordion"
          >
            <v-expansion-panel>
              <v-hover v-slot="{ isHovering, props }">
                <v-expansion-panel-title
                  v-bind="props"
                  class="transition-swing"
                >
                  <div
                    :style="{
                      transform: isHovering
                        ? 'translateX(12px)'
                        : 'translateX(0)',
                      transition: 'transform 0.3s ease',
                    }"
                    class="text-title-medium text-md-headline-medium font-weight-bold py-2"
                  >
                    空間租賃服務
                  </div>
                </v-expansion-panel-title>
              </v-hover>
              <v-expansion-panel-text>
                <ul
                  class="text-neutral text-body-large"
                  style="padding-left: 0"
                >
                  <li class="pb-2 list-item-row">
                    <span style="flex-shrink: 0">•</span>
                    <span
                      ><strong>高規格倉儲空間：</strong
                      >常溫、冷鏈、全溫層物流、自動化倉儲系統。</span
                    >
                  </li>
                  <li class="pb-2 list-item-row">
                    <span style="flex-shrink: 0">•</span>
                    <span
                      ><strong>企業辦公場域：</strong
                      >行政總部、商務中心、辦公室。</span
                    >
                  </li>
                </ul>
              </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-hover v-slot="{ isHovering, props }">
                <v-expansion-panel-title
                  v-bind="props"
                  class="transition-swing"
                >
                  <div
                    :style="{
                      transform: isHovering
                        ? 'translateX(12px)'
                        : 'translateX(0)',
                      transition: 'transform 0.3s ease',
                    }"
                    class="text-title-medium text-md-headline-medium font-weight-bold py-2"
                  >
                    專業產業顧問與媒合服務
                  </div>
                </v-expansion-panel-title>
              </v-hover>
              <v-expansion-panel-text>
                <ul
                  class="text-neutral text-body-large"
                  style="padding-left: 0"
                >
                  <li class="pb-2 list-item-row">
                    <span style="flex-shrink: 0">•</span>
                    <span
                      ><strong>建設諮詢顧問：</strong>廠辦營造規劃、諮詢。</span
                    >
                  </li>
                  <li class="pb-2 list-item-row">
                    <span style="flex-shrink: 0">•</span>
                    <span><strong>物流資源媒合：</strong>第三方物流服務。</span>
                  </li>
                  <li class="pb-2 list-item-row">
                    <span style="flex-shrink: 0">•</span>
                    <span
                      ><strong>一站式建置顧問：</strong
                      >客製化倉儲需求媒合可使用倉儲。</span
                    >
                  </li>
                </ul>
              </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-hover v-slot="{ isHovering, props }">
                <v-expansion-panel-title
                  v-bind="props"
                  class="transition-swing"
                >
                  <div
                    :style="{
                      transform: isHovering
                        ? 'translateX(12px)'
                        : 'translateX(0)',
                      transition: 'transform 0.3s ease',
                    }"
                    class="text-title-medium text-md-headline-medium font-weight-bold py-2"
                  >
                    智慧管理
                  </div>
                </v-expansion-panel-title>
              </v-hover>
              <v-expansion-panel-text>
                <ul
                  class="text-neutral text-body-large"
                  style="padding-left: 0"
                >
                  <li class="pb-2 list-item-row">
                    <span style="flex-shrink: 0">•</span>
                    <span
                      ><strong>智慧通行：</strong>全區導入 AI
                      車牌辨識系統，確保物流運輸高效流暢。</span
                    >
                  </li>
                  <li class="pb-2 list-item-row">
                    <span style="flex-shrink: 0">•</span>
                    <span
                      ><strong>智能監管：</strong
                      >數位化中控系統，即時掌控園區每一處安全細節。</span
                    >
                  </li>
                  <li class="pb-2 list-item-row">
                    <span style="flex-shrink: 0">•</span>
                    <span><strong>綠色移動：</strong>配置電動車停車格。</span>
                  </li>
                  <li class="pb-2 list-item-row">
                    <span style="flex-shrink: 0">•</span>
                    <span
                      ><strong>再生電力：</strong
                      >太陽能板設置，邁向能源轉型目標。</span
                    >
                  </li>
                </ul>
              </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-hover v-slot="{ isHovering, props }">
                <v-expansion-panel-title
                  v-bind="props"
                  class="transition-swing"
                >
                  <div
                    :style="{
                      transform: isHovering
                        ? 'translateX(12px)'
                        : 'translateX(0)',
                      transition: 'transform 0.3s ease',
                    }"
                    class="text-title-medium text-md-headline-medium font-weight-bold py-2"
                  >
                    生活機能
                  </div>
                </v-expansion-panel-title>
              </v-hover>
              <v-expansion-panel-text>
                <ul
                  class="text-neutral text-body-large"
                  style="padding-left: 0"
                >
                  <li class="pb-2 list-item-row">
                    <span style="flex-shrink: 0">•</span>
                    <span
                      ><strong>活力食尚：</strong
                      >環境優美員工生活區、閱覽室、運動休閒室。</span
                    >
                  </li>
                  <li class="pb-2 list-item-row">
                    <span style="flex-shrink: 0">•</span>
                    <span
                      ><strong>24H 便利補給：</strong>7-11 超商、智販機。</span
                    >
                  </li>
                  <li class="pb-2 list-item-row">
                    <span style="flex-shrink: 0">•</span>
                    <span><strong>會議室：</strong>多功能會議空間。</span>
                  </li>
                </ul>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-container>
  </section>

  <section style="background: rgb(13, 17, 23); padding: 100px 0">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <div class="text-title-small text-primary text-center mb-6">
            FACILITIES
          </div>
          <div
            class="text-headline-medium text-lg-display-small font-weight-black text-center text-white mb-12"
          >
            園區設施一覽
          </div>

          <div class="embla">
            <div class="embla__viewport" ref="emblaRef">
              <div class="embla__container">
                <div
                  v-for="(facility, index) in facilities"
                  :key="index"
                  class="embla__slide text-white"
                >
                  <div class="d-flex flex-column ga-3">
                    <v-img
                      class="rounded-lg"
                      :src="facility.src"
                      alt=""
                      :aspect-ratio="485 / 354"
                      cover
                    />
                    <div class="text-title-medium font-weight-black">
                      {{ facility.title }}
                    </div>
                    <div class="text-body-medium">
                      {{ facility.description }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex align-center justify-space-between w-100 mt-4">
              <v-btn
                class="embla__nav embla__prev"
                color="white"
                density="comfortable"
                :icon="mdiChevronLeft"
                @click="goToPrev"
              >
              </v-btn>
              <div class="embla__dots">
                <button
                  :class="[
                    'embla__dot',
                    index === selectedSnap ? 'embla__dot--selected' : '',
                  ]"
                  :key="index"
                  v-for="(_, index) in scrollSnaps"
                  @click="goTo(index)"
                >
                  <!-- Button content -->
                </button>
              </div>
              <v-btn
                class="embla__nav embla__next"
                color="white"
                density="comfortable"
                :icon="mdiChevronRight"
                @click="goToNext"
              >
              </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>

  <div id="contact" style="background: rgb(13, 17, 23)">
    <v-container fluid>
      <v-row class="text-center text-md-left">
        <v-divider class="mb-10" color="white" thickness="1"></v-divider>

        <v-col cols="12" md="4" class="pb-4">
          <div class="text-primary text-title-large font-weight-bold mb-3">
            公司資訊
          </div>
          <div class="text-body-large text-grey-lighten-2 mb-1">
            統流開發股份有限公司
          </div>
          <div class="text-body-large text-grey-lighten-2">
            統一編號：83271725
          </div>
          <div class="mt-4">
            <a class="text-link mr-2" href="#">員工入口網站</a>
            <NuxtLink class="text-link" to="/careers">招募專區</NuxtLink>
          </div>
        </v-col>

        <v-col cols="12" md="4" class="pb-4">
          <div class="text-primary text-title-large font-weight-bold mb-3">
            據點位置
          </div>
          <div class="text-body-large text-grey-lighten-2 mb-1">
            744092 臺南市新市區王甲路 11 號
          </div>
          <div class="text-body-large text-grey-lighten-2">
            週一至週五 08:00 - 17:30
          </div>
        </v-col>

        <v-col cols="12" md="4" class="pb-4">
          <div class="text-primary text-title-large font-weight-bold mb-3">
            聯繫電話 / 信箱
          </div>
          <div class="text-body-large text-grey-lighten-2 mb-1">
            +886 6 589-6788
          </div>
          <div class="text-body-large text-grey-lighten-2">
            <span class="text-grey-lighten-1">一般洽詢：</span
            ><span>public@upe.com.tw</span>
          </div>
          <div class="text-body-large text-grey-lighten-2">
            <span class="text-grey-lighten-1">招商洽詢：</span
            ><span>services@upe.com.tw</span>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <div class="text-body-large text-grey text-center text-md-left">
            © 2026 Uni-President Express Corp. ALL RIGHTS RESERVED.
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script setup>
import {
  mdiAccount,
  mdiArrowRight,
  mdiChevronLeft,
  mdiChevronRight,
} from "@mdi/js";
import { ref } from "vue";
import { SITE_NAME, SITE_DESCRIPTION } from "~/data/site";
import useEmblaCarousel from "embla-carousel-vue";
import { useDisplay } from "vuetify";
import Autoplay from "embla-carousel-autoplay";

function openContactForm() {
  if (import.meta.client) {
    window.open(
      "https://forms.gle/L4sU58ekeAYKDa929",
      "_blank",
      "noopener,noreferrer",
    );
  }
}

const pendingAnchor = useState("pendingAnchor", () => "");
onMounted(() => {
  if (pendingAnchor.value) {
    const anchor = pendingAnchor.value;
    pendingAnchor.value = "";
    // 等待頁面完整渲染後再捲動
    setTimeout(() => {
      const el = document.getElementById(anchor);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 300);
  }
});

const scrollSnaps = ref([]);
const selectedSnap = ref(0);
const goTo = (index) => emblaApi.value?.goTo(index);
const setupSnaps = (emblaApi) => (scrollSnaps.value = emblaApi.snapList());
const setActiveSnap = (emblaApi) =>
  (selectedSnap.value = emblaApi.selectedSnap());
const [emblaRef, emblaApi, emblaServerApi] = useEmblaCarousel(
  {
    loop: true,
    align: "start",
  },
  [Autoplay({ delay: 2000 })],
);

watch(
  emblaApi,
  (api) => {
    if (!api) return;

    api.plugins().autoplay.play();
    setupSnaps(api);
    setActiveSnap(api);
    api.on("reinit", setupSnaps);
    api.on("reinit", setActiveSnap);
    api.on("select", setActiveSnap);
  },
  { immediate: true },
);

const selectedFacility = ref(0);

const newsItems = [
  {
    date: "2026.07.02",
    tag: "集團優惠",
    title: "太子建設｜統一集團專屬限時早鳥優惠開跑！",
    to: "/news/n5",
  },
  {
    date: "2026.05.27",
    tag: "園區動態",
    title: "統流物流園區接待企業與學術單位參訪交流",
    to: "/news/n1",
  },
  {
    date: "2026.05.27",
    tag: "建教合作",
    title: "統流推動產學合作 培育物流專業人才",
    to: "/news/n2",
  },
  {
    date: "2026.05.27",
    tag: "園區動態",
    title: "統流持續推動大型複合式物流園區開發",
    to: "/news/n3",
  },
  {
    date: "2026.05.27",
    tag: "招租資訊",
    title: "統流物流園區開放合作夥伴洽詢進駐",
    to: "/news/n4",
  },
];

// ─── 捲動進入動畫狀態（搭配 v-intersect 指令）────────────────────────
const heroReveal = useReveal();
const aboutRow1Reveal = useReveal();
const aboutRow2Reveal = useReveal();
const aboutRow3Reveal = useReveal();
const techReveal = useReveal();
const newsHeadingReveal = useReveal();
const newsItemsVisible = ref(newsItems.map(() => false));
const locHeadingReveal = useReveal();
const locListReveal = useReveal();
const mapReveal = useReveal();
const parkDetailReveal = useReveal();

function onNewsIntersect(isIntersecting, index) {
  if (isIntersecting) newsItemsVisible.value[index] = true;
}
// ─────────────────────────────────────────────────────────────────────

const facilities = [
  {
    title: "太陽能板",
    description: "建置綠能太陽光電設備，實踐節能減碳與永續發展理念。",
    src: "/images/facility-solar-panels.webp",
  },
  {
    title: "國際會議廳",
    description: "配置現代化會議空間，支援多元商務交流與大型活動需求。",
    src: "/images/facility-conference-hall.webp",
  },
  {
    title: "閱覽室",
    description: "打造靜謐閱覽環境，提供員工自主學習與休憩閱讀空間。",
    src: "/images/facility-reading-room.webp",
  },
  {
    title: "教育訓練室",
    description: "設置現代化教育訓練空間，提供專業技能培育與持續學習環境。",
    src: "/images/facility-training-room.webp",
  },
  {
    title: "員工生活區",
    description: "打造寬敞舒適共享餐飲空間，滿足園區員工多元用餐與休憩需求。",
    src: "/images/facility-staff-lounge.webp",
  },
  {
    title: "哺集乳室",
    description: "建置友善育兒空間，營造貼心完善的職場照護環境。",
    src: "/images/facility-nursing-room.webp",
  },
];

const goToPrev = () => emblaApi.value?.goToPrev();
const goToNext = () => emblaApi.value?.goToNext();

const runtimeConfig = useRuntimeConfig();
const siteUrl = runtimeConfig.public.siteUrl?.replace(/\/$/, "") || "";
const homeOgImage = siteUrl
  ? `${siteUrl}/images/hero-aerial.webp`
  : "/images/hero-aerial.webp";

useSeoMeta({
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  ogType: "website",
  ogSiteName: SITE_NAME,
  ogLocale: "zh_TW",
  ogTitle: SITE_NAME,
  ogDescription: SITE_DESCRIPTION,
  ogImage: homeOgImage,
  twitterCard: "summary_large_image",
  twitterTitle: SITE_NAME,
  twitterDescription: SITE_DESCRIPTION,
  twitterImage: homeOgImage,
});

useHead({
  link: [
    {
      rel: "canonical",
      href: siteUrl ? `${siteUrl}/` : "/",
    },
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE_NAME,
        url: siteUrl || "https://www.upe.com.tw/",
        logo: `${siteUrl || "https://www.upe.com.tw"}/images/logo.webp`,
        description: SITE_DESCRIPTION,
        address: {
          "@type": "PostalAddress",
          streetAddress: "王甲路 11 號",
          addressLocality: "新市區",
          addressRegion: "臺南市",
          postalCode: "744092",
          addressCountry: "TW",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+886-6-589-6788",
            contactType: "customer service",
            email: "public@upe.com.tw",
            availableLanguage: "zh-TW",
          },
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: "services@upe.com.tw",
            availableLanguage: "zh-TW",
          },
        ],
      }),
    },
  ],
});

const { smAndDown } = useDisplay();
const slideSize = computed(() => {
  return smAndDown.value ? "50%" : "25%";
});

const parks = [
  {
    name: "桃園航空城物流園區",
    en: "Taoyuan Aerotropolis Logistics Park",
    region: "north",
    city: "taoyuan",
    land: "25,000",
    build: "68,000",
    desc: "座落桃園航空城產專區，鄰近機場捷運坑口站，並串聯國際機場及未來國一甲線。",
    badge: "介紹",
    images: ["/images/park-taoyuan-aerotropolis.webp"],
  },
  {
    name: "桃園U-PARK智匯產業園區",
    en: "Taoyuan Intelligence Synergy Industrial Park",
    region: "north",
    city: "taoyuan",
    land: "33,000",
    build: "68,000",
    desc: "位處桃園產業聚落核心，快速連接國道1號/2號交通路網，鄰近青埔與航空城發展圈。",
    badge: "介紹",
    images: ["/images/park-taoyuan-u-park.webp"],
  },
  {
    name: "桃園楊梅民豐物流園區",
    en: "Taoyuan Yangmei Minfeng Logistics Park",
    region: "north",
    city: "taoyuan",
    land: "7,000",
    build: "20,000",
    desc: "位於桃園楊梅，快速串聯國道1號楊梅交流道。",
    badge: "介紹",
    images: ["/images/park-taoyuan-yangmei-minfeng.webp"],
  },
  {
    name: "台中港物流園區",
    en: "Taichung Port Logistics Park",
    region: "central",
    city: "taichun",
    land: "28,000",
    build: "44,000",
    desc: "位處台中港核心物流專區，鄰近台中港港區及西濱快速道路。",
    badge: "介紹",
    images: ["/images/park-taichung-port.webp"],
  },
  {
    name: "新市物流園區",
    en: "Xinshi Logistics Park",
    region: "south",
    city: "tainan",
    land: "26,000",
    build: "47,000",
    desc: "座落樹谷園區，距南部科學園區 10分鐘車程，並可快速串聯國道8號新市交流道。",
    badge: "介紹",
    images: ["/images/hero-aerial.webp"],
  },
];

const selectedParkIndex = ref(0);

const selectedPark = computed(() => parks[selectedParkIndex.value]);

const replayingCity = ref("");

watch(selectedParkIndex, async (newIndex, oldIndex) => {
  const nextCity = parks[newIndex]?.city;
  const prevCity = parks[oldIndex]?.city;

  if (!nextCity || nextCity !== prevCity) return;

  // 1. 加上 no-transition 並移除 active-city，讓顏色瞬間跳回預設色
  replayingCity.value = nextCity;
  // 2. 等 Vue 更新 DOM
  await nextTick();
  // 3. 雙層 rAF 確保瀏覽器實際繪製完整一幀，再重新加回 active-city（進色 0.35s）
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      replayingCity.value = "";
    });
  });
});

function isCityActive(city) {
  return selectedPark.value.city === city && replayingCity.value !== city;
}

function getFirstParkByCity(city) {
  const index = parks.findIndex((park) => park.city === city);
  if (index !== -1) {
    selectedParkIndex.value = index;
  }
}
</script>
<style scoped>
.v-container {
  max-width: 1200px;
}

.transition-swing {
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.embla {
  /* --slide-size: v-bind(slideSize); */
  --slide-size: 50%;
  --slide-spacing: 12px;
  position: relative;
}

.embla__viewport {
  overflow: hidden;
}

@media (min-width: 840px) {
  .embla {
    --slide-size: 25%;
  }
}

.embla__container {
  display: flex;
  touch-action: pan-y pinch-zoom;
  margin-left: calc(var(--slide-spacing) * -1);
}

.embla__slide {
  flex: 0 0 100%;
  min-width: 0;
}

.embla__slide {
  flex: 0 0 var(--slide-size);
  min-width: 0;
  padding-left: var(--slide-spacing);
}

.embla__dots {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.embla__nav {
  z-index: 2;
}

/* .embla__nav:active {
  transform: translateY(-50%) scale(0.96);
}

.embla__nav:disabled {
  opacity: 0.35;
  cursor: not-allowed;
} */

.embla__dot {
  opacity: 0.5;
}

.embla__dot--selected {
  opacity: 1;
}

:deep(.v-expansion-panel-title:hover > .v-expansion-panel-title__overlay) {
  opacity: 0 !important;
}

.services-panels :deep(.v-expansion-panel) {
  border-bottom: 2px solid rgb(229, 231, 235);
}

.services-panels :deep(.v-expansion-panel:first-child) {
  border-top: 2px solid rgb(229, 231, 235);
}

.list-item-row {
  line-height: 2;
  display: flex;
  gap: 8px;
  align-items: baseline;
}

.news-row {
  border-bottom: 1px solid rgb(229, 231, 235);
  text-decoration: none;
}

.news-row:first-child {
  border-top: 1px solid rgb(229, 231, 235);
}

.floating-hover {
  transition: transform 0.3s ease;
}

.floating-hover:hover {
  transform: translateY(-5px) !important;
  background-color: #1a3e96 !important;
}

.hero-brand {
  bottom: 6%;
  right: 5%;
}

@media (min-width: 840px) {
  .hero-brand {
    line-height: 1.2;
    bottom: 8%;
    right: 6%;
  }
}

.map-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

#taiwan-svg {
  width: 100%;
  height: auto;
  overflow: visible;
  filter: drop-shadow(0 16px 36px rgba(0, 0, 0, 0.07));
  display: block;
  margin: 0 auto;
}

.region-path {
  fill: #9ca3af;
  stroke: #ffffff;
  stroke-width: 1.5;
  stroke-linejoin: round;
  stroke-linecap: round;
  transition:
    fill 0.6s ease,
    opacity 0.4s ease;
}

.region-path.no-transition {
  transition: none !important;
}

.region-path[data-city] {
  cursor: pointer;
}

/* 互動縣市預設顏色 */
.region-path[data-city="taoyuan"] {
  fill: #d291a0;
}

.region-path[data-city="taichun"] {
  fill: #87aac8;
}

.region-path[data-city="tainan"] {
  fill: #9bb9a0;
}

/* 懸停 / 選取狀態顏色 */
.region-path[data-city="taoyuan"].active-city {
  fill: #aa5a6e !important;
  filter: drop-shadow(0 0 5px rgba(170, 90, 110, 0.4));
}

.region-path[data-city="taichun"].active-city {
  fill: #557896 !important;
  filter: drop-shadow(0 0 5px rgba(85, 120, 150, 0.4));
}

.region-path[data-city="tainan"].active-city {
  fill: #69876e !important;
  filter: drop-shadow(0 0 5px rgba(105, 135, 110, 0.4));
}

/* 僅保留 Vuetify 無法直接透過 class 實現的高級動畫過渡 */
.transition-swing {
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

/* ─── 捲動進入動畫 ──────────────────────────────────────────────────── */
/* reveal-up：由下往上淡入 */
.reveal-up {
  opacity: 0;
  transform: translateY(40px);
  transition:
    opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal-up.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* fade-in：純淡入（適用園區詳細資料面板） */
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s ease,
    transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-in.is-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
