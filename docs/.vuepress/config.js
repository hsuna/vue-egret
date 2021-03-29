module.exports = {
  base: '/vue-egret/',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'VueEgret',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: '关于Egret引擎的Vue框架',
  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['link', { rel: 'icon', href: '/img/logo.png' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      {
        text: '指南',
        link: '/guide/',
      },
      {
        text: 'API',
        link: '/api/',
      },
      {
        text: '组件',
        link: '/api/',
      },
      {
        text: 'Github',
        link: 'https://github.com/hsuna/vue-egret',
      },
    ],
    sidebar: {
      '/guide/': [
        {
          title: '',
          collapsable: false,
        },
        {
          title: '使用文档',
          collapsable: false,
        },
      ],
    },
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: ['@vuepress/plugin-back-to-top', '@vuepress/plugin-medium-zoom'],
};
