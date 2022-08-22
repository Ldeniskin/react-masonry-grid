import styled from "styled-components"
import {Box} from "../components"
import React, {Children, FC, PropsWithChildren} from "react"
import {BoxProps} from "../components/Box"
import {useMasonry} from "./useMasonry";

const lineBreakStyle = {
  flexBasis: '100%',
  width: 0,
  margin: 0,
  padding: 0,
}

type OwnerState = { ownerState: MasonryRootProps }

const MasonryRoot = styled(Box)<OwnerState>(({ ownerState }) => ({
  width: '100%',
  display: 'flex',
  flexFlow: 'column wrap',
  alignContent: 'flex-start',
  boxSizing: 'border-box',
  margin: `calc(0px - (${ownerState.spacing}px / 2))`,
  '& > *': {
    boxSizing: 'border-box',
    width: `calc(${(100 / Number(ownerState.columns)).toFixed(2)}% - ${ownerState.spacing}px)`,
    margin: `calc(${ownerState.spacing}px / 2)`,
  },
  ...(ownerState.maxColumnHeight && {
    height: Math.ceil(ownerState.maxColumnHeight + ownerState.spacing)
  }),
}))

type MasonryCommonProps = {
  columns: number | Record<"xs" | "sm" | "md" | "lg" | "xl", number>
  spacing: number
}

type MasonryRootProps = MasonryCommonProps & {
  maxColumnHeight: number
  count: number
}

type MasonryProps = PropsWithChildren<MasonryCommonProps> & BoxProps

export const Masonry: FC<MasonryProps> = (props) => {
  const {
    children,
    className,
    component = 'div',
    columns = 4,
    spacing = 1,
    ...other
  } = props

  const {masonryRef, maxColumnHeight, numberOfLineBreaks} = useMasonry({
    columns,
    spacing,
    children
  })
  const ownerState = {
    ...props,
    spacing,
    columns,
    count: Children.count(children),
    maxColumnHeight
  }

  //  columns are likely to have different heights and hence can start to merge
  //  a line break at the end of each column prevents columns from merging
  const lineBreaks = new Array(numberOfLineBreaks)
    .fill('')
    .map((_, index) => (
      <span key={index} data-class="line-break" style={{ ...lineBreakStyle, order: index + 1 }} />
    ))

  return (
    <MasonryRoot
      as={component}
      className={className}
      ref={masonryRef}
      ownerState={ownerState}
      {...other}
    >
      {children}
      {lineBreaks}
    </MasonryRoot>
  )
}
