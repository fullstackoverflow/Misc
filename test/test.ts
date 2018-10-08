import request from 'supertest';
import { exmaple } from './instances/exmaple';

test('exmaple test', async () => {
    const res = await request(exmaple).get('/');
    expect(res.status).toBe(404);
    expect(res.text).toBe('Not Found');
})