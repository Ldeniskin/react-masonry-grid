import React, {ChangeEvent, useCallback, useMemo, useState} from 'react';
import './App.css';
import {
  MasonryTile,
  Container,
  Navbar,
  Paper,
  Subtitle,
  Title,
  Box,
  ColorPicker,
  SearchPanel,
  SortDirection,
} from "./components";
import {tiles} from "./data/tiles";
import styled from "styled-components";
import {Colors} from "./colors";
import {Masonry, Masonry1} from "./masonry/Masonry";
import {useMediaQuery} from "./hooks/useMediaQuery";

const MasonryTitle = styled(Title)({
  whiteSpace: "nowrap"
})

function App() {
  const [desc, setDesc] = useState(false)
  const [search, setSearch] = useState("")
  const [color, setColor] = useState<Colors | "all">("all")
  const handleSearchChange = useCallback<(event: ChangeEvent<HTMLInputElement>) => void>((event) =>
    setSearch(event.target.value),[])
  const toggleDesc = useCallback(() => setDesc(!desc), [desc])
  const sortedTiles = useMemo(() => [...tiles.sort((a, b) => {
    if (desc) return b.index - a.index
    return a.index - b.index
  })], [desc])
  const searchedTiles = useMemo(() => [...sortedTiles.filter(({title}) => title.includes(search))], [sortedTiles, search])
  const colorPickedTiles = useMemo(() => searchedTiles.filter(({ color: clr }) => (clr === color) || color === "all"), [color, searchedTiles])

  const sm = useMediaQuery('(min-width: 680px)')
  const md = useMediaQuery('(min-width: 940px)')
  const lg = useMediaQuery('(min-width: 1240px)')
  const columns = useMemo(() => {
    if (lg) return 4
    if (md) return 3
    if (sm) return 2
    return 1
  }, [sm, md, lg])

  return (
    <div className="App">
      <Container>
        <Navbar>
          <Box marginBottom={20} marginRight={12}>
            <MasonryTitle text="React Masonry Grid" />
          </Box>
          <Box flex={1} />
          <ColorPicker
            color={color}
            setColor={setColor}
            marginBottom={20}
          />
          <Box display="flex" flexWrap="nowrap" marginBottom={20}>
            <SortDirection
              desc={desc}
              toggleDesc={toggleDesc}
              marginLeft={12}
            />
            <SearchPanel
              search={search}
              setSearch={handleSearchChange}
              marginLeft={12}
            />
          </Box>
        </Navbar>
        <Paper>
          <Box width="100%">
            <Masonry columns={columns} spacing={34}>
              {colorPickedTiles.map(({ title, id, color, height, url }) => (
                <MasonryTile
                  key={id}
                  color={color}
                  height={height}
                  background={`url("${url}")`}
                >
                  <Subtitle text={title} />
                </MasonryTile>
              ))}
            </Masonry>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}

export default App;
