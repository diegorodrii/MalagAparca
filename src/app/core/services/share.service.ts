import { Injectable } from '@angular/core';
import { Share } from '@capacitor/share';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor() { }

  onShareClicked(){
   Share.share({
      title: '{Comparte esta reserva con tus amigos y ayuda a que más gente encuentre aparcamiento!}',
      text: 'Acabo de reservar un   a plaza en MalagAparca. ¡Podré salir de casa sin necesidad de preocuparme de buscar un aparcamiento seguro y cerca de mi destino!',
      url: 'http://MalagAparca.com/',
      dialogTitle: 'Compartelo con tus amigos',
    });
  }
}
