/// <reference types="vite/client" />
declare module "*.njk?raw" {
    const template: string;
    export default template;
}
