/**
 * 捲動進入動畫組合式功能
 * 搭配 Vuetify v-intersect 指令使用：
 *   v-intersect="{ handler: myReveal.onIntersect, options: { threshold: 0.15 } }"
 *   :class="{ 'is-visible': myReveal.isVisible.value }"
 */
export function useReveal() {
  const isVisible = ref(false)

  function onIntersect(isIntersecting: boolean) {
    if (isIntersecting) {
      isVisible.value = true
    }
  }

  return { isVisible, onIntersect }
}
