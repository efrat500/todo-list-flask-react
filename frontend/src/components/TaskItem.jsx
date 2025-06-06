import { MdEdit, MdDelete, MdCancel } from "react-icons/md";

export default function TaskItem({
  task,
  editId,
  editTask,
  setEditTask,
  setEditId,
  handleUpdate,
  handleDelete,
  toggleDone
}) {
    return (
        <li>
        {editId === task.id ? (
            <>
            <input
                type="text"
                value={editTask}
                onChange={(e) => setEditTask(e.target.value)}
            />
            <button onClick={() => handleUpdate(task.id)}>
                ✔️
            </button>
            <button onClick={() => setEditId(null)}>
                <MdCancel />
            </button>
            </>
        ) : (
            <>
            <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleDone(task.id, task.done)} 
            />
            <span style={{ textDecoration: task.done ? "line-through" : "none" }}>
                {task.content}
            </span>
            <button onClick={() => {
                setEditId(task.id);
                setEditTask(task.content);
            }}>
                <MdEdit />
            </button>
            <button onClick={() => handleDelete(task.id)}>
                <MdDelete />
            </button>
            </>
        )}
        </li>
    );
}