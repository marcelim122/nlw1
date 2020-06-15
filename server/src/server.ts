//npm install typescript -D
//npm install ts-node-dev -D, sempre q houver alteração no codigo vai ser executado novamente (executa: npx ts-node-dev caminho_arquivo)
//criar arquivo de configuração do typescript com npx tsc --init
//instalar o npm ts-node -D, pois o node só entende formato .js, executa com npx ts-node caminho_do_arquivo
//deve seguir a definição de tipos da biblioteca, instalar a defiinição de tipos sempre que tiver .. na importação, npm install @types/nome_biblioteca -D , -D(dependencia de desenvolvimento)
import express from 'express';
import routes from './routes';
import path from 'path';
import cors from 'cors';

import {errors} from 'celebrate';

const app = express();


app.use(cors());
//use: funciona como um plugin, adiciona uma nova funcionalidade ao app, no caso fazer o app entender o formato .json
app.use(express.json());
app.use(routes);

//utilizar arquivos estaticos de uma pasta especifica
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

/*const users = [
    'Marcelo',
    'Marcos',
    'Arthur',
    'teste1'
];*/

/*app.get('/users', (request, response) => {
    //console.log('Listagem de usuários');

    const search = String(request.query.search);

    //filtra se o valor do usuario condiz com o filtro presente na variavel search
    //if ternario: se existir a informação da variavel search ele segue a filtragem, caso contrario retorna os usuarios mesmo
    const filteredUsers = search ? users.filter(user => user.includes(search)) : users;

    //retorna dados no formato json
    response.json([
        'Marcelo',
        'Marcos',
        'Arthur',
        'teste1'
    ]);

    return response.json(filteredUsers);
});

//recebe o id do usuario a buscar
app.get('/users/:id', (request, response) => {
    //ao capturar o valor passado por parametro, como é TS o valor é sting, o Number converte o valor para numerico
    const id = Number(request.params.id);

    const user = users[id];

    return response.json(user);
});

app.post('/users', (request, response) => {
    const data = request.body;

    console.log(data);

    const user = {
        name: data.name,
        email: data.email,
    };

    return response.json(user); //forçar a requisição parar por aqui
});*/

app.use(errors());

app.listen(3333);