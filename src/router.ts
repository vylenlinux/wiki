export interface RouteState {
    path:   string;
    anchor: string;
}

export function parseHash(hash: string): RouteState {
    const value: string = (hash.startsWith("#") ? hash.slice(1) : hash);
    const separator: number = value.indexOf("#");
    const rawPath: string = ((separator === -1) ? value : value.slice(0, separator));
    const anchor: string = ((separator === -1) ? "" : value.slice(separator + 1));
    const normalizedPath: string = rawPath.replace(/^\/+|\/+$/g, "");
    const path: string = ((normalizedPath === "") ? "/" : `/${normalizedPath}`);

    return {
        path: ((path === "//") ? "/" : path),
        anchor
    };
}

export function pageTitle(path: string): string {
    if (path === "/") return "Vylen Linux Wiki";

    const name:  string = (path.split("/").filter(Boolean).pop() ?? "Wiki");
    const title: string = name.replace(/\.njk$/, "").replace(/(^|[-_])([a-z])/g, (_: string, prefix: string, letter: string): string => `${prefix}${letter.toUpperCase()}`);

    return `${title} · Vylen Linux`;
}
