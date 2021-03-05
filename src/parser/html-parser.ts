/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson (MPL-1.1 OR Apache-2.0 OR GPL-2.0-or-later)
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

export interface ParseHtmlAttr {
  name: string;
  value: any;
}

export interface ParseHtmlOptions {
  startElement(tagName: string, attrs: Array<ParseHtmlAttr>, unary: boolean);
  endElement(tagName: string);
  comment(text: string);
  characters(text: string);
}

const START_TAG_CLOSE = /\/\s*>/;
const START_TAG_RE = /^<([^>\s\/]+)((\s+[^=>\s]+(\s*=\s*((\"[^"]*\")|(\'[^']*\')|[^>\s]+))?)*)\s*\/?\s*>/m;
const ATTR_RE = /([^=\s]+)(\s*=\s*((\"([^"]*)\")|(\'([^']*)\')|[^>\s]+))?/gm;
const END_TAG_RE = /^<\/([^>\s]+)[^>]*>/m;

export default class ParseHtml {
  options: ParseHtmlOptions;

  constructor(s: string, options: ParseHtmlOptions) {
    this.options = options;
    this._parse(s);
  }

  private _parse(s: string) {
    let index;
    let treatAsChars = false;
    while (s.length > 0) {
      // Comment
      if (s.substring(0, 4) == '<!--') {
        index = s.indexOf('-->');
        if (index != -1) {
          this.options.comment(s.substring(4, index));
          s = s.substring(index + 3);
          treatAsChars = false;
        } else {
          treatAsChars = true;
        }
      }

      // end tag
      else if (s.substring(0, 2) == '</') {
        if (END_TAG_RE.test(s)) {
          s = s.replace(END_TAG_RE, this.parseEndTag.bind(this));
          treatAsChars = false;
        } else {
          treatAsChars = true;
        }
      }
      // start tag
      else if (s.charAt(0) == '<') {
        if (START_TAG_RE.test(s)) {
          s = s.replace(START_TAG_RE, this.parseStartTag.bind(this));
          treatAsChars = false;
        } else {
          treatAsChars = true;
        }
      }

      if (treatAsChars) {
        index = s.indexOf('<');
        if (index == -1) {
          this.options.characters(s);
          s = '';
        } else {
          this.options.characters(s.substring(0, index));
          s = s.substring(index);
        }
      }

      treatAsChars = true;
    }
  }

  parseStartTag(sTag: string, sTagName: string, sRest: string): string {
    const attrs = this.parseAttributes(sTagName, sRest);
    const unary: boolean = START_TAG_CLOSE.test(sTag);
    this.options.startElement(sTagName, attrs, unary);
    return '';
  }

  parseEndTag(sTag: string, sTagName: string): string {
    this.options.endElement(sTagName);
    return '';
  }

  parseAttributes(sTagName: string, sRest: string): Array<ParseHtmlAttr> {
    const attrs: Array<ParseHtmlAttr> = [];
    sRest.replace(ATTR_RE, (...arg): string => {
      const attr: ParseHtmlAttr = this.parseAttribute.call(this, sTagName, ...arg);
      if (attr.name && '/' !== attr.name) attrs.push(attr);
      return '';
    });
    return attrs;
  }

  parseAttribute(sTagName: string, sAttribute, sName): ParseHtmlAttr {
    let value = '';
    if (arguments[7]) value = arguments[8];
    else if (arguments[5]) value = arguments[6];
    else if (arguments[3]) value = arguments[4];

    const empty = !value && !arguments[3];
    return { name: sName, value: empty ? null : value };
  }
}
