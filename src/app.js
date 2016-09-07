import routes from './routes';

export class App {
    configureRouter(config, router) {
        this.router = router;
        config.map(routes);
        config.options.pushState = true;
    }
}
