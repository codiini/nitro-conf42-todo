export default defineCachedEventHandler(async (event) => {
    const todos = await useStorage("data").getItem("todos")

    return {
        status: 200,
        message: "Todos fetched successfully",
        data: todos
    }

}, { maxAge: 60 * 60 })