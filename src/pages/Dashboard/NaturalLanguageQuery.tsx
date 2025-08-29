import React, { useState } from "react";
import { SearchIcon, MicIcon, SendIcon, SparklesIcon } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { cn } from "../../lib/utils";

interface QuerySuggestion {
  id: string;
  text: string;
  category: "performance" | "quality" | "maintenance" | "production";
}

interface NaturalLanguageQueryProps {
  onQuery?: (query: string) => void;
  className?: string;
}

const suggestions: QuerySuggestion[] = [
  {
    id: "1",
    text: "Why was output low in Line 3 yesterday?",
    category: "production",
  },
  {
    id: "2",
    text: "Show me quality trends for Phoenix plant",
    category: "quality",
  },
  {
    id: "3",
    text: "Which plants need maintenance this week?",
    category: "maintenance",
  },
  {
    id: "4",
    text: "Compare OEE across all facilities",
    category: "performance",
  },
  {
    id: "5",
    text: "What caused the downtime spike in Detroit?",
    category: "production",
  },
  {
    id: "6",
    text: "Predict next equipment failure",
    category: "maintenance",
  },
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case "performance":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "quality":
      return "bg-green-100 text-green-800 border-green-200";
    case "maintenance":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "production":
      return "bg-purple-100 text-purple-800 border-purple-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export default function NaturalLanguageQuery({
  onQuery,
  className,
}: NaturalLanguageQueryProps) {
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onQuery?.(query);
      setQuery("");
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: QuerySuggestion) => {
    setQuery(suggestion.text);
    setShowSuggestions(false);
    onQuery?.(suggestion.text);
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // In a real implementation, this would integrate with Web Speech API
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        setQuery("Why was output low in Line 3 yesterday?");
      }, 2000);
    }
  };

  return (
    <Card className={cn("", className)}>
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center space-x-2 mb-4">
            <SparklesIcon className="h-5 w-5 text-blue-600" />

            <h3 className="text-lg font-semibold">Ask Anything</h3>
            <Badge variant="secondary" className="ml-auto">
              AI-Powered
            </Badge>
          </div>

          {/* Query Input */}
          <form onSubmit={handleSubmit}>
            <div>
              {/* <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" /> */}

              <Input
                prefix={<SearchIcon className="h-4 w-4 text-gray-400" />}
                suffix={<div className="flex items-center space-x-1 min-w-0">
                  <Button
                    type="button"
                    size="small"
                    variant="ghost"
                    onClick={handleVoiceInput}
                    className={cn(
                      "p-1.5 h-7 w-7 flex-shrink-0",
                      isListening && "bg-red-100 text-red-600 animate-pulse"
                    )}
                  >
                    <MicIcon className="h-3 w-3" />
                  </Button>
                  <Button
                    type="submit"
                    size="small"
                    disabled={!query.trim()}
                    className="p-1.5 h-7 w-7 flex-shrink-0"
                  >
                    <SendIcon className="h-3 w-3" />
                  </Button>
                </div>}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowSuggestions(e.target.value.length === 0);
                }}
                placeholder="Ask about production, quality, downtime, or any operational question..."
                className="p-2 text-base w-full"
                onFocus={() => setShowSuggestions(query.length === 0)}
              />
            </div>
          </form>

          {/* Voice Indicator */}
          {isListening && (
            <div className="flex items-center justify-center space-x-2 py-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />

              <span className="text-sm text-red-600">Listening...</span>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </div>
          )}

          {/* Suggestions */}
          {showSuggestions && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700">
                Popular Questions
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-left p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-sm text-gray-700 group-hover:text-blue-700 flex-1">
                        {suggestion.text}
                      </span>
                      <Badge
                        variant="outline"
                        className={cn(
                          "ml-2 text-xs",
                          getCategoryColor(suggestion.category)
                        )}
                      >
                        {suggestion.category}
                      </Badge>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2 pt-2 border-t">
            <Button
              variant="outline"
              size="small"
              onClick={() =>
                handleSuggestionClick({
                  id: "quick-1",
                  text: "Show today's summary",
                  category: "performance",
                })
              }
              className="text-xs px-2 py-1 h-8"
            >
              Today's Summary
            </Button>
            <Button
              variant="outline"
              size="small"
              onClick={() =>
                handleSuggestionClick({
                  id: "quick-2",
                  text: "Alert me to critical issues",
                  category: "maintenance",
                })
              }
              className="text-xs px-2 py-1 h-8"
            >
              Critical Issues
            </Button>
            <Button
              variant="outline"
              size="small"
              onClick={() =>
                handleSuggestionClick({
                  id: "quick-3",
                  text: "Best performing plant today",
                  category: "performance",
                })
              }
              className="text-xs px-2 py-1 h-8"
            >
              Top Performer
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
