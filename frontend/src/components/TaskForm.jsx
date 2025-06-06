import { FaPlus } from "react-icons/fa";
export default function TaskForm({ newTask, setNewTask, handleSubmit }) {
    return (
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Add task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            />
            <button type="submit">
            <FaPlus />
            </button>
        </form>
    );
}