import styled from "styled-components";
import {Box, BoxProps} from "./Box";
import {FC} from "react";

const NavbarContainer = styled(Box)({
  minHeight: 82,
  width: "100%",
  display: "flex",
  alignItems: "flex-end",
  flexWrap: "wrap",
  justifyContent: "flex-end",
  '@media(max-width: 680px)': {
    padding: '20px',
  },
})
type NavbarProps = BoxProps
export const Navbar: FC<NavbarProps> = ({ children, ...rest }) => (
  <NavbarContainer {...rest}>
    {children}
  </NavbarContainer>
)
