import styled from "styled-components";
import {Box, BoxProps} from "./Box";
import {FC, useState} from "react";

const SortDirectionContainer = styled(Box)({
  background: "#ffffff",
  width: 42,
  height: 42,
  borderRadius: 8,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 4,
  cursor: "pointer",
  position: "relative",
})

type Direction = {
  desc?: boolean,
  toggleDesc?: () => void
}

const SortIcon = styled.img<Direction>(({ desc = false }) => ({
  width: 34,
  height: 34,
  transition: "transform .3s ease-in-out",
  transform: desc ? "scaleX(0)" : "scaleX(1)",
  transformOrigin: "15%",
  userSelect: "none",
}))

const SortIconReversed = styled.img<Direction>(({ desc = false }) => ({
  width: 34,
  height: 34,
  position: "absolute",
  transition: "transform .3s ease-in-out",
  transform: desc ? "scaleX(1) rotateX(180deg)" : "scaleX(0) rotateX(180deg)",
  transformOrigin: "15%",
  userSelect: "none",
}))

type SortDirectionProps = Omit<BoxProps, 'children'> & Direction
export const SortDirection: FC<SortDirectionProps> = ({ desc, toggleDesc, ...boxProps }) => {
  return (
    <SortDirectionContainer onClick={toggleDesc} {...boxProps}>
      <SortIcon desc={desc} src="/sort.svg"/>
      <SortIconReversed desc={desc} src="/sort.svg"/>
    </SortDirectionContainer>
  )
}
