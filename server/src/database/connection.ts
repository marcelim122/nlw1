import knex from 'knex';
import path from 'path'; //retorna uma concatenação dos caminhos baseado no seu sistema operacional

const connection = knex({
    client: 'sqlite3', 
    connection: {
        //__dirname: retorna o caminho do diretorio para o database, cariavel global
        filename: path.resolve(__dirname, 'database.sqlite'),
    },

    useNullAsDefault: true,

});

export default connection;