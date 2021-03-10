import { astStrRender } from 'src/helpers/render';

export default function (template) {
  return `function(){${astStrRender(template)}}`;
}
