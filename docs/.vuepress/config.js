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
    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: 'hsuna/vue-egret',
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    repoLabel: '查看源码',

    // 以下为可选的编辑链接选项

    // 假如你的文档仓库和项目本身不在一个仓库：
    docsRepo: 'hsuna/vue-egret',
    // 假如文档不是放在仓库的根目录下：
    docsDir: 'docs',
    // 假如文档放在一个特定的分支下：
    docsBranch: 'master',
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: '在 GitHub 上编辑此页',
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
        text: '示例',
        link: '/example/',
      },
      {
        text: '了解更多',
        ariaLabel: '了解更多',
        items: [
          {
            text: '工具',
            items: [
              {
                text: 'vue-egret-loader',
                link: 'https://github.com/hsuna/vue-egret-loader',
              },
            ],
          },
          {
            text: '其他',
            items: [
              {
                text: 'Changelog',
                link: 'https://github.com/vuejs/vuepress/blob/master/CHANGELOG.md',
              },
            ],
          },
        ],
      },
      {
        text: 'Github',
        link: 'https://github.com/hsuna/vue-egret',
      },
    ],
    sidebar: {
      '/guide/': [
        {
          title: '基础',
          collapsable: false,
          children: [
            '',
            'getting-started',
            'instance',
            'syntax',
            'computed',
            'conditional',
            'list',
            'events',
            'components',
          ],
        },
        {
          title: '深入了解组件',
          collapsable: false,
          children: [
            'components-registration',
            'components-props',
            'components-custom-events',
            'components-edge-cases',
          ],
        },
        {
          title: '显示对象',
          collapsable: false,
          children: [
            'tween'
          ],
        },
        {
          title: '可复用性 & 组合',
          collapsable: false,
          children: [
            // 'mixins',
            'custom-directive',
            // 'render-function',
            // 'plugins',
          ],
        },
        {
          title: '工具',
          collapsable: false,
          children: [
            'single-file-components',
            // 'testing',
            // 'typescript',
            // 'deployment',
          ],
        },
        {
          title: '内在',
          collapsable: false,
          children: [
            'reactivity',
          ],
        },
      ],
      '/example/': [
        {
          title: '显示对象基本',
          collapsable: false,
          children: [
            '',
            'disp-anchor-rota-scale',
            'disp-coll',
            'disp-mask',
          ],
        }
      ]
    },
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    // '@vuepress/plugin-back-to-top',
    // '@vuepress/plugin-medium-zoom',
    require('./plugins/demo-block/index.js'),
  ],
};
