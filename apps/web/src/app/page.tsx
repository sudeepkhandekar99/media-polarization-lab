import { ArrowUpRight, GitBranch, Layers3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <nav className="page-container flex h-20 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-foreground" />
          <span className="text-sm font-medium tracking-tight">
            Media Polarization Lab
          </span>
        </div>

        <Badge variant="outline" className="rounded-full px-3 font-normal">
          Research in progress
        </Badge>
      </nav>

      <section className="page-container relative flex min-h-[calc(100vh-5rem)] items-center py-20">
        <div className="absolute -right-24 top-16 h-72 w-72 rounded-full bg-[var(--pastel-lavender)] blur-3xl opacity-70" />
        <div className="absolute -left-32 bottom-14 h-72 w-72 rounded-full bg-[var(--pastel-blue)] blur-3xl opacity-60" />

        <div className="relative max-w-5xl">
          <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
            <span>Computational media research</span>
            <span>·</span>
            <span>NLP</span>
            <span>·</span>
            <span>Semantic analysis</span>
          </div>

          <h1 className="font-display max-w-4xl text-balance text-6xl leading-[0.98] tracking-[-0.035em] md:text-8xl">
            Measuring how news media frames the same world differently.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
            An end-to-end research and analytics platform for exploring
            semantic framing, polarization, sentiment, and narrative divergence
            across news organizations over time.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button className="rounded-full px-6">
              Case study
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Button>

            <Button variant="outline" className="rounded-full px-6">
              Explore methodology
            </Button>
          </div>

          <div className="mt-20 grid max-w-4xl gap-px overflow-hidden rounded-2xl border bg-border md:grid-cols-3">
            <div className="bg-card p-6">
              <GitBranch className="mb-8 h-5 w-5 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Stage 01</p>
              <p className="mt-1 font-medium">Data ingestion</p>
            </div>

            <div className="bg-card p-6">
              <Layers3 className="mb-8 h-5 w-5 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Stage 02</p>
              <p className="mt-1 font-medium">Semantic analysis</p>
            </div>

            <div className="bg-card p-6">
              <div className="mb-8 flex h-5 items-end gap-1">
                <span className="h-2 w-1 rounded-full bg-foreground/40" />
                <span className="h-4 w-1 rounded-full bg-foreground/60" />
                <span className="h-5 w-1 rounded-full bg-foreground" />
                <span className="h-3 w-1 rounded-full bg-foreground/50" />
              </div>

              <p className="text-sm text-muted-foreground">Stage 03</p>
              <p className="mt-1 font-medium">Interactive insights</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}