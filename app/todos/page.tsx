"use client"

import { useMutation, useQuery } from "react-query"
import { createTodo, getTodos } from "../actions/todo-actions"
import { useState } from "react";
import { queryClient } from "../config/ReactQueryProvider";

export default function TodosPage() {
    const [todoInput, setTodoInput] = useState("");

    const todosQuery = useQuery({
        queryKey: ["TODOS"],
        queryFn: () => getTodos(),
    })

    const createTodoMutation = useMutation({
        mutationFn: async () => {
            if (todoInput === "") throw new Error("TODO를 입력해주세요")
            return createTodo(todoInput)
        },
        onSuccess: () => {
            // todosQuery.refetch();
            queryClient.invalidateQueries(["TODOS"])
        },
        onError: (error: any) => {
            alert(error.message);
        }
    })

    return (
        <div>
            <h1>TODOS</h1>

            {/* TODOS 생성 */}

            <input
                type="text"
                placeholder="enter TODO"
                value={todoInput}
                onChange={(e) => setTodoInput(e.target.value)} />
            <button
                onClick={() => createTodoMutation.mutate()}>
                {createTodoMutation.isLoading ? "생성중..." : "TODO 생성"}
            </button>

            {/* TODOS 표시 */}
            {todosQuery.isLoading && <p>Loading...</p>}
            {todosQuery.data && todosQuery.data.map((todo, index) => <p key={index}>{todo}</p>)}
        </div>
    )
}