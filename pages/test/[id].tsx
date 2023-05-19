import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router'
import { createUrqlClient } from '../../utils/createUrqlClient';
import { getTheme } from '../../utils/getTheme';
import { NextPageContext } from 'next';
import { useEffect, useState } from 'react';
import Loader from '../../components/other/Loader';
import { useAuth } from '../../firebase/auth';
import { useTestQuery } from '../../generated/graphql';
import ResultChart from '../../components/index/ResultChart';
import styles from '../../styles/Test.module.css';
import { secondsToTime } from '../../utils/utils';
import CustomError from '../../components/other/Error';

const Test = ({ themeData }: {
    themeData: {
        [key: string]: string;
    }
}) => {
    const router = useRouter();

    const { authUser } = useAuth();
    const uid = (authUser) ? authUser['uid'] : ''
    const id: string = (typeof (router.query.id) === "string" ? router.query.id : "")
    const [{ data, fetching, error }] = useTestQuery({
        variables: {
            id: parseInt(id),
            uid: uid,
        }
    });
    const [contentLoaded, setContentLoaded] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", themeData.theme || "");
    }, [themeData.theme]);

    useEffect(() => {
        setContentLoaded(true);
    }, []);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (contentLoaded) {
            const timeoutId = setTimeout(() => {
                setLoading(false);
            }, 900);
            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [contentLoaded]);
    if (!authUser) {
        return <CustomError statusCode={401} statusMessage={"Unauthenticated Request"} />
    }
    else if (loading || fetching) {
        return <Loader />
    }
    else if (error) {
        return <CustomError statusCode={500} statusMessage={"Internal Server Error"} />
    }
    else {
        return (
            <div className={styles.testContainer}>
                <div className={styles.subContainer}>
                    <div className={styles.row1}>
                        <div className={styles.col}>
                            <div className={styles.subCol1}>
                                <h2>wpm</h2>
                                <h1>{data!.test.wpm}</h1>
                            </div>
                            <div className={styles.subCol2}>
                                <h2>acc</h2>
                                <h1>{data!.test.accuracy}%</h1>
                            </div>
                        </div>
                        <div className={styles.col2}>
                            <div className={styles.graph}>
                                <ResultChart wpmDataset={data!.test.wpmDataset} wordNumberLables={((data!.test.wordNumberLabels).length === 0) ? [1, 2] : data!.test.wordNumberLabels} typedWordDataset={data!.test.typedWordDataset} incorrectCharsDataset={data!.test.incorrectCharsDataset} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.row2}>
                        <div className={`${styles.subCol} ${styles.wpm}`}>
                            <h2>wpm</h2>
                            <h1>{data!.test.wpm}</h1>
                        </div>
                        <div className={`${styles.subCol} ${styles.accuracy}`}>
                            <h2>acc</h2>
                            <h1>{data?.test.accuracy}</h1>
                        </div>
                        <div className={`${styles.subCol} ${styles.language}`}>
                            <h2>language</h2>
                            <h1>English</h1>
                        </div>
                        <div className={`${styles.subCol} ${styles.raw}`}>
                            <h2>raw</h2>
                            <h1>{data!.test.rawWpm}</h1>
                        </div>
                        <div className={styles.subCol}>
                            <h2>characters</h2>
                            <h1>{data!.test.chars}</h1>
                        </div>
                        <div className={styles.subCol}>
                            <h2>time</h2>
                            <h1>{secondsToTime(parseInt(data!.test.time))}s</h1>
                        </div>
                        <div className={`${styles.subCol} ${styles.testTaken}`}>
                            <h2>test taken</h2>
                            <h1>{data!.test.testTaken}</h1>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withUrqlClient(createUrqlClient)(Test)
export async function getServerSideProps(context: NextPageContext) {
    return await getTheme(context);
}
