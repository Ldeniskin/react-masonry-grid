import {FC, useMemo} from "react";
import {Box, BoxProps} from "./Box";
import styled from "styled-components";
import {Colors} from "../colors";

const masonryTileMaxWidth = 254
const masonryTileMinHeight = 254

type MasonryTileContainerProps = {
    minHeight?: number,
    backgroundColor: string
}
const MasonryTileContainer = styled(Box)<MasonryTileContainerProps>(({ minHeight, backgroundColor }) => ({
    maxWidth: masonryTileMaxWidth,
    minWidth: masonryTileMaxWidth,
    minHeight: minHeight ?? masonryTileMinHeight,
    width: "100%",
    backgroundColor,
    padding: 28,
    alignItems: "flex-start",
    borderRadius: 20,
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
    backgroundSize: "cover",
}))

type MasonryTileProps = BoxProps & {
    background?: string
    color?: Colors
    height?: number
}
const tileColors: Record<Colors, string> = {
    [Colors.Gray]: "#E0DFDF",
    [Colors.Red]: "#FFD9D9",
    [Colors.Orange]: "#FFEBD9",
    [Colors.Yellow]: "#FFFED9",
    [Colors.Green]: "#D9FFDD",
    [Colors.Cyan]: "#D9FFFA",
    [Colors.Blue]: "#D9E2FF",
    [Colors.Purple]: "#FFD9FE",
}

export const MasonryTile: FC<MasonryTileProps> = ({children, background, color = Colors.Gray, height}) => {
    const backgroundColor = useMemo(() => tileColors[color], [color])
    return (
        <MasonryTileContainer
          background={background}
          backgroundColor={backgroundColor}
          minHeight={height}
        >
            {children}
        </MasonryTileContainer>
    )
}
