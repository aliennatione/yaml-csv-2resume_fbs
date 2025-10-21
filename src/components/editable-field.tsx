"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from './ui/button';

type EditableFieldProps = {
  as?: React.ElementType;
  value: string;
  onSave: (value: string) => void;
  className?: string;
  children?: React.ReactNode;
  enableAI?: boolean;
};

export const EditableField: React.FC<EditableFieldProps> = ({
  as: Component = 'span',
  value,
  onSave,
  className,
  enableAI = false,
  ...props
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(value);
  const [isImproving, setIsImproving] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setText(value);
  }, [value]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setText(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (text !== value) {
        onSave(text);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && Component !== 'textarea') {
      inputRef.current?.blur();
    }
  };

  const handleImproveText = async () => {
    setIsImproving(true);
    try {
      const response = await fetch('/api/genkit/improveText', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: text }),
      });
      if (!response.ok) {
        throw new Error('Failed to improve text');
      }
      const improvedText = await response.json();
      setText(improvedText);
      onSave(improvedText);
    } catch (error) {
      console.error(error);
    } finally {
      setIsImproving(false);
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const renderComponent = () => (
    <Component
        onDoubleClick={handleDoubleClick}
        className={`${className} hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer p-1 rounded transition-colors duration-200`}
        {...props}
      >
        {text || <span className="text-gray-400">Edit</span>}
      </Component>
  )

  if (isEditing) {
    const InputComponent = Component === 'textarea' ? 'textarea' : 'input';
    return (
        <div className="relative w-full">
             <InputComponent
                ref={inputRef as any}
                value={text}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className={`${className} w-full pr-10`}
                rows={Component === 'textarea' ? 4 : undefined}
                {...props}
            />
            {enableAI && (
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1/2 right-2 transform -translate-y-1/2"
                    onClick={handleImproveText}
                    disabled={isImproving}
                >
                    <Sparkles className={`w-4 h-4 ${isImproving ? 'animate-spin' : ''}`} />
                </Button>
            )}
        </div>
    );
  }

  return (
    <div className="relative group w-full">
        {renderComponent()}
        <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {enableAI && (
                 <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleImproveText}
                    disabled={isImproving}
                    className="p-1 h-auto"
                >
                    <Sparkles className={`w-4 h-4 ${isImproving ? 'animate-spin' : ''}`} />
                </Button>
            )}
        </div>
    </div>
  )

};
