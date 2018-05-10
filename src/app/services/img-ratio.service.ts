import { Injectable, Renderer2, ElementRef } from '@angular/core';

export type ImgRatios = 'contain' | 'cover' | 'auto' | 'stretch';

@Injectable()
export class ImgRatioService {
    orig_rect: ClientRect | DOMRect;

    constructor() {}

    cover(w_ratio, h_ratio) {
        return Math.max(w_ratio, h_ratio);
    }

    contain(w_ratio, h_ratio) {
        return Math.min(w_ratio, h_ratio);
    }

    auto() {
        return 1;
    }

    stretch(w_ratio, h_ratio) {
        return {
            width: w_ratio,
            height: h_ratio
        };
    }

    apply_sizing(
        ratio_type: ImgRatios,
        img: HTMLElement,
        container: HTMLElement
    ) {
        if (!img || !container) {
            return;
        }

        const img_rect = img.getBoundingClientRect();
        const container_rect = container.getBoundingClientRect();

        if (!this.orig_rect) {
            this.orig_rect = img_rect;
        }

        const r = (this[ratio_type] as any)(
            container_rect.width / img_rect.width,
            container_rect.height / img_rect.height
        );

        const new_width = img_rect.width * (r.width || r);
        const new_height = img_rect.height * (r.height || r);

        return {
            width: new_width,
            height: new_height
        };
    }
}
