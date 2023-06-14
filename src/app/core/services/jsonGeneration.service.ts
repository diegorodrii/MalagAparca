import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class JsonGenerationService {

    constructor() { }

    generateJSON(obj: any, collection : string) {
        const json = JSON.stringify(obj, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        this.downloadFile(url, collection);
        this.revokeUrl(url);
    }

    private downloadFile(url: string, collection: string) {
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = collection + '.json';
        downloadLink.style.display = 'none';

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    private revokeUrl(url: string) {
        setTimeout(() => {
            URL.revokeObjectURL(url);
        }, 1000);
    }


}
