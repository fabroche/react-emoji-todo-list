import React, {useReducer, useState} from "react";

type Todo = {
    id: number;
    text: string;
}

type State = {
    todos: Todo[];
}

// Action Types
enum ActionTypes {
    CREATE_TODO = "todo/createTodo",
    DELETE_TODO = "todo/deleteTodo"
}

// Action Creators
type Action =
    | { type: ActionTypes.CREATE_TODO; payload: Todo['text'] }
    | { type: ActionTypes.DELETE_TODO; payload: Todo['id'] };

// Reducer
const initialState: State = {
    todos: [],
}

const todoReducer = (state: State, action: Action) => {
    switch (action.type) {
        case ActionTypes.CREATE_TODO: {
            const newTodo: Todo = {id: state.todos.length + 1, text: action.payload}
            return {
                todos: [...state.todos, newTodo]
            }
        }

        case ActionTypes.DELETE_TODO:
            return {
                todos: state.todos.filter(todo => todo.id !== action.payload)
            }

        default:
            return state;
    }
}

const emojiMap: { [key: string]: string } = {
    hamburguesa: '🍔',
    pizza: '🍕',
    sushi: '🍣',
    sandia: '🍉',
    manzana: '🍎',
    limon: '🍋',
    tomate: '🍅',
    pepino: '🥒',
}

export const TodoList: React.FC = () => {
    const [state, dispatch] = useReducer(todoReducer, initialState)
    const [todoText, setTodoText] = useState<string>("")

    function onCreateTodo() {
        const mappedText = emojiMap[todoText.toLowerCase() || todoText]

        if (mappedText.trim()) {
            dispatch({type: ActionTypes.CREATE_TODO, payload: mappedText})
            setTodoText("")
        }
    }

    function onEnterKeyDown(event: React.KeyboardEvent) {
        if (event.key === "Enter") {
            onCreateTodo();
        }
    }
    
    function onDeleteTodo(id: Todo['id']) {
        dispatch({type: ActionTypes.DELETE_TODO, payload: id})
    }
    return (
        <div>
            <em>Made with useReducer</em>
            <h1>Emoji Todo List</h1>
            <input 
                type="text"
                value={todoText}
                onChange={(e) => setTodoText(e.target.value)}
                onKeyDown={onEnterKeyDown}
                placeholder="Add a new Todo"
                
            />
            <ul>
                {state.todos.map(todo => (
                    <li 
                        key={todo.id}
                        onClick={() => onDeleteTodo(todo.id)}
                    >{todo.text}</li>
                ))}
            </ul>
        </div>
    )
}