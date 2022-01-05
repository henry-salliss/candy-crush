import Fruit from "../components/Fruit";
import styles from "./Board.module.css";

const Board = () => {
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
    return <Fruit color={color} key={Math.random()} />;
  });
  return <div className={styles.board}>{fruits}</div>;
};

export default Board;
