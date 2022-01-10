import Fruit from "../components/Fruit";
import styles from "./Board.module.css";
// import { boardActions } from "../store/store";
// import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Board = () => {
  // board state
  const [boardConfig, setBoardConfig] = useState([]);
  const boardLayout = [];
  const boardColors = ["red", "yellow", "blue", "green", "purple", "orange"];

  // first candy selection
  const [clickedID, setClickedID] = useState(100);
  const [candySelected, setCandySelected] = useState(false);
  const [selectedCandy, setSelectedCandy] = useState({});

  // second candy selection
  const [secondClickedID, setSecondClickedID] = useState(100);
  const [secondCandySelected, setSecondSelectedCandy] = useState({});

  const createBoard = () => {
    for (let i = 1; i < 65; i++) {
      const item = Math.floor(Math.random() * boardColors.length);
      const color = boardColors[item];
      boardLayout.push(color);
      setBoardConfig(boardLayout);
    }
  };
  useEffect(() => {
    createBoard();
  }, []);

  const firstCandyClickHandler = (e) => {
    setCandySelected(true);
    const selectedColor = e.target.getAttribute("candycolor");
    setClickedID(e.target.id);
    console.log(e.target.id);
    setSelectedCandy({
      color: selectedColor,
      id: clickedID,
      isSecondCandy: false,
    });
    console.log(selectedCandy);
  };

  const secondCandyClickHandler = (e) => {
    setCandySelected(false);
    const selectedColor = e.target.getAttribute("candycolor");
    setSecondClickedID(e.target.id);
    console.log(e.target.id);
    setSecondSelectedCandy({
      color: selectedColor,
      id: secondClickedID,
      isSecondCandy: true,
    });
    console.log(secondCandySelected);
  };

  // create the fruits
  const fruits = boardConfig.map((color, index) => {
    let classes = "";
    if (+clickedID === index) classes = styles.firstSelection;
    if (+secondClickedID === index) classes = styles.secondSelection;
    return (
      <div className={classes} key={index}>
        <Fruit
          selected={selectedCandy}
          onClickCandy={
            !candySelected ? firstCandyClickHandler : secondCandyClickHandler
          }
          color={color}
          id={index}
        />
      </div>
    );
  });
  return <div className={styles.board}>{fruits}</div>;
};

export default Board;
