import React from 'react';

const TodoItem = ({todo,delete_todo}) => {
    return (
        <tr>
            <td>
                {todo.id}
            </td>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.text}
            </td>
            <td>
                {todo.user}
            </td>
            <td>
                {todo.created_at}
            </td>
            <td>
                {todo.updated_at}
            </td>
            <td>
                {String(todo.is_active)}
            </td>
            <td>
                <button onClick={() => delete_todo(todo.id)} type='button'>Delete</button>
            </td>
        </tr>
    )
}

const TodoList = ({todoArticles, delete_todo}) => {
    return (
        <table className="table_center_by_css">
             <th>
                ID
            </th>
            <th>
                Project
            </th>
            <th>
                Text
            </th>
            <th>
                User
            </th>
            <th>
                Created_at
            </th>
            <th>
                Updated_at
            </th>
            <th>
                Is active
            </th>
            {todoArticles.map((todo) => <TodoItem todo={todo} delete_todo={delete_todo}/>)}
        </table>
    )
}
export default TodoList