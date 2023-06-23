import { useDispatch, useSelector } from "react-redux";
// import { deleteToDo, saveEditTask } from "../redux/todosSlice";
// import { toggleEdit } from "../redux/editSlice";
import { useState } from "react";
import { enterEditText } from "../redux/editTextSlice";
import {
  fetchDeleteToDoAPI,
  fetchEditTask,
  saveEditTask,
} from "../redux/todosAPISlice";
const ToDos = ({ item }) => {
  const dispatch = useDispatch();
  const text = useSelector((store) => store.text.value);
  const editText = useSelector((store) => store.editText.value);
  const { status, error } = useSelector((store) => store.todosAPI);
  //   const todos = useSelector((store) => store.todos.value);
  const [edit, setEdit] = useState(false);

  const saveEditTaskHandler = async (id, text) => {
    dispatch(saveEditTask({ id, text: editText }));
    await dispatch(fetchEditTask({ id, text: editText }));

    // dispatch(saveEditTask({ id: item.id, text: editText }));
    // await dispatch(fetchEditTask({ id: item.id, text: editText }));

    // dispatch(enterEditText(""));
    setEdit(!edit);
  };
  const deleteHandler = async (id) => {
    await dispatch(fetchDeleteToDoAPI(id));
  };
  const setSave = () => {
    dispatch(enterEditText(item.text));
    setEdit(!edit);
  };

  return (
    <>
      {edit ? (
        <>
          <input
            value={text}
            onChange={(e) => dispatch(enterEditText(e.target.value))}
          />
          <button onClick={() => saveEditTaskHandler(item.id)}>
            сохранить
          </button>
        </>
      ) : (
        <p>
          {item.title}
          <button onClick={() => deleteHandler(item.id)}>удалить</button>
          <button onClick={() => setSave()}>редактировать</button>
        </p>
      )}
    </>
  );
};
export default ToDos;
