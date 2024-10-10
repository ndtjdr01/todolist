import '@/app/globals.css';
import Nav from '@/component/nav/nav';
import { GlobalContext } from '@/context/todo';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/tick_icon.jpg" type="image/jpeg" />
        <title>Todo Ndt</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
          integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
          crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>

      <body className={`bg-[#F8F8F8] text-[#36454F]`} >
        <GlobalContext>
          <Nav />
          {children}
        </GlobalContext>
      </body>
    </html>
  );
}