# node 连接 mysql

`npm i mysql@2.18.1`

```ts
import { createPool, MysqlError } from 'mysql';

export const mysql_conf = {
  host: '127.0.0.1',
  port: 3306,
  user: 'sanyer',
  password: '123456',
  database: 'myblog',
};

export const queryPool = (sql: string) => {
  return new Promise((resolve, reject) => {
    const pool = createPool(mysql_conf);
    pool.getConnection((err: MysqlError) => {
      if (err) {
        reject(err.message);
        return;
      }
      pool.query(sql, (err, rows) => {
        err ? reject(err.message) : resolve(rows);
        pool.end();
      });
    });
  });
};

// test
async function test() {
  const sql = 'select * from `user_list`';
  const data: any = await queryPool(sql);
  console.log(data);
}
```
