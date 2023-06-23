import { useDispatch, useSelector } from "react-redux";
import { enterText } from "../redux/textSlice";
// import { addTodo } from "../redux/todosSlice";
import ToDos from "../component/ToDos";
import { useEffect } from "react";
import { fetchAddToDoAPI, fetchTodos } from "../redux/todosAPISlice";

const ToDo = () => {
  const dispatch = useDispatch();
  const text = useSelector((store) => store.text.value);

  const todosAPI = useSelector((store) => store.todosAPI.todosAPI);
  const submitNewTaskHandler = async () => {
    await dispatch(fetchAddToDoAPI(text));
    dispatch(enterText(""));
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <>
      <input
        value={text}
        onChange={(e) => dispatch(enterText(e.target.value))}
      />
      <button onClick={() => submitNewTaskHandler()}>добавить таску</button>

      {todosAPI.map((item) => {
        return (
          <div key={item.id}>
            <ToDos item={item} />
          </div>
        );
      })}
    </>
  );
};
export { ToDo };
