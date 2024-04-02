# Express 中 app.all()和 app.use()的区别

```js
//all路径匹配是精确匹配，只能和参数1中的路径一致才进行匹配
app.all('/api', (req, res) => {
  res.send(`Api接口文档---` + req.method);
});

// 模糊匹配，参数1的意思，请求pathname以/api开头的则匹配成功
// use正是因为这样的特性，所以可以用来拦截请求(中间件)
app.use('/api', (req, res) => {
  res.send(`Api接口文档---` + req.method);
});

// 可以用use/all来实现访问页面404处理
// 上面所有的请求如果都没有匹配成功，则*全部匹配成功
app.all('*', (req, res) => {
  res.send('404');
});

// 参数1不写，表示所有的请求动作和路径我都能匹配成功
app.use((req, res) => {
  res.send('404');
});
```
