import "./style.css";

import {
    parseHash,
    pageTitle
} from "./router.js";

import {
    createTemplateRegistry,
    renderTemplate,

    type TemplateRegistry
} from "./templates.js";

import {
    bindPageInteractions
} from "./ui.js";

const root: HTMLDivElement | null = document.querySelector<HTMLDivElement>("#app");
if (!root) throw new Error("App root is missing");

const appRoot: HTMLDivElement = root;
const registry: TemplateRegistry = createTemplateRegistry();

function render(): void {
    const {
        path,
        anchor
    } = parseHash(window.location.hash);

    const template: string = (registry.pages.get(path) ?? registry.notFound);

    const body: string = renderTemplate(template, {
        path,

        route: path,
        pages: [...registry.pages.keys()]
    });

    appRoot.innerHTML = renderTemplate(registry.layout, {
        route: path,
        content: body
    });

    document.title = pageTitle(path);

    window.scrollTo({
        top: 0,
        behavior: "auto"
    });

    bindPageInteractions();
    if (anchor) window.setTimeout((): void => document.getElementById(anchor)?.scrollIntoView(), 0);
}

window.addEventListener("hashchange", render);
render();
