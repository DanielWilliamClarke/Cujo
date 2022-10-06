import "reflect-metadata";

import { Provider as IocProvider } from "inversify-react";
import React from 'react';
import { createClient, Provider as UrqlProvider } from 'urql';
import { container } from "./ioc";

import { Cujo } from "./Cujo";

import { runtimeConfig } from './config';

const urqlClient = createClient({
    url: runtimeConfig.CUJO_SERVICE_URL ?? '',
});

const App = () => (
    <UrqlProvider value={urqlClient}>
        <IocProvider container={container}>
            <Cujo />
        </IocProvider>
    </UrqlProvider>
);

export default App;