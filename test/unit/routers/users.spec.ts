import request from 'supertest';
import {mocked} from 'ts-jest/utils';
import app from '../../../src';

const mockedRequest = mocked(request, true);

describe('/api/users', () => {
    const usersUrl = '/api/users';

    describe('GET /', () => {

        it('should return all users', async () => {
            const result = mockedRequest(app)
                .get(usersUrl)
                .expect({
                    name: 'Joe',
                    email: 'jdoe@abc123.com',
                    password: 'Abcd1234'
                });

            expect(result).toBe({});
        });
    });
});

