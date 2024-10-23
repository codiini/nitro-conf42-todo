import { Todo } from "~~/utils"

export default defineEventHandler(async (event) => {
    const { todo, completed } = await readBody(event)

    if (!todo || !completed) {
        return {
            status: 400,
            message: "Both fields required"
        }
    }

    const todoList: Todo[] = await useStorage("data").getItem("todos") || []

    const newTodo: Todo = {
        id: Date.now().toString(),
        todo,
        completed
    }

    todoList.push(newTodo)

    await useStorage("data").setItem("todos", todoList)

    return {
        status: 201,
        message: "Todo added successfully",
        data: {
            ...newTodo
        }
    }
})