const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export interface Response<T> {
    statusCode: number;
    data: T;
    message: string;
}

export const fetch = async (url: string, options: RequestInit = {}) => {
    const response = await window.fetch(`${baseUrl}${url}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }
    const res = (await response.json()) as Response<any>;
    if (res.statusCode !== 200) {
        return Promise.reject(res);
    }
    return Promise.resolve(res.data);
};
