import styles from "./Fruit.module.css";

const Fruit = (props) => {
  return (
    <div
      className={styles.fruit}
      style={{ backgroundColor: props.color }}
    ></div>
  );
};

export default Fruit;
