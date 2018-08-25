export interface Location {
    start: {offset: number, line: number, column: number}
    end: {offset: number, line: number, column: number}
}

export enum NodeType {
    Declaration, Tag, TagExtra, AttributeGroup, Attribute, Setting,
    StringValue, BooleanValue, NumberValue, NullValue, IdentifierValue, CompareOperator,
    Transformer, TransformValue,
    Helper, HelperAttribute,
    StaticText, DynamicText
}

class SleetNode {
    protected _location: Location
    private _type: NodeType

    constructor(type: NodeType, location: Location) {
        this._type = type
        this._location = location
    }

    get type () {
        return this._type
    }

    get location () {
        return this._location
    }
}

class NamedNode extends SleetNode {
    private _name: string

    constructor (name: string, type: NodeType, location: Location) {
        super(type, location)
        this._name = name
    }

    get name () {
        return this._name
    }
}

class NullableNamedNode extends NamedNode {
    get name (): string | null {
        return super.name
    }
}

class SleetValue<T> extends SleetNode {
    protected _value: T

    constructor(value: T, type: NodeType, location: Location) {
        super(type, location)
        this._value = value
    }

    get value () {
        return this._value
    }
}

export class StringValue extends SleetValue<string> {
    constructor(value: string, location: Location) {
        super(value, NodeType.StringValue, location)
    }
}

export class BooleanValue extends SleetValue<boolean> {
    constructor(value: boolean, location: Location) {
        super(value, NodeType.BooleanValue, location)
    }
}

export class NumberValue extends SleetValue<number> {
    constructor(value: number, location: Location) {
        super(value, NodeType.NumberValue, location)
    }
}

export class NullValue extends SleetValue<void> {
    constructor(location: Location) {
        super(null, NodeType.NullValue, location)
    }
}

export class IdentifierValue extends SleetValue<string> {
    constructor(value: string, location: Location) {
        super(value, NodeType.IdentifierValue, location)
    }
}

export type NormalValue = NumberValue | BooleanValue | StringValue | NullValue | IdentifierValue

export type CompareOperator = '==' | '>=' | '<=' | '>' | '<' | '!='
export class CompareOperatorValue extends SleetValue<CompareOperator> {
    constructor(value: CompareOperator, location: Location) {
        super(value, NodeType.CompareOperator, location)
    }
}

export class Transformer extends NamedNode {
    private _params: NormalValue[]

    constructor(name: string, params: NormalValue[], location: Location) {
        super(name, NodeType.Transformer, location)
        this._params = params || []
    }

    get params () {
        return this._params
    }
}

export class TransformValue extends SleetValue<NormalValue> {
    private _transformers: (Transformer | NormalValue)[]

    constructor(value: NormalValue, transformers: (Transformer | NormalValue)[], location: Location) {
        super(value, NodeType.TransformValue, location)
        this._transformers = transformers || []
    }

    get transformers () {
        return this._transformers
    }
}

export type HelperValue = NormalValue | CompareOperatorValue | TransformValue

export class HelperAttribute extends NullableNamedNode {
    private _value: HelperValue

    constructor(name: string, value: HelperValue, location: Location) {
        super(name, NodeType.HelperAttribute, location)
        this._value = value
    }

    get value () {
        return this._value
    }
}

export class Helper extends NullableNamedNode {
    private _attributes: HelperAttribute[]

    constructor(name: string, attributes: HelperAttribute[], location: Location) {
        super(name, NodeType.Helper, location)
        this._attributes = attributes || []
    }

    get attributes () {
        return this._attributes
    }
}

export class StaticText extends SleetValue<string> {
    constructor(value: string, location: Location) {
        super(value, NodeType.StaticText, location)
    }

    _merge (text: StaticText) {
        const o = {start: this._location.start, end: text._location.end}
        this._value += text._value
        this._location = o
    }
}

export type DynamicTextValue = IdentifierValue | Helper

export class DynamicText extends SleetValue<DynamicTextValue> {
    constructor(value: DynamicTextValue, location: Location) {
        super(value, NodeType.DynamicText, location)
    }
}

export type SleetText = StaticText | DynamicText

export type AttributeValue = NormalValue | Helper

export class Attribute extends NullableNamedNode {
    private _values: AttributeValue[]
    private _namespace?: string

