export const getClientRectOfRef = (element?: HTMLElement | null) => {
    if (!element) return null;
    const rect = element.getBoundingClientRect();

    if (!(rect instanceof DOMRect)) return null;
    return rect;
};
