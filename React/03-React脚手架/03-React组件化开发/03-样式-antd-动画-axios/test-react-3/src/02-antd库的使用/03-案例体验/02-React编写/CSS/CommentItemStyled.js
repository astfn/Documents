import styled from "styled-components";
const StyleWrapper = styled.div`
  padding: 5px 5px;

  header {
    width: 100%;
    display: flex;
    flex-direction: row;
    overflow: hidden;
    .avatar {
      height: 32px;
      width: 32px;
      margin-right: 8px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .info {
      flex: 1;
      color: rgba(0, 0, 0, 0.45);
      .author {
        font-size: 12px;
        margin-right: 5px;
      }
      .datetime {
        font-size: 12px;
      }
    }
  }
  main {
    margin-top: -8px;
    padding: 0px 0px 5px 40px;
    width: 100%;
    p {
      margin: 0px;
    }
  }
  footer {
    width: 100%;
    height: 20px;
    position: relative;
    font-size: 12px;
    .delete {
      line-height: 20px;
      width: 50px;
      height: 100%;
      position: absolute;
      right: 5px;
      text-align: center;
    }
  }
`;
export default StyleWrapper;
