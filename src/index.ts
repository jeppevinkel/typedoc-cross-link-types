import {Application, ParameterType} from 'typedoc'

// declare module 'typedoc' {
//     export interface TypeDocOptionMap {
//         crossPackageDefinitions: Map<string, string>
//     }
// }

export function load(app: Application) {
    // app.options.addDeclaration({
    //     name: 'crossPackageDefinitions',
    //     help: 'Define cross-package definitions',
    //     type: ParameterType.Map,
    //     defaultValue: new Map<string, string>(),
    //     map: {
    //         crossPackageDefinitions: 'crossPackageDefinitions'
    //     }
    // })

    app.options.addDeclaration({
        name: 'crossPackageDefinitions',
        help: 'Define cross-package definitions',
        type: ParameterType.Array,
        defaultValue: [],
    })

    app.renderer.addUnknownSymbolResolver("@typedoc-cross-link-types", (name: string) => {
        const definitions = app.options.getValue('crossPackageDefinitions') as string[]

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