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
        text: '工具',
        link: '/tools/',
      },
      {
        text: 'Github',
        link: 'https://github.com/hsuna/vue-egret',
      },
    ],
    sidebar: {
      '/guide/': [
        {
          title: '指南',
          collapsable: false,
          children: ['main'],
        },
        {
          title: '深入',
          collapsable: false,
          children: ['deep'],
        },
      ],
    },
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: ['@vuepress/plugin-back-to-top', '@vuepress/plugin-medium-zoom'],
};
