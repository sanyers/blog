# 一道js面试题引发的思考

```js
// 比较下面两段代码，试述两段代码的不同之处
// A--------------------------
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f();
}
checkscope();

// B---------------------------
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}
checkscope()();
```

A:
1. 进入全局环境上下文，全局环境被压入环境栈，contextStack = [globalContext]

2. 全局上下文环境初始化，同时 checkscope 函数被创建，此时 checkscope.[[Scope]] = globalContext.scopeChain

```js
globalContext = {
    variable object:[scope, checkscope],
    scope chain: variable object // 全局作用域链
}
```

3. 执行checkscope函数，进入checkscope函数上下文，checkscope被压入环境栈，contextStack=[checkscopeContext, globalContext]。随后checkscope上下文被初始化,它会复制checkscope函数的[[Scope]]变量构建作用域，即 checkscopeContext={ scopeChain : [checkscope.[[Scope]]] }

4.checkscope的活动对象被创建 此时 checkscope.activationObject = [arguments], 随后活动对象被当做变量对象用于初始化，checkscope.variableObject = checkscope.activationObject = [arguments, scope, f]，随后变量对象被压入checkscope作用域链前端，(checckscope.scopeChain = [checkscope.variableObject, checkscope.[[Scope]] ]) == [[arguments, scope, f], globalContext.scopeChain]

5. 函数f被初始化，f.[[Scope]] = checkscope.scopeChain。

6. checkscope执行流继续往下走到 return f()，进入函数f执行上下文。函数f执行上下文被压入环境栈，contextStack = [fContext, checkscopeContext, globalContext]。函数f重复 第4步 动作。最后 f.scopeChain = [f.variableObject,checkscope.scopeChain]

7. 函数f执行完毕，f的上下文从环境栈中弹出，此时 contextStack = [checkscopeContext, globalContext]。同时返回 scope, 解释器根据f.scopeChain查找变量scope,在checkscope.scopeChain中找到scope(local scope)。

8. checkscope函数执行完毕，其上下文从环境栈中弹出，contextStack = [globalContext]

A的执行流程和B的流程在细节上一致，唯一的区别在于**B的环境栈变化不一样**：
A: contextStack = [globalContext] ---> contextStack = [checkscopeContext, globalContext] ---> contextStack = [fContext, checkscopeContext, globalContext] ---> contextStack = [checkscopeContext, globalContext] ---> contextStack = [globalContext]

B: contextStack = [globalContext] ---> contextStack = [checkscopeContext, globalContext] ---> contextStack = [fContext, globalContext] ---> contextStack = [globalContext]

最根本的一点在于，javascript是使用静态作用域的语言，他的作用域在函数创建的时候便已经确定(不含arguments)。

[原文地址](https://github.com/kuitos/kuitos.github.io/issues/18)