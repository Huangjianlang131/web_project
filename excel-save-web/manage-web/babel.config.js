let transformRemoveConsolePlugin = []
if (process.env.NODE_ENV === 'production') {
  transformRemoveConsolePlugin = ['transform-remove-console']
}

module.exports = {
  presets: [
    ['@vue/app', {
        useBuiltIns: 'entry'
    }]
  ],
  plugins: [
    [
      'import',
      {
        'libraryName': 'ant-design-vue',
        'libraryDirectory': 'es',
        'style': 'css'
      }
    ],
    'jsx-v-model',
    ...transformRemoveConsolePlugin // 生产环境去除console
  ]
}
