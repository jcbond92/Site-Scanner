import getStatus from '../utils/get-status';
describe('getting link status', () => {
    test('getting the status of links', async () => {
        const config = {
            test: true,
        };
        const urls = [
            'https://www.joebond.dev',
            'https://www.joebond.dev/test404',
        ];
        await expect(getStatus(config, urls)).resolves.toBeInstanceOf(Array);
    });
});
