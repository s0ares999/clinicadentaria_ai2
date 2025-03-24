const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('clinica_dentaria', 'postgres', 'postgres', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  logging: false
});

async function checkDatabase() {
  try {
    // 1. Testar conexão
    await sequelize.authenticate();
    console.log('\n✅ Conexão estabelecida com sucesso!\n');

    // 2. Listar todas as tabelas
    console.log('=== TABELAS EXISTENTES ===');
    const [tables] = await sequelize.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);
    console.log(tables.map(t => t.table_name).join('\n'));

    // 3. Verificar estrutura da tabela utilizadores
    console.log('\n=== ESTRUTURA DA TABELA UTILIZADORES ===');
    const [utilizadoresStructure] = await sequelize.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'Utilizadores'
      ORDER BY ordinal_position;
    `);
    console.log(utilizadoresStructure);

    // 4. Verificar estrutura da tabela TipoUtilizador
    console.log('\n=== ESTRUTURA DA TABELA TIPOUTILIZADOR ===');
    const [tipoUtilizadorStructure] = await sequelize.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'TipoUtilizador'
      ORDER BY ordinal_position;
    `);
    console.log(tipoUtilizadorStructure);

    // 5. Listar todos os tipos de utilizador
    console.log('\n=== TIPOS DE UTILIZADOR CADASTRADOS ===');
    const [tipos] = await sequelize.query(`
      SELECT * FROM "TipoUtilizador" ORDER BY id;
    `);
    console.log(tipos);

    // 6. Listar todos os utilizadores com seus tipos
    console.log('\n=== UTILIZADORES CADASTRADOS ===');
    const [utilizadores] = await sequelize.query(`
      SELECT 
        u.id,
        u.nome,
        u.email,
        u.telefone,
        t.nome as tipo,
        u."createdAt",
        u."updatedAt"
      FROM "Utilizadores" u
      LEFT JOIN "TipoUtilizador" t ON u.tipo_utilizador_id = t.id
      ORDER BY u.id;
    `);
    console.log(utilizadores);

    // 7. Verificar um utilizador específico
    const email = 'pedro_mdsoares@hotmail.com';
    console.log(`\n=== VERIFICANDO UTILIZADOR ESPECÍFICO (${email}) ===`);
    const [utilizador] = await sequelize.query(`
      SELECT 
        u.*,
        t.nome as tipo_nome
      FROM utilizadores u
      LEFT JOIN "TipoUtilizador" t ON u.tipo_utilizador_id = t.id
      WHERE u.email = :email
    `, {
      replacements: { email },
      type: Sequelize.QueryTypes.SELECT
    });
    console.log(utilizador || 'Utilizador não encontrado');

  } catch (error) {
    console.error('Erro ao verificar banco de dados:', error);
  } finally {
    await sequelize.close();
  }
}

checkDatabase(); 