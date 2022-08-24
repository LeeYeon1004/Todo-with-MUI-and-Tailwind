import styled from "@emotion/styled";
import { styled as styledActive } from "@mui/material/styles";
import { Button, IconButton, Radio, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import "./Todo.style.css";
import { useState } from "react";

const CssTextField = styled(TextField)({
  "& .MuiInputBase-input": {
    padding: "12px",
  },
  "& .MuiFormLabel-root": {
    top: "-4px",
  },
});
interface PropsInterface {
  // ----------------
  handleSub: () => void;
  handleRemove: (data: number) => void;
  handleActive: (data: number) => void;
  handleKey: (data: any) => void;
  todo: { content: string; active: boolean }[];
  value: string;
  setValue: (data: string) => void;
  activeRef: any;
}
function TodoTemplate({
  handleSub,
  handleRemove,
  handleActive,
  handleKey,
  value,
  todo,
  setValue,
  activeRef,
}: PropsInterface) {
  const [selectedValue, setSelectedValue] = useState("all");
  const [newTodo, setNewTodo] = useState(todo);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.value;
    setSelectedValue(selected);
    if (selected === "all") {
      setNewTodo(todo);
    } else if (selected === "unfinished") {
      // setNewTodo(todo.filter(() => active === false));
    } else if (selected === "finished") {
      // setNewTodo(todo.filter(() => active === true));
    }
  };
  const LiUI = styledActive("li")<{ isActive?: boolean }>(({ isActive }) => ({
    textDecoration: isActive ? "line-through" : "",
  }));
  return (
    <div className="w-full bg-[#ccc] h-screen flex">
      <div className="max-w-[600px] bg-[#fff] h-[700px] py-[16px] px-[48px] w-full m-auto shadow-xl rounded-[4px]">
        <h2 className="text-[32px] text-center">
          Todo App with MUI and Tailwinds
        </h2>

        <form className="mt-[12px] flex " action="">
          <CssTextField
            value={value}
            onKeyDown={handleKey}
            onChange={(e) => setValue(e.target.value)}
            label="Enter your job"
            id="fullWidth"
            className="flex-1 p-[12px]"
            sx={{
              padding: "0",
            }}
          />
          <Button onClick={handleSub} variant="contained">
            ADD
          </Button>
        </form>
        <div className="flex mt-[12px]">
          <div className="flex items-center flex-1">
            <Radio
              checked={selectedValue === "all"}
              onChange={handleChange}
              value="all"
              name="radio-buttons"
            />
            <p>All</p>
          </div>
          <div className="flex items-center flex-1">
            <Radio
              checked={selectedValue === "finished"}
              onChange={handleChange}
              value="finished"
              name="radio-buttons"
            />
            <p>Finished</p>
          </div>
          <div className="flex items-center flex-1">
            <Radio
              checked={selectedValue === "unfinished"}
              onChange={handleChange}
              value="unfinished"
              name="radio-buttons"
            />
            <p>Unfinished</p>
          </div>
        </div>
        <ul className="mx-[20px]">
          {newTodo.map((item, index) => (
            <LiUI
              isActive={item.active}
              id="listItem"
              ref={activeRef}
              key={index}
              className="animation flex items-center justify-between"
              // className={`${active && "line-through"}`}
            >
              {item.content}
              <div>
                <IconButton
                  // ------ cần fix lại -------
                  // onClick={(e: any): void => {
                  //   const isCheck = e.target
                  //     .closest("#listItem")
                  //     .classList.contains("line-through");
                  //   isCheck
                  //     ? e.target
                  //         .closest("#listItem")
                  //         .classList.remove("line-through")
                  //     : e.target
                  //         .closest("#listItem")
                  //         .classList.add("line-through");
                  // }}
                  onClick={() => handleActive(index)}
                  aria-label="check"
                >
                  <CheckIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleRemove(index)}
                  sx={{ color: "red" }}
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </LiUI>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default TodoTemplate;
