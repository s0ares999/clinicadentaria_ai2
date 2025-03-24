// Configuração de rotas
app.use('/api/utilizador', require('./routes/utilizador.routes'));
app.use('/api/consulta', require('./routes/consulta.routes'));
// ... outras rotas 