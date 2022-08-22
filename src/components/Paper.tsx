import styled from "styled-components";
import {Box} from "./Box";

export const Paper = styled(Box)({
  background: "#ffffff",
  height: "100%",
  width: "100%",
  '@media(min-width: 680px)': {
    padding: '34px 49px',
  },
  '@media(min-width: 940px)': {
    padding: '34px 35px',
  },
  '@media(min-width: 1240px)': {
    padding: '34px',
  },
  padding: '34px calc(50vw - 127px)',
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
})
