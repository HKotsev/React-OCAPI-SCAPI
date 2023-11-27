import classes from "./imageSection.module.css";
import { useState } from "react";
const ImageSection = (props) => {
  const [currImage, setCurrImage] = useState(0);

  const prevImage = () => {
    if (currImage === 0) return;
    setCurrImage((prevImage) => {
      return prevImage - 1;
    });
  };
  const nextImage = () => {
    if (currImage === props.productImages.length - 1) return;
    setCurrImage((prevImage) => {
      return prevImage + 1;
    });
  };
  return (
    <div className={classes.imagesContainer}>
      <div className={classes.dots}>
        {props.productImages.map((img, i) => {
          return (
            <img
              className={`${i === currImage && classes.active}`}
              onClick={() => {
                setCurrImage(i);
              }}
              key={i}
              src={img.link}
            />
          );
        })}
      </div>
      <div className={classes.displayedImage}>
        <button className={classes.btnLeft} onClick={prevImage}>
          {"<"}
        </button>
        <div className={classes.image}>
          <img src={props.productImages[currImage].link} />
        </div>
        <button className={classes.btnRight} onClick={nextImage}>
          {">"}
        </button>
      </div>
    </div>
  );
};
export default ImageSection;
