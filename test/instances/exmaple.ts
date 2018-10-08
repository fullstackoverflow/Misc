import { Misc } from '../../lib/core/app';

const app = new Misc({
    protocol: 'http',
    port: 6060
});

const exmaple = app.server;

export { exmaple }