import styled from "styled-components";
import {FC, HTMLAttributes, PropsWithChildren} from "react";
import {Box} from "./Box";

const InputBase = styled.input({
  border: "unset",
  padding: "unset",
  outline: "unset",
  width: "100%",
  fontSize: 16,
  fontWeight: 500,
  fontFamily: "Montserrat, Verdana, sans-serif",
  "::placeholder": {
    color: "#979595"
  }
})

export type InputProps = PropsWithChildren<HTMLAttributes<HTMLInputElement>> & {
  value?: string
}


export const Input: FC<InputProps> = ({ children, value, ...rest }) => (
  <Box>
    <InputBase value={value} {...rest} />
  </Box>
)
