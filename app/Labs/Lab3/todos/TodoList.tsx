import TodoItem from "./TodoItem";
import todos from "./todos.json";
import { ListGroup } from "react-bootstrap";

type Todo = { title: string; status: string; done: boolean };

export default function TodoList() {
  const items = todos as Todo[];

  return (
    <>
      <h3>Todo List</h3>
      <ListGroup>
        {items.map((todo) => (
          <TodoItem key={`${todo.title}-${todo.status}`} todo={todo} />
        ))}
      </ListGroup>
      <hr />
    </>
  );
}
