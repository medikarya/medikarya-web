export const trackEvent = (eventName: string) => {
    if (typeof window !== 'undefined' && (window as any).clarity) {
        (window as any).clarity("event", eventName);
    }
};
