import Fruit from "../components/Fruit";
import styles from "./Board.module.css";
// import { boardActions } from "../store/store";
// import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { createSlice } from "@reduxjs/toolkit";

const Board = () => {
  // const dispatch = useDispatch();
  const [boardConfig, setBoardConfig] = useState([]);
  const [candyIDs, setCandyIDs] = useState([]);
  const [selectedCandy, setSelectedCandy] = useState({});
  const boardLayout = [];
  const candyIDArr = [];

  const boardColors = ["red", "yellow", "blue", "green", "purple", "orange"];

  const createBoard = () => {
    for (let i = 1; i < 65; i++) {
      candyIDArr.push(i);
      setCandyIDs(candyIDArr);
      const item = Math.floor(Math.random() * boardColors.length);
      const color = boardColors[item];
      boardLayout.push(color);
      setBoardConfig(boardLayout);
    }
  };
  useEffect(() => {
    createBoard();
  }, []);

  console.log(selectedCandy);

  const fruitClickHandler = (e) => {
    const selectedColor = e.target.getAttribute("candycolor");
    const selectedId = e.target.id;
    setSelectedCandy({
      color: selectedColor,
      id: selectedId,
      clicked: true,
    });
  };

  // create the fruits
  const fruits = boardConfig.map((color, index) => {
    return (
      <Fruit
        selected={selectedCandy.clicked}
        onClickCandy={fruitClickHandler}
        color={color}
        key={index}
        id={index}
      />
    );
  });
  return <div className={styles.board}>{fruits}</div>;
};

export default Board;
