/**
 * Utilitários de validação reutilizáveis
 */

/**
 * Valida um endereço de email
 * @param {string} email - Email a ser validado
 * @returns {boolean} True se o email for válido
 */
exports.isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return typeof email === 'string' && re.test(email);
};

/**
 * Valida um número de telefone português
 * @param {string} telefone - Número de telefone a ser validado
 * @returns {boolean} True se o telefone for válido
 */
exports.isValidPortugueseTelephone = (telefone) => {
  // Formato português: 9xxxxxxxx ou +351xxxxxxxxx
  const rePortuguese = /^(9\d{8}|\+351\d{9})$/;
  return typeof telefone === 'string' && rePortuguese.test(telefone.replace(/\s/g, ''));
};

/**
 * Valida um NIF português
 * @param {string} nif - NIF a ser validado
 * @returns {boolean} True se o NIF for válido
 */
exports.isValidNIF = (nif) => {
  // NIF tem 9 dígitos
  if (typeof nif !== 'string' || !/^\d{9}$/.test(nif)) {
    return false;
  }
  
  // Algoritmo de validação do NIF
  const checkDigit = parseInt(nif.charAt(8), 10);
  let sum = 0;
  
  for (let i = 0; i < 8; i++) {
    sum += parseInt(nif.charAt(i), 10) * (9 - i);
  }
  
  const remainder = sum % 11;
  const calculatedDigit = remainder < 2 ? 0 : 11 - remainder;
  
  return checkDigit === calculatedDigit;
};

/**
 * Valida uma data no formato ISO (YYYY-MM-DD)
 * @param {string} date - Data a ser validada
 * @returns {boolean} True se a data for válida
 */
exports.isValidDate = (date) => {
  if (typeof date !== 'string') return false;
  
  // Verifica o formato
  const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateFormat.test(date)) return false;
  
  // Verifica se é uma data válida
  const parsedDate = new Date(date);
  return !isNaN(parsedDate.getTime());
};

/**
 * Valida se uma data está no futuro
 * @param {string} date - Data a ser validada
 * @returns {boolean} True se a data for no futuro
 */
exports.isFutureDate = (date) => {
  if (!exports.isValidDate(date)) return false;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const parsedDate = new Date(date);
  
  return parsedDate > today;
};

/**
 * Valida um número de CRM (simplificado)
 * @param {string} crm - CRM a ser validado
 * @returns {boolean} True se o CRM for válido
 */
exports.isValidCRM = (crm) => {
  // Implementação simplificada - em produção deve ser mais específica
  return typeof crm === 'string' && crm.length >= 3 && crm.length <= 20;
};

/**
 * Mapeia o nome do tipo de utilizador para o ID
 * @param {string} tipoNome - Nome do tipo de utilizador
 * @returns {number|null} ID do tipo ou null se não encontrado
 */
exports.mapTipoToId = (tipoNome) => {
  const mapeamento = {
    'cliente': 1,
    'admin': 2, 
    'medico': 3
  };
  return mapeamento[tipoNome] || null;
};

/**
 * Mapeia o ID do tipo de utilizador para o nome
 * @param {number} tipoId - ID do tipo de utilizador
 * @returns {string|null} Nome do tipo ou null se não encontrado
 */
exports.mapIdToTipo = (tipoId) => {
  const mapeamento = {
    1: 'cliente',
    2: 'admin',
    3: 'medico'
  };
  return mapeamento[tipoId] || null;
}; 