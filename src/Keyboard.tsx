import React, { useState } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./index.css"; // Assume this file contains necessary styles

export const KeyPop = () => {
  const [layoutName, setLayoutName] = useState("default");
  const [input, setInput] = useState("");

  const commonKeyboardOptions = {
    onChange: (input: string) => handleInputChange(input),
    onKeyPress: (button: string) => handleKeyPress(button),
    theme: "simple-keyboard hg-theme-default hg-layout-default",
    physicalKeyboardHighlight: true,
    syncInstanceInputs: true,
    mergeDisplay: true,
    debug: true,
  };

  const keyboardOptions = {
    ...commonKeyboardOptions,
    layout: {
      default: [
        "{esc} {f1} {f2} {f3} {f4} {f5} {f6} {f7} {f8} {f9} {f10} {f11} {f12} {print} {scrolllock} {pause}",
        "` 1 2 3 4 5 6 7 8 9 0 - = {backspace}",
        "{tab} q w e r t y u i o p [ ] \\",
        "{capslock} a s d f g h j k l ; ' {enter}",
        "{shiftleft} z x c v b n m , . / {shiftright}",
        "{ctrlleft} {altleft} {metaleft} {space} {metaright} {altright} {controlright}",
      ],
      shift: [
        "{esc} {f1} {f2} {f3} {f4} {f5} {f6} {f7} {f8} {f9} {f10} {f11} {f12} {print} {scrolllock} {pause}",
        "~ ! @ # $ % ^ & * ( ) _ + {backspace}",
        "{tab} Q W E R T Y U I O P { } |",
        "{capslock} A S D F G H J K L : \" {enter}",
        "{shiftleft} Z X C V B N M < > ? {shiftright}",
        "{ctrlleft} {altleft} {metaleft} {space} {metaright} {altright} {controlright}",
      ],
    },
    display: {
      "{esc}": "esc ⎋",
      "{tab}": "tab ⇥",
      "{backspace}": "⌫",
      "{enter}": "↵",
      "{capslock}": "⇪",
      "{shiftleft}": "⇧",
      "{shiftright}": "⇧",
      "{ctrlleft}": "ctrl ⌃",
      "{controlright}": "ctrl ⌃",
      "{altleft}": "alt ⌥",
      "{altright}": "alt ⌥",
      "{metaleft}": "cmd ⌘",
      "{metaright}": "cmd ⌘",
    },
  };

  const handleInputChange = (input: string) => {
    setInput(input);
    console.log("Input changed", input);
  };

  const handleKeyPress = (button: string) => {
    console.log("Button pressed", button);
    if (button === "{shift}" || button === "{shiftleft}" || button === "{shiftright}" || button === "{capslock}") {
      handleShift();
    }
  };

  const handleShift = () => {
    setLayoutName((prevLayout) => (prevLayout === "default" ? "shift" : "default"));
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setInput(inputValue);
    keyboard.setInput(inputValue);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let keyboard: any;

  return (
    <div>
      <input
        value={input}
        placeholder={"Tap on the virtual keyboard to start"}
        onChange={handleChangeInput}
        style={{
          marginBottom: "2rem",
          height: "5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem"
        }}
      />
      <div className={"keyboardContainer"}>
        <Keyboard
          baseClass={"simple-keyboard-main"}
          keyboardRef={(r) => (keyboard = r)}
          layoutName={layoutName}
          {...keyboardOptions}
        />
      </div>
    </div>
  );
};
