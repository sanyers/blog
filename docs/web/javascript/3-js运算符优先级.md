# 运算符优先级

**运算符的优先级**决定了表达式中运算执行的先后顺序。优先级高的运算符会作为优先级低的运算符的操作符。

## 1、优先级列表

<table>
<tbody>
        <tr>
            <th>优先级</th>
            <th>运算符类型</th>
            <th>结合性</th>
            <th>运算符</th>
        </tr>
        <tr>
            <td>21</td>
            <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Grouping">分组</a></td>
            <td>n/a（不相关）</td>
            <td><code>( … )</code></td>
        </tr>
        <tr>
            <td rowspan="5">20</td>
            <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Property_Accessors#dot_notation">成员访问</a></td>
            <td>从左到右</td>
            <td><code>… . …</code></td>
        </tr>
        <tr>
            <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Property_Accessors#bracket_notation">需计算的成员访问</a></td>
            <td>从左到右</td>
            <td><code>… [ … ]</code></td>
        </tr>
        <tr>
            <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new"><code>new</code></a>（带参数列表）</td>
            <td>n/a</td>
            <td><code>new … ( … )</code></td>
        </tr>
        <tr>
            <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Functions">函数调用</a></td>
            <td>从左到右</td>
            <td><code>… ( <var>… </var>)</code></td>
        </tr>
        <tr>
            <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Optional_chaining">可选链（Optional chaining）</a></td>
            <td>从左到右</td>
            <td><code>?.</code></td>
        </tr>
        <tr>
            <td>19</td>
            <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new"><code>new</code></a>（无参数列表）</td>
            <td>从右到左</td>
            <td><code>new …</code></td>
        </tr>
        <tr>
            <td rowspan="2">18</td>
            <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators#increment">后置递增</a></td>
            <td rowspan="2">n/a</td>
            <td><code>… ++</code></td>
        </tr>
        <tr>
            <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators#decrement">后置递减</a></td>
            <td><code>… --</code></td>
        </tr>
        <tr>
            <td rowspan="10">17</td>
            <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Logical_NOT">逻辑非 (!)</a></td>
            <td rowspan="10">从右到左</td>
            <td><code>! …</code></td>
        </tr>
        <tr>
            <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_NOT">按位非 (~)</a></td>
            <td><code>~ …</code></td>
        </tr>
        <tr>
            <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Unary_plus">一元加法 (+)</a></td>
            <td><code>+ …</code></td>
        </tr>
        <tr>
            <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Unary_negation">一元减法 (-)</a></td>
            <td><code>- …</code></td>
        </tr>
        <tr>
            <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators#increment">前置递增</a></td>
            <td><code>++ …</code></td>
        </tr>
        <tr>
            <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators#decrement">前置递减</a></td>
            <td><code>-- …</code></td>
        </tr>
        <tr>
            <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof"><code>typeof</code></a></td>
            <td><code>typeof …</code></td>
        </tr>
        <tr>
            <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/void"><code>void</code></a></td>
            <td><code>void …</code></td>
        </tr>
        <tr>
            <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/delete"><code>delete</code></a></td>
            <td><code>delete …</code></td>
        </tr>
        <tr>
            <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await"><code>await</code></a></td>
            <td><code>await …</code></td>
        </tr>
        <tr>
            <td>16</td>
            <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Exponentiation">幂 (**)</a></td>
            <td>从右到左</td>
            <td><code>… ** …</code></td>
        </tr>
        <tr>
            <td rowspan="3">15</td>
            <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Multiplication">乘法 (*)</a></td>
            <td rowspan="3">从左到右</td>
            <td><code>… * …</code></td>
        </tr>
        <tr>
            <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Division">除法 (/)</a></td>
            <td><code>… / …</code></td>
        </tr>
        <tr>
            <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Remainder">取余 (%)</a></td>
            <td><code>… % …</code></td>
        </tr>
        <tr>
            <td rowspan="2">14</td>
            <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Addition">加法 (+)</a></td>
            <td rowspan="2">从左到右</td>
            <td><code>… + …</code></td>
        </tr>
        <tr>
            <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Subtraction">减法 (-)</a></td>
            <td><code>… - …</code></td>
        </tr>
        <tr>
            <td rowspan="3">13</td>
            <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Left_shift">按位左移 (&lt;&lt;)</a></td>
            <td rowspan="3">从左到右</td>
            <td><code>… &lt;&lt; …</code></td>
        </tr>
        <tr>
            <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Right_shift">按位右移 (&gt;&gt;)</a></td>
            <td><code>… &gt;&gt; …</code></td>
        </tr>
        <tr>
            <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Unsigned_right_shift">无符号右移 (&gt;&gt;&gt;)</a></td>
            <td><code>… &gt;&gt;&gt; …</code></td>
        </tr>
        <tr>
            <td rowspan="6">12</td>
            <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Less_than">小于 (&lt;)</a></td>
            <td rowspan="6">从左到右</td>
            <td><code>… &lt; …</code></td>
        </tr>
        <tr>
            <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Less_than_or_equal">小于等于 (&lt;=)</a></td>
            <td><code>… &lt;= …</code></td>
        </tr>
        <tr>
            <td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Greater_than">大于 (&gt;)</a></td>
            <td><code>… &gt; …</code></td>
        </tr>
        <tr>
            <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Greater_than_or_equal">大于等于 (&gt;=)</a></td>
            <td><code>… &gt;= …</code></td>
        </tr>
        <tr>
            <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/in"><code>in</code></a></td>
            <td><code>… in …</code></td>
        </tr>
        <tr>
            <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof"><code>instanceof</code></a></td>
            <td><code>… instanceof …</code></td>
        </tr>
        <tr>
            <td rowspan="4">11</td>
            <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Equality">相等 (==)</a></td>
            <td rowspan="4">从左到右</td>
            <td><code>… == …</code></td>
        </tr>
        <tr>
            <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Inequality">不相等 (!=)</a></td>
            <td><code>… != …</code></td>
        </tr>
        <tr>
            <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Strict_equality">一致/严格相等 (===)</a></td>
            <td><code>… === …</code></td>
        </tr>
        <tr>
            <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Strict_inequality">不一致/严格不相等 (!==)</a></td>
            <td><code>… !== …</code></td>
        </tr>
        <tr>
            <td>10</td>
            <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_AND">按位与 (&amp;)</a></td>
            <td>从左到右</td>
            <td><code>… &amp; …</code></td>
        </tr>
        <tr>
            <td>9</td>
            <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_XOR">按位异或 (^)</a></td>
            <td>从左到右</td>
            <td><code>… ^ …</code></td>
        </tr>
        <tr>
            <td>8</td>
            <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_OR">按位或 (|)</a></td>
            <td>从左到右</td>
            <td><code>… | …</code></td>
        </tr>
        <tr>
            <td>7</td>
            <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Logical_AND">逻辑与 (&amp;&amp;)</a></td>
            <td>从左到右</td>
            <td><code>… &amp;&amp; …</code></td>
        </tr>
        <tr>
            <td>6</td>
            <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Logical_OR">逻辑或 (||)</a></td>
            <td>从左到右</td>
            <td><code>… || …</code></td>
        </tr>
        <tr>
            <td>5</td>
            <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator">空值合并 (??)</a></td>
            <td>从左到右</td>
            <td><code>… ?? …</code></td>
        </tr>
        <tr>
            <td>4</td>
            <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Conditional_Operator">条件（三元）运算符</a></td>
            <td>从右到左</td>
            <td><code>… ? … : …</code></td>
        </tr>
        <tr>
            <td rowspan="16">3</td>
            <td rowspan="16"><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators#assignment_operators">赋值</a></td>
            <td rowspan="16">从右到左</td>
            <td><code>… = …</code></td>
        </tr>
        <tr>
            <td><code>… += …</code></td>
        </tr>
        <tr>
            <td><code>… -= …</code></td>
        </tr>
        <tr>
            <td><code>… **= …</code></td>
        </tr>
        <tr>
            <td><code>… *= …</code></td>
        </tr>
        <tr>
            <td><code>… /= …</code></td>
        </tr>
        <tr>
            <td><code>… %= …</code></td>
        </tr>
        <tr>
            <td><code>… &lt;&lt;= …</code></td>
        </tr>
        <tr>
            <td><code>… &gt;&gt;= …</code></td>
        </tr>
        <tr>
            <td><code>… &gt;&gt;&gt;= …</code></td>
        </tr>
        <tr>
            <td><code>… &amp;= …</code></td>
        </tr>
        <tr>
            <td><code>… ^= …</code></td>
        </tr>
        <tr>
            <td><code>… |= …</code></td>
        </tr>
        <tr>
            <td><code>… &amp;&amp;= …</code></td>
        </tr>
        <tr>
            <td><code>… ||= …</code></td>
        </tr>
        <tr>
            <td><code>… ??= …</code></td>
        </tr>
        <tr>
            <td rowspan="2">2</td>
            <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/yield"><code>yield</code></a></td>
            <td rowspan="2">从右到左</td>
            <td><code>yield …</code></td>
        </tr>
        <tr>
            <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/yield*"><code>yield*</code></a></td>
            <td><code>yield* …</code></td>
        </tr>
        <tr>
            <td>1</td>
            <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Comma_Operator">逗号 / 序列</a></td>
            <td>从左到右</td>
            <td><code>… , …</code></td>
        </tr>
    </tbody>
</table>

## 2、总结

`(分组)` -> `. 成员访问` -> `[成员访问]` -> `new 有参数` ->

`(函数调用)` -> `?. 可选链` -> `new 无参数` ->

`num++ 后置递增` -> `num-- 后置递减` -> `! 逻辑非` -> `~ 按位非` ->

`+ 一元加法` -> `- 一元减法` -> `++num 前置递增` -> `--num 前置递减` ->

`typeof` -> `void` -> `delete` -> `await` -> 

`** 幂` -> `* 乘法` -> `/ 除法` -> `% 取余` -> `+ 加法` -> `- 减法` ->

`<< 按位左移` -> `>> 按位右移` -> `>>> 无符号右移` -> 

`< 小于` -> `<= 小于等于` -> `> 大于` -> `>= 大于等于` ->

`in` -> `instanceof` -> `== 相等` -> `!= 不相等` -> `=== 严格相等` -> `!== 严格不相等` -> 

`& 按位与` -> `^ 按位异或` -> `| 按位或` -> `&& 逻辑与` -> `|| 逻辑或` -> `?? 空值合并` -> 

`?x:y 三元运算` -> `= 赋值` -> `yield` -> `yield*` -> `, 逗号`
