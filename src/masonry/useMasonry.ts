import {flushSync} from "react-dom";
import {PropsWithChildren, useEffect, useRef, useState} from "react";

type MasonryCommonProps = PropsWithChildren<{
  columns: number | Record<"xs" | "sm" | "md" | "lg" | "xl", number>
  spacing: number
}>

const parseToNumber = (val: string | number) => {
  if (typeof val === "number") return val
  return Number(val.replace('px', ''));
};

export const useMasonry = ({children, columns, spacing}: MasonryCommonProps) => {
  const [maxColumnHeight, setMaxColumnHeight] = useState()
  const [numberOfLineBreaks, setNumberOfLineBreaks] = useState(0)
  const masonryRef = useRef<HTMLDivElement>()

  const handleResize = (masonryChildren: ResizeObserverEntry[]) => {
    if (!masonryRef.current || !masonryChildren || masonryChildren.length === 0) {
      return
    }
    const masonry = masonryRef.current
    const masonryFirstChild: any = masonryRef.current.firstChild
    const parentWidth = masonry.clientWidth
    const firstChildWidth = masonryFirstChild.clientWidth

    if (parentWidth === 0 || firstChildWidth === 0) {
      return
    }

    const firstChildComputedStyle = window.getComputedStyle(masonryFirstChild)
    const firstChildMarginLeft = parseToNumber(firstChildComputedStyle.marginLeft)
    const firstChildMarginRight = parseToNumber(firstChildComputedStyle.marginRight)

    const currentNumberOfColumns = Math.round(
      parentWidth / (firstChildWidth + firstChildMarginLeft + firstChildMarginRight),
    )

    const columnHeights = new Array(currentNumberOfColumns).fill(0)
    let skip = false
    masonry.childNodes.forEach((child: any) => {
      if (child.nodeType !== Node.ELEMENT_NODE || child.dataset.class === 'line-break' || skip) {
        return
      }
      const childComputedStyle = window.getComputedStyle(child)
      const childMarginTop = parseToNumber(childComputedStyle.marginTop)
      const childMarginBottom = parseToNumber(childComputedStyle.marginBottom)
      // if any one of children isn't rendered yet, masonry's height shouldn't be computed yet
      const childHeight = parseToNumber(childComputedStyle.height)
        ? Math.ceil(parseToNumber(childComputedStyle.height)) + childMarginTop + childMarginBottom
        : 0
      if (childHeight === 0) {
        skip = true
        return
      }
      // if there is a nested image that isn't rendered yet, masonry's height shouldn't be computed yet
      for (let i = 0; i < child.childNodes.length; i += 1) {
        const nestedChild = child.childNodes[i]
        if (nestedChild.tagName === 'IMG' && nestedChild.clientHeight === 0) {
          skip = true
          break
        }
      }
      if (!skip) {
        // find the current shortest column (where the current item will be placed)
        const currentMinColumnIndex = columnHeights.indexOf(Math.min(...columnHeights))
        columnHeights[currentMinColumnIndex] += childHeight
        const order = currentMinColumnIndex + 1
        child.style.order = order
      }
    })
    if (!skip) {
      // In React 18, state updates in a ResizeObserver's callback are happening after the paint which causes flickering
      // when doing some visual updates in it. Using flushSync ensures that the dom will be painted after the states updates happen
      // Related issue - https://github.com/facebook/react/issues/24331
      flushSync(() => {
        setMaxColumnHeight(Math.max(...columnHeights) as any)
        setNumberOfLineBreaks(currentNumberOfColumns > 0 ? currentNumberOfColumns - 1 : 0)
      })
    }
  }

  const observer = useRef(
    typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(handleResize),
  )

  useEffect(() => {
    const resizeObserver = observer.current
    // IE and old browsers are not supported
    if (resizeObserver === undefined) {
      return undefined
    }

    if (masonryRef.current) {
      masonryRef.current.childNodes.forEach((childNode) => {
        resizeObserver.observe(childNode as any)
      })
    }
    return () => (resizeObserver ? resizeObserver.disconnect() : undefined)
  }, [columns, spacing, children])

  return {
    masonryRef,
    maxColumnHeight,
    numberOfLineBreaks
  }
}
