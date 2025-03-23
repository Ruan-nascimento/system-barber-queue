// components/Icon.tsx
import React from "react";
import * as LucideIcons from "lucide-react"; 
import { LucideProps } from "lucide-react";

interface IconProps extends LucideProps {
  name: keyof typeof LucideIcons;
}

export const Icon: React.FC<IconProps> = ({ 
  name, 
  size = 24, 
  color = "currentColor", 
  ...props 
}) => {

  const IconComponent = LucideIcons[name] as React.ComponentType<LucideProps>;


  if (!IconComponent) {
    return null;
  }

  return <IconComponent size={size} color={color} {...props} />;
};