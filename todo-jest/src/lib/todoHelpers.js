export const addTodo = (list, item) => [item, ...list]

export const generateId = () => Math.floor(Math.random() * 100000)

export const findById = (id, list) => list.find(item => item.id === id)

export const toggleTodo = (todo) => ({ ...todo, isComplete: !todo.isComplete })

export const editTodo = (list, todoId, edit) => {
    
    const todoIndex = list.findIndex(item => item.id === todoId)
    list[todoIndex].name=edit
    return [...list]
}

export const updateTodo = (list, updatedItem) => { 
    const updatedIndex = list.findIndex(item => item.id === updatedItem.id)

    return [
        ...list.slice(0, updatedIndex),
        updatedItem,
        ...list.slice(updatedIndex + 1)
    ]
}

export const removeTodo = (list, todoId) => {
    const todoIndex = list.findIndex(item => item.id === todoId)
    return [
        ...list.slice(0, todoIndex),
        ...list.slice(todoIndex + 1)
    ]
}

