import {
    Component,
    OnInit,
    Renderer2,
    AfterContentInit,
    Input,
    ViewChild,
    ElementRef,
    HostBinding,
    HostListener
} from '@angular/core';
import { ImgRatioService, ImgRatios } from '../services/img-ratio.service';

@Component({
    selector: 'cc-img-container',
    templateUrl: './img-container.component.html',
    styleUrls: ['./img-container.component.scss']
})
export class ImgContainerComponent implements OnInit, AfterContentInit {
    @Input() mode: ImgRatios = 'contain';
    @Input() width = '100%';
    @Input() height = '100%';

    @ViewChild('container') container: ElementRef;

    img: HTMLElement;

    constructor(
        private renderer: Renderer2,
        private imgRatio: ImgRatioService
    ) {}

    ngOnInit() {}

    ngAfterContentInit() {
        const el = (this.container.nativeElement as HTMLElement).children.item(
            0
        ) as HTMLElement;

        if (el.nodeName.toLowerCase() === 'cc-lazy-img') {
            el.addEventListener('lazyLoaded', (event: any) => {
                this.img = event.detail;

                this.apply_sizing();

                window.addEventListener('resize', () => {
                    this.winLoad();
                });
            });
        } else {
            this.img = el;
            window.addEventListener('load', () => {
                this.winLoad();
            });

            window.addEventListener('resize', () => {
                this.winLoad();
            });
        }
    }

    apply_sizing() {
        const { width, height } = this.imgRatio.apply_sizing(
            this.mode,
            this.img,
            this.container.nativeElement
        );

        this.renderer.setStyle(this.img, 'width', `${width}px`);
        this.renderer.setStyle(this.img, 'height', `${height}px`);

        this.renderer.addClass(
            this.container.nativeElement,
            `applied-${this.mode}`
        );
    }

    winLoad() {
        this.apply_sizing();
    }

    resize() {
        this.apply_sizing();
    }
}
