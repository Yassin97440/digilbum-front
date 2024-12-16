import * as jose from 'jose'

export default async function decodeToken() {
    const token = useCookie('authToken');

    if (!token.value) {
        return null;
    }

    try {
        const my_secret = ""

        // Décodage de la clé en Base64
        const secretBytes = new Uint8Array(
            atob(my_secret)
                .split('')
                .map(char => char.charCodeAt(0))
        );

        const { payload } = await jose.jwtVerify(token.value, secretBytes, {
            algorithms: ['HS256']
        });


        // Retourne à la fois le payload et les claims du header
        return payload;
    } catch (error) {
        console.error("Erreur de décodage du token:", error);
        return null;
    }
}
