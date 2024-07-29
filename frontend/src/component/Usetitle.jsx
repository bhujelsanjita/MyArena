import { useEffect } from "react";
import React from "react";

const Usetitle = (title) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

export default Usetitle;
