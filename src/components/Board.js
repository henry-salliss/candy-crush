import Fruit from "../components/Fruit";
import styles from "./Board.module.css";
import { boardActions } from "../store/store";
import { useDispatch, useSelector } from "react-redux";

const Board = () => {
  const dispatch = useDispatch();
  const boardLayout = [];

  const boardColors = ["red", "yellow", "blue", "green", "purple", "orange"];

  // create board
  for (let i = 1; i < 65; i++) {
    const item = Math.floor(Math.random() * boardColors.length);
    const color = boardColors[item];
    boardLayout.push(color);
  }

  // create the fruits
  const fruits = boardLayout.map((color) => {
    dispatch(boardActions.setBoardConfig(fruits));
    return <Fruit color={color} key={Math.random()} />;
  });
  const config = useSelector((state) => state.board.boardConfig);
  console.log(config);
  console.log(fruits);
  return <div className={styles.board}>{fruits}</div>;
};

export default Board;
