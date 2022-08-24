import TodoTemplate from "./Todo.Template";
import { useRef, useState } from "react";

function TodoComponent() {
  const [value, setValue] = useState("");
  const activeRef = useRef<HTMLElement>(null);
  const [todo, setTodo] = useState<{ content: string; active: boolean }[]>([
    { content: "Listen to music", active: false },
    { content: "Go to work", active: false },
    { content: "Travelling", active: false },
  ]);
  const handleSub = () => {
    if (value === "") {
      alert("Please fill in the content");
    } else {
      setTodo((prevItem) => [...prevItem, { content: value, active: false }]);
      setValue("");
    }
  };

  const handleRemove = (index: number) => {
    const newTodo = todo.slice(0, index).concat(todo.slice(index + 1));
    setTodo(newTodo);
  };
  const handleKey = (e: { key: string }) => {
    if (e.key === "Enter") {
      handleSub();
    }
  };
  const handleActive = (indexItem: number) => {
    const newTodo = todo.map((item, index) =>
      index === indexItem ? { ...item, active: true } : item
    );
    setTodo(newTodo);
    console.log(newTodo);
  };

  return (
    <>
      <TodoTemplate
        handleSub={handleSub}
        handleRemove={handleRemove}
        value={value}
        todo={todo}
        setValue={setValue}
        handleKey={handleKey}
        handleActive={handleActive}
        activeRef={activeRef}
      />
    </>
  );
}
export default TodoComponent;
