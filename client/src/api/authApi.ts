const API_URL = import.meta.env.VITE_API_URL;

type LoginData = {
    email: string;
    password: string;
};

export async function login(data: LoginData) {
    const response = await fetch(`${API_URL}/auth/admin/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    return response.json();
}

export async function logout() {
    const response = await fetch(`${API_URL}/auth/admin/logout`, {
        method: "POST",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Logout failed");
    }
}

