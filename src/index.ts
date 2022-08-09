import {parser} from "./syntax.grammar"
import {LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside} from "@codemirror/language"
import {styleTags, tags as t} from "@lezer/highlight"

export const C0Language = LRLanguage.define({
  parser: parser.configure({
    props: [
      foldNodeProp.add({
        Scope: foldInside
      }),
      indentNodeProp.add({
        Scope: context => context.baseIndent + context.unit
      }),
      styleTags({
        Identifier: t.variableName,
        Type: t.typeName,
        DeclareType: t.typeName,

        Boolean: t.bool,
        String: t.string,
        Number: t.number,
        Char: t.character,

        LineComment: t.comment,
        BlockComment: t.comment,

        "return": t.controlKeyword,
        "if": t.controlKeyword,
        "else": t.controlKeyword,
        "while": t.controlKeyword,
        "for": t.controlKeyword,
        "alloc": t.keyword,
        "alloc_array": t.keyword,
        "#use": t.keyword,

        "assert": t.keyword,
        "loop_invariant": t.keyword,
        "requires": t.keyword,
        "ensures": t.keyword,

        ContractBlock: t.annotation,
        ContractLine: t.annotation,

        "(": t.paren,
        ")": t.paren,
        "[": t.paren,
        "]": t.paren,

        // "+": t.arithmeticOperator,
        // "-": t.arithmeticOperator,
        // "*": t.arithmeticOperator,
        // "/": t.arithmeticOperator,
        // "%": t.arithmeticOperator,
        // "+=": t.arithmeticOperator,
        // "-=": t.arithmeticOperator,
        // "*=": t.arithmeticOperator,
        // "/=": t.arithmeticOperator,
        // "%=": t.arithmeticOperator,
        // "++": t.arithmeticOperator,
        // "--": t.arithmeticOperator,

        // "~": t.bitwiseOperator,
        // "^": t.bitwiseOperator,
        // "|": t.bitwiseOperator,
        // "&": t.bitwiseOperator,
        // "<<":t.bitwiseOperator,
        // ">>":t.bitwiseOperator,

        // "!": t.logicOperator,
        // "&&": t.logicOperator,
        // "||": t.logicOperator,
        // "==": t.logicOperator,
        // "!=": t.logicOperator,

        ">=": t.compareOperator,
        "<=": t.compareOperator,
        ">": t.compareOperator,
        "<": t.compareOperator,

        "->": t.derefOperator,
      }),
    ]
  })
})

export function C0() {
  return new LanguageSupport(C0Language)
}
