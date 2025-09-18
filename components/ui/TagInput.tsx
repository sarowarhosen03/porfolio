import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

interface TagInputProps {
  value?: string[]
  onChange?: (tags: string[]) => void
  placeholder?: string
  delimiter?: string
  maxTags?: number
}

export default function TagInput({
  value,
  onChange,
  placeholder = 'Enter a tag...',
  delimiter = ',',
  maxTags,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('')
  const [internalTags, setInternalTags] = useState<string[]>([])

  // Keep internal state in sync with `value` prop
  const tags = value !== undefined ? value : internalTags

  useEffect(() => {
    if (value !== undefined) {
      setInternalTags(value)
    }
  }, [value])

  const emitChange = (next: string[]) => {
    if (onChange) {
      onChange(next)
    } else {
      setInternalTags(next)
    }
  }

  const addTags = (raw: string) => {
    let newTags = raw
      .split(delimiter)
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0 && !tags.includes(tag))

    if (maxTags) {
      newTags = newTags.slice(0, maxTags - tags.length)
    }

    if (newTags.length > 0) {
      emitChange([...tags, ...newTags])
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === delimiter) && inputValue.trim()) {
      e.preventDefault()
      addTags(inputValue)
      setInputValue('')
    }
  }

  const removeTag = (index: number) => {
    const updated = tags.filter((_, i) => i !== index)
    emitChange(updated)
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <Badge key={index} className="flex items-center gap-1">
            {tag}
            <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => removeTag(index)} />
          </Badge>
        ))}
      </div>
      <Input
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}
