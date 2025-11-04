export async function generatePKCECodes() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    const codeVerifier = base64UrlEncode(array);

    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await crypto.subtle.digest("SHA-256", data);
    const codeChallenge = base64UrlEncode(new Uint8Array(digest));

    return { codeVerifier, codeChallenge };
}

function base64UrlEncode(buffer) {
    let base64 = btoa(String.fromCharCode(...buffer));
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

