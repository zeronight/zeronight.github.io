## 前言

前段时间身边有一个小伙伴问了一个关于 JavaScript 基础的问题，题目如下：

``` javascript
const o = {
  m() { console.log(this === o) }
}

(o.m)()
```

当时我的理解是，根据语法分析首先执行 `o.m` 的取值操作，然后其结果进行调用。因为 `o.m` 的执行结果是一个函数，然后函数直接被调用，所以其 `this` 应该在严格模式下是 `undefined`，非严格模式下是`global`，结果为 `false`。

但是实际执行结果为 `true`，也就是这种调用方式和 `o.m()` 行为表现是一致的。再简单搜寻无果之后，我转向了 ECMAScript 规范，并在其中找到了答案。


## 属性访问

`o.m` 这种操作在规范中称为 [Property Accessors](https://www.ecma-international.org/ecma-262/#sec-property-accessors) 其返回的结果并不是对象 `o` 的 `m` 属性所对应的值，而是返回一个 [Reference](https://www.ecma-international.org/ecma-262/#sec-reference-specification-type) 类型的值。

> 8. Return a value of type Reference whose base value component is bv, whose referenced name component is propertyKey, and whose strict reference flag is strict.

`Reference` 类型的值对应着一个叫做 `GetValue` 的方法，该方法返回的结果才是对象 `o` 的 `m` 属性所对应的值，也就是上面那个函数。就像上边引用表述的那样， `Reference` 类型的值其实保存了本次取值操作的对象 `o` 和字符串 `'m'`。其存在的目的是保证类似于 `typeof o.m`、`delete o.m` 和 `o.m = 'ooxx'` 能够按照预期执行。本质上是因为这些操作都需要依赖 `o` 这个对象，而不仅仅是其 `m` 属性对应的值。

> The Reference type is used to explain the behaviour of such operators as delete, typeof, the assignment operators, the super keyword and other language features. For example, the left-hand operand of an assignment is expected to produce a reference.

## 括号

然后，我们再简单的看一下括号表达式(The Grouping Operator)，其规范中有很重要的一点是：

> Return the result of evaluating Expression. This may be of type Reference.

规范还解释了为什么 ：

> This algorithm does not apply GetValue to the result of evaluating Expression. The principal motivation for this is so that operators such as delete and typeof may be applied to parenthesized expressions.

如上，官方解释了为什么不对括号里面的表达式执行结果调用 getValue 方法之后再返回，其实希望保证 `delete` 和 `typeof` 这些操作符和括号表达式一起工作的时候能够符合我们的预期。例如，`delete (o.m)` 和 `delete o.m` 将会表现的一致。

## 结论

综上，属性访问和括号表达式共同决定了 `(o.m)()` 的表现和 `o.m()` 表现是一致的。

## 引申

1. 为何 `(o.n = o.m)()` 会打印 `false` ?

那是因为赋值操作的返回结果是对右侧表达式的执行结果调用 `getValue` 方法，如下：

>4. Let rval be ? GetValue(rref).
>5. Perform ? DestructuringAssignmentEvaluation of assignmentPattern using rval as the argument.
>6. Return rval.

同理，你也应该知道为何 `(null, o.m)()` 也会打印 `false`。

2. 为何我在控制台中输入 `o.m` 显示就是相应的函数而不是一个 `Reference` 类型的值？

那是因为此时表达式会被解释成一条独立的语句，因此有如下规范：

>1. Let exprRef be the result of evaluating Expression.
>2. Return ? GetValue(exprRef).

这里调用了 `GetValue` 方法。

## 参考

1. https://www.ecma-international.org/ecma-262/