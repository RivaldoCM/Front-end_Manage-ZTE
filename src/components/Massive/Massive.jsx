import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Navbar } from './NavBar';
import { AppContainer, Overlay } from './style/AppStyled';
import MassiveCardItem from '../../components/Card/MassiveCardItem';
import MassiveModal from '../../components/Card/MassiveModal';

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

  const isModalOpen = () => {
    setFormData((prevData) => ({ ...prevData, isOpen: true }));
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

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSelectChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
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
      <MassiveModal
        isOpen={formData.isOpen}
        onClose={isModalClose}
        onSubmit={criarCard}
        formData={formData}
        onInputChange={handleInputChange}
        onSelectChange={handleSelectChange}
        mostrarMensagens={formData.mostrarMensagens}
      />
      {massives.map((card, index) => (
        <MassiveCardItem key={index} card={card} onDelete={(id) => setMassives((prevMassives) => prevMassives.filter((c) => c.id !== id))} />
      ))}
    </AppContainer>
  );
}
