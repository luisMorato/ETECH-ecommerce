export const setUrlParam = (parameter: string, value: string | number) => {
    const currentURL = new URL(window.location.toString());

    currentURL.searchParams.set(parameter, String(value));
    window.history.pushState(null, '', currentURL);
    window.location.reload();
}