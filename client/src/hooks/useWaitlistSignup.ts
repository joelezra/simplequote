import { supabase } from "@/lib/supabase";
import { useState } from "react";

interface SignupResult {
  success: boolean;
  message: string;
}

export function useWaitlistSignup() {
  const [isPending, setIsPending] = useState(false);

  async function mutate(
    { email, tradeType }: { email: string; tradeType: string },
    callbacks?: {
      onSuccess?: (result: SignupResult) => void;
      onError?: (error: Error) => void;
    },
  ) {
    setIsPending(true);
    try {
      const { error } = await supabase
        .from("waitlist_signups")
        .insert({ email, trade_type: tradeType });

      if (error) {
        if (error.code === "23505") {
          callbacks?.onSuccess?.({
            success: false,
            message: "You're already on the waitlist!",
          });
        } else {
          callbacks?.onError?.(new Error(error.message));
        }
      } else {
        callbacks?.onSuccess?.({
          success: true,
          message: "Welcome aboard! You're on the early access list.",
        });
      }
    } catch (err) {
      callbacks?.onError?.(
        err instanceof Error ? err : new Error("Something went wrong"),
      );
    } finally {
      setIsPending(false);
    }
  }

  return { mutate, isPending };
}
