"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import { Plus, Edit, Trash2, ChevronRight } from "lucide-react";

export function TaxonomySettings({ journalId }) {
  const [sections, setSections] = useState([]);
  const [isAddSectionOpen, setIsAddSectionOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isAddResearchTypeOpen, setIsAddResearchTypeOpen] = useState(false);
  const [isAddAreaOpen, setIsAddAreaOpen] = useState(false);
  
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedResearchType, setSelectedResearchType] = useState(null);

  // Sample data structure
  const mockSections = [
    {
      id: "1",
      name: "Computer Science",
      code: "CS",
      description: "Computing and Information Technology",
      categories: [
        {
          id: "1",
          name: "Artificial Intelligence",
          code: "AI",
          description: "AI and Machine Learning",
          research_types: [
            {
              id: "1",
              name: "Original Research",
              code: "ORIGINAL",
              description: "Novel research contributions",
              areas: [
                {
                  id: "1",
                  name: "Machine Learning",
                  code: "ML",
                  keywords: ["neural networks", "deep learning", "supervised learning"],
                },
                {
                  id: "2",
                  name: "Natural Language Processing",
                  code: "NLP",
                  keywords: ["text mining", "language models", "sentiment analysis"],
                },
              ],
            },
            {
              id: "2",
              name: "Review Article",
              code: "REVIEW",
              description: "Comprehensive review of existing research",
              areas: [],
            },
          ],
        },
      ],
    },
  ];

  const handleAddSection = (data) => {
    toast.success("Section added successfully");
    setIsAddSectionOpen(false);
  };

  const handleAddCategory = (data) => {
    toast.success("Category added successfully");
    setIsAddCategoryOpen(false);
  };

  const handleAddResearchType = (data) => {
    toast.success("Research type added successfully");
    setIsAddResearchTypeOpen(false);
  };

  const handleAddArea = (data) => {
    toast.success("Area added successfully");
    setIsAddAreaOpen(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Taxonomy Structure</CardTitle>
            <CardDescription>
              Define hierarchical classification: Section → Category → Research Type → Area
            </CardDescription>
          </div>
          <Button onClick={() => setIsAddSectionOpen(true)} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Section
          </Button>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="space-y-2">
            {mockSections.map((section) => (
              <AccordionItem key={section.id} value={section.id} className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3 flex-1">
                    <Badge variant="outline">{section.code}</Badge>
                    <div className="text-left">
                      <p className="font-medium">{section.name}</p>
                      <p className="text-sm text-muted-foreground">{section.description}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-2">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-medium">Categories</p>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedSection(section);
                          setIsAddCategoryOpen(true);
                        }}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add Category
                      </Button>
                    </div>

                    <Accordion type="multiple" className="space-y-2">
                      {section.categories.map((category) => (
                        <AccordionItem
                          key={category.id}
                          value={category.id}
                          className="border rounded-lg px-3 ml-4"
                        >
                          <AccordionTrigger className="hover:no-underline text-sm">
                            <div className="flex items-center gap-2 flex-1">
                              <ChevronRight className="h-4 w-4" />
                              <Badge variant="secondary" className="text-xs">
                                {category.code}
                              </Badge>
                              <span className="font-medium">{category.name}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pt-3 pb-2">
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <p className="text-xs font-medium text-muted-foreground">
                                  Research Types
                                </p>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setSelectedCategory(category);
                                    setIsAddResearchTypeOpen(true);
                                  }}
                                  className="h-7 text-xs"
                                >
                                  <Plus className="h-3 w-3 mr-1" />
                                  Add Type
                                </Button>
                              </div>

                              <Accordion type="multiple" className="space-y-2">
                                {category.research_types.map((researchType) => (
                                  <AccordionItem
                                    key={researchType.id}
                                    value={researchType.id}
                                    className="border rounded px-2 ml-4"
                                  >
                                    <AccordionTrigger className="hover:no-underline text-xs py-2">
                                      <div className="flex items-center gap-2">
                                        <Badge variant="outline" className="text-xs">
                                          {researchType.code}
                                        </Badge>
                                        <span>{researchType.name}</span>
                                      </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pt-2 pb-2">
                                      <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                          <p className="text-xs font-medium text-muted-foreground">
                                            Areas
                                          </p>
                                          <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => {
                                              setSelectedResearchType(researchType);
                                              setIsAddAreaOpen(true);
                                            }}
                                            className="h-6 text-xs"
                                          >
                                            <Plus className="h-3 w-3 mr-1" />
                                            Add Area
                                          </Button>
                                        </div>

                                        {researchType.areas.length > 0 ? (
                                          <div className="space-y-2 ml-4">
                                            {researchType.areas.map((area) => (
                                              <div
                                                key={area.id}
                                                className="flex items-start justify-between border rounded p-2 text-xs"
                                              >
                                                <div className="flex-1">
                                                  <div className="flex items-center gap-2 mb-1">
                                                    <Badge variant="secondary" className="text-xs">
                                                      {area.code}
                                                    </Badge>
                                                    <span className="font-medium">{area.name}</span>
                                                  </div>
                                                  <div className="flex flex-wrap gap-1 mt-1">
                                                    {area.keywords.map((keyword, idx) => (
                                                      <Badge
                                                        key={idx}
                                                        variant="outline"
                                                        className="text-xs"
                                                      >
                                                        {keyword}
                                                      </Badge>
                                                    ))}
                                                  </div>
                                                </div>
                                                <div className="flex gap-1">
                                                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                                    <Edit className="h-3 w-3" />
                                                  </Button>
                                                  <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-6 w-6 p-0 text-destructive"
                                                  >
                                                    <Trash2 className="h-3 w-3" />
                                                  </Button>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        ) : (
                                          <p className="text-xs text-muted-foreground ml-4">
                                            No areas defined
                                          </p>
                                        )}
                                      </div>
                                    </AccordionContent>
                                  </AccordionItem>
                                ))}
                              </Accordion>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {mockSections.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>No sections defined yet</p>
              <p className="text-sm mt-1">Click "Add Section" to get started</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Section Dialog */}
      <TaxonomyFormDialog
        isOpen={isAddSectionOpen}
        onClose={() => setIsAddSectionOpen(false)}
        title="Add Section"
        onSubmit={handleAddSection}
        fields={["name", "code", "description"]}
      />

      {/* Add Category Dialog */}
      <TaxonomyFormDialog
        isOpen={isAddCategoryOpen}
        onClose={() => setIsAddCategoryOpen(false)}
        title="Add Category"
        onSubmit={handleAddCategory}
        fields={["name", "code", "description"]}
      />

      {/* Add Research Type Dialog */}
      <TaxonomyFormDialog
        isOpen={isAddResearchTypeOpen}
        onClose={() => setIsAddResearchTypeOpen(false)}
        title="Add Research Type"
        onSubmit={handleAddResearchType}
        fields={["name", "code", "description"]}
      />

      {/* Add Area Dialog */}
      <TaxonomyFormDialog
        isOpen={isAddAreaOpen}
        onClose={() => setIsAddAreaOpen(false)}
        title="Add Area"
        onSubmit={handleAddArea}
        fields={["name", "code", "description", "keywords"]}
      />
    </div>
  );
}

function TaxonomyFormDialog({ isOpen, onClose, title, onSubmit, fields }) {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    keywords: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...formData };
    if (fields.includes("keywords")) {
      data.keywords = formData.keywords.split(",").map((k) => k.trim()).filter(Boolean);
    }
    onSubmit(data);
    setFormData({ name: "", code: "", description: "", keywords: "" });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new taxonomy entry
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.includes("name") && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
          )}
          {fields.includes("code") && (
            <div className="space-y-2">
              <Label htmlFor="code">Code</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value.toUpperCase() })
                }
                placeholder="e.g., CS, AI, ML"
                required
              />
            </div>
          )}
          {fields.includes("description") && (
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
          )}
          {fields.includes("keywords") && (
            <div className="space-y-2">
              <Label htmlFor="keywords">Keywords</Label>
              <Input
                id="keywords"
                value={formData.keywords}
                onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                placeholder="keyword1, keyword2, keyword3"
              />
              <p className="text-xs text-muted-foreground">Separate keywords with commas</p>
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
