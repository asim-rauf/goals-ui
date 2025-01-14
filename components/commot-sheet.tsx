import { ReactNode } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { SquarePlus } from 'lucide-react';

interface CommonSheetProps {
  title: string;
  description: string;
  triggerText: string;
  footer?: ReactNode; // Footer can be customized or left out
  children: ReactNode; // Children to render inside the Sheet
  isOpen: boolean; // Open state passed as prop
  onOpenChange: (open: boolean) => void; // Handler for open/close changes
}

export function CommonSheet({
  title,
  description,
  triggerText,
  footer,
  children,
  isOpen,
  onOpenChange,
}: CommonSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant='default' size='sm'>
          <SquarePlus />
          {triggerText}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <div className='grid gap-4 py-4'>{children}</div>
        {footer && <SheetFooter>{footer}</SheetFooter>}
      </SheetContent>
    </Sheet>
  );
}
