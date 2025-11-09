/* 

    Thanks, ChatGPT

*/

import { computed, defineAsyncComponent } from 'vue';

import { desktopViews, mobileViews } from '@/views';
import type { views } from '@/views'
import state from '@/store';

export function useResponsiveAsyncView(key: views) {
    const isMobile = computed(() => state.isMobile)

    const AsyncComponent = computed(() => {
        const factory = isMobile.value ? mobileViews[key] : desktopViews[key];
        return defineAsyncComponent({
            loader: factory,
            // optional: small timeout, errorComponent, loadingComponent
            // delay: 200,
            // timeout: 30000,
        });
    });

    // optional: prefetch the other variant after mount
    const prefetchOther = () => {
        const otherFactory = isMobile.value ? mobileViews[key] : desktopViews[key];
        // trigger browser to fetch the chunk (non-blocking)
        otherFactory();
    };

    return { AsyncComponent, prefetchOther };
}
