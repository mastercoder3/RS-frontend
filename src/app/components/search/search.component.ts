import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  query: string = '';
  locations = [];
  pageNumber: number = 1;


  constructor(private api: ApiService, private toastr: ToastrService) { }

  ngOnInit(): void {

  }

  search(){
    if(this.query.length > 3){
      this.api.searchLocation(this.query)
        .subscribe((res: any)=>{
          console.log(res);
          this.locations = res.Locations;
        });
    }
    else{
      this.toastr.warning('Search Query too Short', 'Search Warning!');
    }
  }

  addToFavorites(data){
    console.log(data);

    this.api.addFavorite(data.name, data.address, data.phone, data.type, localStorage.getItem('userId'), data._id)
      .subscribe((res: any) =>{
        if(res.success === true){
          this.toastr.success('Added to Favorites');
        }
        else{
          this.toastr.error('Location Already a Favorite');
        }
      });
  }

}
