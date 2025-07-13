import styled from "styled-components";

export const Container = styled.div`
  padding: 3em;
`;

export const Heading = styled.h1`
  font-size: 5rem;
  font-weight: normal;
  font-family: "Hedvig", serif;
  text-align: center;
  margin-bottom: 1.5rem;
  color: rgb(208, 186, 22);
`;

export const SearchForm = styled.form`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;

  input {
    padding: 1em;
    border-radius: 35px;
    border: 1px solid white;
  }

  button {
    margin-left: 0.5em;
    margin-right: 0.5em;
    padding: 1em 2em;
    font-weight: 400;
    font-size: 1rem;
    font-family: "Montserrat", sans-serif;
    border: 1px solid rgb(72, 106, 90);
    background-color: rgb(1, 34, 15);
    border-radius: 35px;
    color: white;
  }
`;

export const TableHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 1em;
  padding: 0.75em;
  padding-left: 0;
  background-color: rgb(221, 220, 206);
`;

export const Cell = styled.div<{ $flex: number }>`
  flex: ${(props) => props.$flex};
  padding: 1em;
  text-align: left;
`;

export const ScrollContainer = styled.div`
  height: 600px;
  overflow: auto;
  border: rgb(208, 186, 22);
  border-radius: 15px;
`;

export const InnerContainer = styled.div`
  position: relative;
`;

export const VirtualRow = styled.div<{ start: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 200px;
  transform: ${({ start }) => `translateY(${start}px)`};
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  padding: 1em;
  border-bottom: 1.5px solid rgb(208, 186, 22);
  background-color: white;
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;

  a {
    padding: 0.35rem 0.75rem;

    border-radius: 30px;
    text-decoration: none;

    background-color: rgb(1, 34, 15);
    border: 1px solid rgb(1, 34, 15);
    color: white;

    &.active {
      background-color: rgb(55, 116, 82);
      color: white;
    }
  }
`;
