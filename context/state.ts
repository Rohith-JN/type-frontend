export interface State {
    preferences: {
        time: number; // user preferred time limit
    };
    word: {
        typedWord: string;
        typedHistory: string[];
        typedWordDuration: string;
        typedDurationHistory: string[];
        wordList: string[];
        incorrectChars: {
            word: string;
            idx: number;
            totalIncorrectCharacters: number;
            incorrectCharacters: number;
            extraCharacters: number;
        };
        incorrectCharsHistory: {
            word: string;
            idx: number;
            totalIncorrectCharacters: number;
            incorrectCharacters: number;
            extraCharacters: number;
        }[];
    };
    time: {
        timer: number; // represents remaining time for a timer
        timerId: NodeJS.Timeout | null; // used to clear timer interval when test is reset or completed
        testTaken: string;
    };
    result: {
        results: [
            {
                wpm: number;
                rawWpm: number;
                accuracy: number;
                correctChars: number;
                incorrectChars: number;
                time: number;
                testTaken: string;
                typedWordDataset: Array<string>;
                wordNumberLabels: Array<number>;
                wpmDataset: Array<number>;
                incorrectCharsDataset: Array<number>;
            }
        ];
    };
}

export const initialState: State = {
    preferences: {
        time: 0,
    },
    word: {
        typedWord: "",
        typedHistory: [],
        typedWordDuration: "",
        typedDurationHistory: [],
        wordList: [],
        incorrectChars: <any>{},
        incorrectCharsHistory: [],
    },
    time: {
        timer: 1,
        timerId: null,
        testTaken: "",
    },
    result: {
        results: [
            {
                wpm: 0,
                rawWpm: 0,
                accuracy: 0,
                correctChars: 0,
                incorrectChars: 0,
                time: 0,
                testTaken: "",
                typedWordDataset: [],
                wordNumberLabels: [],
                wpmDataset: [],
                incorrectCharsDataset: [],
            },
        ],
    },
};
