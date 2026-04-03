import styled from "styled-components";
const StyleWrapper = styled.div`
  margin-top: 10px;
  textarea {
    width: 100%;
    outline: none;
    border-color: #ddd;
    padding: 5px 8px;
    &:focus {
      border: 1px solid skyblue;
    }
  }
  button {
    padding: 2px 20px;
    color: white;
    border-radius: 25px;
    border: none;
    background-color: skyblue;
  }
`;
export default StyleWrapper;
