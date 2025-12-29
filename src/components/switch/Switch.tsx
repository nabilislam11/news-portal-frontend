interface SwitchProps {
  checked: boolean;
  onToggle: () => void;
}

const Switch = ({ checked, onToggle }: SwitchProps) => {
  const handleClick = () => {
    console.log("Switch clicked! Current state:", checked);
    onToggle();
  };

  return (
    <div
      onClick={handleClick}
      className={`
        w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300
        ${checked ? "bg-red-600" : "bg-gray-300"}
      `}
    >
      <div
        className={`
          bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300
          ${checked ? "translate-x-5" : "translate-x-0"}
        `}
      />
    </div>
  );
};

export default Switch;
