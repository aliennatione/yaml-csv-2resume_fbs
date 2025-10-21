"use client";

import React, { useState, useRef, useEffect } from 'react';

type EditableFieldProps = {
  as?: React.ElementType;
  value: string;
  onSave: (value: string) => void;
  className?: string;
  children?: React.ReactNode;
};

export const EditableField: React.FC<EditableFieldProps> = ({
  as: Component = 'span',
  value,
  onSave,
  className,
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
    onSave(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      inputRef.current?.blur();
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  if (isEditing) {
    if (Component === 'textarea') {
      return (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`${className} w-full`}
          {...props}
        />
      );
    }
    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        value={text}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`${className} w-full`}
        {...props}
      />
    );
  }

  return (
    <Component
      onDoubleClick={handleDoubleClick}
      className={`${className} hover:bg-gray-100 cursor-pointer p-1 rounded`}
      {...props}
    >
      {text}
    </Component>
  );
};
