/**
 * 支持加减乘除括号
 * @param {string} s
 * @return {number}
 */
class Calculator {
    constructor() {
        // 符号优先级
        this.priority = {
            '#': 0,
            ')': 0,
            '(': 0,
            '+': 1,
            '-': 1,
            '/': 2,
            '*': 2
        }
        this.signRep = /[+|\-|(|)|\#|\*|\/]/
        this.numRep = /\d+/
    }
    // 处理出下一个操作数或操作符
    next(cur, s) {
        if (this.signRep.test(s[cur])) {
            return s[cur]
        } else if (this.numRep.test(s[cur])) {
            let ret = s[cur]
            while (this.numRep.test(s[++cur])) {
                ret += s[cur]
            }
            return ret
        }
    }
    calc(s) {
        const signStack = []
        const numStack = []
        let cur = 0
        let last = '('
        while (cur < s.length) {
            let op = this.next(cur, s)
            if (op === '-' && last === '(') op = '0'
            if (this.numRep.test(op)) {
                numStack.push(parseInt(op))
            } else {
                // 当前操作符优先级小于栈顶操作符优先级
                while (signStack.length > 0 && this.priority[op] <= this.priority[signStack[signStack.length - 1]] && op != '(') {
                    const operate = signStack.pop()
                    if (operate === '(')
                        break
                    const num1 = numStack.pop(), num2 = numStack.pop()
                    if (operate === '+')
                        numStack.push(num1 + num2)
                    else if (operate === '-')
                        numStack.push(num2 - num1)
                    else if (operate === '/')
                        numStack.push(num2 / num1)
                    else if (operate === '*')
                        numStack.push(num2 * num1)
                }
                if (op != ')') signStack.push(op)
            }
            if (s[cur] === '-' && last === '(') {
                last = '0'
                continue
            }
            cur += op.length
            last = op
        }
        return numStack[0]
    }
};
let c = new Calculator()
console.log(c.calc('5*4/3+2-1#'))