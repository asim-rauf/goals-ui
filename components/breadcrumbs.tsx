'use client';
import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const Breadcrumbs = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathSegments.map((segment, index) => {
          const url = `/${pathSegments.slice(0, index + 1).join('/')}`;
          const isLastSegment = index === pathSegments.length - 1;

          return (
            <BreadcrumbItem key={url}>
              {!isLastSegment ? (
                <>
                  <BreadcrumbLink href={url}>
                    {capitalize(segment.replace('-', ' '))}
                  </BreadcrumbLink>
                  <BreadcrumbSeparator className='hidden md:block' />
                </>
              ) : (
                <BreadcrumbPage>
                  {capitalize(segment.replace('-', ' '))}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

// Helper function to capitalize the first letter of a string
const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export default Breadcrumbs;
