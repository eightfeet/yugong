import {DependencyList, useEffect, useState} from 'react'

export function useAsyncMemo<T>(factory: () => Promise<T> | undefined | null, deps: DependencyList): T | undefined
export function useAsyncMemo<T>(factory: () => Promise<T> | undefined | null, deps: DependencyList, initial: T): T
export function useAsyncMemo<T>(factory: () => Promise<T> | undefined | null, deps: DependencyList, initial?: T) {
  const [val, setVal] = useState<T | undefined>(initial)
  useEffect(() => {
    let cancel = false
    const promise = factory()
    if (promise === undefined || promise === null) return
    promise.then((val) => {
      if (!cancel) {
        setVal(val)
      }
    })
    return () => {
      cancel = true
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return val
}