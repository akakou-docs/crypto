
function str2ab(str) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

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


const decodeKey = async (encoded, type, usage) => {
    const derString = window.atob(encoded);
    const binKey = str2ab(derString);

    return window.crypto.subtle.importKey(
        type,
        binKey,
        {
            name: "RSA-OAEP",
            hash: "SHA-256",
        },
        true,
        [usage]
    );
}

const encrypt = async (message, pub) => {
    const encoder = new TextEncoder();
    const encodedMessage = encoder.encode(message);

    const cipher = await window.crypto.subtle.encrypt(
        {
            name: "RSA-OAEP",
        },
        pub,
        encodedMessage
    );

    const encodedCipher = btoa(String.fromCharCode(...new Uint8Array(cipher)));
    return encodedCipher
}



const decrypt = async (cipher, priv) => {
    const derString = window.atob(cipher)
    const binCipher = str2ab(derString)

    const plain = await window.crypto.subtle.decrypt(
        {
            name: "RSA-OAEP",
        },
        priv,
        binCipher
    )

    let decoder = new TextDecoder()
    encodedPlain = decoder.decode(plain)

    return encodedPlain
}
