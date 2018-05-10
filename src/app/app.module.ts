import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { ImgContainerComponent } from './img-container/img-container.component';
import { ImgRatioService } from './services/img-ratio.service';
import { LazyImgComponent } from './lazy-img/lazy-img.component';

@NgModule({
    declarations: [ImgContainerComponent, LazyImgComponent],
    imports: [BrowserModule],
    entryComponents: [ImgContainerComponent, LazyImgComponent],
    providers: [ImgRatioService]
})
export class AppModule {
    constructor(private injector: Injector) {}

    ngDoBootstrap() {
        const imgcontainer = createCustomElement(ImgContainerComponent, {
            injector: this.injector
        });
        customElements.define('cc-img-container', imgcontainer);

        const lazyimg = createCustomElement(LazyImgComponent, {
            injector: this.injector
        });
        customElements.define('cc-lazy-img', lazyimg);
    }
}
