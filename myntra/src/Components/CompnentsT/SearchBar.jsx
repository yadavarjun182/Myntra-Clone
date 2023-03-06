import { Button } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { getSearchProduct } from "../../Redux/Products/actions";

const SearchBar = ({ queryHandler }) => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch()


  const handlesearch = (e) => {
    e.preventDefault()
    // console.log(input)
    dispatch(getSearchProduct(input)).then(res => console.log(res)).catch(err => console.log(err))
  }

  // useEffect(() => {
  //   queryHandler(input);
  // }, []);

  return (
    <Wrapper>
      <SearchBarWrapper>
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        <Button onClick={handlesearch}>search</Button>
        {/* searchbar shows data by brand name whatever query you pass in the serachbar */}
      </SearchBarWrapper>
    </Wrapper>
  );
};

export default SearchBar;

// styled components library is used here to provide styling to searchbar component
const SearchBarWrapper = styled.div`
  border: 1px solid gray;
  border-radius: 10px;
  display: flex;
`;

// styled component build to give styling to input tag
const Input = styled.input`
  flex: 1;
  font-size: 16px;
  border: none;
  outline: none;
`;

// styled component build to give styling to main div tag
const Wrapper = styled.div`
  max-width: 350px;
  margin: auto;
`;
