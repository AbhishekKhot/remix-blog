import { Outlet } from "@remix-run/react";
import { LiveReload } from "@remix-run/react";
import { Meta } from "@remix-run/react";
import { Link } from "@remix-run/react";
import { Links } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import { getUser } from "./routes/utils/session.server";
import globalStylesUrl from "./styles/global.css";

export const links = () => [{ rel: "stylesheet", href: globalStylesUrl }];
export const meta = () => {
  const description = "A cool blog built with Remix";
  const keywords = "remix, react, javascript";

  return {
    description,
    keywords,
  };
};

export const loader = async ({ request }) => {
  const user = await getUser(request);
  const data = { user };
  return data;
};

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

export function Document({ children, title }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <title>{title ? title : "Remix Blog"}</title>
      </head>
      <body>
        {children}
        {process.env.NODE_ENV === "development" ? <LiveReload /> : null}
      </body>
    </html>
  );
}

export function Layout({ children }) {
  const { user } = useLoaderData();
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">
          Remix
        </Link>
        <ul className="nav">
          <li>
            <Link to="/posts">Posts</Link>
          </li>
          {user ? (
            <li>
              <form action="/auth/logout" method="POST">
                <button className="btn" type="submit">
                  Logout {user.username}
                </button>
              </form>
            </li>
          ) : (
            <li>
              <Link to="/auth/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>

      <div className="container">{children}</div>
    </>
  );
}
