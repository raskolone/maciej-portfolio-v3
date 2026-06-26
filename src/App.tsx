import { useEffect, Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import ScrollProgress from "./components/ScrollProgress";
import BackToTopButton from "./components/BackToTopButton";

const Home = lazy(() => import("./pages/Home"));
const Apps = lazy(() => import("./pages/Apps"));
const CribroHome = lazy(() => import("./pages/CribroHome"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const NotFound = lazy(() => import("./pages/NotFound"));

function Router() {
  return (
    <Suspense fallback={<div className="flex h-screen w-full items-center justify-center p-4 bg-background"><div className="w-8 h-8 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div></div>}>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/apps"} component={Apps} />
        <Route path={"/cribro"} component={CribroHome} />
        <Route path={"/blog"} component={Blog} />
        <Route path={"/blog/:slug"} component={BlogPost} />
        <Route path={"/404"} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
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
            <ScrollProgress />
            <BackToTopButton />
            <Toaster />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
