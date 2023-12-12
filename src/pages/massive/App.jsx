import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Global } from './style/styledGlobal'
import { Navbar } from './style/NavBarStyles';
import { NovoMassiva } from './style/novoMassivaButton';
import { ModalContainer, ModalContent, ModalHeader } from './style/ModalStyles';
import { Card, CardConteiner, CardHeader, ErrorMessage, FecharCardButton } from './style/CardStyles';
import { FormCardContainer, FormCardInput, FormCardLabel, FormCardSalvarButton, FormCardSelect } from './style/FormCard';
import { AppContainer, Overlay } from './style/AppStyled';


export function Massive() {
}