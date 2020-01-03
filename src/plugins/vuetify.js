import Vue from "vue";
import Vuetify, {
  VApp,
  VContent,
  VContainer,
  VCard,
  VDivider,
  VList,
  VListItem,
  VListItemContent,
  VListItemSubtitle,
  VListItemTitle,
  VBtn,
  VIcon,
  VTextField,
  VMenu,
  VAlert,
  VProgressCircular,
  VDatePicker
} from "vuetify/lib";

Vue.use(Vuetify, {
  components: {
    VApp,
    VContent,
    VContainer,
    VDivider,
    VCard,
    VList,
    VListItem,
    VListItemContent,
    VListItemSubtitle,
    VListItemTitle,
    VBtn,
    VIcon,
    VTextField,
    VMenu,
    VAlert,
    VProgressCircular,
    VDatePicker
  }
});

const opts = {
  icons: {
    iconfont: "md" // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4'
  },
  theme: {
    dark: false
  },
  themes: {
    light: {
      primary: "#4682b4",
      secondary: "#b0bec5",
      accent: "#8c9eff",
      error: "#b71c1c"
    }
  }
};

export default new Vuetify(opts);
