# node 执行命令行

`exec` 适合一次性命令

`spawn` 包含标准的输入流，适合处理持续的交互命令

```ts
import { spawn, execSync } from 'child_process';

// 执行命令行，包含参数、输出、错误输出、命令行结束，返回该命令流
export function executeSpawn(
  command: string,
  params: Array<string>,
  out: any,
  err: any,
  close: any,
) {
  const bash = spawn(command, params);
  bash.stdout.on('data', out);
  bash.stderr.on('data', err);
  bash.on('close', close);
  return bash;
}

// 执行命令行
export function executeSpawnMin(command: string, params: Array<string>) {
  spawn(command, params);
}

// 执行命令，并返回结构化的结果
export function execSyncFun(command: string) {
  try {
    const d = execSync(command);
    return {
      code: 1,
      data: d.toString(),
    };
  } catch (e: any) {
    return {
      code: 0,
      msg: e.toString(),
    };
  }
}

// 处理交互式命令
const child = spawn('your-interactive-command');

child.stdout.on('data', data => {
  console.log(`stdout: ${data}`);
});

child.stderr.on('data', data => {
  console.error(`stderr: ${data}`);
});

child.on('close', code => {
  console.log(`child process exited with code ${code}`);
});

// 向子进程发送输入
child.stdin.write('your-input\n');

// 根据需要继续发送更多输入
child.stdin.write('another-input\n');

// 结束输入流
child.stdin.end();
```
