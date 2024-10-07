const app = require('../app/app');
const router = require('../app/routes');
const supertest = require('supertest');
const request = supertest(app);

beforeEach(()=>{
    items.push({ name : 'rice cakes', price : 4.99 });
});

afterEach(()=>{
    items.length = 0;
});

// GET tests
describe('GET /items', ()=>{
    test('returns all items', async ()=>{
        const response = await request.get('/items');
        expect(response.status).toBe(200);
        expect(response.body.items.length).toBe(1);
    });

    test('returns 404 if item not found', async ()=>{
        const response = await request.get('/items/beans');
        expect(response.status).toBe(404);
    });
});


// GET :name tests
describe('GET /items/:name', ()=>{
    test('returns item', async ()=>{
        const response = await request.get('/items/rice cakes');
        expect(response.status).toBe(200);
        expect(response.body.item.name).toBe('rice cakes');
    });

    test('returns 404 if item not found', async ()=>{
        const response = await request.get('/items/beans');
        expect(response.status).toBe(404);
    });
});


// POST tests
describe('POST /items', () => {
    test('creates new item', async () => {
        const newItem = { name: 'chocolate cake', price: 7.99 };
        const response = await request
            .post('/items')
            .send(newItem);
        expect(response.status).toBe(201);
        console.log(response.body);
        expect(response.body.item.name).toBe(newItem.name);
        expect(response.body.item.price).toBe(newItem.price);
    });

    test('returns 400 if missing name or price', async () => {
        const newItem = { name: '', price: 7.99 };
        const response = await request
            .post('/items')
            .send(newItem);
        expect(response.status).toBe(400);
    });
});


// PATCH tests
describe('PATCH /items/:name', ()=>{
    test('updates item', async ()=>{
        const response = await request
            .patch('/items/rice cakes')
            .send({ price : 5.99 });
        expect(response.status).toBe(200);
        expect(response.body.item.price).toBe(5.99);
    });

    test('returns 404 if item not found', async ()=>{
        const response = await request
            .patch('/items/beans')
            .send({ price : 5.99 });
        expect(response.status).toBe(404);
    });
});


// DELETE tests
describe('DELETE /items/:name', ()=>{
    test('deletes item', async ()=>{
        const response = await request
            .delete('/items/rice cakes');
        expect(response.status).toBe(204);
    });

    test('returns 404 if item not found', async ()=>{
        const response = await request
            .delete('/items/beans');
        expect(response.status).toBe(404);
    });
});


