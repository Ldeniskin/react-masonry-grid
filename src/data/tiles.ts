import {Colors} from "../colors";
import tileData from "./tileData.json"

type TileDTO = {
  id: string
  index: number
  color: string
  height: number
  title: string
  url: string
}

type Tile = {
  id: string
  index: number
  color: Colors
  height: number
  title: string
  url: string
}
const toTile = ({color, ...rest}: TileDTO): Tile => ({
  color: Object.values(Colors).find((val) => val === color) ?? Colors.Gray,
  ...rest,
})

const tileMaxCount = 18

export const tiles: Tile[] = tileData.map(toTile).slice(0, tileMaxCount)
