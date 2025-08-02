import { useState } from "react";
import classes from "@/styles/dropdown/CustomDropdown.module.scss";
import arrowImage from "@assets/dropdown/Arrow.svg";

interface Option<TValue> {
  value: TValue;
  label: string;
}

interface CustomDropdownProps<TValue> { 
  options: Option<TValue>[];
  value: Option<TValue> | null;
  onChange: (value: Option<TValue>) => void;
}

export function CustomDropdown<TValue>({
  options,
  value,
  onChange,
}: CustomDropdownProps<TValue>) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (option: Option<TValue>) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={classes.dropdown}>
      <div
        className={`${classes.dropdownHeader} ${isOpen ? classes.openHeader : ""}`}
        onClick={toggleDropdown}
      >
        {value ? value.label : "Select delay"}
        <span className={`${classes.arrow} ${isOpen ? classes.open : ""}`}>
          <img src={arrowImage} alt="arrow" className={classes.arrowImage} />
        </span>
      </div>
      {isOpen && (
        <ul className={classes.dropdownList}>
          {options.map((option) => (
            <li
              key={String(option.value)}
              className={classes.dropdownItem}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
