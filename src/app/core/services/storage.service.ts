import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  images: string[] = [];

  private imagesSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(this.images);
  public images$ = this.imagesSubject.asObservable();

  constructor(
    private storage: Storage,
    private utilsService: UtilsService
  ) {
    this.images = [];
  }

  /**
   * Uploads an image to Firebase Storage
   * @param $event The event containing the selected file
   */
  uploadImage($event: any) {
    const file = $event.target.files[0];
    // console.log(file);

    const imgRef = ref(this.storage, `images/${file.name}`);

    uploadBytes(imgRef, file)
      .then(response => {
        // console.log(response);
        this.getImages();
      })
      .catch(error => console.log(error));
  }

  /**
   * Retrieves the images from Firebase Storage
   */
  getImages() {
    const imagesRef = ref(this.storage, 'images');

    listAll(imagesRef)
      .then(async response => {
        this.images = [];

        for (let item of response.items) {
          const url = await getDownloadURL(item);
          // console.log(url);
          this.images?.push(url);
        }

        this.imagesSubject.next(this.images);

        // console.log(this.images);
      })
      .catch(error => console.log(error));
  }

  /**
   * Retrieves the URL of an image based on its name
   * @param id The name of the image
   * @returns An observable that emits the URL of the image
   */
  getImageUrlByName(id: string) {
    let imageUrl: string;

    const imagesRef = ref(this.storage, `images/${this.utilsService.removePrefix(id, "C:\\fakepath\\")}`);

    return from(getDownloadURL(imagesRef));
  }
  
  
}
