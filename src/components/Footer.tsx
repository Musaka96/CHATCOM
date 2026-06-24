import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background-soft">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <span className="text-lg font-semibold">C.H.A.T.</span>
            <p className="mt-2 text-sm text-muted">
              Chews Hot Awesome Texting. Built for chatters, not companies.
            </p>
          </div>
          <div>
            <h4 className="mb-2 text-sm font-semibold text-foreground">Product</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href="/#features" className="hover:text-foreground">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-foreground">Pricing</Link></li>
              <li><Link href="/setup" className="hover:text-foreground">Setup</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-2 text-sm font-semibold text-foreground">Learn more</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href="/alerts" className="hover:text-foreground">Alerts</Link></li>
              <li><Link href="/scripts" className="hover:text-foreground">Sharing Scripts</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-2 text-sm font-semibold text-foreground">Agencies</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href="/teams" className="hover:text-foreground">For Teams</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-white/5 pt-6 text-xs text-muted">
          © {new Date().getFullYear()} C.H.A.T. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
