import styled from "styled-components";
import {Box, BoxProps} from "./Box";
import {FC} from "react";

const ContainerBody = styled(Box)({
  paddingTop: 50,
  '@media(min-width: 680px)': {
    width: 640,
  },
  '@media(min-width: 940px)': {
    width: 900,
  },
  '@media(min-width: 1240px)': {
    width: 1186,
  },
  width: '100%',
})

type ContainerProps = BoxProps
export const Container: FC<ContainerProps> = ({ children }) => (
  <ContainerBody>
    {children}
  </ContainerBody>
)
