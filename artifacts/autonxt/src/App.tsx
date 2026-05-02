import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Product from "@/pages/Product";
import Industry from "@/pages/Industry";
import Gallery from "@/pages/Gallery";
import Contribution from "@/pages/Contribution";
import About from "@/pages/About";
import Book from "@/pages/Book";
import News from "@/pages/News";
import Blog from "@/pages/Blog";
import EvBlog from "@/pages/EvBlog";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <main className="flex-1 w-full">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/product" component={Product} />
          <Route path="/industry" component={Industry} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/contribution" component={Contribution} />
          <Route path="/about" component={About} />
          <Route path="/book" component={Book} />
          <Route path="/news" component={News} />
          <Route path="/blog" component={Blog} />
          <Route path="/ev-blog" component={EvBlog} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="autonxt-theme">
      <LanguageProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </QueryClientProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