    constructor(ns: string, name: string, values: AttributeValue[], location: Location) {
        super(name, NodeType.Attribute, location)
        this._values = values || []
        this._namespace = ns
    }

    get values () {
        return this._values
    }

    get namespace () {
        return this._namespace
    }
}

export class Setting extends NamedNode {
    private _attributes: Attribute[]

    constructor(name: string, attributes: Attribute[], location: Location) {
        super(name, NodeType.Setting, location)
        this._attributes = attributes || []
    }

    get attributes () {
        return this._attributes
    }
}

export class AttributeGroup extends SleetNode {
    private _setting?: Setting
    private _attributes: Attribute[]

    constructor(attributes: Attribute[], setting: Setting, location: Location) {
        super(NodeType.AttributeGroup, location)
        this._setting = setting
        this._attributes = attributes || []
    }

    get attributes () {
        return this._attributes
    }

    get setting () {
        return this._setting
    }

    _merge (other: AttributeGroup) {
        if (other._setting || this._setting) return false
        const o = {start: this._location.start, end: other._location.end}
        this._attributes = this._attributes.concat(other._attributes)
        this._location = o
        return true
    }
}

export type ExtraValue = NormalValue | CompareOperatorValue

export class TagExtra extends NamedNode {
    private _values: ExtraValue[]

    constructor(name: string, values: ExtraValue[], location: Location) {
        super(name, NodeType.TagExtra, location)
        this._values = values || []
    }

    get values () {
        return this._values
    }
}

export class Tag extends NullableNamedNode {
    private _namespace?: string
    private _dots: string[]
    private _hash?: string
    private _indent: number

    private _children: Tag[] = []
    private _inlineChar?: string
    private _inlines: Tag[] = []

    private _attributeGroups: AttributeGroup[]
    private _extra?: TagExtra

    private _parent?: Tag
    private _text: SleetText[] = []

    constructor (
        indent: number, name: string, ns: string, dots: string[], hash: string,
        groups: AttributeGroup[], extra: TagExtra, location: Location
    ) {
        super(name, NodeType.Tag, location)
        this._indent = indent
        this._namespace = ns
        this._dots = dots || []
        this._hash = hash
        this._extra = extra

        this._setGroup(groups)
    }

    get indent () { return this._indent }
    get dots () { return this._dots }
    get hash () { return this._hash }
    get namespace () { return this._namespace }
    get children () { return this._children }
    get inlineChar () { return this._inlineChar }
    get inlines () { return this._inlines }
    get attributeGroups () { return this._attributeGroups }
    get extra () { return this._extra }
    get parent () { return this._parent }
    get text () { return this._text }

    _setInlineChar (char: string) { this._inlineChar = char }

    _setChildren (children: Tag[]) {
        if (children.length === 1 && children[0].inlineChar) {
            const child = children[0]
            this._inlines = child.inlines.concat(children)
            child._inlines = []
            return
        }

        this._children = children
    }

    _setText (text: SleetText[]) {
        this._text = text.reduce((acc, item) => {
            if (!acc.length) return [item]
            if (item.type === NodeType.DynamicText) return acc.concat(item)
            const last = acc[acc.length - 1]
            if (item.type === NodeType.StaticText && last.type === NodeType.StaticText) {
                (last as StaticText)._merge(item as StaticText)
                return acc
            }

            return acc.concat(item)
        }, [] as SleetText[])
    }

    private _setGroup (groups: AttributeGroup[] = []) {
        this._attributeGroups = groups.reduce((acc, item) => {
            if (!acc.length) return [item]
            if (acc[acc.length - 1]._merge(item)) return acc
            return acc.concat(item)
        }, [] as AttributeGroup[])
    }
}

export class Declaration extends NamedNode {
    private _options: {[key: string]: string} = {}
    private _extension: string

    constructor (name: string, ext: string, pair: {key: string, value: string}[], location: Location) {
        super(name, NodeType.Declaration, location)
        this._extension = ext
        pair.forEach(it => this._options[it.key] = it.value)
    }

    get extension () {
        return this._extension;
    }

    option (key) {
        return this._options[key];
    }
}

export interface CompileResult {
    nodes: Tag[]
    indent: string
    declaration: Declaration
}
