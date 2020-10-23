import "material-design-icons-iconfont/dist/material-design-icons.css"; // Ensure you are using css-loader
import "@fortawesome/fontawesome-free/css/all.css"; // Ensure you are using css-loader
import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "md" || "fa"
  },
  theme: {
    themes: {
      light: {
        background: colors.grey.lighten2
      },
      dark: {
        background: colors.shades.white
      }
    }
  }
  // themes: {
  //   light: {
  //     background: colors.grey.lighten2
  //   },
  //   dark: {
  //     background: colors.shades.white
  //   }
  // }
});
