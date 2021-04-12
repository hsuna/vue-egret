const parseDescription = (desc) =>
  desc.split('&').reduce((obj, str) => {
    const [k, v] = str.split('=');
    obj[k] = v;
    return obj;
  }, {});

module.exports = function (content) {
  if (!content) {
    return content;
  }

  const startTag = '<!--pre-render-demo:';
  const startTagLen = startTag.length;
  const endTag = ':pre-render-demo-->';
  const endTagLen = endTag.length;

  let templateArr = [];
  let codes = {};
  let start = 0; // 字符串开始位置
  let commentStart = content.indexOf(startTag);
  let commentEnd = content.indexOf(endTag, commentStart + startTagLen);
  while (commentStart !== -1 && commentEnd !== -1) {
    templateArr.push(content.slice(start, commentStart));

    const commentContent = content.slice(commentStart + startTagLen, commentEnd);
    const { idx, description, content:code } = JSON.parse(commentContent);
    codes[`render${idx}`] = {
      ...parseDescription(description),
      code,
    };

    start = commentEnd + endTagLen;
    commentStart = content.indexOf(startTag, start);
    commentEnd = content.indexOf(endTag, commentStart + startTagLen);
  }
  templateArr.push(content.slice(start));
  return {
    template: templateArr.join(''),
    script: `<script>
      export default {
        name: 'component-doc',
        data() {
          return ${JSON.stringify(codes)}
        }
      };
    </script>`,
  };
};
