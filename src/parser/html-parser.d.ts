export interface ParseHtmlAttr {
    name: string;
    value: any;
}
export interface ParseHtmlOptions {
    startElement(tagName: string, attrs: Array<ParseHtmlAttr>, unary: boolean): any;
    endElement(tagName: string): any;
    comment(text: string): any;
    characters(text: string): any;
}
export default class ParseHtml {
    options: ParseHtmlOptions;
    constructor(s: string, options: ParseHtmlOptions);
    private _parse;
    parseStartTag(sTag: string, sTagName: string, sRest: any): string;
    parseEndTag(sTag: string, sTagName: string): string;
    parseAttributes(sTagName: string, s: any): Array<ParseHtmlAttr>;
    parseAttribute(sTagName: string, sAttribute: any, sName: any): ParseHtmlAttr;
}
