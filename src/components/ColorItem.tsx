import styled from "styled-components";
import {Box} from "./Box";

export const ColorItem = styled(Box)<{active?: boolean, background?: string}>(({ active = false, background }) => ({
  width: 24,
  height: 24,
  borderRadius: 5,
  border: active
    ? "1px solid #888"
    : "1px solid #E2E2E2",
  boxShadow: active
    ? "0px 5px 15px rgba(0, 0, 0, 0.3)"
    : "0px 5px 15px rgba(0, 0, 0, 0.15)",
  boxSizing: "border-box",
  transform: active ? "scale(1)" : "scale(1)",
  transition: "transform .3s ease, border .3s ease, box-shadow .3s ease",
  cursor: "pointer",
  background,
}))
