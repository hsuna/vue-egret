import { astStrRender } from 'src/helpers/render';

export default function (template: string) {
  return `function(){${astStrRender(template)}}`;
}
