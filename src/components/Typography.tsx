import {FC, HTMLAttributes, PropsWithChildren} from "react";
import styled from "styled-components";

type TypographyBaseProps = PropsWithChildren<HTMLAttributes<HTMLSpanElement>>
const TypographyBaseContainer = styled.span({
    fontFamily: "Montserrat, Verdana, sans-serif"
})
export const TypographyBase: FC<TypographyBaseProps> = ({ children, ...rest }) => (
    <TypographyBaseContainer {...rest}>
        {children}
    </TypographyBaseContainer>
)

type TypographyProps = Omit<TypographyBaseProps, "children"> & {
    text: string
}
export const Typography: FC<TypographyProps> = ({ text, ...rest }) => (
    <TypographyBase {...rest}>
        {text}
    </TypographyBase>
)

export const Subtitle = styled(Typography)({
    fontSize: 23,
    fontWeight: 400,
    color: "#444444"
})

export const Title = styled(Typography)({
    fontSize: 25,
    fontWeight: 500,
    color: "#444444"
})

export const Body = styled(Typography)({
    fontSize: 16,
    fontWeight: 500,
    color: "#444444"
})

export const BodyDimmed = styled(Typography)({
    fontSize: 16,
    fontWeight: 500,
    color: "#979595"
})
