import React, { useEffect, useState } from "react";
import cookie from "cookie";
import { NextPageContext } from 'next';
import CustomError from "../components/other/Error";
import Loader from "../components/other/Loader";

const ErrorPage = ({ statusCode, data }: {
  statusCode: number, data: {
    [key: string]: string;
  }

}) => {
  const [contentLoaded, setContentLoaded] = useState(false);

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

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", data.theme || "");
  }, [data.theme]);

  if (loading) {
    return <Loader />
  }
  else if (statusCode === 404) {
    return <CustomError statusCode={404} statusMessage={'Page could not be found'} />;
  }
  else if (statusCode === 500) {
    return <CustomError statusCode={500} statusMessage={'Internal Server Error'} />;
  }
  else {
    return <CustomError statusCode={statusCode} statusMessage={'Something went wrong!'} />;
  }
};

ErrorPage.getInitialProps = async ({ res, err, req }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  const data = cookie.parse(req ? req.headers.cookie || "" : document.cookie);

  return { statusCode, data: data };
};

export default ErrorPage;
