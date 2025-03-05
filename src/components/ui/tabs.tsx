import React, { useState } from 'react';

interface TabsProps {
  children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ children }) => {
  return <div className="w-full">{children}</div>;
};

export const TabsList: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex border-b">{children}</div>
);

interface TabsTriggerProps {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ children, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 border-b-2 ${
      isActive ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500'
    } focus:outline-none`}
  >
    {children}
  </button>
);

interface TabsContentProps {
  children: React.ReactNode;
  isActive: boolean;
}

export const TabsContent: React.FC<TabsContentProps> = ({ children, isActive }) => {
  return isActive ? <div className="p-4">{children}</div> : null;
};
