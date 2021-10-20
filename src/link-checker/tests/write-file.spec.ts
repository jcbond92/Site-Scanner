import writeFile from '../utils/write-file';
import fs from 'fs';

describe('writing files', () => {
    test('writing file successfully', async () => {
        const config = {
            path: './src/link-checker/tests/test.json',
            test: true,
        };
        const data = [{ url: 'https://www.joebond.dev', status: 200 }];
        await expect(writeFile(config, data)).resolves.toBeTruthy();
    });

    test('writing file unsuccessfully', async () => {
        const config = {
            path: './test/link-checker/tests/test.json',
            test: true,
        };
        const data = [{ url: 'https://www.joebond.dev', status: 200 }];
        await expect(writeFile(config, data)).rejects.toEqual('error');
    });

    afterAll(() => {
        const path = './src/link-checker/tests/test.json';
        fs.unlink(path, (err) => {
            if (err) console.log(err);
        });
    });
});
