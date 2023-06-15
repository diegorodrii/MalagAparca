import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';
import { BehaviorSubject, Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  images: string[] = [];

  private imagesSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(this.images);
  public images$ = this.imagesSubject.asObservable();

  constructor(
    private storage: Storage,
  ) {
    this.images = [];
  }

  uploadImage($event: any) {
    const file = $event.target.files[0];

    const imgRef = ref(this.storage, `images/${file.name}`);

    uploadBytes(imgRef, file)
      .then(response => {
        this.getImages();
      })
      .catch(error => console.log(error));
  }


  getImages() {
    const imagesRef = ref(this.storage, 'images');

    listAll(imagesRef)
      .then(async response => {
        this.images = [];

        for (let item of response.items) {
          const url = await getDownloadURL(item);
          this.images?.push(url);
        }

        this.imagesSubject.next(this.images);

      })
      .catch(error => console.log(error));
  }

 getImageUrlByName(id: string) {
  const fakepath = "C:\\fakepath\\";
  const imagesRef = ref(this.storage, `images/${id.startsWith(fakepath) ? id.slice(fakepath.length) : id}`);

  return from(getDownloadURL(imagesRef));
}
  
  
}
