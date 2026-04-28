'use client';
import React from 'react';
import { useRoutes } from 'react-router';
import { routes } from 'routes/router';

const DattaSableSubApp = () => {
  const element = useRoutes(routes);
  return element;
};

export default function AdminCatchAllPage() {
  return <DattaSableSubApp />;
}
