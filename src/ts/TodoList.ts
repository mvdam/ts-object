interface Todo {
    id: string
    title: string
    completed: boolean
}

interface TodoList {
    count: number
    todos: Todo[]
}