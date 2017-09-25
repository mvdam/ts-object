interface ITodo {
    id: string
    title: string
    completed: boolean
}

interface ITodoList {
    count: number
    todos: ITodo[]
}