const fs = require("fs")
const path = require("path")

const name = 'mock'
const formalName = name.slice(0, 1).toUpperCase() + name.slice(1)

const apiPath = path.resolve(__dirname, '../src/api')
if (fs.existsSync(apiPath + '/' + name)) {
    console.log('模块已存在')
    process.exit(1)
}
fs.mkdirSync(apiPath + '/' + name, { recursive: true })

const controller = `import { Controller, Get } from "@nestjs/common";
import { ${formalName}Service } from "./${name}.service";

@Controller('${name}')
export class ${formalName}Controller {
    constructor(
        private readonly ${name}Service: ${formalName}Service
    ) { }

    @Get()
    private test() {
        return this.${name}Service.test()
    }
}
`

fs.writeFileSync(`${apiPath}/${name}/${name}.controller.ts`, controller, 'utf-8')

const service = `import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class ${formalName}Service {
    private readonly logger = new Logger(${formalName}Service.name)

    constructor(
    ) { }

    public test() {
        return 'test ${name}'
    }
}`

fs.writeFileSync(`${apiPath}/${name}/${name}.service.ts`, service, 'utf-8')


const modules = `import { Module } from "@nestjs/common";
import { ${formalName}Controller } from "./${name}.controller";
import { ${formalName}Service } from "./${name}.service";


@Module({
    imports: [],
    controllers: [${formalName}Controller],
    providers: [${formalName}Service]
})
export default class ${formalName}Module { }`

fs.writeFileSync(`${apiPath}/${name}/${name}.module.ts`, modules, 'utf-8')
