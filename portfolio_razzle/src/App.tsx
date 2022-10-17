import "reflect-metadata";

import { Provider as IocProvider } from "inversify-react";
import React from 'react';
import { createClient, Provider as UrqlProvider } from 'urql';
import { container } from "./ioc";

import { Cujo } from "./Cujo";

const urqlClient = createClient({
    url: '/api/graphql',
});

const App = () => (
    <UrqlProvider value={urqlClient}>
        <IocProvider container={container}>
            <Cujo />
        </IocProvider>
    </UrqlProvider>
);

export default App;