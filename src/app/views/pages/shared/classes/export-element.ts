/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { drawDOM, exportPDF, DrawOptions, Group } from '@progress/kendo-drawing';
import { saveAs } from '@progress/kendo-file-saver';
export function exportElement(element: HTMLElement, options?: DrawOptions,title?: any) {
    drawDOM(element, options)
        .then((group: Group) => exportPDF(group))
        .then((dataUri) => {
            saveAs(dataUri, title);
        });
}
