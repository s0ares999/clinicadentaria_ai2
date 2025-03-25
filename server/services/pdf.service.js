const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

class PDFService {
  /**
   * Gera um PDF de fatura
   * @param {Object} fatura Dados da fatura
   * @param {Object} options Opções para geração do PDF
   * @returns {Promise<Buffer>} Buffer contendo os dados do PDF
   */
  static async generateInvoicePDF(fatura, options = {}) {
    return new Promise((resolve, reject) => {
      try {
        // Cria um novo documento PDF
        const doc = new PDFDocument({
          size: 'A4',
          margin: 50,
          info: {
            Title: `Fatura #${fatura.id}`,
            Author: 'Clínica Dentária',
            Subject: `Fatura para Consulta #${fatura.consulta_id}`,
          }
        });

        // Buffer para armazenar o PDF
        const buffers = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
          const pdfData = Buffer.concat(buffers);
          resolve(pdfData);
        });

        // Configuração de fontes e cores
        const corPrimaria = '#3498db';
        const corSecundaria = '#2c3e50';
        
        // Cabeçalho
        doc.font('Helvetica-Bold')
           .fontSize(24)
           .fillColor(corSecundaria)
           .text('CLÍNICA DENTÁRIA', { align: 'center' })
           .moveDown(0.5);

        // Logo (se existir)
        try {
          const logoPath = path.join(__dirname, '../assets/logo.png');
          if (fs.existsSync(logoPath)) {
            doc.image(logoPath, { width: 150, align: 'center' });
          }
        } catch (error) {
          console.log('Logo não encontrado, continuando sem imagem');
        }

        // Informações da fatura
        doc.fontSize(18)
           .fillColor(corPrimaria)
           .text(`FATURA #${fatura.id}`, { align: 'center' })
           .moveDown();

        // Status da fatura
        const statusMap = {
          'Emitida': { text: 'PENDENTE', color: '#f39c12' },
          'Paga': { text: 'PAGA', color: '#27ae60' },
          'Cancelada': { text: 'CANCELADA', color: '#e74c3c' }
        };
        
        const status = statusMap[fatura.status?.nome] || { text: 'DESCONHECIDO', color: '#7f8c8d' };
        
        doc.fontSize(14)
           .fillColor(status.color)
           .text(status.text, { align: 'center' })
           .moveDown(2);

        // Detalhes da consulta
        doc.fontSize(12)
           .fillColor(corSecundaria);

        // Dados do paciente
        doc.font('Helvetica-Bold')
           .text('Paciente:')
           .font('Helvetica')
           .text(fatura.consulta?.utilizador?.nome || 'Nome não disponível')
           .moveDown(0.5);

        // Dados da consulta
        doc.font('Helvetica-Bold')
           .text('Data da Consulta:')
           .font('Helvetica')
           .text(fatura.consulta ? new Date(fatura.consulta.data_hora).toLocaleDateString('pt-PT') + ' ' + 
                new Date(fatura.consulta.data_hora).toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }) : 'Data não disponível')
           .moveDown(0.5);

        doc.font('Helvetica-Bold')
           .text('Data de Emissão:')
           .font('Helvetica')
           .text(new Date(fatura.createdAt).toLocaleDateString('pt-PT'))
           .moveDown(2);

        // Linha divisória
        doc.moveTo(50, doc.y)
           .lineTo(doc.page.width - 50, doc.y)
           .stroke(corPrimaria)
           .moveDown();

        // Detalhes do serviço
        doc.font('Helvetica-Bold')
           .fontSize(14)
           .text('DETALHES DO SERVIÇO', { align: 'center' })
           .moveDown();

        // Tabela de serviços
        const startX = 50;
        let currentY = doc.y;
        const colWidths = [300, 100, 100];
        
        // Cabeçalho da tabela
        doc.font('Helvetica-Bold')
           .fontSize(12);
        
        doc.text('Descrição', startX, currentY);
        doc.text('Qtd.', startX + colWidths[0], currentY, { width: colWidths[1], align: 'center' });
        doc.text('Valor', startX + colWidths[0] + colWidths[1], currentY, { width: colWidths[2], align: 'right' });
        
        currentY += 20;
        
        // Linha divisória de cabeçalho
        doc.moveTo(startX, currentY)
           .lineTo(doc.page.width - 50, currentY)
           .stroke('#e0e0e0');
        
        currentY += 10;
        
        // Item de serviço
        doc.font('Helvetica')
           .fontSize(12)
           .text(fatura.observacoes || 'Consulta odontológica', startX, currentY, { width: colWidths[0] });
        
        doc.text('1', startX + colWidths[0], currentY, { width: colWidths[1], align: 'center' });
        doc.text(`€ ${parseFloat(fatura.valor_total).toFixed(2)}`, startX + colWidths[0] + colWidths[1], currentY, 
                 { width: colWidths[2], align: 'right' });
        
        currentY += 30;
        
        // Linha divisória final
        doc.moveTo(startX, currentY)
           .lineTo(doc.page.width - 50, currentY)
           .stroke('#e0e0e0');
        
        currentY += 20;
        
        // Total
        doc.font('Helvetica-Bold')
           .fontSize(14)
           .text('TOTAL:', startX + colWidths[0], currentY, { width: 100 });
        
        doc.text(`€ ${parseFloat(fatura.valor_total).toFixed(2)}`, startX + colWidths[0] + colWidths[1], currentY, 
                 { width: colWidths[2], align: 'right' });
        
        currentY += 50;
        
        // Observações adicionais
        if (fatura.observacoes) {
          doc.font('Helvetica-Bold')
             .fontSize(12)
             .text('Observações:', startX, currentY)
             .moveDown(0.5);
          
          doc.font('Helvetica')
             .fontSize(11)
             .text(fatura.observacoes, { width: doc.page.width - 100 })
             .moveDown(2);
        }
        
        // Rodapé
        const rodapeY = doc.page.height - 100;
        
        doc.fontSize(10)
           .font('Helvetica')
           .fillColor('#7f8c8d')
           .text('Clínica Dentária - Cuidamos do seu sorriso', 50, rodapeY, { align: 'center', width: doc.page.width - 100 })
           .moveDown(0.5)
           .text('Tel: +351 210 000 000 | Email: contato@clinicadentaria.pt', { align: 'center', width: doc.page.width - 100 })
           .moveDown(0.5)
           .text('DOCUMENTO GERADO ELETRONICAMENTE', { align: 'center', width: doc.page.width - 100 });

        // Finaliza o documento
        doc.end();
        
      } catch (error) {
        console.error('Erro ao gerar PDF da fatura:', error);
        reject(error);
      }
    });
  }
}

module.exports = PDFService; 