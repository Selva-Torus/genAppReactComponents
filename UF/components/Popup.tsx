"use client";

import React, { useRef, useEffect, useState, useLayoutEffect } from "react";
import ReactDOM from "react-dom";

export type PopupPlacement = 
  | "top" 
  | "top-start" 
  | "top-end"
  | "bottom" 
  | "bottom-start" 
  | "bottom-end"
  | "left" 
  | "left-start" 
  | "left-end"
  | "right" 
  | "right-start" 
  | "right-end";

export type PopupSize = "s" | "m" | "l" | "xl";

interface Position {
  top: number;
  left: number;
  placement: PopupPlacement;
}

interface PopupProps {
  /** Reference to the anchor element */
  anchorRef: React.RefObject<HTMLElement>;
  /** Content to display in the popup */
  children: React.ReactNode;
  /** Whether the popup is open */
  open: boolean;
  /** Callback when popup should close */
  onClose?: () => void;
  /** Placement relative to anchor */
  placement?: PopupPlacement;
  /** Size of the popup */
  size?: PopupSize;
  /** Custom className */
  className?: string;
  /** Whether to show arrow pointing to anchor */
  hasArrow?: boolean;
  /** Whether to close on outside click */
  autoClose?: boolean;
  /** Whether to close on escape key */
  closeOnEscape?: boolean;
  /** Offset from the anchor element */
  offset?: number | [number, number];
  /** Whether to disable portal rendering */
  disablePortal?: boolean;
  /** Z-index for the popup */
  zIndex?: number;
  /** Custom styles */
  style?: React.CSSProperties;
  /** Animation duration in ms */
  animationDuration?: number;
  /** Whether popup should flip when there's no space */
  preventFlip?: boolean;
  /** ID for the popup element */
  id?: string;
}

const sizeClasses = {
  s: "w-48 max-w-48",
  m: "w-64 max-w-64", 
  l: "w-80 max-w-80",
  xl: "w-96 max-w-96"
};

const arrowStyles = {
  top: "bottom-[-6px] left-1/2 transform -translate-x-1/2 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-gray-200 dark:border-t-gray-600",
  "top-start": "bottom-[-6px] left-4 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-gray-200 dark:border-t-gray-600",
  "top-end": "bottom-[-6px] right-4 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-gray-200 dark:border-t-gray-600",
  bottom: "top-[-6px] left-1/2 transform -translate-x-1/2 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-gray-200 dark:border-b-gray-600",
  "bottom-start": "top-[-6px] left-4 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-gray-200 dark:border-b-gray-600",
  "bottom-end": "top-[-6px] right-4 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-gray-200 dark:border-b-gray-600",
  left: "right-[-6px] top-1/2 transform -translate-y-1/2 border-t-[6px] border-b-[6px] border-l-[6px] border-t-transparent border-b-transparent border-l-gray-200 dark:border-l-gray-600",
  "left-start": "right-[-6px] top-4 border-t-[6px] border-b-[6px] border-l-[6px] border-t-transparent border-b-transparent border-l-gray-200 dark:border-l-gray-600",
  "left-end": "right-[-6px] bottom-4 border-t-[6px] border-b-[6px] border-l-[6px] border-t-transparent border-b-transparent border-l-gray-200 dark:border-l-gray-600",
  right: "left-[-6px] top-1/2 transform -translate-y-1/2 border-t-[6px] border-b-[6px] border-r-[6px] border-t-transparent border-b-transparent border-r-gray-200 dark:border-r-gray-600",
  "right-start": "left-[-6px] top-4 border-t-[6px] border-b-[6px] border-r-[6px] border-t-transparent border-b-transparent border-r-gray-200 dark:border-r-gray-600",
  "right-end": "left-[-6px] bottom-4 border-t-[6px] border-b-[6px] border-r-[6px] border-t-transparent border-b-transparent border-r-gray-200 dark:border-r-gray-600"
};

