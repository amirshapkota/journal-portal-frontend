"use client";

import { useTheme } from "next-themes";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Sun, Moon, Monitor } from "lucide-react";

export default function AppearanceTab() {
  const { theme, setTheme, systemTheme } = useTheme();

  const themes = [
    {
      value: "light",
      label: "Light",
      icon: <Sun className="h-6 w-6" />,
      description: "Clean and bright interface",
    },
    {
      value: "dark",
      label: "Dark",
      icon: <Moon className="h-6 w-6" />,
      description: "Dark theme for reduced eye strain",
    },
    {
      value: "system",
      label: "System",
      icon: <Monitor className="h-6 w-6" />,
      description: "Follow system preferences",
    },
  ];

  const currentTheme = theme || "system";

  return (
    <Card className="">
      {/* Header */}
      <CardHeader>
        <CardTitle>Theme</CardTitle>
        <CardDescription>
          Choose how you&apos;d like OmWay to look
        </CardDescription>
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {themes.map((themeOption) => {
            const isActive = currentTheme === themeOption.value;
            return (
              <Card
                key={themeOption.value}
                onClick={() => setTheme(themeOption.value)}
                className={`cursor-pointer transition-all border-2 ${
                  isActive
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-muted-foreground/50"
                }`}
              >
                <CardContent className="flex flex-col items-center text-center space-y-3 p-4">
                  <div
                    className={
                      isActive ? "text-primary" : "text-muted-foreground"
                    }
                  >
                    {themeOption.icon}
                  </div>
                  <p className="font-semibold text-foreground">
                    {themeOption.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {themeOption.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Footer Info */}
        <p className="text-xs text-muted-foreground pt-2">
          {currentTheme === "system"
            ? `Using system preference (${systemTheme})`
            : `Currently using ${currentTheme} mode`}
        </p>
      </CardContent>
    </Card>
  );
}
