
const generateRSACipherKey = async () => {
    const keypairs = await window.crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: 2048,
            publicExponent: new Uint8Array([1, 0, 1]), // 24 bit representation of 65537
            hash: "SHA-256"
        },
        true,
        ["encrypt", "decrypt"]
    );

    return keypairs
};

const encodeKey = async (key, type) => {
    const rawKey = await window.crypto.subtle.exportKey(
        type,
        key
    );
    const encoded = btoa(String.fromCharCode(...new Uint8Array(rawKey)));
    return encoded
}

const encodeKeyPair = async (keypair) => {
    return {
        pub: await encodeKey(keypair.publicKey, "spki"),
        priv: await encodeKey(keypair.privateKey, "pkcs8"),
    };
}

