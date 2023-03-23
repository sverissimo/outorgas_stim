export function setCookie(key: string, value: string): void {
    const d = new Date();
    const time = 60 * 60 * 1000;
    d.setTime(d.getTime() + time);
    const expiringDateAndTime = d.toUTCString();
    document.cookie = `${key}=${value}; expires=${expiringDateAndTime}; path=/`;
}

export function deleteCookie(name: string): void {
    const d = new Date();
    d.setTime(10);
    document.cookie = `${name}=; expires=${d.toUTCString()}; path=/`;
}

export function getCookie(key: string): string {
    const name = `${key}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}