const Button = ({ className, text, onClick, title }) => {
    return (
      <button
        className = {className}
        onClick = {onClick}
        title = {title}
      >
        {text}
      </button>
    );
  };

export default Button;