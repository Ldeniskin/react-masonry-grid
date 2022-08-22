import {CSSProperties, FC, HTMLAttributes, PropsWithChildren} from "react";
import styled from "styled-components";

type BoxCss = Pick<CSSProperties,
  | "background"
  | "display"
  | "flex"
  | "flexWrap"
  | "flexDirection"
  | "height"
  | "width"
  | "justifyContent"
  | "alignItems"
  | "position"
  | "padding"
  | "paddingLeft"
  | "paddingRight"
  | "paddingTop"
  | "paddingBottom"
  | "margin"
  | "marginLeft"
  | "marginRight"
  | "marginTop"
  | "marginBottom"
  | "minHeight"
  | "maxHeight"
  | "minWidth"
  | "maxWidth"
  | "boxSizing"
  | "overflow"
>
export type BoxProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & BoxCss & { component?: React.ElementType }
const BoxDiv = styled.div<BoxCss>(({
  display,
  background,
  flex,
  flexWrap,
  flexDirection,
  height,
  minHeight,
  maxHeight,
  width,
  minWidth,
  maxWidth,
  alignItems,
  justifyContent,
  position,
  padding,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingBottom,
  margin,
  marginLeft,
  marginRight,
  marginTop,
  marginBottom,
  boxSizing = "border-box",
  overflow,
}) => ({
  display,
  background,
  flex,
  flexWrap,
  flexDirection,
  height,
  minHeight,
  maxHeight,
  width,
  minWidth,
  maxWidth,
  alignItems,
  justifyContent,
  position,
  padding,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingBottom,
  margin,
  marginLeft,
  marginRight,
  marginTop,
  marginBottom,
  boxSizing,
  overflow
}))
export const Box: FC<BoxProps> = ({children, component = "div", ...props}) => <BoxDiv as={component} {...props}>{children}</BoxDiv>
