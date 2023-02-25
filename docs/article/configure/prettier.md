# prettier

[官网](https://prettier.io/)

## 常用配置

```js
// https://prettier.io/docs/en/options.html
module.exports = {
  tabWidth: 2, // 指定每个缩进级别的空格数
  semi: true, // 在语句末尾打印分号
  singleQuote: true, // 使用单引号代替双引号
  trailingComma: 'all', // 在多行逗号分隔的句法结构中尽可能打印尾随逗号，<es5|none|all>
  bracketSpacing: true, // 在对象文字中的括号之间打印空格
  bracketSameLine: true, // 将 > 多行 HTML（HTML、JSX、Vue、Angular）元素的 放在最后一行的末尾，而不是单独放在下一行
  arrowParens: 'avoid', // 在唯一的箭头函数参数周围尽可能省略括号 <always|avoid> avoid 尽可能省略
  endOfLine: 'auto', // 行结束，<lf|crlf|cr|auto>
};
```

## 其他配置

- `printWidth` 打印宽度。默认 `80`
- `useTabs` 使用制表符而不是空格缩进行。默认 `false`
- `quoteProps` 更改对象中的属性被引号的时间。默认 `as-needed`
  - `as-needed` - 仅在需要时在对象属性周围添加引号。
  - `consistent` - 如果对象中至少有一个属性需要引号，则引用所有属性。
  - `preserve` - 尊重对象属性中引号的输入使用。
- `jsxSingleQuote` 在 JSX 中使用单引号而不是双引号。默认 `false`
- `rangeStart` 仅格式化文件的一个片段。向后到包含所选语句的第一行的开头。配合 `rangeEnd`一起使用。默认 `0`
- `rangeEnd` 转发到所选语句的末尾。
- `parser` 指定要使用的分析器。Prettier 会自动从输入文件路径推断解析器
- `filepath` 指定用于推断要使用的分析器的文件名。此选项仅在 CLI 和 API 中有用。在配置文件中使用它没有意义。
- `requirePragma` Prettier 可以将自身限制为仅格式化文件顶部包含特殊注释（称为杂注）的文件。这在逐渐将大型、无格式的代码库转换为 Prettier 时非常有用。默认 `false`
- `vueIndentScriptAndStyle` 是否缩进 Vue 文件中的代码和标签。默认 `false`
- `singleAttributePerLine` 在 HTML、Vue 和 JSX 中每行强制使用单个属性。默认 `false`