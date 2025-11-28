"use client";

var TODOS: string[] = ["go to market"];

export const getTodos = async () => {
    return TODOS;
}

export const createTodo = async (data: string) => {
    // sleep 1 second
    await new Promise((resolve) => setTimeout(resolve, 1000));

    TODOS.push(data);
    return TODOS;
}