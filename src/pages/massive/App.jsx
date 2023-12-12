import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Global } from './style/styledGlobal'
import { Navbar } from './NavBar';
import { NovoMassiva } from './style/novoMassivaButton';
import { ModalContainer, ModalContent, ModalHeader } from './style/ModalStyles';
import { Card, CardConteiner, CardHeader, ErrorMessage, FecharCardButton } from './style/CardStyles';
import { FormCardContainer, FormCardInput, FormCardLabel, FormCardSalvarButton, FormCardSelect } from './style/FormCard';
import { AppContainer, Overlay } from './style/AppStyled';


export function Massive() {
  const [massives, setMassives] = useState([
    {
      id: 1,
      type: 'ROMPIMENTO',
      returndate: '2023-12-11',
      locaisAfetados: 'Local A, Local B',
      description: 'Descrição da falha',
    },
    {
      id: 2,
      type: 'FALHA DE ENERGIA',
      returndate: '2023-12-12',
      locaisAfetados: 'Local C, Local D',
      description: 'Outra descrição da falha',
    },
    {
      id: 3,
      type: 'MANUTENÇÃO',
      returndate: '2023-12-12',
      locaisAfetados: 'Local E, Local F',
      description: 'Outra descrição da falha',
    },
    {
      id: 3,
      type: 'MANUTENÇÃO',
      returndate: '2023-12-12',
      locaisAfetados: 'Local E, Local F',
      description: 'Outra descrição da falha',
    },
    {
      id: 3,
      type: 'MANUTENÇÃO',
      returndate: '2023-12-12',
      locaisAfetados: 'Local E, Local F',
      description: 'Outra descrição da falha',
    },
    {
      id: 3,
      type: 'MANUTENÇÃO',
      returndate: '2023-12-12',
      locaisAfetados: 'Local E, Local F',
      description: 'Outra descrição da falha',
    },
  ]);

  const [cards, setCards] = useState([]);
  const [localidade, setLocalidade] = useState('');
  const [tipoDeFalha, setTipoDeFalha] = useState('');
  const [horarioDaFalha, setHorarioDaFalha] = useState('');
  const [previsaoDeRetorno, setPrevisaoDeRetorno] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [informacoesAdicionais, setInformacoesAdicionais] = useState('');
  const [locaisAfetados, setLocaisAfetados] = useState('');

  const [mostrarMensagens, setMostrarMensagens] = useState(false);
  const [localidadeError, setLocalidadeError] = useState('');
  const [tipoDeFalhaError, setTipoDeFalhaError] = useState('');
  const [horarioDaFalhaError, setHorarioDaFalhaError] = useState('');
  const [previsaoDeRetornoError, setPrevisaoDeRetornoError] = useState('');

  useEffect(() => {
    const getMassive = async () => {
      await axios.get('http://localhost:3000/api/massives')
        .then((response) => {
          setMassives(response.data);
          return response;
        });
    }
    getMassive();
  }, []);


  const isModalOpen = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const isModalClose = () => {
    setIsOpen(false);
    ocultarMensagens();
  };

  const ocultarMensagens = () => {
    setMostrarMensagens(false);
    setLocalidadeError('');
    setTipoDeFalhaError('');
    setHorarioDaFalhaError('');
    setPrevisaoDeRetornoError('');
  };

  const criarCard = async () => {
    setLocalidadeError('');
    setTipoDeFalhaError('');
    setHorarioDaFalhaError('');
    setPrevisaoDeRetornoError('');
  
    let temErro = false;
  
    if (!localidade) {
      setLocalidadeError('Por favor, preencha este campo.');
      temErro = true;
    }
    if (!tipoDeFalha) {
      setTipoDeFalhaError('Por favor, selecione o tipo de falha.');
      temErro = true;
    }
  
    if (temErro) {
      setMostrarMensagens(true);
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3000/api/massives', {
        localidade,
        tipoDeFalha,
        horarioDaFalha,
        previsaoDeRetorno,
        informacoesAdicionais,
        locaisAfetados,
      });
  
      setCards((prevCards) => [
        ...prevCards,
        {
          id: response.data.id,
          localidade: response.data.localidade,
          tipoDeFalha: response.data.tipoDeFalha,
          horarioDaFalha: response.data.horarioDaFalha,
          previsaoDeRetorno: response.data.previsaoDeRetorno,
          informacoesAdicionais: response.data.informacoesAdicionais,
          locaisAfetados: response.data.locaisAfetados,
          texto: `Card ${response.data.id}`,
        },
      ]);
  
      limparCampos();
      isModalClose();
    } catch (error) {
      console.error('Erro ao criar o card:', error);
    }
  };  

  const limparCampos = () => {
    setLocalidade('');
    setTipoDeFalha('');
    setHorarioDaFalha('');
    setPrevisaoDeRetorno('');
    setInformacoesAdicionais('');
    setLocaisAfetados('');
  };


  return (
    <AppContainer>
      <Overlay isOpen={isOpen} onClick={isModalClose}/>
      <Navbar />
      <NovoMassiva>
      <Fab sx={{backgroundColor:'#ff7400', color:'white'}} aria-label="add" onClick={isModalOpen}>
        <AddIcon />
      </Fab>
      </NovoMassiva>
        <ModalContainer style={{ display: isOpen ? 'block' : 'none' }}>
        <ModalHeader>
          <FecharCardButton onClick={isModalClose}>
            <FontAwesomeIcon icon={faCircleXmark} size='x' style={{ color: 'white' }} />
          </FecharCardButton>
        </ModalHeader>
        <FormCardContainer>
          <ModalContent>
            <div>
              <FormCardLabel>Localidade:</FormCardLabel>
              <FormCardInput
                type='text'
                value={localidade}
                onChange={(e) => {
                  setLocalidade(e.target.value);
                  setLocalidadeError('');
                }}
              />
              {mostrarMensagens && localidadeError && (
                <ErrorMessage>{localidadeError}</ErrorMessage>
              )}
            </div>
            <div>
              <FormCardLabel>Tipo de Falha:</FormCardLabel>
              <FormCardSelect value={tipoDeFalha} onChange={(e) => setTipoDeFalha(e.target.value)}>
                <option value=''>Selecione a Falha</option>
                <option value='ROMPIMENTO'>ROMPIMENTO</option>
                <option value='FALHA DE ENERGIA'>FALHA DE ENERGIA</option>
                <option value='LENTIDÃO'>LENTIDÃO</option>
                <option value='MANUTENÇÃO'>MANUTENÇÃO</option>
              </FormCardSelect>
              {mostrarMensagens && tipoDeFalhaError && (
                <ErrorMessage>{tipoDeFalhaError}</ErrorMessage>
              )}
            </div>
            <div>
              <FormCardLabel>Horário da Falha:</FormCardLabel>
              <FormCardInput
                type='time'
                value={horarioDaFalha}
                onChange={(e) => {
                  setHorarioDaFalha(e.target.value);
                  setHorarioDaFalhaError('');
                }}
              />
              {mostrarMensagens && horarioDaFalhaError && (
                <ErrorMessage>{horarioDaFalhaError}</ErrorMessage>
              )}
            </div>
            <div>
              <FormCardLabel>Previsão de Retorno:</FormCardLabel>
              <FormCardInput
                type='text'
                value={previsaoDeRetorno}
                onChange={(e) => {
                  setPrevisaoDeRetorno(e.target.value);
                  setPrevisaoDeRetornoError('');
                }}
              />
              {mostrarMensagens && previsaoDeRetornoError && (
                <ErrorMessage>{previsaoDeRetornoError}</ErrorMessage>
              )}
            </div>
            <div>
              <FormCardLabel>Locais Afetados:</FormCardLabel>
              <FormCardInput
                type='text'
                value={locaisAfetados}
                onChange={(e) => setLocaisAfetados(e.target.value)}
              />
            </div>
            <div>
              <FormCardLabel>Informações Adicionais: </FormCardLabel>
              <FormCardInput
              type='text'
              value={informacoesAdicionais}
              onChange={(e) => setInformacoesAdicionais(e.target.value)}
              />
            </div>

            <FormCardSalvarButton onClick={criarCard}>
              Salvar
            </FormCardSalvarButton>
          </ModalContent>
        </FormCardContainer>
            </ModalContainer>

            <CardConteiner>
        {massives.map((card, index) => (
          <Card key={index}>
            <CardHeader>
              <p>{card.type}</p>
            </CardHeader>
            <div>
              <p>Previsão de Retorno: {card.returndate}</p>
              <p>Locais Afetados: {card.locaisAfetados}</p>
              <p>Informações Adicionais: {card.description}</p>
            </div>
            <FecharCardButton
              onClick={() => {
                setCards((prevCards) => prevCards.filter((c) => c.id !== card.id));
              }}
            >
              <FontAwesomeIcon icon={faCircleXmark} size='sm' style={{ color: 'white' }} />
            </FecharCardButton>
          </Card>
        ))}
      </CardConteiner>
    </AppContainer>
  );
}

