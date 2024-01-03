import {
  forwardRef,
  type HTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from "react"

import { cn } from "@/lib/utils"

const Table = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table
        ref={ref}
        className={cn(
          `
            w-full 
            caption-bottom 
            text-sm
          `,
          className
        )}
        {...props}
      />
    </div>
  )
)

const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead
      ref={ref}
      className={cn(
        `
        [&_tr]:border-b
      `,
        className
      )}
      {...props}
    />
  )
)

const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn(
        `
        [&_tr:last-child]:border-0
      `,
        className
      )}
      {...props}
    />
  )
)

const TableFooter = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn(
        `
        border-t
        bg-muted/50 
        font-medium 
        [&>tr]:last:border-b-0
      `,
        className
      )}
      {...props}
    />
  )
)

const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        `
          border-b 
          transition-colors 
          hover:bg-muted/50 
          data-[state=selected]:bg-muted
        `,
        className
      )}
      {...props}
    />
  )
)

const TableHead = forwardRef<HTMLTableCellElement, ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        `
        h-12 
        px-4 
        text-left 
        align-middle 
        font-medium 
        [&:has([role=checkbox])]:pr-0
      `,
        className
      )}
      {...props}
    />
  )
)

const TableCell = forwardRef<HTMLTableCellElement, TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(
        `
        p-4 
        align-middle 
        [&:has([role=checkbox])]:pr-0
      `,
        className
      )}
      {...props}
    />
  )
)

const TableCaption = forwardRef<HTMLTableCaptionElement, HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption
      ref={ref}
      className={cn(
        `
        mt-4 
        text-sm
      `,
        className
      )}
      {...props}
    />
  )
)

Table.displayName = "Table"
TableHeader.displayName = "TableHeader"
TableBody.displayName = "TableBody"
TableFooter.displayName = "TableFooter"
TableRow.displayName = "TableRow"
TableHead.displayName = "TableHead"
TableCell.displayName = "TableCell"
TableCaption.displayName = "TableCaption"

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption }
