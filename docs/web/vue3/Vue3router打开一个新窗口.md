# Vue3router打开一个新窗口

```ts
const router = useRouter()

const url = router.resolve({
  path: '/home',
  query: {
    userId: '12345'
  }
})
 window.open(url.href, '_blank')
```