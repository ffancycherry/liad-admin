import { DataProvider, fetchUtils } from 'react-admin';
import { stringify } from 'query-string';
import axios from 'axios';

const apiUrl = 'http://localhost:3000/api/admin';
const httpClient = fetchUtils.fetchJson;

export default {
    getList: async (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };
        const url = `${apiUrl}/${resource}/list?${stringify(query)}`;
        const {
            data
        } = await axios.get(url)
        console.log(data)
        return {
            data: data.items,
            total: data.count,
        };
    },

    /*getOne: async (resource, params) => {
        const url = `${apiUrl}/${resource}/one?id=${params.id}`
        const {
            data
        } = await axios.get(url)

        const expectedProperties = ['projectItem', 'devteamItem', 'eventsItem'];
        const foundProperty = expectedProperties.find(prop => Object.prototype.hasOwnProperty.call(data, prop));

        return {
            data: data[foundProperty],
        };
    },*/

    getOne: async (resource, params) => {
        try {
            const url = `${apiUrl}/${resource}/one?id=${params.id}`;
            const { data } = await axios.get(url);
    
            if (!data || typeof data !== 'object') {
                console.error('Неверный формат ответа:', data);
                throw new Error('Неверный формат ответа');
            }
    
            const expectedProperties = ['projectItem', 'devteamItem', 'eventItem'];
            const foundProperty = expectedProperties.find(prop => Object.prototype.hasOwnProperty.call(data, prop));
    
            if (foundProperty === undefined) {
                console.error('Ответ не содержит ни одного из ожидаемых свойств:', data);
                throw new Error('Отсутствуют ожидаемые свойства projectItem, devteamItem или eventsItem');
            }
    
            return { data: data[foundProperty] };
        } catch (error) {
            console.error('Ошибка при выполнении getOne:', error);
            throw error;
        }
    },

    getMany: async (resource, params) => {
        const query = {
            filter: JSON.stringify({ ids: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        const { json } = await httpClient(url);
        return { data: json };
    },

    getManyReference: async (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        const { json, headers } = await httpClient(url);
        return {
            data: json,
            total: parseInt(headers.get('content-range').split('/').pop(), 10),
        };
    },

    create: async (resource, params) => {
        const { json } = await httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        })
        return { data: json };
    },

    update: async (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`;
        const { json } = await httpClient(url, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        })
        return { data: json };
    },

    updateMany: async (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        const { json } = await httpClient(url, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        })
        return { data: json };
    },

    delete: async (resource, params) => {
        const id = params.previousData && params.previousData.id
        const url = `${apiUrl}/${resource}/delete?id=${id}`

        const {
            data
        } = await axios.get(url)
        return {
            data
        };
    },

    deleteMany: async (resource, params) => {
        const url = `${apiUrl}/${resource}/delete-many?ids=${JSON.stringify(params.ids)}`
  
        await axios.get(url)
  
        return {
          data: []
        };
      },
} as DataProvider;