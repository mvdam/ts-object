const { convert, matchesType } = require('./tsConvert')

async function start() {
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
    console.log(matchesType(todos, ITodoList)) // false
}

start()
