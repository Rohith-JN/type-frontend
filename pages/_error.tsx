import React, { useEffect } from "react";
import cookie from "cookie";
import { NextPageContext } from 'next';
import CustomError from "../components/other/Error";

const ErrorPage = ({ statusCode, data }: {
  statusCode: number, data: {
    [key: string]: string;
  }

}) => {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", data.theme || "");
  }, [data.theme]);

  if (statusCode === 404) {
    return <CustomError statusCode={404} statusMessage={'Page could not be found'} />;
  }
  if (statusCode === 500) {
    return <CustomError statusCode={500} statusMessage={'Internal server error'} />;
  }
  else {
    return <CustomError statusCode={statusCode} statusMessage={'Something went wrong!'} />;
  }
};

ErrorPage.getInitialProps = async ({ res, err, req }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  const data = cookie.parse(req ? req.headers.cookie || "" : document.cookie);

  if (Object.keys(data).length === 0 && data.constructor === Object) {
    if (res) {
      res.writeHead(301, { Location: "/" });
      res.end();
    } else {
      document.location.pathname = "/";
    }
  }

  return { statusCode, data: data };
};

export default ErrorPage;
