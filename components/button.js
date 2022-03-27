const Button = ({ type, className, onClick, children }) => {
  let typeClasses = "text-white bg-indigo-600 hover:bg-indigo-700";

  if (type == "danger") {
    typeClasses = "text-white bg-red-500 hover:bg-red-600";
  }

  if (type == "default") {
    typeClasses = "text-gray-600 bg-gray-200 hover:bg-gray-300";
  }

  return (
    <button
      className={`text-sm rounded flex items-center py-2 px-3  hover:transition-colors ${typeClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
