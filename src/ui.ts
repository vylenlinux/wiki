import {
    applyTheme,
    getStoredTheme,
    toggleTheme
} from "./theme";

export function bindPageInteractions(): void {
    const menu: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>("#menu-toggle");
    const nav: HTMLElement | null = document.querySelector<HTMLElement>("#primary-nav");
    const theme: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>("#theme-toggle");
    const top: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>("#back-top");

    applyTheme(getStoredTheme());
    theme?.addEventListener("click", toggleTheme);

    menu?.addEventListener("click", (): void => {
        const open: boolean = (nav?.classList.toggle("open") ?? false);
        menu.setAttribute("aria-expanded", String(open));
    });

    nav?.querySelectorAll("a").forEach((link: HTMLAnchorElement): void => {
        link.addEventListener("click", (): void => {
            nav.classList.remove("open");
            menu?.setAttribute("aria-expanded", "false");
        });
    });

    top?.addEventListener("click", (): void => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    const updateTop: () => void = (): void => {
        top?.classList.toggle("visible", window.scrollY > 480);
    };

    window.addEventListener("scroll", updateTop, {
        passive: true
    });

    updateTop();
}
