import React, { useState } from 'react';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import Rotate90DegreesCwSharpIcon from '@mui/icons-material/Rotate90DegreesCwSharp';
import Rotate90DegreesCcwSharpIcon from '@mui/icons-material/Rotate90DegreesCcwSharp';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Rotate90DegreesCwIcon from '@mui/icons-material/Rotate90DegreesCw';
import Rotate90DegreesCcwIcon from '@mui/icons-material/Rotate90DegreesCcw';

const CardInner = styled.div`
  width: 300px;
  height: 400px;
  transform-style: preserve-3d;
  transition: transform 0.5s;

  transform: ${({ flip }) => (flip ? 'rotateY(180deg)' : 'rotateY(0)')};
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
  color: black;
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

  p{
    color: white;
  }
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

const CardContainer = styled.div`
  position: relative;

  .teste{
      position: absolute;
        top: 100%;
        left: 50%;
        transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    background-color: white;
    width: 32px;
    height: 38px;
    box-shadow: 0 0 10px rgb(0, 0, 0);
    border-radius: 10px;
  }

`

const ButtonFlip = styled.div`


  .teste{
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
`

export function CardMassive(){
	const [isFlipped, setIsFlipped] = useState(false);

	const flipCard = () => {
		setIsFlipped(!isFlipped);
	};

	return (
		<CardContainer>
		{
			isFlipped ?
			<CardInner flip={isFlipped}>
				<BackCard>
					TESTE BACK
				</BackCard>
			</CardInner>
			:
			<CardInner flip={isFlipped}>
				<FrontCard>
					TESTE FRONT
				</FrontCard>
			</CardInner>
		}
		<>
			<IconButton onClick={flipCard} sx={{borderRadius: '0'}} className='teste' aria-label="delete" size="small">
			{
				isFlipped ?
				<Rotate90DegreesCcwIcon fontSize='inherit'/>
				:
				<Rotate90DegreesCwIcon fontSize='inherit'/>
			}
			</IconButton>
		</>
		</CardContainer>
	);
};