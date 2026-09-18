import JSON5 from "json5";

export interface RootfsManifest {
    date:             string;
    tarball:          string;
    tarball_filename: string;
    b3sum:            string;
    b3sum_filename:   string;
}

function resolveVersionTemplate(value: string, version: string): string {
    return value.replaceAll("%(version)", version);
}

function getFilename(url: string): string {
    const index: number = url.lastIndexOf("/");
    return ((index === -1) ? url : url.slice(index + 1));
}

export async function loadRootfsManifest(): Promise<RootfsManifest | null> {
    try {
        const response: Response = await fetch("/rootfs.json5");

        if (!response.ok) {
            console.error("Unable to load rootfs manifest: HTTP %s", response.status);
            return null;
        }

        const manifest: unknown = JSON5.parse(await response.text());
        const rootfs: RootfsManifest = (manifest as RootfsManifest);

        const b3sum: string = resolveVersionTemplate(rootfs.b3sum, rootfs.date);
        const tarball_filename: string = resolveVersionTemplate(rootfs.tarball, rootfs.date);

        return {
            ...rootfs,

            tarball: tarball_filename,
            tarball_filename: getFilename(tarball_filename),
            b3sum: b3sum,
            b3sum_filename: getFilename(b3sum)
        };
    } catch (error) {
        console.error("Unable to load rootfs manifest %s", error);
        return null;
    }
}
