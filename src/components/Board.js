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
  const [clickedID, setClickedID] = useState(100);
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

  const fruitClickHandler = (e) => {
    const selectedColor = e.target.getAttribute("candycolor");
    setClickedID(e.target.id);
    setSelectedCandy(selectedColor);
  };

  // create the fruits
  const fruits = boardConfig.map((color, index) => {
    return (
      <div className={+clickedID === index ? styles.selected : ""} key={index}>
        <Fruit
          selected={selectedCandy}
          onClickCandy={fruitClickHandler}
          color={color}
          id={index}
        />
      </div>
    );
  });
  return <div className={styles.board}>{fruits}</div>;
};

export default Board;
