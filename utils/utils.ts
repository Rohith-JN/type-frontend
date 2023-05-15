export function secondsToTime(e: number) {
    const m = Math.floor((e % 3600) / 60)
            .toString()
            .padStart(2, "0"),
        s = Math.floor(e % 60)
            .toString()
            .padStart(2, "0");

    return m + ":" + s;
}

export function formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

export function round(value: number, precision: any): number {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

export function findIncorrectChars(str1: string, str2: string) {
    let ans = "";
    let used = new Array(26).fill(false);
    for (let i = 0; i < str1.length; i++) {
        let found = false;
        for (let j = 0; j < str2.length; j++) {
            if (str1[i] === str2[j]) {
                found = true;
                break;
            }
        }
        if (!found && !used[str1.charCodeAt(i) - 97]) {
            used[str1.charCodeAt(i) - 97] = true;
            ans += str1[i];
        }
    }
    for (let i = 0; i < str2.length; i++) {
        let found = false;
 
        for (let j = 0; j < str1.length; j++) {
            if (str2[i] === str1[j]) {
                found = true;
                break;
            }
        }
        if (!found && !used[str2.charCodeAt(i) - 97]) {
            used[str2.charCodeAt(i) - 97] = true;
            ans += str2[i];
        }
    }
    ans = ans.split('').sort().join('');
    if (ans.length === 0) {
        return 0
    }
    else {
        return ans.length
    }
}