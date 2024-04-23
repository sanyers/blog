# 表格 table 边框 border 的三种办法

默认双边框

```css
table {
  width: 400px;
}

table,
table td,
table th {
  border: 1px solid #000;
}
```

方法一：

```css
table {
  width: 400px;
  margin: 0 auto;
  border: 1px solid #000;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #000;
  text-align: center;
}
```

```html
<body>
  <table>
    <thead>
      <tr>
        <th>姓名</th>
        <th>科目</th>
        <th>成绩</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <!-- 第1行 -->
      <tr>
        <td>小王</td>
        <td>高数</td>
        <td>98</td>
        <td>
          <a href="javascrpit:;">删除</a>
        </td>
      </tr>
      <!-- 第2行 -->
      <tr>
        <td>小深</td>
        <td>高数</td>
        <td>86</td>
        <td><a href="javascrpit:;">删除</a></td>
      </tr>
      <!-- 第2行 -->
      <tr>
        <td>小濛</td>
        <td>高数</td>
        <td>65</td>
        <td><a href="javascript">删除</a></td>
      </tr>
    </tbody>
  </table>
</body>
```

方法二：

```css
table {
  border-right: 1px solid #000000;
  border-bottom: 1px solid #000000;
  text-align: center;
}

table th {
  border-left: 1px solid #000000;
  border-top: 1px solid #000000;
}

table td {
  border-left: 1px solid #000000;
  border-top: 1px solid #000000;
}
```

```html
<body>
  <table align="center" width="400" cellspacing="0">
    <thead>
      <tr>
        <th>姓名</th>
        <th>科目</th>
        <th>成绩</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <!-- 第1行 -->
      <tr>
        <td>小王</td>
        <td>高数</td>
        <td>98</td>
        <td>
          <a href="javascrpit:;">删除</a>
        </td>
      </tr>
      <!-- 第2行 -->
      <tr>
        <td>小深</td>
        <td>高数</td>
        <td>86</td>
        <td><a href="javascrpit:;">删除</a></td>
      </tr>
      <!-- 第2行 -->
      <tr>
        <td>小濛</td>
        <td>高数</td>
        <td>65</td>
        <td><a href="javascript">删除</a></td>
      </tr>
    </tbody>
  </table>
</body>
```

方法三：

```css
table {
  background-color: black;
  text-align: center;
}

table th {
  background-color: #fff;
}

table td {
  background-color: #fff;
}
```

```html
<body>
  <table width="400" cellspacing="1" border="0">
    <thead>
      <tr>
        <th>姓名</th>
        <th>科目</th>
        <th>成绩</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <!-- 第1行 -->
      <tr>
        <td>小王</td>
        <td>高数</td>
        <td>98</td>
        <td>
          <a href="javascrpit:;">删除</a>
        </td>
      </tr>
      <!-- 第2行 -->
      <tr>
        <td>小深</td>
        <td>高数</td>
        <td>86</td>
        <td><a href="javascrpit:;">删除</a></td>
      </tr>
      <!-- 第2行 -->
      <tr>
        <td>小濛</td>
        <td>高数</td>
        <td>65</td>
        <td><a href="javascript">删除</a></td>
      </tr>
    </tbody>
  </table>
</body>
```

|   属性名    |       属性值        |                                                   描述                                                    |
| :---------: | :-----------------: | :-------------------------------------------------------------------------------------------------------: |
|    align    | left、center、right |                                      规定表格相对周围元素的对齐方式                                       |
|   border    |       1 或 0        | 规定表格是否有边框默认无边框，border="1"表示有边框，意思给表格每一格加上 1 像素边框，border="0"表示无边框 |
| cellspacing |       像素值        |                                      规定单元格之间的空白，默认 2px                                       |
| cellpadding |       像素值        |                               规定单元边沿与其内容之间的空白区域，默认 1px                                |
|    width    |   像素值或百分比    |                                              规定表格的宽度                                               |
|    align    | left、center、right |                                      规定表格相对周围元素的对齐方式                                       |

