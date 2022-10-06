import "reflect-metadata";

import React from 'react';
import { createClient } from 'urql';
import { Provider as IocProvider } from "inversify-react";
import { Provider as UrqlProvider } from 'urql';
import { container } from "./ioc";

import { Cujo } from "./Cujo";

const urqlClient = createClient({
    url: 'http://localhost:5001/graphql',
});

const App = () => (
    <UrqlProvider value={urqlClient}>
        <IocProvider container={container}>
            <Cujo />
        </IocProvider>
    </UrqlProvider>
);

export default App;