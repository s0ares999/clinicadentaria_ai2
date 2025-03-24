const { Sequelize } = require('sequelize');
const bcrypt = require('bcryptjs');

const sequelize = new Sequelize('clinica_dentaria', 'postgres', 'postgres', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  logging: false
});

async function cleanDatabase() {
  try {
    console.log('\n=== INICIANDO LIMPEZA DO BANCO DE DADOS ===');

    // 1. Remover tabelas existentes
    console.log('\n1. Removendo tabelas existentes...');
    await sequelize.query(`
      DROP TABLE IF EXISTS "Clientes" CASCADE;
      DROP TABLE IF EXISTS "Utilizadores" CASCADE;
      DROP TABLE IF EXISTS "TipoUtilizador" CASCADE;
    `);

    // 2. Criar TipoUtilizador
    console.log('\n2. Criando tabela TipoUtilizador...');
    await sequelize.query(`
      CREATE TABLE "TipoUtilizador" (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(50) NOT NULL UNIQUE,
        descricao TEXT,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      -- Inserir tipos básicos
      INSERT INTO "TipoUtilizador" (id, nome, descricao)
      VALUES 
        (1, 'cliente', 'Utilizador padrão do sistema'),
        (2, 'admin', 'Administrador do sistema'),
        (3, 'medico', 'Médico dentista')
      ON CONFLICT (id) DO UPDATE 
      SET nome = EXCLUDED.nome,
          descricao = EXCLUDED.descricao;
    `);

    // 3. Criar tabela Utilizadores
    console.log('\n3. Criando tabela Utilizadores...');
    await sequelize.query(`
      CREATE TABLE "Utilizadores" (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        senha VARCHAR(255) NOT NULL,
        telefone VARCHAR(255),
        tipo_utilizador_id INTEGER NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_tipo_utilizador 
          FOREIGN KEY (tipo_utilizador_id) 
          REFERENCES "TipoUtilizador" (id)
      );

      CREATE INDEX idx_utilizadores_email ON "Utilizadores"(email);
    `);

    // 4. Criar tabela Clientes
    console.log('\n4. Criando tabela Clientes...');
    await sequelize.query(`
      CREATE TABLE "Clientes" (
        utilizador_id INTEGER PRIMARY KEY,
        nome VARCHAR(255),
        email VARCHAR(255),
        telefone VARCHAR(255),
        data_nascimento DATE,
        morada VARCHAR(255),
        nif VARCHAR(20),
        historico TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_utilizador
          FOREIGN KEY (utilizador_id)
          REFERENCES "Utilizadores" (id)
          ON DELETE CASCADE
          ON UPDATE CASCADE
      );

      CREATE INDEX idx_clientes_email ON "Clientes"(email);
      CREATE INDEX idx_clientes_nif ON "Clientes"(nif);
    `);

    // 5. Inserir dados de teste
    console.log('\n5. Inserindo dados de teste...');
    
    // Criar senha hash
    const hashedPassword = await bcrypt.hash('123456', 8);

    // Inserir utilizador de teste
    await sequelize.query(`
      INSERT INTO "Utilizadores" (
        nome, 
        email, 
        senha, 
        telefone, 
        tipo_utilizador_id
      ) VALUES (
        'Pedro Soares',
        'pedro_mdsoares@hotmail.com',
        :senha,
        '912345678',
        1
      ) ON CONFLICT (email) DO UPDATE 
      SET nome = EXCLUDED.nome,
          senha = EXCLUDED.senha,
          telefone = EXCLUDED.telefone
      RETURNING id;
    `, {
      replacements: { senha: hashedPassword }
    });

    // Buscar ID do utilizador inserido
    const [utilizador] = await sequelize.query(`
      SELECT id FROM "Utilizadores" 
      WHERE email = 'pedro_mdsoares@hotmail.com'
      LIMIT 1;
    `, { type: sequelize.QueryTypes.SELECT });

    if (utilizador) {
      // Inserir dados do cliente
      await sequelize.query(`
        INSERT INTO "Clientes" (
          utilizador_id,
          nome,
          email,
          telefone,
          data_nascimento,
          morada,
          nif
        ) VALUES (
          :id,
          'Pedro Soares',
          'pedro_mdsoares@hotmail.com',
          '912345678',
          '1990-01-01',
          'Rua Example, 123',
          '123456789'
        ) ON CONFLICT (utilizador_id) DO UPDATE 
        SET nome = EXCLUDED.nome,
            email = EXCLUDED.email,
            telefone = EXCLUDED.telefone,
            data_nascimento = EXCLUDED.data_nascimento,
            morada = EXCLUDED.morada,
            nif = EXCLUDED.nif;
      `, {
        replacements: { id: utilizador.id }
      });
    }

    console.log('\n✅ Banco de dados limpo e reinicializado com sucesso!');

  } catch (error) {
    console.error('\n❌ Erro durante a limpeza do banco de dados:', error);
    throw error;
  } finally {
    await sequelize.close();
  }
}

// Executar a limpeza
cleanDatabase().catch(console.error); 