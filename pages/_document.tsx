import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
    render() {
        return(
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Open+Sans:wght@800&family=Prompt:wght@300;400&family=Roboto+Condensed:wght@700&display=swap" rel="stylesheet" />
                </Head>
                <body>
                    <Main /> 
                    <NextScript />
                </body>
            </Html>
        );
    }
}