import styled from 'styled-components';

export const InformationContainer = styled.div`
  width: 400px;
  /* border: 3px solid #001529; */
  border-radius: 10px;
  text-align: start;
  padding-left: 100px;
  h2 {
    font-size: 24px;
  }
  .details__block {
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      width: 250px;
      margin: 12px;
    }
  }
  .users__block {
    text-align: center;
    height: 120px;
    overflow: scroll;
    background-color: white;
    border-radius: 10px;
    border: 1px solid lightgrey;
    p {
      font-size: 16px;
      text-align: center;
      font-weight: 350;
    }
  }
`
export const UsersInformation = styled.div`
  width: 500px;
  text-align: center;
  .ant-btn {
    background-color: #001529;
  }
`
export const Container = styled.div`
  display: flex;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
  border-radius: 10px;
  align-items: center;
  padding: 50px;
  margin-bottom: 10%;
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  min-height: 60%;
`