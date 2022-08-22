import styled from "styled-components";
import {Box, BoxProps} from "./Box";
import React, {ChangeEvent, FC} from "react";
import {Input} from "./Input";

const SearchPanelContainer = styled(Box)({
  background: "#ffffff",
  width: 230,
  height: 42,
  display: "flex",
  borderRadius: 8,
  alignItems: "center",
  padding: "9px 10px",
})

const SearchIcon = styled.img({
  width: 24,
  height: 24,
  marginLeft: 10,
  userSelect: "none",
})

const InputContainer = styled(Box)({
  flex: 1,
})

type SearchPanelProps = Omit<BoxProps, 'children'> & {
  search: string
  setSearch: (event: ChangeEvent<HTMLInputElement>) => void
}
export const SearchPanel: FC<SearchPanelProps> = ({ search, setSearch, ...boxProps }) => (
  <SearchPanelContainer {...boxProps}>
    <InputContainer>
      <Input
        value={search}
        onChange={setSearch}
        placeholder="Найти карточку"
      />
    </InputContainer>
    <SearchIcon src="/search.svg"/>
  </SearchPanelContainer>
)
