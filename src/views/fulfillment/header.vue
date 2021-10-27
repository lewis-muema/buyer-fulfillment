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
        <el-dropdown @command="changeLanguage"
          class="fulfillment-header-language-menu"
        >
            <span class="el-dropdown-link language-change ">
              {{ language === 'en' ? $t('header.english') : $t('header.french') }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="en">{{ $t('header.english') }}</el-dropdown-item>
              <el-dropdown-item command="fr">{{ $t('header.french') }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import eventsMixin from '../../mixins/events_mixin';

export default {
  name: 'Header',
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
  methods: {
    changeLanguage(command) {
      this.language = command;
      window.dispatchEvent(new CustomEvent('language-changed', { detail: this.language }));
      this.sendSegmentEvents({
        event: 'Select Language',
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
