import { useState } from 'react'


function Copy({text = ""}) {

    const [copied, setCopied] = useState(false);

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <>
            <button className="copy-btn" onClick={handleCopy}>{copied ? "Copied" : "Copy"} </button>
        </>
    )
}

export default Copy;