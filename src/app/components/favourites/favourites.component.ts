import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

  locations = [];
  pageNumber: number = 1;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.initFavorites();
  }

  initFavorites(){
    this.api.getUserFavorite(localStorage.getItem('userId'))
      .subscribe((res:any) =>{
          console.log(res);

          this.locations = res.Favorite;
      });
  }

  removeFavorite(data){
    this.api.deleteFavorite(data._id)
      .subscribe((res: any) =>{
        console.log(res);

        if(res.success){
          this.initFavorites();
        }
      })
  }

}
