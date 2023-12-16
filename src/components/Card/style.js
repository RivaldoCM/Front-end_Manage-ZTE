import styled from 'styled-components';

export const CardInner = styled.div`
  width: 300px;
  height: 400px;
  transform-style: preserve-3d;
  transition: transform 0.5s;
  transform: ${({ flip }) => (flip ? 'rotateY(180deg)' : 'rotateY(0)')};
`;

export const FrontCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 100%;
  background: white;
  padding: 2%;
  border-radius: 5%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

export const BackCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 2%;
  color: black;
  border-radius: 5%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transform: rotateY(180deg);
`;

export const CardContainer = styled.div`
  position: relative;

  .teste {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    width: 32px;
    height: 38px;
    box-shadow: 0 0 10px rgb(0, 0, 0);
    border-radius: 10px;
  }
`;
