import {parser} from "./syntax.grammar"
import {LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside} from "@codemirror/language"
import {styleTags, tags as t} from "@lezer/highlight"

export const C0Language = LRLanguage.define({
  parser: parser.configure({
    props: [
      foldNodeProp.add({
        Scope: foldInside,
        StructScope: foldInside,
      }),
      indentNodeProp.add({
        Scope: context => context.baseIndent + context.unit,
        StructScope: context => context.baseIndent + context.unit
      }),
      styleTags({
        "Type/...": t.typeName,
        "StructScope/Identifier": t.attributeName,
        "FunctionName/...": t.name,
        "Parameter/Identifier": t.variableName,

        Boolean: t.bool,
        String: t.string,
        Number: t.number,
        Char: t.character,

        Comment: t.lineComment,
        CommentBlock: t.blockComment,

        "return": t.controlKeyword,
        "if": t.controlKeyword,
        "else": t.controlKeyword,
        "while": t.controlKeyword,
        "for": t.controlKeyword,

        "LibraryImport/...": t.moduleKeyword,

        "alloc": t.keyword,
        "alloc_array": t.keyword,
        "assert": t.keyword,
        "typedef": t.keyword,
        "loop_invariant": t.keyword,
        "requires": t.keyword,
        "ensures": t.keyword,

        "NULL": t.null,

        ContractBlock: t.annotation,
        ContractLine: t.annotation,

        "(": t.paren,
        ")": t.paren,

        Add: t.arithmeticOperator,
        Min: t.arithmeticOperator,
        Mul: t.arithmeticOperator,
        Div: t.arithmeticOperator,
        Mod: t.arithmeticOperator,
        AddEq: t.arithmeticOperator,
        MinEq: t.arithmeticOperator,
        MulEq: t.arithmeticOperator,
        DivEq: t.arithmeticOperator,
        ModEq: t.arithmeticOperator,
        Incr: t.arithmeticOperator,
        Decr: t.arithmeticOperator,

        BitNot: t.bitwiseOperator,
        BitXor: t.bitwiseOperator,
        BitOr: t.bitwiseOperator,
        BitAnd: t.bitwiseOperator,
        Lsh:t.bitwiseOperator,
        Rsh:t.bitwiseOperator,

        LogNot: t.logicOperator,
        LogAnd: t.logicOperator,
        LogOr: t.logicOperator,
        LogEq: t.logicOperator,
        LogNeq: t.logicOperator,

        Ge: t.compareOperator,
        Le: t.compareOperator,
        Gt: t.compareOperator,
        Lt: t.compareOperator,

        Field: t.derefOperator,
      }),
    ]
  })
})

export function C0() {
  return new LanguageSupport(C0Language)
}
