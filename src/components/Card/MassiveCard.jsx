import React, { useState } from 'react';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import Rotate90DegreesCwSharpIcon from '@mui/icons-material/Rotate90DegreesCwSharp';
import Rotate90DegreesCcwSharpIcon from '@mui/icons-material/Rotate90DegreesCcwSharp';
import styled from 'styled-components';

const CardInner = styled.div`
  width: 300px;
  height: 400px;
  transform-style: preserve-3d;
  transition: transform 0.5s;
  transform: ${({ isFlipped }) => (isFlipped ? 'rotateY(180deg)' : 'rotateY(0)')};
`;

const FrontCard = styled.div`
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

const BackCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 2%;
  background: black;
  color: white;
  border-radius: 5%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transform: rotateY(180deg);
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid black;
  padding-bottom: 10px;
`;

const FecharCardButton = styled.button`
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #555;
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
  transition: transform 0.3s ease;

  &:hover {
    color: #555;
    transform: scale(1.1);
  }
`;

const RotateIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
  color: #555;
  transition: transform 0.3s ease;

  &:hover {
    color: #555;
    transform: scale(1.1);
  }
`;

const ErrorMessage = styled.span`
  color: black;
  font-size: 18px;
  margin-top: 5px;
  font-weight: bold;
`;

const MassiveCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const MassiveCard = ({ card, onDelete }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <CardInner isFlipped={isFlipped}>
      <FrontCard>
        <CardHeader>
          <RotateIcon onClick={flipCard}>
            {isFlipped ? (
              <Rotate90DegreesCcwSharpIcon />
            ) : (
              <Rotate90DegreesCwSharpIcon />
            )}
          </RotateIcon>
          <p>{card.type}</p>
          <FecharCardButton onClick={(e) => onDelete(card.id, e)}>
            <CloseSharpIcon />
          </FecharCardButton>
        </CardHeader>
        <div>
          <p>Previsão de Retorno: {card.returndate}</p>
          <p>Locais Afetados: {card.locaisAfetados}</p>
          <p>Informações Adicionais: {card.description}</p>
        </div>
      </FrontCard>
      <BackCard>
        <CardHeader>
          <RotateIcon onClick={flipCard}>
            {isFlipped ? (
              <Rotate90DegreesCwSharpIcon />
            ) : (
              <Rotate90DegreesCcwSharpIcon />
            )}
          </RotateIcon>
          <p>RIVALDO</p>
        </CardHeader>
        <p>Quem Abriu: {card.quemAbriu}</p>
      </BackCard>
    </CardInner>
  );
};

export default MassiveCard;