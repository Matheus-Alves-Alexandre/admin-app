import React from "react";
import styles from "./menuLink.module.css";

const MenuLink = ({ item }) => {
  return (
    <div href={item.path} className={styles.container}>
      {item.icon}
      {item.title}
    </div>
  );
};

export default MenuLink;
