const Button = ({ children, onClick, variant = "default" }) => {
    const baseStyles = "px-4 py-2 rounded-lg font-semibold transition duration-300";
    
    const variants = {
      default: "bg-blue-500 text-white hover:bg-blue-600",
      outline: "border border-blue-500 text-blue-500 hover:bg-blue-100",
      danger: "bg-red-500 text-white hover:bg-red-600",
    };
  
    return (
      <button
        className={`${baseStyles} ${variants[variant]}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };
  
  export default Button;
  