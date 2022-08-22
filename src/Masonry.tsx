import {Box} from "./components";
import {PropsWithChildren, ReactNode, useMemo} from "react";
import styled from "styled-components";

type ItemData = {
  height: number,
  id: string
}
type MasonryProps<T extends ItemData> = PropsWithChildren<{
  columns: number,
  spacing?: number
  items: T[]
  renderItem: (data: T) => ReactNode
}>

const MasonryRoot = styled(Box)({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
})

const getShortestColumnIndex = (data: ItemData[][]) => {
  const [first, ...rest] = data
  let minHeight = first.reduce((acc, { height }) => acc + height, 0)
  let index = 0
  rest.forEach((v, i) => {
    const colHeight = v.reduce((acc, { height }) => acc + height, 0)
    if (colHeight < minHeight) {
      minHeight = colHeight
      index = i + 1
    }
  })
  return index
}

export const Masonry = <T extends ItemData>({ columns, items, renderItem, spacing }: MasonryProps<T>) => {
  const colState: T[][] = useMemo(() => {
    const columnData: T[][] = new Array(columns).fill(0).map(() => [])
    items.forEach((item) => {
      const shortest = getShortestColumnIndex(columnData)
      columnData[shortest].push(item)
    })
    return columnData
  }, [columns, items])

  return (
    <MasonryRoot>
      {colState.map((col, i) => (
        <Box key={i} marginLeft={i > 0 ? spacing : i}>
          {col.map((item) => (
            <Box key={item.id} marginTop={spacing}>
              {renderItem(item)}
            </Box>
          ))}
        </Box>
      ))}
    </MasonryRoot>
  )
}
