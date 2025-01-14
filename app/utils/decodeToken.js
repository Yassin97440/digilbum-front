import * as jose from 'jose'

export default async function decodeToken() {
    const token = useCookie('authToken');
    const config = useRuntimeConfig();


    if (!token.value) {
        return null;
    }

    try {
        const my_secret = config.public.jwtSecretKey;

        // Décodage de la clé en Base64
        const secretBytes = new Uint8Array(
            atob(my_secret)
                .split('')
                .map(char => char.charCodeAt(0))
        );

        const { payload } = await jose.jwtVerify(token.value, secretBytes, {
            algorithms: ['HS256']
        });

        return payload;

    } catch (error) {
        console.error("Erreur de décodage du token:", error);
        return null;
    }
}
