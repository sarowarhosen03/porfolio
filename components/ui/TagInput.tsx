import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useState } from "react";

interface TagInputProps {
    value?: string[];
    onChange?: (tags: string[]) => void;
    placeholder?: string;
    delimiter?: string;
    maxTags?: number;
    name?: string
}

export default function TagInput({
    value = [],
    onChange,
    placeholder = "Enter a tag...",
    delimiter = ",",
    maxTags,
    name
}: TagInputProps) {
    const [inputValue, setInputValue] = useState("");
    const [tags, setTags] = useState<string[]>(value);

    const addTags = (raw: string) => {
        let newTags = raw
            .split(delimiter)
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0 && !tags.includes(tag));

        if (maxTags) {
            newTags = newTags.slice(0, maxTags - tags.length);
        }

        if (newTags.length > 0) {
            const updated = [...tags, ...newTags];
            setTags(updated);
            onChange?.(updated);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if ((e.key === "Enter" || e.key === delimiter) && inputValue.trim()) {
            e.preventDefault();
            addTags(inputValue);
            setInputValue("");
        }
    };

    const removeTag = (index: number) => {
        const updated = tags.filter((_, i) => i !== index);
        setTags(updated);
        onChange?.(updated);
    };

    return (
        <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                    <Badge key={index} className="flex items-center gap-1">
                        {tag}
                        <X
                            className="w-3 h-3 cursor-pointer ml-1"
                            onClick={() => removeTag(index)}
                        />
                    </Badge>
                ))}
            </div>
            <Input
                name={name}
                placeholder={placeholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
}