const calculatePosition = (
  anchor: HTMLElement,
  popup: HTMLElement,
  placement: PopupPlacement,
  offset: number | [number, number]
): Position => {
  const anchorRect = anchor.getBoundingClientRect();
  const popupRect = popup.getBoundingClientRect();
  const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollY = window.pageYOffset || document.documentElement.scrollTop;
  
  const offsetArray = Array.isArray(offset) ? offset : [offset, offset];
  const [offsetX, offsetY] = offsetArray;

  let top = 0;
  let left = 0;

  switch (placement) {
    case "top":
      top = anchorRect.top + scrollY - popupRect.height - offsetY;
      left = anchorRect.left + scrollX + (anchorRect.width - popupRect.width) / 2;
      break;
    case "top-start":
      top = anchorRect.top + scrollY - popupRect.height - offsetY;
      left = anchorRect.left + scrollX;
      break;
    case "top-end":
      top = anchorRect.top + scrollY - popupRect.height - offsetY;
      left = anchorRect.right + scrollX - popupRect.width;
      break;
    case "bottom":
      top = anchorRect.bottom + scrollY + offsetY;
      left = anchorRect.left + scrollX + (anchorRect.width - popupRect.width) / 2;
      break;
    case "bottom-start":
      top = anchorRect.bottom + scrollY + offsetY;
      left = anchorRect.left + scrollX;
      break;
    case "bottom-end":
      top = anchorRect.bottom + scrollY + offsetY;
      left = anchorRect.right + scrollX - popupRect.width;
      break;
    case "left":
      top = anchorRect.top + scrollY + (anchorRect.height - popupRect.height) / 2;
      left = anchorRect.left + scrollX - popupRect.width - offsetX;
      break;
    case "left-start":
      top = anchorRect.top + scrollY;
      left = anchorRect.left + scrollX - popupRect.width - offsetX;
      break;
    case "left-end":
      top = anchorRect.bottom + scrollY - popupRect.height;
      left = anchorRect.left + scrollX - popupRect.width - offsetX;
      break;
    case "right":
      top = anchorRect.top + scrollY + (anchorRect.height - popupRect.height) / 2;
      left = anchorRect.right + scrollX + offsetX;
      break;
    case "right-start":
      top = anchorRect.top + scrollY;
      left = anchorRect.right + scrollX + offsetX;
      break;
    case "right-end":
      top = anchorRect.bottom + scrollY - popupRect.height;
      left = anchorRect.right + scrollX + offsetX;
      break;
  }

  return { top, left, placement };
};

export const Popup: React.FC<PopupProps> = ({
  anchorRef,
  children,
  open,
  onClose,
  placement = "bottom",
  size = "m",
  className = "",
  hasArrow = true,
  autoClose = true,
  closeOnEscape = true,
  offset = 8,
  disablePortal = false,
  zIndex = 1000,
  style,
  animationDuration = 200,
  preventFlip = false,
  id,
}) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<Position>({ top: 0, left: 0, placement });
  const [isVisible, setIsVisible] = useState(false);

  // Calculate position
  useLayoutEffect(() => {
    if (!open || !anchorRef.current || !popupRef.current) return;

    const updatePosition = () => {
      const newPosition = calculatePosition(
        anchorRef.current!,
        popupRef.current!,
        placement,
        offset
      );
      setPosition(newPosition);
    };

    // Initial position calculation
    updatePosition();

    // Update position on scroll and resize
    const handleUpdate = () => requestAnimationFrame(updatePosition);
    window.addEventListener("scroll", handleUpdate, true);
    window.addEventListener("resize", handleUpdate);

    return () => {
      window.removeEventListener("scroll", handleUpdate, true);
      window.removeEventListener("resize", handleUpdate);
    };
  }, [open, placement, offset, anchorRef]);

  // Handle visibility animation
  useEffect(() => {
    if (open) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), animationDuration);
      return () => clearTimeout(timer);
    }
  }, [open, animationDuration]);

  // Handle outside click
  useEffect(() => {
    if (!open || !autoClose || !onClose) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const anchor = anchorRef.current;
      const popup = popupRef.current;

      if (
        anchor &&
        popup &&
        !anchor.contains(target) &&
        !popup.contains(target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, autoClose, onClose, anchorRef]);

  // Handle escape key
  useEffect(() => {
    if (!open || !closeOnEscape || !onClose) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, closeOnEscape, onClose]);

  if (!isVisible) return null;

  const sizeClass = sizeClasses[size];
  
  const popupClassName = [
    "absolute bg-white dark:bg-gray-800",
    "border border-gray-200 dark:border-gray-600",
    "rounded-lg shadow-lg",
    "overflow-hidden",
    "transition-all duration-200 ease-in-out",
    open ? "opacity-100 scale-100" : "opacity-0 scale-95",
    sizeClass,
    className
  ].filter(Boolean).join(" ");

  const popupContent = (
    <div
      ref={popupRef}
      id={id}
      className={popupClassName}
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        zIndex,
        transformOrigin: "center",
        ...style
      }}
      role="tooltip"
      aria-hidden={!open}
    >
      {hasArrow && (
        <div
          className={`absolute w-0 h-0 ${arrowStyles[position.placement]}`}
        />
      )}
      <div className="relative z-10 bg-white dark:bg-gray-800 rounded-lg">
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );

  if (disablePortal) {
    return popupContent;
  }

  return ReactDOM.createPortal(popupContent, document.body);
};

// Export a hook for easier popup management
export const usePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const anchorRef = useRef<HTMLElement>(null);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);
  const togglePopup = () => setIsOpen(prev => !prev);

  return {
    isOpen,
    anchorRef,
    openPopup,
    closePopup,
    togglePopup
  };
};

export default Popup;