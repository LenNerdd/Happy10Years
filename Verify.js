async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

async function checkNoteCode() {
    if (OpenedWithPassword == false) {
        const hashedPassword = '61d92ee394e7dbd83e5977aed3b2721b14006d0d5046bcf7d65eaa7098e94aaf';
        const password = prompt('Enter the password to view the note:');

        if (password === null) {
            return null;
        }

        const enteredPasswordHash = await hashPassword(password);

        if (enteredPasswordHash === hashedPassword) {
            OpenedWithPassword = true;
            return true;
        } else {
            return false;
        }
    }
}
