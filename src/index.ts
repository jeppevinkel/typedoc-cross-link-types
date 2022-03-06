import {Application, Context, Converter, ParameterType} from 'typedoc'

export function load(app: Application) {
    app.options.addDeclaration({
        name: 'cross-package-definitions',
        help: 'Define cross-package definitions',
        type: ParameterType.Array,
        defaultValue: [],
    })

    app.converter.on(Converter.EVENT_RESOLVE, (context: Context) => {
        app.logger.info("TEST")
    })

    app.renderer.addUnknownSymbolResolver("@typedoc-cross-link-types", (name: string) => {
        const definitions = app.options.getValue('cross-package-definitions') as string[]

        const definitionMap = new Map<string, string>()

        definitions.forEach(definition => {
            const [from, to] = definition.split(':')
            definitionMap.set(from.trim().toLowerCase(), to.trim())
            app.logger.info(`Added cross-package definition: ${from} -> ${to}`)
        })

        if (definitionMap.has(name.toLowerCase())) {
            app.logger.info(definitionMap.get(name.toLowerCase()) ?? 'WUT???')
            return definitionMap.get(name.toLowerCase())
        }
    })
}