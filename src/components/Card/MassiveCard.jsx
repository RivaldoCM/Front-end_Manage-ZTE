import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Rotate90DegreesCcwIcon from '@mui/icons-material/Rotate90DegreesCcw';
import Rotate90DegreesCwIcon from '@mui/icons-material/Rotate90DegreesCw';
import { CardInner, FrontCard, BackCard, CardContainer } from './style';

export default function CardMassive() {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <CardContainer>
      {isFlipped ? (
        <CardInner flip={isFlipped}>
          <BackCard>TESTE BACK</BackCard>
        </CardInner>
      ) : (
        <CardInner flip={isFlipped}>
          <FrontCard>TESTE FRONT</FrontCard>
        </CardInner>
      )}
      <>
        <IconButton
          onClick={flipCard}
          sx={{ borderRadius: '0' }}
          className="teste"
          aria-label="delete"
          size="small"
        >
          {isFlipped ? <Rotate90DegreesCcwIcon fontSize="inherit" /> : <Rotate90DegreesCwIcon fontSize="inherit" />}
        </IconButton>
      </>
    </CardContainer>
  );
}
