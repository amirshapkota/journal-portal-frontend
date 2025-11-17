"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Plus, Edit, Trash2, ChevronRight, Loader2 } from "lucide-react";
import { 
  useGetTaxonomyTree, 
  useCreateSection,
  useUpdateSection,
  useDeleteSection,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
  useCreateResearchType,
  useUpdateResearchType,
  useDeleteResearchType,
  useCreateArea,
  useUpdateArea,
  useDeleteArea,
  useGetUsers
} from "@/features";

export function TaxonomySettings({ journalId }) {
  const [isAddSectionOpen, setIsAddSectionOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isAddResearchTypeOpen, setIsAddResearchTypeOpen] = useState(false);
  const [isAddAreaOpen, setIsAddAreaOpen] = useState(false);
  
  const [isEditSectionOpen, setIsEditSectionOpen] = useState(false);
  const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false);
  const [isEditResearchTypeOpen, setIsEditResearchTypeOpen] = useState(false);
  const [isEditAreaOpen, setIsEditAreaOpen] = useState(false);
  
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedResearchType, setSelectedResearchType] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  
  const [editingSection, setEditingSection] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingResearchType, setEditingResearchType] = useState(null);
  const [editingArea, setEditingArea] = useState(null);

  // Fetch taxonomy tree from backend
  const { data: sections = [], isPending, error } = useGetTaxonomyTree(journalId);
  
  // Section mutations
  const createSectionMutation = useCreateSection();
  const updateSectionMutation = useUpdateSection();
  const deleteSectionMutation = useDeleteSection();
  
  // Category mutations
  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();
  
  // Research Type mutations
  const createResearchTypeMutation = useCreateResearchType();
  const updateResearchTypeMutation = useUpdateResearchType();
  const deleteResearchTypeMutation = useDeleteResearchType();
  
  // Area mutations
  const createAreaMutation = useCreateArea();
  const updateAreaMutation = useUpdateArea();
  const deleteAreaMutation = useDeleteArea();

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
    createSectionMutation.mutate({
      journal: journalId,
      ...data,
    }, {
      onSuccess: () => {
        setIsAddSectionOpen(false);
      },
    });
  };

  const handleAddCategory = (data) => {
    if (!selectedSection) {
      toast.error("No section selected");
      return;
    }
    
    createCategoryMutation.mutate({
      section: selectedSection.id,
      ...data,
    }, {
      onSuccess: () => {
        setIsAddCategoryOpen(false);
        setSelectedSection(null);
      },
    });
  };

  const handleAddResearchType = (data) => {
    if (!selectedCategory) {
      toast.error("No category selected");
      return;
    }
    
    createResearchTypeMutation.mutate({
      category: selectedCategory.id,
      ...data,
    }, {
      onSuccess: () => {
        setIsAddResearchTypeOpen(false);
        setSelectedCategory(null);
      },
    });
  };

  const handleAddArea = (data) => {
    if (!selectedResearchType) {
      toast.error("No research type selected");
      return;
    }
    
    createAreaMutation.mutate({
      research_type: selectedResearchType.id,
      ...data,
    }, {
      onSuccess: () => {
        setIsAddAreaOpen(false);
        setSelectedResearchType(null);
      },
    });
  };

  // Edit handlers
  const handleEditSection = (data) => {
    updateSectionMutation.mutate({
      id: editingSection.id,
      ...data,
    }, {
      onSuccess: () => {
        setIsEditSectionOpen(false);
        setEditingSection(null);
      },
    });
  };

  const handleEditCategory = (data) => {
    updateCategoryMutation.mutate({
      id: editingCategory.id,
      ...data,
    }, {
      onSuccess: () => {
        setIsEditCategoryOpen(false);
        setEditingCategory(null);
      },
    });
  };

  const handleEditResearchType = (data) => {
    updateResearchTypeMutation.mutate({
      id: editingResearchType.id,
      ...data,
    }, {
      onSuccess: () => {
        setIsEditResearchTypeOpen(false);
        setEditingResearchType(null);
      },
    });
  };

  const handleEditArea = (data) => {
    updateAreaMutation.mutate({
      id: editingArea.id,
      ...data,
    }, {
      onSuccess: () => {
        setIsEditAreaOpen(false);
        setEditingArea(null);
      },
    });
  };

  // Delete handlers
  const handleDeleteSection = (section) => {
    if (confirm(`Are you sure you want to delete section "${section.name}"? This will delete all categories, research types, and areas within it.`)) {
      deleteSectionMutation.mutate(section.id);
    }
  };

  const handleDeleteCategory = (category) => {
    if (confirm(`Are you sure you want to delete category "${category.name}"? This will delete all research types and areas within it.`)) {
      deleteCategoryMutation.mutate(category.id);
    }
  };

  const handleDeleteResearchType = (researchType) => {
    if (confirm(`Are you sure you want to delete research type "${researchType.name}"? This will delete all areas within it.`)) {
      deleteResearchTypeMutation.mutate(researchType.id);
    }
  };

  const handleDeleteArea = (area) => {
    if (confirm(`Are you sure you want to delete area "${area.name}"?`)) {
      deleteAreaMutation.mutate(area.id);
    }
  };

  if (isPending) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center text-destructive">
            <p>Failed to load taxonomy structure</p>
            <p className="text-sm mt-1">{error.message}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

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
            {sections.map((section) => (
              <AccordionItem key={section.id} value={section.id} className="border rounded-lg px-4">
                <div className="flex items-center justify-between gap-3">
                  <AccordionTrigger className="hover:no-underline flex-1">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">{section.code}</Badge>
                      <div className="text-left">
                        <p className="font-medium">{section.name}</p>
                        <p className="text-sm text-muted-foreground">{section.description}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <div className="flex gap-2">
                    <div
                      className="p-2 hover:bg-muted rounded cursor-pointer"
                      onClick={() => {
                        setEditingSection(section);
                        setIsEditSectionOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </div>
                    <div
                      className="p-2 hover:bg-muted rounded cursor-pointer text-destructive"
                      onClick={() => handleDeleteSection(section)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </div>
                  </div>
                </div>
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
                          <div className="flex items-center justify-between gap-2">
                            <AccordionTrigger className="hover:no-underline text-sm flex-1">
                              <div className="flex items-center gap-2">
                                <ChevronRight className="h-4 w-4" />
                                <Badge variant="secondary" className="text-xs">
                                  {category.code}
                                </Badge>
                                <span className="font-medium">{category.name}</span>
                              </div>
                            </AccordionTrigger>
                            <div className="flex gap-1">
                              <div
                                className="p-1 hover:bg-muted rounded cursor-pointer"
                                onClick={() => {
                                  setEditingCategory(category);
                                  setIsEditCategoryOpen(true);
                                }}
                              >
                                <Edit className="h-3 w-3" />
                              </div>
                              <div
                                className="p-1 hover:bg-muted rounded cursor-pointer text-destructive"
                                onClick={() => handleDeleteCategory(category)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </div>
                            </div>
                          </div>
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
                                    <div className="flex items-center justify-between gap-2">
                                      <AccordionTrigger className="hover:no-underline text-xs py-2 flex-1">
                                        <div className="flex items-center gap-2">
                                          <Badge variant="outline" className="text-xs">
                                            {researchType.code}
                                          </Badge>
                                          <span>{researchType.name}</span>
                                        </div>
                                      </AccordionTrigger>
                                      <div className="flex gap-1">
                                        <div
                                          className="p-1 hover:bg-muted rounded cursor-pointer"
                                          onClick={() => {
                                            setEditingResearchType(researchType);
                                            setIsEditResearchTypeOpen(true);
                                          }}
                                        >
                                          <Edit className="h-3 w-3" />
                                        </div>
                                        <div
                                          className="p-1 hover:bg-muted rounded cursor-pointer text-destructive"
                                          onClick={() => handleDeleteResearchType(researchType)}
                                        >
                                          <Trash2 className="h-3 w-3" />
                                        </div>
                                      </div>
                                    </div>
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
                                                  {area.keywords && area.keywords.length > 0 && (
                                                    <div className="flex flex-wrap gap-1 mt-1">
                                                      {area.keywords.map((keyword, idx) => (
                                                        <span
                                                          key={idx}
                                                          className="bg-muted px-1.5 py-0.5 rounded text-xs"
                                                        >
                                                          {keyword}
                                                        </span>
                                                      ))}
                                                    </div>
                                                  )}
                                                </div>
                                                <div className="flex gap-1 ml-2">
                                                  <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => {
                                                      setEditingArea(area);
                                                      setIsEditAreaOpen(true);
                                                    }}
                                                    className="h-6 px-1"
                                                  >
                                                    <Edit className="h-3 w-3" />
                                                  </Button>
                                                  <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => handleDeleteArea(area)}
                                                    className="h-6 px-1 text-destructive hover:text-destructive"
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

          {sections.length === 0 && (
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
        fields={["name", "code", "description", "order", "is_active"]}
        journalId={journalId}
      />

      {/* Add Category Dialog */}
      <TaxonomyFormDialog
        isOpen={isAddCategoryOpen}
        onClose={() => setIsAddCategoryOpen(false)}
        title="Add Category"
        onSubmit={handleAddCategory}
        fields={["name", "code", "description", "order", "is_active"]}
      />

      {/* Add Research Type Dialog */}
      <TaxonomyFormDialog
        isOpen={isAddResearchTypeOpen}
        onClose={() => setIsAddResearchTypeOpen(false)}
        title="Add Research Type"
        onSubmit={handleAddResearchType}
        fields={["name", "code", "description", "requirements", "order", "is_active"]}
      />

      {/* Add Area Dialog */}
      <TaxonomyFormDialog
        isOpen={isAddAreaOpen}
        onClose={() => setIsAddAreaOpen(false)}
        title="Add Area"
        onSubmit={handleAddArea}
        fields={["name", "code", "description", "keywords", "order", "is_active"]}
      />

      {/* Edit Section Dialog */}
      {editingSection && (
        <TaxonomyFormDialog
          isOpen={isEditSectionOpen}
          onClose={() => {
            setIsEditSectionOpen(false);
            setEditingSection(null);
          }}
          title="Edit Section"
          onSubmit={handleEditSection}
          fields={["name", "code", "description", "order", "is_active"]}
          initialData={editingSection}
          journalId={journalId}
        />
      )}

      {/* Edit Category Dialog */}
      {editingCategory && (
        <TaxonomyFormDialog
          isOpen={isEditCategoryOpen}
          onClose={() => {
            setIsEditCategoryOpen(false);
            setEditingCategory(null);
          }}
          title="Edit Category"
          onSubmit={handleEditCategory}
          fields={["name", "code", "description", "order", "is_active"]}
          initialData={editingCategory}
        />
      )}

      {/* Edit Research Type Dialog */}
      {editingResearchType && (
        <TaxonomyFormDialog
          isOpen={isEditResearchTypeOpen}
          onClose={() => {
            setIsEditResearchTypeOpen(false);
            setEditingResearchType(null);
          }}
          title="Edit Research Type"
          onSubmit={handleEditResearchType}
          fields={["name", "code", "description", "requirements", "order", "is_active"]}
          initialData={editingResearchType}
        />
      )}

      {/* Edit Area Dialog */}
      {editingArea && (
        <TaxonomyFormDialog
          isOpen={isEditAreaOpen}
          onClose={() => {
            setIsEditAreaOpen(false);
            setEditingArea(null);
          }}
          title="Edit Area"
          onSubmit={handleEditArea}
          fields={["name", "code", "description", "keywords", "order", "is_active"]}
          initialData={editingArea}
        />
      )}
    </div>
  );
}

function TaxonomyFormDialog({ isOpen, onClose, title, onSubmit, fields, initialData, journalId }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    code: initialData?.code || "",
    description: initialData?.description || "",
    keywords: initialData?.keywords ? initialData.keywords.join(", ") : "",
    order: initialData?.order || 0,
    is_active: initialData?.is_active !== undefined ? initialData.is_active : true,
    section_editor: initialData?.section_editor || "",
    requirements: initialData?.requirements ? JSON.stringify(initialData.requirements, null, 2) : "{}",
  });

  // Fetch users for section editor dropdown
  const { data: usersData } = useGetUsers(journalId);
  const users = usersData?.results || usersData || [];

  // Update form when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        code: initialData.code || "",
        description: initialData.description || "",
        keywords: initialData.keywords ? initialData.keywords.join(", ") : "",
        order: initialData.order || 0,
        is_active: initialData.is_active !== undefined ? initialData.is_active : true,
        section_editor: initialData.section_editor || "",
        requirements: initialData.requirements ? JSON.stringify(initialData.requirements, null, 2) : "{}",
      });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...formData };
    
    // Process keywords
    if (fields.includes("keywords")) {
      data.keywords = formData.keywords.split(",").map((k) => k.trim()).filter(Boolean);
    }
    
    // Process requirements JSON
    if (fields.includes("requirements")) {
      try {
        data.requirements = JSON.parse(formData.requirements);
      } catch (error) {
        toast.error("Invalid JSON format for requirements");
        return;
      }
    }
    
    // Convert order to number
    if (fields.includes("order")) {
      data.order = parseInt(formData.order) || 0;
    }
    
    // Ensure is_active is boolean
    if (fields.includes("is_active")) {
      data.is_active = Boolean(formData.is_active);
    }
    
    // Only include section_editor if it has a value
    if (fields.includes("section_editor") && !formData.section_editor) {
      delete data.section_editor;
    }
    
    onSubmit(data);
    if (!initialData) {
      setFormData({ 
        name: "", 
        code: "", 
        description: "", 
        keywords: "",
        order: 0,
        is_active: true,
        section_editor: "",
        requirements: "{}",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {initialData ? "Update the taxonomy entry details" : "Fill in the details below to create a new taxonomy entry"}
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
          {fields.includes("requirements") && (
            <div className="space-y-2">
              <Label htmlFor="requirements">Requirements (JSON)</Label>
              <Textarea
                id="requirements"
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                rows={5}
                placeholder='{"word_count": 5000, "sections": ["abstract", "introduction"]}'
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Manuscript requirements in JSON format (word count, required sections, etc.)
              </p>
            </div>
          )}
          {fields.includes("section_editor") && (
            <div className="space-y-2">
              <Label htmlFor="section_editor">Section Editor (Optional)</Label>
              <Select
                value={formData.section_editor}
                onValueChange={(value) => setFormData({ ...formData, section_editor: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a section editor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.profile?.display_name || user.profile?.user_name || "Unknown User"}
                      {user.profile?.affiliation_name && ` (${user.profile.affiliation_name})`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          {fields.includes("order") && (
            <div className="space-y-2">
              <Label htmlFor="order">Display Order</Label>
              <Input
                id="order"
                type="number"
                min="0"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                placeholder="0"
              />
              <p className="text-xs text-muted-foreground">
                Lower numbers appear first. Use 0 for default ordering.
              </p>
            </div>
          )}
          {fields.includes("is_active") && (
            <div className="flex items-center justify-between space-y-2">
              <div className="space-y-0.5">
                <Label htmlFor="is_active">Active Status</Label>
                <p className="text-xs text-muted-foreground">
                  Inactive entries are hidden from users
                </p>
              </div>
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{initialData ? "Update" : "Create"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
