import { ASTAttr, ASTNode } from '../render/ast-node';

const FOR_ALIAS_RE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
const FOR_ITERATOR_RE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
const STRIP_PARENS_RE = /^\(|\)$/g;

export interface ForParseResult {
  for: string;
  alias: string;
  iterator1?: string;
  iterator2?: string;
}

export function parseFor(exp: string): ForParseResult {
  const inMatch = exp.match(FOR_ALIAS_RE);
  if (!inMatch) return;
  const res: ForParseResult = { for: '', alias: '' };
  res.for = inMatch[2].trim();
  const alias = inMatch[1].trim().replace(STRIP_PARENS_RE, '');
  const iteratorMatch = alias.match(FOR_ITERATOR_RE);
  if (iteratorMatch) {
    res.alias = alias.replace(FOR_ITERATOR_RE, '').trim();
    res.iterator1 = iteratorMatch[1].trim();
    if (iteratorMatch[2]) {
      res.iterator2 = iteratorMatch[2].trim();
    }
  } else {
    res.alias = alias;
  }
  return res;
}

export function getAndRemoveAttr(node: ASTNode, name: string): any {
  const val = node.attrsMap[name];
  const list = node.attrsList;
  for (let i = 0, l = list.length; i < l; i++) {
    if (list[i].name === name) {
      list.splice(i, 1);
      break;
    }
  }
  return val;
}

export function getAndRemoveAttrByRegex(node: ASTNode, name: RegExp): ASTAttr {
  const list = node.attrsList;
  for (let i = 0, l = list.length; i < l; i++) {
    const attr: ASTAttr = list[i];
    if (name.test(attr.name)) {
      list.splice(i, 1);
      return attr;
    }
  }
}
