-- Inserir status para faturas
INSERT INTO "FaturaStatus" ("id", "nome", "createdAt", "updatedAt") 
VALUES 
(1, 'Emitida', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Paga', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Cancelada', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP); 