# ts-object
* Converts TypeScript interfaces to JavaScript objects
* Runtime type checking with converted TypeScript interface-objects

### Usages


./ts/TodoList.ts:
```
interface ITodo {
    id: string
    title: string
    completed: boolean
}

interface ITodoList {
    count: number
    todos: ITodo[]
}
```

index.js:
```
const { convert, matchesType } = require('./tsConvert')
const { ITodo, ITodoList } = await convert('./ts/TodoList.ts')

const todo = {
    id: '#121312',
    title: 'Todo title',
    completed: false
}

const todos = {
    count: 1,
    todos: {}
}

console.log(matchesType(todo, ITodo)) // true
console.log(matchesType(todos, ITodoList)) // Type mismatch: Expected property 'todos' to be of type 'array', but got 'object'
```

### Todo
[ ] Support for optional fields ( `{ field?: string }` )
[ ] Support for detecting invalid properties ( when they don't exist on the interface )
[ ] Support for nested types
[ ] Make code more readable