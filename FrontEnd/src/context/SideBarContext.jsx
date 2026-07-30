import { useCallback, useEffect, useMemo, useState } from "react";
import SidebarContext from "./SideBarContextValue";

const SIDEBAR_STORAGE_KEY = "ledgerpro-sidebar";

const getInitialCollapsedState = () => {
  try {
    const saved = localStorage.getItem(SIDEBAR_STORAGE_KEY);
    return saved ? JSON.parse(saved) : false;
  } catch {
    return false;
  }
};

export function SidebarProvider({ children }) {
  const [collapsed, setCollapsed] = useState(getInitialCollapsedState);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, JSON.stringify(collapsed));
  }, [collapsed]);

  const toggleSidebar = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  const toggleMobileSidebar = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const closeMobileSidebar = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      collapsed,
      mobileOpen,
      toggleSidebar,
      toggleMobileSidebar,
      closeMobileSidebar,
    }),
    [
      collapsed,
      closeMobileSidebar,
      mobileOpen,
      toggleMobileSidebar,
      toggleSidebar,
    ],
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}
