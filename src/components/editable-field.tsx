"use client";

import React, { useState, useRef, useEffect } from 'react';

type EditableFieldProps = {
  as?: React.ElementType;
  value: string;
  onSave: (value: string) => void;
  className?: string;
  children?: React.ReactNode;
  enableAI?: boolean;
} & Omit<React.HTMLAttributes<HTMLElement>, 'onSave' | 'className'>;

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
                className={`${className} w-full`}
                rows={Component === 'textarea' ? 4 : undefined}
                {...props}
            />
        </div>
    );
  }

  return (
    <div className="relative group w-full">
        {renderComponent()}
    </div>
  )

};
