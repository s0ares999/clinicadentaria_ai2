import React, { useState } from 'react';
import styled from 'styled-components';
import html2pdf from 'html2pdf.js/dist/html2pdf.min.js';

const StyledButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: 500;
  transition: background-color 0.3s;
  font-size: 1rem;

  &:hover:not(:disabled) {
    background-color: #2980b9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  i {
    margin-right: 8px;
  }
  
  @media (max-width: 768px) {
    flex: 1;
    justify-content: center;
  }

  @media print {
    display: none;
  }
`;

const PDFGeneratorButton = ({
  elementRef,
  filename,
  buttonText = 'Gerar PDF',
  loadingText = 'Gerando PDF...',
  onStart,
  onSuccess,
  onError,
  pdfOptions = {},
  className,
  style,
  disabled = false
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const defaultOptions = {
    margin: [0.5, 0.5, 0.5, 0.5],
    filename: filename || `documento-${new Date().toISOString().split('T')[0]}.pdf`,
    image: {
      type: 'jpeg',
      quality: 0.98
    },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true,
      allowTaint: false,
      backgroundColor: '#ffffff'
    },
    jsPDF: {
      unit: 'in',
      format: 'a4',
      orientation: 'portrait',
      compress: true
    },
    pagebreak: {
      mode: ['avoid-all', 'css', 'legacy']
    }
  };

  const handleGeneratePDF = async () => {
    if (!elementRef?.current) {
      console.error('Referência do elemento não encontrada');
      alert('Erro ao gerar PDF: elemento não encontrado');
      return;
    }

    if (disabled || isGenerating) {
      return;
    }

    try {
      setIsGenerating(true);
      
      // Callback de início
      if (onStart) {
        onStart();
      }

      const element = elementRef.current;
      const options = { ...defaultOptions, ...pdfOptions };

      console.log('Iniciando geração do PDF...');

      await html2pdf()
        .set(options)
        .from(element)
        .toPdf()
        .get('pdf')
        .then((pdf) => {
          console.log('PDF gerado com sucesso');
          
          // Callback de sucesso
          if (onSuccess) {
            onSuccess(pdf);
          }
        })
        .save()
        .catch((error) => {
          console.error('Erro na geração do PDF:', error);
          throw error;
        });

    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      
      // Callback de erro
      if (onError) {
        onError(error);
      } else {
        alert('Erro ao gerar PDF. Por favor, tente novamente.');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <StyledButton
      onClick={handleGeneratePDF}
      disabled={disabled || isGenerating}
      className={className}
      style={style}
      title={isGenerating ? loadingText : buttonText}
    >
      <i className={isGenerating ? "fas fa-spinner fa-spin" : "fas fa-file-pdf"}></i>
      {isGenerating ? loadingText : buttonText}
    </StyledButton>
  );
};

export default PDFGeneratorButton;