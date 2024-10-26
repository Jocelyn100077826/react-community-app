'use client'
import * as React from 'react'
import store from '@/app/redux/store';
import { Provider } from 'react-redux';
import "./globals.css";

//UI 
import { lightTheme, darkTheme } from "@/app/helpers/themes"
import { ThemeProvider} from '@mui/material/styles';
import { CssBaseline, Switch, AppBar, Toolbar} from '@mui/material';


// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  const [isDarkMode,setIsDarkMode] = React.useState<boolean>(false)

  React.useEffect(()=>{
    const pref = localStorage.getItem('isDarkMode');

    if(pref == "true"){
      setIsDarkMode(true);
    }
  },[])
  
  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsDarkMode(event.target.checked);
    localStorage.setItem('isDarkMode',event.target.checked?"true":"false");
  };

  return (
    <html>
      <body>
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
          <Provider store={store}>
            <CssBaseline />
            <AppBar position="static" sx={{bgcolor:"background.paper",boxShadow:"none",mb:"20px"}}>
              <Toolbar>
                <Switch checked={isDarkMode} onChange={handleThemeChange} className='theme-switch' color="default"/>
              </Toolbar>
            </AppBar>
            <main>{children}</main>
            </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}