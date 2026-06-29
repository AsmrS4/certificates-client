import { Skeleton } from '@mantine/core';

interface FieldSkeletonProps {
    h?: number;
    w?: number;
    r?: string;
}

export const FieldSkeleton = ({
    h: height = 30,
    w: width = 100,
    r: radius = 'md',
}: FieldSkeletonProps) => {
    return <Skeleton height={height} width={width} radius={radius} />;
};
