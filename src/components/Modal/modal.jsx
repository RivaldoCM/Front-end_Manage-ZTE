import React from 'react';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import { NovoMassiva } from './style/novoMassivaButton';
import { ModalContainer, ModalContent, ModalHeader } from './style/ModalStyles';
import {
  FormCardContainer,
  FormCardInput,
  FormCardLabel,
  FormCardSalvarButton,
  FormCardSelect,
} from './style/FormCard';

const MassiveModal = ({ isOpen, onClose, onSubmit, formData, onInputChange, onSelectChange, mostrarMensagens }) => {
  return (
    <ModalContainer style={{ display: isOpen ? 'block' : 'none' }}>
      <ModalHeader>
        <div onClick={onClose}>
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
                onInputChange('localidade', e.target.value);
                ocultarMensagens();
              }}
            />
            {mostrarMensagens && formData.localidadeError && (
              <ErrorMessage>{formData.localidadeError}</ErrorMessage>
            )}
          </div>
          <div>
            <FormCardLabel>Tipo de Falha:</FormCardLabel>
            <FormCardSelect
              value={formData.tipoDeFalha}
              onChange={(e) => onSelectChange('tipoDeFalha', e.target.value)}
            >
              <option value=''>Selecione a Falha</option>
              <option value='ROMPIMENTO'>ROMPIMENTO</option>
              <option value='FALHA DE ENERGIA'>FALHA DE ENERGIA</option>
              <option value='LENTIDÃO'>LENTIDÃO</option>
              <option value='MANUTENÇÃO'>MANUTENÇÃO</option>
            </FormCardSelect>
            {mostrarMensagens && formData.tipoDeFalhaError && (
              <ErrorMessage>{formData.tipoDeFalhaError}</ErrorMessage>
            )}
          </div>
          <div>
            <FormCardLabel>Horário da Falha:</FormCardLabel>
            <FormCardInput
              type='time'
              value={formData.horarioDaFalha}
              onChange={(e) => {
                onInputChange('horarioDaFalha', e.target.value);
                ocultarMensagens();
              }}
            />
            {mostrarMensagens && formData.horarioDaFalhaError && (
              <ErrorMessage>{formData.horarioDaFalhaError}</ErrorMessage>
            )}
          </div>
          <div>
            <FormCardLabel>Previsão de Retorno:</FormCardLabel>
            <FormCardInput
              type='text'
              value={formData.previsaoDeRetorno}
              onChange={(e) => {
                onInputChange('previsaoDeRetorno', e.target.value);
                ocultarMensagens();
              }}
            />
            {mostrarMensagens && formData.previsaoDeRetornoError && (
              <ErrorMessage>{formData.previsaoDeRetornoError}</ErrorMessage>
            )}
          </div>
          <div>
            <FormCardLabel>Locais Afetados:</FormCardLabel>
            <FormCardInput
              type='text'
              value={formData.locaisAfetados}
              onChange={(e) => {
                onInputChange('locaisAfetados', e.target.value);
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
                onInputChange('informacoesAdicionais', e.target.value);
                ocultarMensagens();
              }}
            />
          </div>
          <FormCardSalvarButton onClick={onSubmit}>Salvar</FormCardSalvarButton>
        </ModalContent>
      </FormCardContainer>
    </ModalContainer>
  );
};

export default MassiveModal;
