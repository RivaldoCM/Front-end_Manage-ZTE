import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import { Navbar } from './NavBar';
import { NovoMassiva } from './style/novoMassivaButton';
import { ModalContainer, ModalContent, ModalHeader } from './style/ModalStyles';
import { FormCardContainer, FormCardInput, FormCardLabel, FormCardSalvarButton, FormCardSelect } from './style/FormCard';
import { AppContainer, Overlay } from './style/AppStyled';
import MassiveCard from '../../components/Card/MassiveCard';

export function Massive() {
  const [massives, setMassives] = useState([
    {
      id: 1,
      type: 'ROMPIMENTO',
      returndate: '2023-12-31T23:59',
      locaisAfetados: 'Exemplo de locais afetados',
      description: 'Descrição de exemplo',
    },
  ]);

  const [formData, setFormData] = useState({
    localidade: '',
    tipoDeFalha: '',
    horarioDaFalha: '',
    previsaoDeRetorno: '',
    isOpen: false,
    informacoesAdicionais: '',
    locaisAfetados: '',
    mostrarMensagens: false,
    localidadeError: '',
    tipoDeFalhaError: '',
    horarioDaFalhaError: '',
    previsaoDeRetornoError: '',
  });

  useEffect(() => {
    const getMassive = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/massives');
        setMassives(response.data);
      } catch (error) {
        console.error('Erro ao obter dados:', error);
      }
    };
    getMassive();
  }, []);

  const isModalOpen = (e) => {
    e.preventDefault();
    setFormData((prevData) => ({ ...prevData, isOpen: !prevData.isOpen }));
  };

  const isModalClose = () => {
    setFormData((prevData) => ({ ...prevData, isOpen: false }));
    ocultarMensagens();
  };

  const ocultarMensagens = () => {
    setFormData((prevData) => ({
      ...prevData,
      mostrarMensagens: false,
      localidadeError: '',
      tipoDeFalhaError: '',
      horarioDaFalhaError: '',
      previsaoDeRetornoError: '',
    }));
  };

  const criarCard = async () => {
    ocultarMensagens();

    let temErro = false;

    if (!formData.localidade) {
      setFormData((prevData) => ({ ...prevData, localidadeError: 'Por favor, preencha este campo.' }));
      temErro = true;
    }
    if (!formData.tipoDeFalha) {
      setFormData((prevData) => ({ ...prevData, tipoDeFalhaError: 'Por favor, selecione o tipo de falha.' }));
      temErro = true;
    }

    if (temErro) {
      setFormData((prevData) => ({ ...prevData, mostrarMensagens: true }));
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/massives', {
        localidade: formData.localidade,
        tipoDeFalha: formData.tipoDeFalha,
        horarioDaFalha: formData.horarioDaFalha,
        previsaoDeRetorno: formData.previsaoDeRetorno,
        informacoesAdicionais: formData.informacoesAdicionais,
        locaisAfetados: formData.locaisAfetados,
      });

      setMassives((prevMassives) => [
        ...prevMassives,
        {
          id: response.data.id,
          type: response.data.tipoDeFalha,
          returndate: response.data.previsaoDeRetorno,
          locaisAfetados: response.data.locaisAfetados,
          description: response.data.informacoesAdicionais,
        },
      ]);

      limparCampos();
      isModalClose();
    } catch (error) {
      console.error('Erro ao criar o card:', error);
    }
  };

  const limparCampos = () => {
    setFormData((prevData) => ({
      ...prevData,
      localidade: '',
      tipoDeFalha: '',
      horarioDaFalha: '',
      previsaoDeRetorno: '',
      informacoesAdicionais: '',
      locaisAfetados: '',
    }));
    ocultarMensagens();
  };

  return (
    <AppContainer>
      <Overlay isOpen={formData.isOpen} onClick={isModalClose} />
      <Navbar />
      <NovoMassiva>
        <Fab sx={{ backgroundColor: '#ff7400', color: 'white' }} aria-label="add" onClick={isModalOpen}>
          <AddIcon />
        </Fab>
      </NovoMassiva>
      <ModalContainer style={{ display: formData.isOpen ? 'block' : 'none' }}>
        <ModalHeader>
          <div onClick={isModalClose}>
              <CloseSharpIcon style={{ color: 'white' }} />
          </div>
        </ModalHeader>
        <FormCardContainer>
          <ModalContent>
            <div>
              <FormCardLabel>Localidade:</FormCardLabel>
              <FormCardInput
                type='text'
                value={formData.localidade}
                onChange={(e) => {
                  setFormData((prevData) => ({ ...prevData, localidade: e.target.value }));
                  ocultarMensagens();
                }}
              />
              {formData.mostrarMensagens && formData.localidadeError && (
                <ErrorMessage>{formData.localidadeError}</ErrorMessage>
              )}
            </div>
            <div>
              <FormCardLabel>Tipo de Falha:</FormCardLabel>
              <FormCardSelect value={formData.tipoDeFalha} onChange={(e) => setFormData((prevData) => ({ ...prevData, tipoDeFalha: e.target.value }))}>
                <option value=''>Selecione a Falha</option>
                <option value='ROMPIMENTO'>ROMPIMENTO</option>
                <option value='FALHA DE ENERGIA'>FALHA DE ENERGIA</option>
                <option value='LENTIDÃO'>LENTIDÃO</option>
                <option value='MANUTENÇÃO'>MANUTENÇÃO</option>
              </FormCardSelect>
              {formData.mostrarMensagens && formData.tipoDeFalhaError && (
                <ErrorMessage>{formData.tipoDeFalhaError}</ErrorMessage>
              )}
            </div>
            <div>
              <FormCardLabel>Horário da Falha:</FormCardLabel>
              <FormCardInput
                type='time'
                value={formData.horarioDaFalha}
                onChange={(e) => {
                  setFormData((prevData) => ({ ...prevData, horarioDaFalha: e.target.value }));
                  ocultarMensagens();
                }}
              />
              {formData.mostrarMensagens && formData.horarioDaFalhaError && (
                <ErrorMessage>{formData.horarioDaFalhaError}</ErrorMessage>
              )}
            </div>
            <div>
              <FormCardLabel>Previsão de Retorno:</FormCardLabel>
              <FormCardInput
                type='text'
                value={formData.previsaoDeRetorno}
                onChange={(e) => {
                  setFormData((prevData) => ({ ...prevData, previsaoDeRetorno: e.target.value }));
                  ocultarMensagens();
                }}
              />
              {formData.mostrarMensagens && formData.previsaoDeRetornoError && (
                <ErrorMessage>{formData.previsaoDeRetornoError}</ErrorMessage>
              )}
            </div>
            <div>
              <FormCardLabel>Locais Afetados:</FormCardLabel>
              <FormCardInput
                type='text'
                value={formData.locaisAfetados}
                onChange={(e) => {
                  setFormData((prevData) => ({ ...prevData, locaisAfetados: e.target.value }));
                  ocultarMensagens();
                }}
              />
            </div>
            <div>
            <FormCardLabel>Informações Adicionais: </FormCardLabel>
            <FormCardInput
              type='text'
              value={formData.informacoesAdicionais}
              onChange={(e) => {
                setFormData((prevData) => ({ ...prevData, informacoesAdicionais: e.target.value }));
                ocultarMensagens();
              }}
            />
          </div>
        <FormCardSalvarButton onClick={criarCard}>
          Salvar
        </FormCardSalvarButton>
        </ModalContent>
        </FormCardContainer>
      </ModalContainer>
      
        {massives.map((card, index) => (
          <MassiveCard key={index} card={card} onDelete={(id) => {
            setMassives((prevMassives) => prevMassives.filter((c) => c.id !== id));
          }} />
        ))}
       
    </AppContainer>
  );
}