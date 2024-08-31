# node处理xlsx

https://zhuanlan.zhihu.com/p/141328581

https://segmentfault.com/a/1190000021272653

https://www.cnblogs.com/fmg0224/p/15470450.html

https://blog.csdn.net/u010007013/article/details/103711964

## SheetJS（js-xlsx、XLSX）横向纵向合并单元格

```js
import XLSX from 'xlsx';
// ...
// xlsxData 是 Excel 的内容
const workSheet = XLSX.utils.aoa_to_sheet(xlsxData);
const workbook = XLSX.utils.book_new();
// 设置工作表的记录范围
// [列号][行号]，A1 则代表 A 列的第1行
// 列数一般是已知的（未知时可以设置为ZZ）
// 行数则以 xlsxData 内容的长度结束即可
workSheet['!ref'] = `A1:AI${xlsxData.length}`;
// s 意为 start ，即开始的单元格
// r 是 row ，表示行号，从 0 计起
// c 是 col ，表示列号，从 0 计起
const merge = [
  // 纵向合并，范围是第1列的行1到行2
  { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } },
  // 纵向合并，范围是第2列的行1到行2
  { s: { r: 0, c: 1 }, e: { r: 1, c: 1 } },
  // 横向合并，范围是第1行的列3到列5
  { s: { r: 0, c: 2 }, e: { r: 0, c: 4 } },
  // 横向合并，范围是第1行的列6到列11
  { s: { r: 0, c: 5 }, e: { r: 0, c: 10 } },
  // 横向合并，范围是第1行的列12到列17
  { s: { r: 0, c: 11 }, e: { r: 0, c: 16 } },
  // 横向合并，范围是第1行的列18到列23
  { s: { r: 0, c: 17 }, e: { r: 0, c: 22 } },
  // 横向合并，范围是第1行的列24到列29
  { s: { r: 0, c: 23 }, e: { r: 0, c: 28 } },
  // 横向合并，范围是第1行的列30到列35
  { s: { r: 0, c: 29 }, e: { r: 0, c: 34 } },
];
workSheet['!merges'] = merge;
// sheet0 是工作表的名称
XLSX.utils.book_append_sheet(workbook, workSheet, 'sheet0');
// 执行数据转换文件写入
XLSX.writeFileSync(workbook, '文档名称', {
  bookType: 'xlsx',
  bookSST: true,
  type: 'array',
});
```
