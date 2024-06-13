/// <reference types="vite/client" />

declare module "*.svg" {
    import * as React from 'react';
    export const ReactSVGComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}