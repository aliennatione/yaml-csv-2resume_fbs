"use client";

import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Sparkles } from "lucide-react";
import { enhanceEntryWithAI } from "@/ai/flows/enhance-entry-with-ai";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

type AIEnhancerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  entry: string;
  onSave: (newEntry: string) => void;
};

// Hardcoded examples to guide the AI model
const exampleEntries = [
  "Led a team of 5 engineers to redesign the company's flagship product, resulting in a 20% increase in user engagement.",
  "Quantified and improved performance of a critical API endpoint, reducing latency by 300ms (50%) and saving $5,000 per month in server costs.",
  "Developed and launched a new feature for a mobile app with 1M+ active users, using React Native and TypeScript.",
];

export function AIEnhancer({ open, onOpenChange, entry, onSave }: AIEnhancerProps) {
  const [enhancedEntry, setEnhancedEntry] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    if (!open) {
      // Reset state when sheet is closed
      setEnhancedEntry("");
      setIsLoading(false);
    }
  }, [open]);

  const handleEnhance = async () => {
    setIsLoading(true);
    setEnhancedEntry("");
    try {
      const result = await enhanceEntryWithAI({ entryText: entry, exampleEntries });
      if (result.enhancedEntry) {
        setEnhancedEntry(result.enhancedEntry);
      }
    } catch (error) {
      console.error("AI enhancement failed:", error);
      toast({
        variant: "destructive",
        title: "AI Enhancement Failed",
        description: "Could not get suggestions. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    if (enhancedEntry) {
      onSave(enhancedEntry);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-xl w-full flex flex-col">
        <SheetHeader>
          <SheetTitle>Enhance with AI</SheetTitle>
          <SheetDescription>
            Get AI-powered suggestions to make your resume entry more impactful.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto space-y-4 py-4">
          <div>
            <Label htmlFor="original-entry">Original Entry</Label>
            <Textarea
              id="original-entry"
              readOnly
              value={entry}
              className="mt-2 min-h-[100px] bg-muted/50"
            />
          </div>

          <div className="text-center">
            <Button onClick={handleEnhance} disabled={isLoading}>
              <Sparkles className="mr-2 h-4 w-4" />
              {isLoading ? "Generating..." : "Get Suggestions"}
            </Button>
          </div>

          <div>
            <Label htmlFor="enhanced-entry">AI Suggestion</Label>
            {isLoading ? (
              <div className="mt-2 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : (
              <Textarea
                id="enhanced-entry"
                value={enhancedEntry}
                onChange={(e) => setEnhancedEntry(e.target.value)}
                className="mt-2 min-h-[100px] border-accent focus-visible:ring-accent"
                placeholder="AI suggestions will appear here..."
              />
            )}
          </div>
        </div>
        <SheetFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!enhancedEntry || isLoading}>
            Save Changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
