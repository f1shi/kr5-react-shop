import { Card, CardContent, Skeleton } from '@mui/material';

function ProductCardSkeleton() {
  return (
    <Card aria-hidden="true">
      <Skeleton variant="rectangular" height={180} />
      <CardContent>
        <Skeleton variant="text" width="70%" height={32} />
        <Skeleton variant="text" />
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="40%" height={32} />
        <Skeleton variant="rounded" width="60%" height={24} />
      </CardContent>
    </Card>
  );
}

export default ProductCardSkeleton;
