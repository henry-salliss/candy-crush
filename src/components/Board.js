import Fruit from "../components/Fruit";
import styles from "./Board.module.css";
import { useEffect, useRef, useState } from "react";

const Board = () => {
  const width = 8;
  let toBeReplaced;
  // let classes;
  const [classes, setClasses] = useState("");
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
  const [replaceableCandy, setReplaceableCandy] = useState(false);
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
      for (let i = 0; i < row.length; i++) {
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
    return allComboIndexs;
  };

  const checkFourInARow = (array) => {
    const combos = [];

    array.forEach((row, rowIndex) => {
      // check each row for row of 3
      for (let i = 0; i < row.length; i++) {
        if (
          row[i] === row[i + 1] &&
          row[i + 1] === row[i + 2] &&
          row[i + 2] === row[i + 3]
        ) {
          // push candies in 4 in row into combo array
          combos.push([
            rowIndex * 8 + i,
            rowIndex * 8 + i + 1,
            rowIndex * 8 + i + 2,
            rowIndex * 8 + i + 3,
          ]);
        }
      }
    });
    const allComboIndexs = combos.flat();
    return allComboIndexs;
  };

  const fourInRowIndexes = checkFourInARow(rows);
  console.log(fourInRowIndexes);
  const threeInRowIndexes = checkThreeInARow(rows);
  console.log(threeInRowIndexes);

  boardConfig.forEach((candy, index) => {
    for (let i = 0; i < threeInRowIndexes.length; i++) {
      const removableCandy = index === threeInRowIndexes[i];
      if (removableCandy) {
        const item = Math.floor(Math.random() * boardColors.length);
        const color = boardColors[item];
        boardConfig.splice(index, 1, color);
      }
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (replaceableCandy) classes = styles.fade;
      setReplaceableCandy(false);
    }, 1000);
    return clearTimeout(timer);
  }, [replaceableCandy]);

  useEffect(() => {
    setCandiesToReplace(toBeReplaced);
  }, [toBeReplaced]);

  useEffect(() => {
    createBoard();
  }, []);

  // create the fruits
  const candys = boardConfig.map((color, index) => {
    let classes = "";
    if (+clickedID === index) classes = styles.firstSelection;
    // if (+secondClickedID === index) classes = styles.secondSelection;
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
