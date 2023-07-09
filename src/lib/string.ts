export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const minIndent = (str: string): number => {
    const match = str.match(/^[\t ]*(?=\S)/gmu);

    if (!match) {
        return 0;
    }

    return match.reduce((r, a) => Math.min(r, a.length), Infinity);
};

export const stripIndent = (str: string) => {
    const indent = minIndent(str);

    if (indent === 0) {
        return str;
    }

    // eslint-disable-next-line security/detect-non-literal-regexp
    const regex = new RegExp(`^[ \\t]{${indent}}`, "gmu");

    return str.replace(regex, "");
};

export const stripIndentTrim = (str: string) => {
    return stripIndent(str).trim();
};
