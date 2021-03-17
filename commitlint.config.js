// eslint-disable-next-line no-undef
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 一个新功能
        'fix', // 一个bug修复
        'build', // 影响构建系统或外部依赖的更改(示例范围:gulp, broccoli, npm)
        'ci', // 对ci配置文件和脚本的更改(示例范围:Travis, Circle, BrowserStack, SauceLabs)
        'refactor', // 既不修复bug也不增加特性的代码更改
        'perf', // 提高性能的代码更改
        'chore', // 其他不修改src或测试文件的更改
        'docs', // 仅更改文档
        'revert', // 恢复前一个提交
        'test', // 添加缺失的测试或纠正现有的测试
        'style', // 不影响代码含义的更改(空白、格式、缺少分号等)
      ],
    ],
    // 'subject-case': [0]
  },
};
