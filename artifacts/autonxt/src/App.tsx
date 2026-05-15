import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
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
import Careers from "@/pages/Careers";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import IndustryDetail from "@/pages/IndustryDetail";
import TractorDetail from "@/pages/TractorDetail";
import AttachmentDetail from "@/pages/AttachmentDetail";
import NotFound from "@/pages/not-found";
import AiChat from "@/components/AiChat";
import PageLoader from "@/components/PageLoader";

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
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
          <Route path="/industry/:slug" component={IndustryDetail} />
          <Route path="/product/attachment/:slug" component={AttachmentDetail} />
          <Route path="/product/:slug" component={TractorDetail} />
          <Route path="/careers" component={Careers} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/terms" component={Terms} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <PageLoader />
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
          <AiChat />
        </TooltipProvider>
      </QueryClientProvider>
    </LanguageProvider>
  );
}

export default App;
