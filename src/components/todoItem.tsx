// import { v4 as uuid } from 'uuid';

interface TodoItemProps {
    text: string;
    id: string;
    onDelete: (id: string) => void;
  }
  
  function TodoItem({ text, id, onDelete }: TodoItemProps) {
    return (
        <li id = {id} className="todo-item">{text} <span onClick={() => onDelete(id)}>del</span></li>
    )
  }

export default TodoItem