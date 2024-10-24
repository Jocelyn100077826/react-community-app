'use client'
import * as React from 'react'
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
//MUI Library
import { lightTheme, darkTheme } from "@/app/helpers/themes"
import { ThemeProvider} from '@mui/material/styles';
import { CssBaseline, Switch, AppBar, Toolbar, Typography, Box } from '@mui/material';
//Other
import store from '@/app/redux/store';
import { Provider } from 'react-redux';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  const [isDarkMode,setIsDarkMode] = React.useState<boolean>(false)

  React.useEffect(()=>{
    console.log("Layout")
  },[])
  
  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsDarkMode(event.target.checked);
  };

  return (
    <html>
      <body>
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
          <Provider store={store}>
            <CssBaseline />
            <Box className="flex-box-right">
              <Switch checked={isDarkMode} onChange={handleThemeChange} className='theme-switch' color="default"/>
            </Box>
            <main>{children}</main>
            </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}