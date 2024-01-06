export default function textTruncation(txt: string, limit: number) {
  return txt.length > limit ? txt.slice(0, limit) + "..." : txt;
}
