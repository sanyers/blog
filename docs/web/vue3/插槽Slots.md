# 插槽 Slots

## 1、默认插槽

组件模板：

```vue
<button class="fancy-btn">
  <slot></slot> <!-- 插槽出口 -->
</button>
```

使用组件：

```vue
<FancyButton>
  Click me! <!-- 插槽内容 -->
</FancyButton>
```

最终渲染：

```vue
<button class="fancy-btn">Click me!</button>
```

## 2、默认内容

在外部没有提供任何内容的情况下，可以为插槽指定默认内容。

```vue
<button type="submit">
  <slot>
    Submit <!-- 默认内容 -->
  </slot>
</button>
```

使用组件：

```vue
<SubmitButton />
```

最终渲染：

```vue
<button type="submit">Submit</button>
```

如果提供了插槽内容：

```vue
<SubmitButton>Save</SubmitButton>
```

那么被显式提供的内容会取代默认内容：

```vue
<button type="submit">Save</button>
```

## 3、具名插槽

给各个插槽分配唯一的 ID，以确定每一处要渲染的内容：

```html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

使用组件：

```html
<BaseLayout>
  <template v-slot:header>
    <!-- header 插槽的内容放这里 -->
  </template>
</BaseLayout>
```

`v-slot` 有对应的简写 `#`，因此 `<template v-slot:header>` 可以简写为 `<template #header>`。其意思就是“将这部分模板片段传入子组件的 header 插槽中”。

完整调用方式：

```html
<BaseLayout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <template #default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</BaseLayout>
```

最终渲染：

```html
<div class="container">
  <header>
    <h1>Here might be a page title</h1>
  </header>
  <main>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </main>
  <footer>
    <p>Here's some contact info</p>
  </footer>
</div>
```

## 4、条件插槽

```html
<template>
  <div class="card">
    <div v-if="$slots.header" class="card-header">
      <slot name="header" />
    </div>

    <div v-if="$slots.default" class="card-content">
      <slot />
    </div>

    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>
```
