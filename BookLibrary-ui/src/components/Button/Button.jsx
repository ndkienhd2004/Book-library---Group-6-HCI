import "./Button.css";

const Button = ({ placeholder, style, onClick }) => {
  return (
    <button className="button" style={style} onClick={onClick}>
      {" "}
      {/* ✅ Fix: Pass onClick */}
      {placeholder}
    </button>
  );
};

export default Button;
