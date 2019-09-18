
import { ASTNode } from './index'

function getAndRemoveAttr(node: ASTNode, name:string){
    let val = node.attrsMap[name];
    if(val != null){
        const list = node.attrsList
        for (let i = 0, l = list.length; i < l; i++) {
            if (list[i].name === name) {
              list.splice(i, 1)
              break
            }
        }
    }
    return val
}

export function processFor(node: ASTNode){
    let exp;
   
}

export function processIf(node: ASTNode){
    let exp;
    if(exp = getAndRemoveAttr(node, 'ref')) node.processMap['ref'] = exp
    if(exp = getAndRemoveAttr(node, 'v-for')) node.processMap['for'] = exp
    if(exp = getAndRemoveAttr(node, 'v-if')) node.processMap['if'] = exp
    else if(exp = getAndRemoveAttr(node, 'v-else-if')) node.processMap['elseif'] = exp
    else if((exp = getAndRemoveAttr(node, 'v-else')) != null) node.processMap['else'] = true
}