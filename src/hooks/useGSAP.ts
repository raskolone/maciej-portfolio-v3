import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export interface UseGSAPConfig {
  scope?: React.RefObject<Element | null> | Element | null;
  dependencies?: any[];
  revertOnUpdate?: boolean;
}

export type UseGSAPCallback = (context: gsap.Context) => void | (() => void);

export function useGSAP(
  callback?: UseGSAPCallback | null,
  dependenciesOrConfig: any[] | UseGSAPConfig = []
) {
  const isConfig =
    dependenciesOrConfig &&
    !Array.isArray(dependenciesOrConfig) &&
    typeof dependenciesOrConfig === "object";

  const config = isConfig ? (dependenciesOrConfig as UseGSAPConfig) : {};
  const dependencies = isConfig
    ? config.dependencies ?? []
    : (dependenciesOrConfig as any[]);
  const scope = config.scope;

  const ctxRef = useRef<gsap.Context | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (!callback) return;

    const targetScope =
      scope && typeof scope === "object" && "current" in scope
        ? scope.current
        : scope;

    const ctx = gsap.context((self) => {
      callback(self);
    }, targetScope || undefined);

    ctxRef.current = ctx;

    return () => {
      ctx.revert();
    };
  }, dependencies);

  const contextSafe = useRef(<T extends (...args: any[]) => any>(func: T): T => {
    return ((...args: any[]) => {
      return ctxRef.current ? (ctxRef.current as any).add(null, () => func(...args)) : func(...args);
    }) as T;
  });

  return { context: ctxRef.current, contextSafe: contextSafe.current };
}

(useGSAP as any).register = () => {};
(useGSAP as any).headless = true;

export default useGSAP;
