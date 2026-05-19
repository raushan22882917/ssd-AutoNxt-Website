import { lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AiChat from "@/components/AiChat";
import PageLoader from "@/components/PageLoader";

const Home          = lazy(() => import("@/pages/Home"));
const Product       = lazy(() => import("@/pages/Product"));
const Industry      = lazy(() => import("@/pages/Industry"));
const Gallery       = lazy(() => import("@/pages/Gallery"));
const Contribution  = lazy(() => import("@/pages/Contribution"));
const About         = lazy(() => import("@/pages/About"));
const Book          = lazy(() => import("@/pages/Book"));
const News          = lazy(() => import("@/pages/News"));
const Blog          = lazy(() => import("@/pages/Blog"));
const EvBlog        = lazy(() => import("@/pages/EvBlog"));
const Careers       = lazy(() => import("@/pages/Careers"));
const Privacy       = lazy(() => import("@/pages/Privacy"));
const Terms         = lazy(() => import("@/pages/Terms"));
const IndustryDetail    = lazy(() => import("@/pages/IndustryDetail"));
const TractorDetail     = lazy(() => import("@/pages/TractorDetail"));
const AttachmentDetail  = lazy(() => import("@/pages/AttachmentDetail"));
const NotFound          = lazy(() => import("@/pages/not-found"));

const queryClient = new QueryClient();

function PageSkeleton() {
  return (
    <div className="flex-1 w-full min-h-[60vh] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );
}

function Router() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex-1 w-full">
        <Suspense fallback={<PageSkeleton />}>
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
        </Suspense>
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
