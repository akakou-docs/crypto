const encoder = new TextEncoder()
const decoder = new TextDecoder()


const str2ab = (str) => {
    const buf = new ArrayBuffer(str.length)
    const bufView = new Uint8Array(buf)
    for (let i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i)
    }
    return buf
}


class CryptoScheme {
    constructor(algo, types, format) {
        this.algo = algo
        this.types = types
        this.format = format
    }
}

async function callfunc(funcname, key, message, scheme) {
    const importedKey = await importKey(key, scheme)

    const t = {
        name: scheme.algo,
    }

    const result = await window.crypto.subtle[funcname](t, importedKey, message)
    return result
}


const encodeKey = async (key, format) => {
    console.log(key, format)
    const rawKey = await window.crypto.subtle.exportKey(
        format,
        key
    )
    const encoded = btoa(String.fromCharCode(...new Uint8Array(rawKey)))
    return encoded
}

const encodeKeyPair = async (keypair) => {
    return {
        pubkey: await encodeKey(keypair.publicKey, "spki"),
        privkey: await encodeKey(keypair.privateKey, "pkcs8"),
    }
}



const importKey = async (encoded, scheme) => {
    const derString = window.atob(encoded)
    const binKey = str2ab(derString)

    return window.crypto.subtle.importKey(
        scheme.format,
        binKey,
        {
            name: scheme.algo,
            hash: "SHA-256",
        },
        true,
        scheme.types
    )
}


const generateKeyPair = async (scheme) => {
    const keypair = await window.crypto.subtle.generateKey(
        {
            name: scheme.algo,
            modulusLength: 2048,
            publicExponent: new Uint8Array([1, 0, 1]), // 24 bit representation of 65537
            hash: "SHA-256"
        },
        true,
        scheme.types
    )

    const encoded = encodeKeyPair(keypair)
    return encoded
}


const encrypt = async function (message, pubkey, scheme) {
    const encodedMessage = encoder.encode(message)

    const result = await callfunc("encrypt", pubkey, encodedMessage, scheme)
    const encodedCipher = btoa(String.fromCharCode(...new Uint8Array(result)))
    return encodedCipher
}


const decrypt = async function (cipher, pubkey, scheme) {
    const derString = window.atob(cipher)
    const rawCipher = str2ab(derString)

    const plain = await callfunc("decrypt", pubkey, rawCipher, scheme)
    decodedPlain = decoder.decode(plain)

    return decodedPlain
}



const sign = async (message, privkey, scheme) => {
    const encodedMessage = encoder.encode(message)

    const signature = await callfunc("sign", privkey, encodedMessage, scheme)

    const encodedSignature = btoa(String.fromCharCode(...new Uint8Array(signature)))
    return encodedSignature
}


const verify = async (signature, message, pubkey, scheme) => {
    const importedPubkey = await importKey(pubkey, scheme)

    const encodedMessage = encoder.encode(message)

    const derSignature = window.atob(signature)
    const binSignature = str2ab(derSignature)

    let result = await window.crypto.subtle.verify(
        "RSASSA-PKCS1-v1_5",
        importedPubkey,
        binSignature,
        encodedMessage
    )

    return result
}


