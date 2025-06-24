import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../features/context/DarkModeContext";

function DarkModeToggle() {
  const { isDarkMode, handledarkmode } = useDarkMode();

  return (
    <ButtonIcon onClick={handledarkmode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
