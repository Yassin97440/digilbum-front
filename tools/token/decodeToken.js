// import jwt from 'jsonwebtoken';

export default function decodeToken() {

    const token = useCookie('authToken');

    // Clé secrète utilisée pour signer le JWT
    const secretKey = '404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970';
    // Décodage du JWT
    // jwt.verify(token, secretKey, (err, decoded) => {
    //     if (err) {
    //         console.log('Erreur lors du décodage du token :', err);
    //     } else {
    //         // Le payload décrypté du JWT est stocké dans l'objet 'decoded'
    //         console.log('Payload décrypté du JWT :', decoded);
    //     }
    // });
}
