export const verdict = async (output, expectedoutput) => {
    const normalize = (s = "") =>
        s.replace(/\r\n/g, "\n").trim();
    const cleanoutput = normalize(output);
    return (cleanoutput === expectedoutput)
}