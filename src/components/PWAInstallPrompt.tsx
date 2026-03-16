import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setVisible(false);
    setDeferredPrompt(null);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-3 shadow-lg">
      <Download className="h-5 w-5 text-red-500 shrink-0" />
      <span className="text-sm text-white">Install Fynzatube as an app</span>
      <Button size="sm" onClick={handleInstall} className="bg-red-600 hover:bg-red-700 text-white">
        Install
      </Button>
      <button
        onClick={() => setVisible(false)}
        aria-label="Dismiss install prompt"
        className="text-zinc-400 hover:text-white"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
