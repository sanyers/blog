# 创建 vue 脚手架

## 1、初始化脚手架

### 1.1 创建目录

```
mkdir node-clis
cd node-clis
```

### 1.2 创建 package.json 文件

```
npm init -y
```

### 1.3 安装 fs-extra

```
pnpm i fs-extra
```

## 2、编写脚手架代码

在根目录下创建 index.js

```js
#!/usr/bin/env node
// 头部必须加，用于指明这个脚本文件的解释程序，增加这一行是为了指定用node执行脚本文件

const path = require('path')
const fs = require('fs-extra')
const pkg = require('./package.json')

// 获取命令行用户输入的参数
let argvList = []
const argvs = process.argv
if (argvs.length > 2) {
  argvList = argvs.slice(2, argvs.length)
}

if (argvList[0]) {
  const first = argvList[0].toLowerCase()
  if (first === '-v') {
    console.log(pkg.version) // 显示版本
  } else {
    init(first).catch(e => {
      console.error(e)
    })
  }
}

async function init(name) {
  const tempName = argvList[1] || 'template-vue-ts'
  const tmplDir = path.join(__dirname, tempName) // 模板的路径
  const destDir = process.cwd() // 目标路径
  const root = path.join(destDir, name)

  await fs.ensureDir(root)
  const existing = await fs.readdir(root)
  if (existing.length) {
    console.error(`Error: target directory is not empty.`)
    process.exit(1)
  }

  const files = await fs.readdir(tmplDir)
  for (const file of files.filter(f => f !== 'package.json')) {
    await fs.copy(path.join(tmplDir, file), path.join(root, file))
  }

  const pkg = require(path.join(tmplDir, `package.json`))
  pkg.name = path.basename(root)
  await fs.writeFile(
    path.join(root, 'package.json'),
    JSON.stringify(pkg, null, 2),
  )

  console.log(`\nDone. Now run:\n`)
  if (root !== destDir) {
    console.log(`  cd ${path.relative(destDir, root)}`)
  }
  console.log(`  pnpm install (or \`yarn\`)`)
  console.log(`  pnpm run dev (or \`yarn dev\`)`)
  console.log()
}
```

## 3、创建模板目录

`template-vue-ts`，将项目需要的模板文件都放入该文件夹。

## 4、配置 package.json

添加 `bin` 选项，配置脚手架入口 `"node-clis": "index.js"`

```json
{
  "name": "node-clis",
  "version": "0.0.1",
  "description": "",
  "main": "index.js",
  "bin": {
    "node-clis": "index.js"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "fs-extra": "^11.1.0"
  }
}

```

## 5、把脚手架链到全局

```
npm link
```

## 6、运行脚手架命令

```
node-clis -v
0.0.1

node-clis [your project name] [template name]
```