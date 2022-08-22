import styled from "styled-components";
import {Box, BoxProps} from "./Box";
import {FC} from "react";
import {ColorItem} from "./ColorItem";
import {Colors} from "../colors";

const ColorPickerContainer = styled(Box)({
  background: "#ffffff",
  width: 296,
  height: 42,
  borderRadius: 8,
  display: "flex",
  alignItems: "center"
})
type ColorPickerProps = BoxProps & {
  color: Colors | "all"
  setColor: (next: Colors | "all" ) => void
}

const pickerColors: Record<Colors, string> = {
  [Colors.Gray]: "#979595",
  [Colors.Red]: "#FF8181",
  [Colors.Orange]: "#FFBD81",
  [Colors.Yellow]: "#FFFA81",
  [Colors.Green]: "#81FF8E",
  [Colors.Cyan]: "#81FFF0",
  [Colors.Blue]: "#819DFF",
  [Colors.Purple]: "#FF81FA",
}

const ColorWheel = styled(ColorItem)({
  background: "url(/color-wheel.png)",
  backgroundPosition: "50%",
  backgroundSize: "125%",
})

export const ColorPicker: FC<ColorPickerProps> = ({ children, color, setColor, ...rest }) => {
  return (
    <ColorPickerContainer {...rest}>
      {children}
      {Object.values(Colors).map((val) => (
        <ColorItem
          key={val}
          active={val === color}
          onClick={() => setColor(val)}
          background={pickerColors[val]}
          marginLeft={8}
        />
      ))}
      <ColorWheel active={color === "all"} onClick={() => setColor("all")} marginLeft={8} />
    </ColorPickerContainer>
  )
}
