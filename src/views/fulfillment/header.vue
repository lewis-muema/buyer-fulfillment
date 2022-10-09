<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div class="fulfillment-header">
      <div class="fulfillment-header-logo">
        <img
          src="https://assets.website-files.com/5be92ce6e4a547dcc61b976c/60253f92874eabf1a8ecf88f_Logo_SendyMain_Colored_Normal_SVG.svg"
          alt="Sendy logo"
          class="fulfillment-header-sendy-logo"
        />
      </div>
      <div class="fulfillment-header-menu">
        <el-dropdown @command="changeLanguage" class="fulfillment-header-language-menu">
          <span class="el-dropdown-link language-change">
            {{ activeLanguage }}
            <el-icon><ArrowDown /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="en">{{ $t("header.english") }}</el-dropdown-item>
              <el-dropdown-item command="fr">{{ $t("header.french") }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { ArrowDown } from '@element-plus/icons';
import eventsMixin from '../../mixins/events_mixin';

export default {
  name: 'TopHeader',
  components: { ArrowDown },
  mixins: [eventsMixin],
  data() {
    return {
      showLanguageDropdown: false,
      language: '',
    };
  },
  mounted() {
    this.language = localStorage.buyerTimeLocale;
  },
  computed: {
    activeLanguage() {
      if (this.language === 'en-ng') {
        return this.$t('header.englishNg');
      }
      if (this.language === 'fr') {
        return this.$t('header.french');
      }
      return this.$t('header.english');
    },
  },
  methods: {
    changeLanguage(command) {
      // console.log(command);
      this.language = command;
      console.log(this.language);
      window.dispatchEvent(new CustomEvent('language-changed', { detail: this.language }));
      this.sendSegmentEvents({
        event: 'Select_language',
        data: {
          userId: this.$store.getters.getData.data.destination.name,
          language: command,
          // eslint-disable-next-line max-len
          region: this.$store.getters.getData.data.destination.delivery_location.description,
        },
      });
    },
  },
};
</script>

<style>
.el-row {
  padding-top: 15px;
}
.logo {
  margin-right: 65%;
}
.language-change {
  margin-left: 350px;
  font-size: 20px;
}
</style>
