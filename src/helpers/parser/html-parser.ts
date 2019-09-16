/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson (MPL-1.1 OR Apache-2.0 OR GPL-2.0-or-later)
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

export interface ParseHtmlAttr {
  name: string
  value: any
}

export interface ParseHtmlOptions {
  startElement(tagName:string, attrs:Array<ParseHtmlAttr>);
  endElement(tagName:string);
  comment(text:string);
  characters(text:string);
}

const START_TAG_CLOSE:RegExp = /\/\s*>/
const START_TAG_RE:RegExp = /^<([^>\s\/]+)((\s+[^=>\s]+(\s*=\s*((\"[^"]*\")|(\'[^']*\')|[^>\s]+))?)*)\s*\/?\s*>/m
const ATTR_RE:RegExp = /([^=\s]+)(\s*=\s*((\"([^"]*)\")|(\'([^']*)\')|[^>\s]+))?/gm
const END_TAG_RE:RegExp = /^<\/([^>\s]+)[^>]*>/m

export default class ParseHtml {
  options:ParseHtmlOptions;

  constructor(s:string, options:ParseHtmlOptions){
    this.options = options;
    this._parse(s);
  }

  private _parse(s:string){
    let index;
    let treatAsChars = false;
    while (s.length > 0)
    {
      // Comment
      if (s.substring(0, 4) == "<!--")
      {
        index = s.indexOf("-->");
        if (index != -1)
        {
          this.options.comment(s.substring(4, index));
          s = s.substring(index + 3);
          treatAsChars = false;
        }
        else
        {
          treatAsChars = true;
        }
      }
  
      // end tag
      else if (s.substring(0, 2) == "</")
      {
        if (END_TAG_RE.test(s))
        {
          s = s.replace(END_TAG_RE, this.parseEndTag.bind(this));
          treatAsChars = false;
        }
        else
        {
          treatAsChars = true;
        }
      }
      // start tag
      else if (s.charAt(0) == "<")
      {
        if (START_TAG_RE.test(s))
        {
          s = s.replace(START_TAG_RE, this.parseStartTag.bind(this));
          treatAsChars = false;
        }
        else
        {
          treatAsChars = true;
        }
      }
  
      if (treatAsChars)
      {
        index = s.indexOf("<");
        if (index == -1)
        {
            this.options.characters(s);
          s = "";
        }
        else
        {
          this.options.characters(s.substring(0, index));
          s = s.substring(index);
        }
      }
  
      treatAsChars = true;
    }
  }
  
  parseStartTag(sTag:string, sTagName:string, sRest):string {
		const attrs = this.parseAttributes(sTagName, sRest);
    this.options.startElement(sTagName, attrs);
    if(START_TAG_CLOSE.test(sTag)) sTag.replace(START_TAG_RE, this.parseEndTag);
    return ''
	}

	parseEndTag (sTag:string, sTagName:string):string {
    this.options.endElement(sTagName);
    return ''
	}

	parseAttributes (sTagName:string, s):Array<ParseHtmlAttr> {
		const attrs:Array<ParseHtmlAttr> = [];
		s.replace(ATTR_RE, (...arg) => {
			attrs.push(this.parseAttribute.call(this, sTagName, ...arg));
		});
		return attrs;
	}

	parseAttribute (sTagName:string, sAttribute, sName):ParseHtmlAttr {
		var value = "";
		if (arguments[7])
			value = arguments[8];
		else if (arguments[5])
			value = arguments[6];
		else if (arguments[3])
			value = arguments[4];

		var empty = !value && !arguments[3];
		return {name: sName, value: empty ? null : value};
	}
}
