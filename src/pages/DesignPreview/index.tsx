import { useState, useEffect } from "react";

export default function DesignSystemPreview() {
  const [theme, setTheme] = useState("light");

  // Apply theme to <html> tag
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="min-h-screen p-10 space-y-12 bg-background text-foreground transition-colors duration-300">
      {/* Header with toggle */}
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold text-gradient">PlantNxt Design System</h1>
        <button
          onClick={toggleTheme}
          className="btn btn-secondary"
        >
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </div>

      {/* Typography */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Typography</h2>
        <div className="space-y-2">
          <h1>Heading 1</h1>
          <h2>Heading 2</h2>
          <h3>Heading 3</h3>
          <h4>Heading 4</h4>
          <h5>Heading 5</h5>
          <h6>Heading 6</h6>
          <p>Body text - This is a sample paragraph.</p>
          <p className="lead">Lead text - for emphasis or intros.</p>
          <small>Small text - captions, footnotes.</small>
          <p>
            <a href="#">Link example</a>
          </p>
        </div>
      </section>

      {/* Buttons */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <button className="btn btn-primary">Primary</button>
          <button className="btn btn-secondary">Secondary</button>
          <button className="btn btn-accent">Accent</button>
          <button className="btn btn-destructive">Destructive</button>
        </div>
      </section>

      {/* Cards */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-xl font-semibold">Default Card</h3>
            <p className="mt-2 text-muted-foreground">
              This is a simple card example.
            </p>
          </div>
          <div className="card glass">
            <h3 className="text-xl font-semibold">Glass Card</h3>
            <p className="mt-2 text-muted-foreground">
              This one uses the <code>.glass</code> utility.
            </p>
          </div>
        </div>
      </section>

      {/* Inputs */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Inputs</h2>
        <div className="max-w-md space-y-4">
          <div className="input-wrapper">
            <span className="input-prefix">@</span>
            <input type="text" placeholder="Username" />
          </div>
          <div className="input-wrapper">
            <input type="password" placeholder="Password" />
            <span className="input-suffix">🔒</span>
          </div>
        </div>
      </section>

      {/* Badges */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Badges</h2>
        <div className="flex gap-2">
          <span className="badge badge-primary">Primary</span>
          <span className="badge badge-success">Success</span>
          <span className="badge badge-destructive">Destructive</span>
        </div>
      </section>

      {/* Alerts */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Alerts</h2>
        <div className="space-y-4">
          <div className="alert alert-info">
            <span>ℹ️ This is an info alert</span>
          </div>
          <div className="alert alert-success">
            <span>✅ This is a success alert</span>
          </div>
          <div className="alert alert-destructive">
            <span>❌ This is a destructive alert</span>
          </div>
        </div>
      </section>
    </div>
  );
}
