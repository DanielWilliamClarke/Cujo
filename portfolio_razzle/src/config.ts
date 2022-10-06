// config.js

declare global {
    interface Window {
        env: Record<string, any>;
    }
}

export const runtimeConfig =
    typeof window !== 'undefined'
        ? {
            // client
            CUJO_SERVICE_URL: window.env.CUJO_SERVICE_URL,
        }
        : {
            // server
            CUJO_SERVICE_URL: process.env.CUJO_SERVICE_URL,
        };
