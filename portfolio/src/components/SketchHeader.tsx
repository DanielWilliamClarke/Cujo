"use client";

import p5 from 'p5';
import { getSketch } from '@/sketches';
import React, {useMemo, useEffect, createRef} from "react";

// This stops any re-renders from creating multiple canvas'
let rendered = false;

export const SketchHeader: React.FC = () => {

    const p5Ref = useMemo(() => createRef<any>(), []);

    useEffect(() => {
        if (!rendered) {
            new p5(getSketch(), p5Ref.current);
            rendered = true;
        }
    });

    return (
        <div
            ref={p5Ref}
            className="w-full h-full"
        >
        </div>
    );
}
