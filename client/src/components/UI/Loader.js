import classes from "./loader.module.css";
const Loader = () => {
  return (
    <>
      <div className={classes.backdrop}></div>
      <div className={classes["dot-spinner"]}>
        <div className={classes["dot-spinner__dot"]}></div>
        <div className={classes["dot-spinner__dot"]}></div>
        <div className={classes["dot-spinner__dot"]}></div>
        <div className={classes["dot-spinner__dot"]}></div>
        <div className={classes["dot-spinner__dot"]}></div>
        <div className={classes["dot-spinner__dot"]}></div>
        <div className={classes["dot-spinner__dot"]}></div>
        <div className={classes["dot-spinner__dot"]}></div>
      </div>
    </>
  );
};
export default Loader;
