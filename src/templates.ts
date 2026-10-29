import {
    format
} from "node:util";

import nunjucks from "nunjucks";

export type TemplateMap = Map<string, string>;

export interface TemplateRegistry {
    layout: string;
    pages: TemplateMap;
    notFound: string;
}

const templateModules: Record<string, string> = import.meta.glob("/pages/**/*.njk", {
    eager: true,
    query: "?raw",
    import: "default"
}) as Record<string, string>;

export function routeFromFile(file: string): string {
    const relative: string = file.split("/pages/").pop()!.replace(/\.njk$/, "");

    if (relative === "index") return "/";
    if (relative.endsWith("/index")) return format("/%s", relative.slice(0, -6));

    return format("/%s", relative);
}

export function createTemplateRegistry(): TemplateRegistry {
    const pages: TemplateMap = new Map();

    let layout:   string = "";
    let notFound: string = "";

    for (const [file, template] of Object.entries(templateModules)) {
        if (file.endsWith("/_layout.njk")) {
            layout = template;
            continue;
        }

        if (file.endsWith("/404.njk")) {
            notFound = template;
            continue;
        }

        pages.set(routeFromFile(file), template);
    }

    if (!layout || !notFound) throw new Error("Required layout or 404 template is missing");

    return {
        layout,
        pages,
        notFound
    };
}

export function renderTemplate(template: string, context: Record<string, unknown>): string {
    return nunjucks.renderString(template, context);
}
