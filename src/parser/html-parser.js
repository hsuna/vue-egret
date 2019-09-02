/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson (MPL-1.1 OR Apache-2.0 OR GPL-2.0-or-later)
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

const startTagRe = /^<([^>\s\/]+)((\s+[^=>\s]+(\s*=\s*((\"[^"]*\")|(\'[^']*\')|[^>\s]+))?)*)\s*\/?\s*>/m
const startTagClose = /\/\s*>/
const endTagRe = /^<\/([^>\s]+)[^>]*>/m
const attrRe = /([^=\s]+)(\s*=\s*((\"([^"]*)\")|(\'([^']*)\')|[^>\s]+))?/gm

export function parseHTML (s, oHandler) {
  let contentHandler;
  if (oHandler) contentHandler = oHandler;

  var i = 0;
  var res, lc, lm, rc, index;
  var treatAsChars = false;
  while (s.length > 0)
  {
    // Comment
    if (s.substring(0, 4) == "<!--")
    {
      index = s.indexOf("-->");
      if (index != -1)
      {
        contentHandler.comment(s.substring(4, index));
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
      if (endTagRe.test(s))
      {
        lc = RegExp.leftContext;
        lm = RegExp.lastMatch;
        rc = RegExp.rightContext;

        lm.replace(endTagRe, parseEndTag);

        s = rc;
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
      if (startTagRe.test(s))
      {
        lc = RegExp.leftContext;
        lm = RegExp.lastMatch;
        rc = RegExp.rightContext;

        lm.replace(startTagRe, parseStartTag);
        
        if(startTagClose.test(lm)){
          lm.replace(startTagRe, parseEndTag);
        }

        s = rc;
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
          contentHandler.characters(s);
        s = "";
      }
      else
      {
        contentHandler.characters(s.substring(0, index));
        s = s.substring(index);
      }
    }

    treatAsChars = true;
  }

  function advance (n) {
    index += n
    html = html.substring(n)
  }

  function parseStartTag (sTag, sTagName, sRest) {
		var attrs = parseAttributes(sTagName, sRest);
		contentHandler.startElement(sTagName, attrs);
	}

	function parseEndTag (sTag, sTagName) {
		contentHandler.endElement(sTagName);
	}

	function parseAttributes (sTagName, s) {
		var attrs = [];
		s.replace(attrRe, function (...arg){
			attrs.push(parseAttribute(sTagName, ...arg));
		});
		return attrs;
	}

	function parseAttribute (sTagName, sAttribute, sName) {
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
