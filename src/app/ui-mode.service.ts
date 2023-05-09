import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiModeService {

  is_dark_mode: boolean

  constructor() {
    let is_light_theme = localStorage.getItem('is_dark_mode')
    if (is_light_theme!==null)  {
      this.is_dark_mode = is_light_theme==='1'?true:false
    } else  {
      this.is_dark_mode = false
    }
   }

  toggle()  {
    this.is_dark_mode = !this.is_dark_mode
    localStorage.setItem('is_dark_mode', this.is_dark_mode?'1':'0')
  }

  set(mode='light') {
    if (mode==='light') {
      this.is_dark_mode=false
      localStorage.setItem('is_dark_mode', '0')
    } else {
      this.is_dark_mode=true
      localStorage.setItem('is_dark_mode', '1')
    }
  }
}