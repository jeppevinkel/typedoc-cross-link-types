import {Application, Context, ParameterType, Renderer} from 'typedoc'

export class Definition {
    public package: string
    public name: string
    public url: string

    constructor(module: string, name: string, url: string) {
        this.package = module
        this.name = name
        this.url = url
    }
}

export function load(app: Application) {
    app.options.addDeclaration({
        name: 'cross-package-definitions',
        help: 'Define cross-package definitions',
        type: ParameterType.Array,
        defaultValue: [],
    })

    let definitions: Definition[] = []

    app.renderer.on(Renderer.EVENT_BEGIN, (context: Context) => {
        const definitionArray = app.options.getValue('cross-package-definitions') as string[]

        definitionArray.forEach(definition => {
            const [from, to] = definition.split('=>').map(s => s.trim())
            const [fromPackage, fromModule] = from.split('//')

            definitions.push(new Definition(fromPackage, fromModule, to))
        })

        definitions.forEach(definition => {
            app.renderer.addUnknownSymbolResolver(definition.package, (name: string) => {
                if (name === definition.name) {
                    return definition.url
                }
            })
        })
    })
}