// ManuscriptInfoStep.jsx
import { useState } from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { X, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FormRichTextEditor } from '@/features/shared';
import { WordCounter } from '@/components/ui/word-counter';

export default function ManuscriptInfoStep({ form, sectionLimits = null }) {
  const [keywordInput, setKeywordInput] = useState('');

  const abstract = form.watch('abstract');

  const handleAddKeyword = (field) => {
    const trimmedKeyword = keywordInput.trim();
    if (trimmedKeyword && !field.value?.includes(trimmedKeyword)) {
      field.onChange([...(field.value || []), trimmedKeyword]);
      setKeywordInput('');
    }
  };

  const handleKeywordKeyPress = (e, field) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddKeyword(field);
    }
  };

  const handleRemoveKeyword = (field, index) => {
    field.onChange(field.value.filter((_, idx) => idx !== index));
  };

  return (
    <div className="space-y-4">
      {sectionLimits && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Section Requirements:</strong>
            {sectionLimits.abstract_word_limit > 0 && (
              <span> Abstract must not exceed {sectionLimits.abstract_word_limit} words.</span>
            )}
            {sectionLimits.max_authors > 0 && (
              <span> Maximum {sectionLimits.max_authors} authors allowed.</span>
            )}
            {sectionLimits.total_word_limit > 0 && (
              <span> Total word limit: {sectionLimits.total_word_limit} words.</span>
            )}
          </AlertDescription>
        </Alert>
      )}

      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Manuscript Title</FormLabel>
            <FormControl>
              <Input placeholder="Enter manuscript title..." {...field} />
            </FormControl>
            <FormDescription>Max 500 characters ({field.value?.length || 0}/500)</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-2">
        <FormRichTextEditor
          control={form.control}
          autoFocus={false}
          name="abstract"
          label="Abstract"
          placeholder="Enter your abstract..."
          editor_classname="min-h-[400px]!"
        />
        {sectionLimits && sectionLimits.abstract_word_limit > 0 && (
          <WordCounter text={abstract} limit={sectionLimits.abstract_word_limit} showProgress />
        )}
      </div>

      <FormField
        control={form.control}
        name="keywords"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Keywords</FormLabel>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  placeholder="Add keyword and press Enter..."
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyPress={(e) => handleKeywordKeyPress(e, field)}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddKeyword(field)}
                >
                  Add
                </Button>
              </div>
              {field.value?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {field.value.map((keyword, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm flex items-center gap-2"
                    >
                      {keyword}
                      <button
                        type="button"
                        onClick={() => handleRemoveKeyword(field, i)}
                        className="hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
