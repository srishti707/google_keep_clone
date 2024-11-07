"use client"
import MobileSidebar from '@/components/MobileSidebar';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import TodoContext, { TodoContextProvider } from '@/context/TodoContext';
import React, { useContext } from 'react';

function Layout({ children }: any) {
  return (
    <TodoContextProvider>
      <div>
        <Navbar />
        <main className="flex w-full h-full  ">
          <Sidebar />
          <MobileSidebarContainer />
          {children}
        </main>
      </div>
    </TodoContextProvider>
  );
}

function MobileSidebarContainer() {
  const { isSidebarVisible } = useContext(TodoContext);

  return isSidebarVisible ? <MobileSidebar /> : null;
}

export default Layout;