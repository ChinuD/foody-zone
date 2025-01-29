import { useState,useEffect } from "react";
import styled from "styled-components";
import SearchResult from "./components/SearchResult/SearchResult";

export const BASE_URL = 'http://localhost:9000';

const App = () => {

  const [data,setData] = useState(null);
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(null)

useEffect(()=>{
  const fetchFoodData = async () => {
    setLoading(true)
    try{
      const response = await fetch(BASE_URL)
  
      const data = await response.json();
      setLoading(false)
      console.log(data)
    }
    catch(error){
      setError("Unable to fech data")
    }
  }
  setLoading(false)
  fetchFoodData();

},[])
if(error){
  return (
  <>
    <div>error</div>
  </>)
}
if(loading){
  return (
  <>
    <div>loading...</div>
  </>)
}


  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="/FoodyZone.svg" alt="logo" />
          </div>

          <div className="search">
            <input placeholder="Search Food" />
          </div>
        </TopContainer>

        <FilterContainer>
          {filterBtns.map((value) => (
            <Button
              isSelected={selectedBtn === value.type}
              key={value.name}
            >
              {value.name}
            </Button>
          ))}
        </FilterContainer>
      <SearchResult data={data} />
      </Container> 
    </>
  );
};

export default App;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const TopContainer = styled.section`
  max-height:140px;
  display:flex;
  justify-content:space-between;
  padding:16px;

  .search {
    input {
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0 10px;
      &::placeholder {
        color: white;
      }
    }

    @media (0 < width < 600px) {
      flex-direction: column;
      height: 120px;
  }
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-bottom: 40px;
`;

export const Button = styled.button`
  background: ${({ isSelected }) => (isSelected ? "#f22f2f" : "#ff4343")};
  outline: 1px solid ${({ isSelected }) => (isSelected ? "white" : "#ff4343")};
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #f22f2f;
  }
`;
