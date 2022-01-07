import styles from "./Fruit.module.css";

import blue from "../img/blue-candy.png";
import green from "../img/green-candy.png";
import orange from "../img/orange-candy.png";
import purple from "../img/purple-candy.png";
import red from "../img/red-candy.png";
import yellow from "../img/yellow-candy.png";

const Fruit = (props) => {
  const images = [blue, green, orange, purple, red, yellow];
  let src;

  images.forEach((img) => {
    if (img.includes(props.color)) src = img;
  });

  return <img className={styles.fruit} alt="candy" src={src} />;
};

export default Fruit;
