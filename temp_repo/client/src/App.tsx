import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import Apps from "./pages/Apps";
import CribroHome from "./pages/CribroHome";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/apps"} component={Apps} />
      <Route path={"/cribro"} component={CribroHome} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/blog/:slug"} component={BlogPost} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    document.title = "Maciej Wyrozumski — English Coach & Builder";
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
      >
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
