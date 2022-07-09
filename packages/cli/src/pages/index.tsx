import Link from "next/link";
import { useEffect, useState } from "react";

const Home = () => {
  const [previews, setPreviews] = useState<[string, string[]][] | null>(null);
  const fetchData = async () => {
    const res = await fetch("/previews.json");
    setPreviews(await res.json());
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (!previews) {
    return <></>;
  }
  const showNullState =
    previews.length === 0 ||
    (previews.length === 1 && previews[0][0] === "MyFirstEmail.tsx");

  return (
    <div >
      <div className="container">
        {showNullState && (
          <img className="eyebrow" src="https://s3.amazonaws.com/lab.campsh.com/mailing-lil%402x.png" width="76" height="16" />
        )}
        <h1>Previews</h1>
        {showNullState && (
          <div className="null-sub">
            Build emails in <span className="code">emails/previews</span> and
            they’ll appear below.
          </div>
        )}
        <hr />
        {previews.map((preview) => (
          <div className="email-group" key={preview[0]}>
            <h2><span className="circle">●</span> {preview[0]}</h2>
            {preview[1].map((previewFunction) => (
              <div key={previewFunction}>
                <Link href={`/previews/${preview[0]}/${previewFunction}`}>
                  <a className="email">{previewFunction}</a>
                </Link>
              </div>
            ))}
          </div>
        ))}
      </div>
      {!showNullState && (
        <Link href="https://github.com/psugihara/mailing">
          <a className="footer">
            <img src="https://s3.amazonaws.com/lab.campsh.com/mailing-lil%402x.png" width="76" height="16" />
          </a>
        </Link>)}
      <style jsx>{`
        .container {
          max-width: 472px;
          margin: 64px auto 64px;
          padding: 64px 64px 32px;
          border-radius: 16px;
          border: 1px dotted #000;
          -webkit-font-smoothing: antialiased;
        }
        .eyebrow {
          margin-bottom: 40px;
        }
        h1 {
          font-size: 36px;
          font-weight: 700;
          margin: 0 0 16px;
          line-height: 122%;
        }
        .null-sub {
          font-size: 20px;
          max-width: 330px;
          line-height: 120%;
          padding: 0 0 16px;
          line-height: 140%;
        }
        hr {
          border-top: 1px dotted #000;
          border-bottom: none;
          margin: 24px 0 36px;
        }
        h2 {
          font-size: 20px;
          line-height: 120%;
          margin-bottom: 8px;
        }
        .code {
          background-color: #ddd;
          padding: 0 2px;
          border-radius: 3px;
          font-weight: 700;
          font-family: menlo, monospace;
        }
        .email-group {
          margin-bottom: 32px;
        }
        .circle {
          font-size: 30px;
          line-height: 24px;
          position: relative;
          top: 2px;
        }
        a.email {
          margin-bottom: 8px;
          transition: background-color 420ms ease-out;
        }
        a.email:hover {
          background: #FAFA98;
        }
        .footer {
          display: block;
          text-align: center;
        }
        .footer img {
          margin-top: -40px;
          margin-bottom: 64px;
        }
      `}</style>
    </div>
  );
};

export default Home;
