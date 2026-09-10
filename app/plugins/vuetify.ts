import { aliases, mdi } from "vuetify/iconsets/mdi-svg";

import "vuetify/styles";
import { createVuetify } from "vuetify";

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
    icons: {
      defaultSet: "mdi",
      aliases,
      sets: {
        mdi,
      },
    },
    // ... your configuration
    theme: {
      defaultTheme: 'light', 
      themes: {
        light: {
          colors: {
            primary: "#E8622A",
            secondary: "#30327bf7",
            neutral: "#64748B",
            link: "#AACCFF",
          },
        },
      },
    },
  });
  app.vueApp.use(vuetify);
});
