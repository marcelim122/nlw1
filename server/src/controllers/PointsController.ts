import knex from '../database/connection';
import {Request, Response} from 'express';

class PointsController{
    async index(request: Request, response: Response){
        const {city, uf, items} = request.query;
        
        //trim(): retira os espaçamentos da direita e esquerda
        const parsedItems = String(items).split(',').map(item => Number(item.trim()));

        //whereIn: possui um item que esta presente dentro do filtro
        const points = await knex('points').join('point_items', 'points.id', '=', 'point_items.point_id').whereIn('point_items.item_id', parsedItems).where('city', String(city)).where('uf', String(uf)).distinct().select('points.*');

        const serializedPoints = points.map(point =>{
            return {
                ...point,
                image_url: `http://192.168.0.10:3333/uploads/${point.image}`,
            };
        });

        return response.json(serializedPoints);
    }

    async show(request: Request, response: Response){
        const {id} = request.params;

        const point = await knex('points').where('id', id).first();

        if (!point){
            return response.status(400).json({message: 'Point not found.'});
        }

        const serializedPoint = {
            ...point,
            image_url: `http://192.168.0.10:3333/uploads/${point.image}`,
        };

        //retorna todos os itens relacionados ao ponto pesquisado acima
        const items = await knex('items').join('point_items', 'items.id', '=', 'point_items.item_id').where('point_items.point_id', id).select('items.title');

        return response.json({point: serializedPoint, items});
    }

    async create(request: Request, response: Response){
        const {
            name, email, whatsapp, latitude, longitude, city, uf, items
        } = request.body;

        //impede a execução de alguma query se uma delas falharem
        const trx = await knex.transaction();

        const point ={
            image: request.file.filename, name, email, whatsapp, latitude, longitude, city, uf
        };

        const insertedIds = await trx('points').insert(point);

        const point_id = insertedIds[0];

        const pointItems = items.split(',').map((item:string) => Number(item.trim())).map((item_id: number) => {
            return {
                item_id, point_id,
            };
        })

        await trx('point_items').insert(pointItems);

        //realmente realiza o insert na base de dados, sempre q usar trx tem que dar commit
        await trx.commit();

        //retorna todos os dados presentes no objeto pontos e retornar dentro de outro objeto
        return response.json({
            id: point_id,
            ... point,
        });
    }
}

export default PointsController;