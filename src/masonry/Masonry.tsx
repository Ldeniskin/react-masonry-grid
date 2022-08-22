import {Box} from "../components";
import {FC, PropsWithChildren} from "react";
import styled from "styled-components";

type MasonryProps = PropsWithChildren<{
  columns?: number | Record<"xs" | "sm" | "md" | "lg" | "xl", number>
  spacing?: number
}>

export {Masonry} from './Mason'

const MasonryRoot = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  "& > *": {
    margin: "0 34px 34px 0",
    flex: "1 0 auto",
  }
})

export const Masonry1: FC<MasonryProps> = ({ children }) => {
  return (
    <MasonryRoot>
      {children}
    </MasonryRoot>
  )
}
