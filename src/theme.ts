export type Theme = "dark" | "light";

const THEME_KEY: string = "vylen-theme";

export function getStoredTheme(): Theme {
    return ((localStorage.getItem(THEME_KEY) === "light") ? "light" : "dark");
}

export function applyTheme(theme: Theme): void {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_KEY, theme);

    const button: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>("#theme-toggle");
    const icon: HTMLElement | null | undefined = button?.querySelector<HTMLElement>(".theme-icon");
    const label: HTMLElement | null | undefined = button?.querySelector<HTMLElement>(".theme-label");

    if (!button || !icon || !label) return;

    const light: boolean = (theme === "light");
    button.setAttribute("aria-label", (light ? "Switch to dark theme" : "Switch to light theme"));

    icon.textContent = (light ? "☾" : "☼");
    label.textContent = (light ? "Dark" : "Light");
}

export function toggleTheme(): void {
    applyTheme((document.documentElement.dataset.theme === "dark") ? "light" : "dark");
}
