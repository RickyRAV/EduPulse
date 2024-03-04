import { toast } from '@/components/ui/toast/use-toast';

export const showToast = (
    variant: 'default' | 'destructive' | 'success' | null | undefined,
    title: string,
    description: string,
) => {
    toast({
        variant: variant,
        title,
        description
    });
};