const { convert, equals } = require('./tsConvert')

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
