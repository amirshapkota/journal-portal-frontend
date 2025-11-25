"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FormRichTextEditor } from "@/features";
import { Loader2, Check, X, Plus } from "lucide-react";
import { profileSchema } from "../../reader/utils/FormSchema";
import { Badge } from "@/components/ui/badge";

export default function ProfileForm({
  defaultValues,
  saveSuccess,
  onSubmit,
  onCancel,
  isPending,
}) {
  const [expertiseAreas, setExpertiseAreas] = useState([]);
  const [newExpertise, setNewExpertise] = useState("");

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });

  // Initialize expertise areas from default values
  useEffect(() => {
    if (defaultValues?.expertise_areas) {
      const areas =
        typeof defaultValues.expertise_areas === "string"
          ? defaultValues.expertise_areas
              .split(",")
              .map((area) => area.trim())
              .filter(Boolean)
          : Array.isArray(defaultValues.expertise_areas)
          ? defaultValues.expertise_areas
          : [];
      setExpertiseAreas(areas);
    }
  }, [defaultValues?.expertise_areas]);

  const handleAddExpertise = () => {
    const trimmedExpertise = newExpertise.trim();
    if (trimmedExpertise && !expertiseAreas.includes(trimmedExpertise)) {
      const updatedAreas = [...expertiseAreas, trimmedExpertise];
      setExpertiseAreas(updatedAreas);
      form.setValue("expertise_areas", updatedAreas, { shouldDirty: true });
      setNewExpertise("");
    }
  };

  const handleRemoveExpertise = (indexToRemove) => {
    const updatedAreas = expertiseAreas.filter(
      (_, index) => index !== indexToRemove
    );
    setExpertiseAreas(updatedAreas);
    form.setValue("expertise_areas", updatedAreas, { shouldDirty: true });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddExpertise();
    }
  };

  const handleFormSubmit = (data) => {
    // Ensure expertise_areas is sent as an array
    const formattedData = {
      ...data,
      expertise_areas: expertiseAreas,
    };
    onSubmit(formattedData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-6"
      >
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">
            Personal Information
          </h3>
          <div className=" grid grid-cols-1 lg:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="user_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="user_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="display_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Dr. Sarah Chen" {...field} />
                  </FormControl>
                  <FormDescription>
                    How your name appears on your profile
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        {/* Academic Information */}
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">
            Academic Information
          </h3>
          <FormField
            control={form.control}
            name="affiliation_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Institution/Organization</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Stanford University" {...field} />
                </FormControl>
                <FormDescription>
                  Your current academic or research institution
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Expertise Areas - Dynamic Multi-Item Input */}
          <FormItem>
            <FormLabel>Expertise Areas</FormLabel>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  placeholder="e.g., Genomics, Machine Learning"
                  value={newExpertise}
                  onChange={(e) => setNewExpertise(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={handleAddExpertise}
                  variant="outline"
                  size="icon"
                  disabled={!newExpertise.trim()}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Display expertise areas as badges */}
              {expertiseAreas.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {expertiseAreas.map((area, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="px-3 py-1 text-sm flex items-center gap-1"
                    >
                      {area}
                      <button
                        type="button"
                        onClick={() => handleRemoveExpertise(index)}
                        className="ml-1 cursor-pointer hover:text-secondary-foreground transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <FormDescription>
              Add your areas of expertise one at a time
            </FormDescription>
          </FormItem>
        </div>
        {/* Bio Section */}
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">About</h3>
          <FormRichTextEditor
            control={form.control}
            name="bio"
            label="Bio"
            placeholder="Tell us about yourself, your research interests, and professional background..."
            description={`${
              form.watch("bio")?.replace(/<[^>]*>/g, "").length || 0
            }/500 characters`}
          />
        </div>
        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button
            type="submit"
            disabled={isPending || saveSuccess || !form.formState.isDirty}
            className="w-fit"
          >
            {saveSuccess && <Check className="w-4 h-4 mr-2" />}
            {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {saveSuccess
              ? "Saved Successfully"
              : isPending
              ? "Saving..."
              : "Save Changes"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isPending}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
