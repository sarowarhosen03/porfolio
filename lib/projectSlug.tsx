
export function encodeSlug(title: string, id: string): string {
    return `${title}-${id.substring(0, 5)}`
}

export function decodeSlug(slug: string): {
    title: string,
    id: string
} {
    const parts = slug.split('-');
    const title = parts.slice(0, -1).join('-');
    const id = parts[parts.length - 1];
    return { title, id };
}