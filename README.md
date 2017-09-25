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
convert('./ts/TodoList.ts')
    .then(interfaces => {
        const { ITodo, ITodoList } = interfaces
        
        const todo = {
            id: '#121312',
            title: 'Todo title',
            completed: false
        }

        console.log(equals(todo, ITodo)) // true
        console.log(equals(todo, ITodoList)) // false
    });
```