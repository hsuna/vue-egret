import { CommandBase } from './index'

export const FOR_ALIAS_RE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/
export const FOR_ITERATOR_RE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/
export class CommandFor extends CommandBase{
    static REG:RegExp = /^(v-for)/

    implement() {
        this.sp[this.name] = this.generate(this.expOrFn)
    }

    /* parseFor (exp: string): ?ForParseResult {
        const inMatch = exp.match(FOR_ALIAS_RE)
        if (!inMatch) return
        const res = {}
        res.for = inMatch[2].trim()
        const alias = inMatch[1].trim().replace(stripParensRE, '')
        const iteratorMatch = alias.match(FOR_ITERATOR_RE)
        if (iteratorMatch) {
          res.alias = alias.replace(FOR_ITERATOR_RE, '').trim()
          res.iterator1 = iteratorMatch[1].trim()
          if (iteratorMatch[2]) {
            res.iterator2 = iteratorMatch[2].trim()
          }
        } else {
          res.alias = alias
        }
        return res
    } */
}