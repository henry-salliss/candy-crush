import Fruit from "../components/Fruit";
import styles from "./Board.module.css";
import { useEffect, useState } from "react";

const Board = () => {
  const width = 8;
  let toBeReplaced;
  // board state
  const [boardConfig, setBoardConfig] = useState([]);
  const tempBoardIndexs = [];
  const [boardIndexs, setBoardIndexs] = useState([]);
  const boardLayout = [];
  const boardColors = ["red", "yellow", "blue", "green", "purple", "orange"];

  // first candy selection
  const [clickedID, setClickedID] = useState(100);
  const [candySelected, setCandySelected] = useState(false);
  const [selectedCandy, setSelectedCandy] = useState({});

  // second candy selection
  const [secondClickedID, setSecondClickedID] = useState(100);
  const [secondCandySelected, setSecondSelectedCandy] = useState({});

  // candies to be replaced
  const replaceCandies = [];
  const [candiesToReplace, setCandiesToReplace] = useState([]);

  // available movements
  const validMoves = [
    clickedID.id - width,
    clickedID.id - 1,
    clickedID.id + width,
    clickedID.id + 1,
  ];

  const swapCandys = (boardArray, firstID, secondID) => {
    const tempArr = boardArray[firstID];
    boardArray[firstID] = boardArray[secondID];
    boardArray[secondID] = tempArr;
  };

  const createBoard = () => {
    for (let i = 1; i < 65; i++) {
      tempBoardIndexs.push(i);
      setBoardIndexs(tempBoardIndexs);
      const item = Math.floor(Math.random() * boardColors.length);
      const color = boardColors[item];
      boardLayout.push(color);
      setBoardConfig(boardLayout);
    }
  };

  let rows = [];

  const createRows = (boardArray) => {
    const allItems = [...boardArray];
    for (let i = 1; i < 9; i++) {
      const row = allItems.splice(0, 8);
      rows.push(row);
    }
  };

  createRows(boardConfig);

  const firstCandyClickHandler = (e) => {
    setCandySelected(true);
    const selectedColor = e.target.getAttribute("candycolor");
    setClickedID(e.target.id);
    setSelectedCandy({
      color: selectedColor,
      id: clickedID,
      isSecondCandy: false,
    });
  };

  const secondCandyClickHandler = (e) => {
    setCandySelected(false);
    const selectedColor = e.target.getAttribute("candycolor");
    setSecondClickedID(e.target.id);
    setSecondSelectedCandy({
      color: selectedColor,
      id: secondClickedID,
      isSecondCandy: true,
    });

    swapCandys(boardConfig, clickedID, e.target.id);
  };

  const checkThreeInARow = (array) => {
    const combos = [];

    array.forEach((row, rowIndex) => {
      // check each row for row of 3
      for (let i = 1; i < row.length; i++) {
        if (row[i] === row[i + 1] && row[i + 1] === row[i + 2]) {
          // push candies in 3 in row into combo array
          combos.push([
            rowIndex * 8 + i,
            rowIndex * 8 + i + 1,
            rowIndex * 8 + i + 2,
          ]);
        }
      }
    });

    // array of all candies that need to be replaced
    const allComboIndexs = combos.flat();

    boardConfig.forEach((candy, index) => {
      for (let i = 0; i < allComboIndexs.length; i++) {
        const removableCandy = index === allComboIndexs[i];
        if (removableCandy) {
          const item = Math.floor(Math.random() * boardColors.length);
          const color = boardColors[item];
          boardConfig.splice(index, 1, color);
        }
      }
    });
  };

  useEffect(() => {
    setCandiesToReplace(toBeReplaced);
  }, [toBeReplaced]);

  checkThreeInARow(rows);
  useEffect(() => {
    createBoard();
  }, []);

  const checkFourInARow = (array) => {
    const combos = [];

    for (let i = 1; i < array.length; i++) {
      if (
        array[i] === array[i + 1] &&
        array[i + 1] === array[i + 2] &&
        array[i + 2] === array[i + 3]
      ) {
        combos.push([i, i + 1, i + 2, i + 3]);
      }
    }
    // console.log(combos);
  };

  checkFourInARow(boardConfig);

  // create the fruits
  const candys = boardConfig.map((color, index) => {
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
  return <div className={styles.board}>{candys}</div>;
};

export default Board;
