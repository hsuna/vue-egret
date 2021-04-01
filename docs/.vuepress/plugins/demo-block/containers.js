const mdContainer = require('markdown-it-container');

module.exports = (options) => {
  const { component = 'demo-block' } = options;
  const componentName = component
    .replace(/^\S/, (s) => s.toLowerCase())
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase();
  return (md) => {
    md.use(mdContainer, 'demo', {
      validate(params) {
        return params.trim().match(/^demo\s*(.*)$/);
      },
      render(tokens, idx) {
        if (tokens[idx].nesting === 1) {  
          const m = tokens[idx].info.trim().match(/^demo:([\S]*)/);
          const description = m && m.length > 1 ? m[1] : '';
          const content = tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : '';
          return `<${componentName} v-bind="render${idx}">
            <!--pre-render-demo:${JSON.stringify({
              idx,
              description,
              content,
            })}:pre-render-demo-->
            <template slot="source">
          `;
        }
        return `</template></${componentName}>`;
      },
    });
  };
};
