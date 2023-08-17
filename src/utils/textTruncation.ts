export default function textTruncation(txt, limit) {
    return (txt.length > limit) ? txt.slice(0, limit) + '...' : txt;
}