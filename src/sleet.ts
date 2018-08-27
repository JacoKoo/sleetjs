import { CompileResult } from './ast'
import { parse } from './parser'
import html from './html'
import { Context } from './context'

export interface SleetOutput {
    code: string
    mapping?: string
    extension?: string
}

export interface SleetPlugin {
    prepare (context: Context): void
    compile (input: CompileResult, options: SleetOptions, context: Context): SleetOutput
}

export interface SleetOptions {
    plugins?: {[name: string]: SleetPlugin}
    defaultPlugin?: string | SleetPlugin
    sourceFile?: string
    newLineToken?: string
    compile? (input: CompileResult, options: SleetOptions): SleetOutput
}

export function compile(input: string, options: SleetOptions): SleetOutput {
    const result = parse(input)
    if (options.compile) {
        return options.compile(result, options)
    }

    let name: string | SleetPlugin = ''
    if (result.declaration) {
        name = result.declaration.name
    }

    if (!name && options.defaultPlugin) name = options.defaultPlugin
    if (name && typeof name === 'string' && options.plugins && options.plugins[name]) {
        name = options.plugins[name]
    }

    if (name && name === 'html') name = html

    if (name && typeof name === 'string') {
        if (name.slice(0, 6) === 'sleet-') name = name.slice(6)
        name = require(name)
    }

    if (!name) name = html
    const context = new Context(options, 0, result.indent, options.newLineToken || '\n')
    const plugin = name as SleetPlugin
    plugin.prepare(context)
    return plugin.compile(result, options, context)
}