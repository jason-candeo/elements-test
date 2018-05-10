import {
    Component,
    OnInit,
    Input,
    AfterViewInit,
    ElementRef,
    HostBinding,
    ViewChild,
    Renderer2,
    ViewEncapsulation,
    ChangeDetectorRef,
    NgZone,
    HostListener,
    Output,
    EventEmitter
} from '@angular/core';
import { Observable } from 'rxjs';
import { ImgRatios, ImgRatioService } from '../services/img-ratio.service';

@Component({
    selector: 'cc-lazy-img',
    templateUrl: './lazy-img.component.html',
    styleUrls: ['./lazy-img.component.scss']
})
export class LazyImgComponent implements OnInit, AfterViewInit {
    @ViewChild('intersectionTarget') intersectionTarget: ElementRef;
    @ViewChild('lazyImg') lazyImg: ElementRef;

    @Input() public width;
    @Input() public height;

    @Input() public src: string;
    @Input() public alt: string;

    @Input() public rootEl: ElementRef;
    @Input() public rootMargin = '0px';
    @Input() public threshold = 1.0;

    visibleClass = 'lazy-visible';
    loadedClass = 'lazy-loaded';
    observer: IntersectionObserver;
    loadsrc: string;

    @Output() visible: EventEmitter<any> = new EventEmitter();
    @Output() lazyLoaded: EventEmitter<any> = new EventEmitter();

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
        private imgRatio: ImgRatioService
    ) {}

    ngOnInit() {}

    ngAfterViewInit() {
        const opts = {
            root: this.rootEl ? this.rootEl.nativeElement : null,
            rootMargin: this.rootMargin,
            threshold: this.threshold
        };

        this.observer = new IntersectionObserver((entries, observer) => {
            this.onIntersect(entries, observer);
        }, opts);
        this.observer.observe(this.intersectionTarget.nativeElement);
    }

    onIntersect(entries: IntersectionObserverEntry[], observer) {
        entries.forEach(entry => {
            if (
                entry.target === this.intersectionTarget.nativeElement &&
                entry.intersectionRatio > 0
            ) {
                this.renderer.setProperty(
                    this.lazyImg.nativeElement,
                    'src',
                    this.src
                );

                this.renderer.addClass(
                    this.intersectionTarget.nativeElement,
                    this.visibleClass
                );

                this.visible.next(entry);

                this.observer.unobserve(this.intersectionTarget.nativeElement);
            }
        });
    }

    loaded() {
        // this.lazyLoaded.next(this.lazyImg.nativeElement);
        this.lazyLoaded.next(this.lazyImg.nativeElement);

        this.renderer.addClass(
            this.intersectionTarget.nativeElement,
            'lazy-loaded'
        );
    }
}
