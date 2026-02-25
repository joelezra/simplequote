import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export function useWaitlistCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    supabase.rpc("get_waitlist_count").then(({ data }) => {
      if (typeof data === "number") setCount(data);
    });

    const channel = supabase
      .channel("waitlist_count")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "waitlist_signups" },
        () => setCount((c) => c + 1),
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return count;
}
