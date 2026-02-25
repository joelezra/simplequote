import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useWaitlistSignup } from "@/hooks/useWaitlistSignup";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const TRADE_TYPES = [
  "Plumbing",
  "Electrical",
  "HVAC",
  "Painting",
  "Carpentry",
  "Roofing",
  "Handyman",
  "General Contracting",
  "Other",
] as const;

interface SignupFormProps {
  onSuccess?: () => void;
  variant?: "hero" | "compact";
}

export function SignupForm({ onSuccess, variant = "hero" }: SignupFormProps) {
  const [email, setEmail] = useState("");
  const [tradeType, setTradeType] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  const signup = useWaitlistSignup();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !tradeType) {
      toast.error("Please fill in your email and select your trade.");
      return;
    }
    signup.mutate(
      {
        email,
        tradeType: tradeType as (typeof TRADE_TYPES)[number],
      },
      {
        onSuccess: (data) => {
          if (data.success) {
            setSubmitted(true);
            toast.success(data.message);
            onSuccess?.();
          } else {
            toast.info(data.message);
          }
        },
        onError: (error) => {
          toast.error(error.message || "Something went wrong. Please try again.");
        },
      },
    );
  };

  if (submitted) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-[oklch(0.55_0.15_145)] bg-[oklch(0.55_0.15_145_/_10%)] px-6 py-4">
        <CheckCircle2 className="size-6 text-[oklch(0.7_0.18_145)]" />
        <div>
          <p className="font-semibold text-white">You're on the list!</p>
          <p className="text-sm text-[oklch(0.75_0_0)]">We'll be in touch soon with early access details.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className={variant === "hero"
        ? "flex flex-col gap-3 sm:flex-row sm:items-end"
        : "flex flex-col gap-3 sm:flex-row sm:items-end"
      }>
        <div className="flex-1">
          <Input
            type="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 rounded-xl border-[oklch(1_0_0_/_15%)] bg-[oklch(0.15_0.02_280)] text-white placeholder:text-[oklch(0.5_0_0)] focus-visible:border-[oklch(0.7_0.19_45)] focus-visible:ring-[oklch(0.7_0.19_45_/_30%)]"
            required
          />
        </div>
        <div className="sm:w-52">
          <Select value={tradeType} onValueChange={setTradeType}>
            <SelectTrigger className="h-12 w-full rounded-xl border-[oklch(1_0_0_/_15%)] bg-[oklch(0.15_0.02_280)] text-white data-[placeholder]:text-[oklch(0.5_0_0)]">
              <SelectValue placeholder="Your trade" />
            </SelectTrigger>
            <SelectContent className="rounded-xl bg-[oklch(0.2_0.02_280)] border-[oklch(1_0_0_/_15%)]">
              {TRADE_TYPES.map((trade) => (
                <SelectItem
                  key={trade}
                  value={trade}
                  className="text-white focus:bg-[oklch(0.7_0.19_45_/_20%)] focus:text-white"
                >
                  {trade}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          type="submit"
          disabled={signup.isPending}
          className="h-12 rounded-xl bg-[oklch(0.7_0.19_45)] px-6 text-base font-bold text-white hover:bg-[oklch(0.65_0.19_45)] cta-pulse disabled:opacity-70"
        >
          {signup.isPending ? (
            <Loader2 className="size-5 animate-spin" />
          ) : (
            "Get Early Access — Free"
          )}
        </Button>
      </div>
      <p className="mt-3 text-sm text-[oklch(0.6_0_0)]">
        No credit card. No BS. Built by tradespeople.
      </p>
    </form>
  );
}
