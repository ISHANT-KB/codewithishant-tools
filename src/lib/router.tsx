import { useState, useEffect, createContext, useContext, ReactNode, MouseEvent } from 'react';

// Create Router Context to distribute current pathname
const RouterContext = createContext<{
  pathname: string;
  navigate: (to: string) => void;
}>({
  pathname: window.location.pathname,
  navigate: () => {},
});

export function RouterProvider({ children }: { children: ReactNode }) {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to: string) => {
    if (window.location.pathname !== to) {
      window.history.pushState(null, '', to);
      setPathname(to);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  return (
    <RouterContext.Provider value={{ pathname, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  return useContext(RouterContext);
}

interface LinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
  id?: string;
  [key: string]: any;
}

export function Link({ href, children, className = '', activeClassName = '', id, ...props }: LinkProps) {
  const { pathname, navigate } = useRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Let browser handle middle-mouse click/ctrl+click
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) {
      return;
    }
    e.preventDefault();
    navigate(href);
  };

  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
  const combinedClass = `${className} ${isActive ? activeClassName : ''}`.trim();

  return (
    <a
      id={id || `link-${href.replace(/[^a-zA-Z0-9]/g, '-')}`}
      href={href}
      onClick={handleClick}
      className={combinedClass}
      {...props}
    >
      {children}
    </a>
  );
}
