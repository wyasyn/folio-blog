import { TextEffect } from "@/components/core/text-effect";

export function TextEffectPerChar() {
  return (
    <TextEffect
      per="char"
      preset="fade"
      className="text-3xl text-balance mb-4 capitalize font-serif text-foreground"
    >
      👋 Welcome to My Digital Space 👉 Crafting Innovative Solutions.
    </TextEffect>
  );
}
