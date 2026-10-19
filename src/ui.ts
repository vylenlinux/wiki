import {
    applyTheme,
    getStoredTheme,
    toggleTheme
} from "./theme";

import {
    parseHash
} from "./router";

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

    document.querySelectorAll<HTMLAnchorElement>(".toc a").forEach((link): void => {
        link.addEventListener("click", (event: MouseEvent): void => {
            const current: ReturnType<typeof parseHash> = parseHash(window.location.hash);
            const target:  ReturnType<typeof parseHash> = parseHash(link.hash);

            if (target.path !== current.path || !target.anchor) return;

            const element: HTMLElement | null = document.getElementById(target.anchor);
            if (!element) return;

            event.preventDefault();
            window.history.pushState(null, "", link.hash);

            element.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
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
